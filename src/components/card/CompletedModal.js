import React from 'react'
import styled from './cardCompleted.module.css'


export const CompletedModal = () => {
    return (
        <div className={styled.card_list}>
        <li className={styled.card_item}>
            <div className={styled.card_header}>
                <p className={styled.card_title}>Completed:
                    <a href="#" className={styled.title_ref}>Title</a>
                </p>
                <button className={styled.card_act}>Continue
                <div className={styled.card_arrow}></div>
                </button>
            </div>        
        </li>
        </div>    
)};
