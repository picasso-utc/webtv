import React from 'react'
import './rankingItem.css'

const RankingItem = ({ ranking, name, elo }) => (
    <div className='ranking-item-container'>
        <div className='ranking-item-container-left-text'>
            <h2>{ranking} - {name}</h2>
        </div>
        <div className='ranking-item-container-right-text'>
            <h2>{elo}</h2>
        </div>
    </div>
)

export default RankingItem