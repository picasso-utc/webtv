import React from 'react'
import './rankingItem.css'

const RankingItem = ({ ranking, name, nbGame, nbWin, elo }) => (
    <div className='ranking-item-container' style={
        ranking % 2 === 0 ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}}>
        <div className='ranking-item-container-rank-text'>
            <h2>{ranking}</h2>
        </div>
        <div className='ranking-item-container-name-text'>
            <h2>{name}</h2>
        </div>
        <div className='ranking-item-container-game-text'>
            <h2>{nbGame}</h2>
        </div>
        <div className='ranking-item-container-game-text'>
            <h2>{!isNaN(nbWin / nbGame) ? `${(nbWin / nbGame * 100).toFixed(0)} %` : 'WinRate'}</h2>
        </div>
        <div className='ranking-item-container-elo-text'>
            <h2>{elo}</h2>
        </div>
    </div>
)

export default RankingItem