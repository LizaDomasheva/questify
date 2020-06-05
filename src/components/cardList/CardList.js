import React from 'react'
import Card from '../card/Card'
import styled from "../card/card.module.css";
import CardChallenge from '../card/CardChallenge';

const CardList = ({todayCard}) => {
    return (
        <ul className={styled.card_list}>
            {todayCard.map(card=><li key={card._id}>
                <Card todayCard={card}/>
                {/* {challengeSendToUser &&  
                <CardChallenge todayCard={card}/> } */}
                </li>)}
                
        </ul>

    
)};

export default CardList;