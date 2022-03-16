import React from 'react'
import './clanBar.css'

const ClanBar = ({ logo, color, points, maxPoints }) => {
    console.log(points, maxPoints)
    const height = 100 + (points / maxPoints) * 500
    return (
        <div className='barContainer'>
            <div style={{
                width: '100px',
                height: String(height)+'px',
                backgroundColor: color,
                borderTopRightRadius: '5px',
                borderTopLeftRadius: '5px',
            }}/>
            <img src={logo} alt={"Logo de " + color} className='logoBar'/>
        </div>
    )
}

export default ClanBar