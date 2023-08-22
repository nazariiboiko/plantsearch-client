import React from "react";
import './TextBlock.css';

const TextBlock = ({ text }) => {

    return (
        <div className="row">
            {text?.map((item) => (
                <div>
                    <div className="info-text-title">{item.title}</div>
                    <div className="info-text-time">{item.time}</div>
                    <div className="info-text-subtitle">{item.subtitle}</div>
                    <div className="info-text-body">{item.text}</div>
                </div>
            ))}
        </div>
    );
}

export default TextBlock;