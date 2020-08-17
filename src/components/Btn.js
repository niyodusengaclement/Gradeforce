import React from 'react';
import {Button } from 'react-bootstrap';
import '../assets/styles/components/btn.scss'
export default ({name, label, handleClick, className}) => {
    return(
        <Button name={name} className={`btn ${className ? className : ''}`} onClick={(event) => handleClick(event.target)}>
            <span>{label}</span>
        </Button>
    )
}