import React, { useState } from "react";
import "./Card.css"

function Card({value, image}) {

    const [{angle, x, y}] = useState({
        angle: Math.random()* 90 - 50,
        x: Math.random()* 40 - 20,
        y: Math.random()* 40 - 20
    })
    const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    return <img
        className = "Card"
        alt = {value}
        src = {image}
        style = {{transform}}
    />;
}

export default Card