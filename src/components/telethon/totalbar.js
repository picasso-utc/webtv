import React from 'react';

import "./totalbar.css"

const Totalbar = ({total}) => {
    return (
        <div className='globalbar'>
            <div className="barcontainer">
                <div
                    className="advancing"
                    style={{
                        width: 15 + total * 100 / 3000 + '%'
                    }}
                >
                    <p>{total} €</p>
                </div>
            </div>
            <div className="hours">
                <p>22h</p>
                <p>23h</p>
            </div>
        </div>
    );
};

export default Totalbar;
