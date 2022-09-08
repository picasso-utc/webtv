import React from 'react'
import './donsBar.css'

const DonsBar = ({color, points, objectif}) => {
    console.log(points)
    const height = 10 + (points / objectif) * 70
    return (
        <div className='barContainer'>
            <div style={{
                width: '150px',
                height: String(height)+'vh',
                backgroundColor: color,
                borderTopRightRadius: '7px',
                borderTopLeftRadius: '7px',
            }}/>
        </div>
    )
}

export default DonsBar