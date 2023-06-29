import React from "react";
import './TextBlock.css';
import { useEffect } from "react";

const TextBlock = ({text}) => {

    useEffect(()  => {
        console.info(text);
        },[]);

    return (
        <div className="information-box-shadow row">
            {text?.map((item) => (
                <div>
                    {item.title && <div className="info-text-title">{item.title}</div>}
                    {item.subtitle && <div  className="info-text-subtitle">{item.subtitle}</div>}
                    {item.text && <div  className="info-text-body">{item.text}</div>}
                </div>
                ))}
        </div>
    );
}

export default TextBlock;