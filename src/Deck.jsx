import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css"

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeckFromAPI(){
        async function getData() {
            try{
                const resp = await axios.get(`${API_BASE_URL}/new/shuffle/`)
                setDeck(resp.data)
            }
            catch(e){
                alert(e);
            }
        }
        getData();
    }, []);

    
    async function draw(){
        try{
            const drawCardResp = await axios.get(
                `${API_BASE_URL}/${deck.deck_id}/draw`)

            if(drawCardResp.data.remaining === 0){
                throw new Error("Deck fully drawn!");
            }

            const drawnCard = drawCardResp.data.cards[0];
            setDrawn(d => [...d, {id: drawnCard.code,
                                  value: `${drawnCard.suit} of ${drawnCard.value}`,
                                  image: drawnCard.image}])
        }
        catch(e){
            alert(e)
        }
    }

    async function shuffle(){
        setIsShuffling(true);
        try{
            await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle`);
            // reset drawn cards to empty array
            setDrawn([]);
        }
        catch(e){
            alert(e)
        }
        finally{
            // always sets shuffling to false whether error is caught or not
            setIsShuffling(false)
        }
    }

    function renderDrawBtn() {
        if (!deck) return null;

        return (
            <button
                className = "draw-btn"
                onClick = {draw}
                disabled = {isShuffling}>
                DRAW
            </button>
        );
    }

    function renderShuffleBtn(){
        if (!deck) return null;
        return(
            <button
                className = "shuffle-btn"
                onClick = {shuffle}
                disabled = {isShuffling}>
                SHUFFLE
            </button>
        )
    }

    return(
        <section className="Deck">
            {renderDrawBtn()}
            {renderShuffleBtn()}

            <div className = "Deck-cards">{
                drawn.map(c => (
                    <Card key={c.id} value={c.value} image={c.image} />
                ))}
            </div>
        </section>
    );
}

export default Deck;