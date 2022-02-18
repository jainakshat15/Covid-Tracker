import './CountryDetails.css'
import ReactCountryFlag from 'react-country-flag'
import React from 'react'

function CountryDetails(props) {
    return (
        <>
        <h5>{props.Country}</h5>
        <div className='countryDetails'>
            <div className="country-icon">    
                <ReactCountryFlag
                    className="country-flag"
                    countryCode={props.countryCode}
                    svg
                    style={{
                        width: '3.2em',
                        height: '3.2em',
                    }}
                    title={props.countryCode}
                />
               
            </div>
            
                <div >
                    <h4>{props.totalCases}</h4>
                    <p className='yesterday'>Today: <strong>{props.newCases}</strong></p>
                </div>
                <div >
                    <h4>{props.totalDeaths}</h4>
                    <p className='yesterday'>Today: <strong>{props.newDeaths}</strong></p>
                </div>
                <div>
                    <h4>{props.totalRecovered}</h4>
                    <p className='yesterday'>Today: <strong>{props.newRecovered}</strong></p>
                </div>
            
        </div>
        
        </>
    )
}

export default CountryDetails
