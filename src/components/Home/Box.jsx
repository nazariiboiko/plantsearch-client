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
            link: 'https://www.pinterest.com/mikitanazar5/%D0%BE%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5/',
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
        if (section.id == 1) {
            window.location.href = "https://www.pinterest.com/mikitanazar5/%D0%BE%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5";
        } else {
            navigate(section.link);
        }
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
