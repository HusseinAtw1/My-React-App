import React, { useState, useEffect } from 'react';

function Button({ value, onClick, className }) {
    const [flash, setFlash] = useState(false);

    const handleClick = () => {
        setFlash(true);
        onClick(value);
    };

    useEffect(() => {
        if (flash) {
            const timer = setTimeout(() => setFlash(false), 200);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <button
            className={`${className} ${flash ? "flash" : ""}`}
            onClick={handleClick}
        >
            {value}
        </button>
    );
}

export default Button;
