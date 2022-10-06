import React from 'react'
import './bar.css'
import beerlogos from "./beerlogos";

const Bar = ({ name, points, maxPoints, totalSells, classement, beers }) => {
    const width = 100 + (points / maxPoints) * 70
    const percentage = (totalSells === 0 ? 0 : 100 * points / totalSells).toFixed(2)
    return (
        <div className='globalbar'
             style={{
                 width: `${width + 10}%`,
                 height: `${15-classement / 2}%`,
             }}>
            {beers && <img className={'beerlogo'} src={beerlogos[beers[0]]}/>}
            <div className='bar'
                 style={{
                     width: `${width}%`,
                 }}>
                <div className='name' style={{fontSize: 30 - classement * 2}}>{name}</div>
                <div className='percents' style={{fontSize: 40 - classement * 5}}>{percentage}%</div>
            </div>
            {beers && <img className={'beerlogo'} src={beerlogos[beers[1]]}/>}
        </div>
    )
}

export default Bar