import React from "react";
import './TextBlock.css';

const TextBlock = ({ text }) => {

    return (
        <div className="row">
            {text?.map((item) => (
                <div>
                    {item.title && <div className="info-text-title">{item.title}</div>}
                    {item.subtitle && <div className="info-text-subtitle">{item.subtitle}</div>}
                    {item.text && <div className="info-text-body">{item.text}</div>}
                </div>
            ))}
        </div>
    );
}

export default TextBlock;