import React, { useState } from 'react';
import './Box.css';
import { useNavigate } from 'react-router-dom';

const BoxTest = () => {
    const [hoveredSection, setHoveredSection] = useState(null);
    const navigate = useNavigate();

    const sections = [
        {
            id: 1,
            image: 'image1.jpg',
            text: 'Шукаю натхнення',
            link: '/inspiration',
        },
        {
            id: 2,
            image: 'image2.jpg',
            text: 'Шукаю рослини для себе',
            link: '/filter',
        },
        {
            id: 3,
            image: 'image3.jpg',
            text: 'Шукаю професіоналів своєї справи',
            link: '/supplier',
        },
    ];

    const handleSectionHover = (sectionId) => {
        setHoveredSection(sectionId);
    };

    const handleSectionClick = (section) => {
        navigate(section.link);
    }

    return (
        <div className="box-container">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className={`box-section ${section.id === hoveredSection ? 'hovered' : ''}`}
                    onMouseEnter={() => handleSectionHover(section.id)}
                    onMouseLeave={() => handleSectionHover(null)}
                    onClick={() => handleSectionClick(section)}
                >
                    <div style={{ position: 'relative' }}>
                        <img src={section.image} alt={`Image ${section.id}`} />
                        <div className="overlay">
                            <p>{section.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoxTest;
