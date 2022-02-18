import React from 'react'
import './WorldStats.css'
export default function WorldStats(props) {
    return (
        <div className='worldStats-box'>
            <h1 className='totalNumbers'>{props.total}</h1>
            <p className='about'>{props.about}</p>
            {props.new ? <p className='today'>Today: {props.new}</p> : null}
        </div>
    )
}
