import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Countries.css'
import ArraySort from 'array-sort'
import NumberFormat from 'react-number-format'

import HeadingNames from '../../components/HeadingNames/HeadingNames'
import CountryDetails from '../../components/CountryDetails/CountryDetails'

function Countries() {
    const [state, setState] = useState({
        countryDetails: [],
        selectedData: []
    })
    

    useEffect(() => {
        const fetch = async () => {
        const Data = await axios.get("https://disease.sh/v3/covid-19/countries");

        
        let countryDetails = Data.data
        
        countryDetails = ArraySort(countryDetails, 'cases', {reverse: true})
        
        setState({
            countryDetails: countryDetails, status: true, selectedData: countryDetails
        })
    }
        fetch();
    }, [])
    

    const changeSortValue = e =>{
        const value = e.target.value
        let sortByReverse = true;
        if(value === "Highest"){
            sortByReverse = true;
        }else{
            sortByReverse = false;
        }
        let selectedData = ArraySort(state.selectedData, "cases", {reverse: sortByReverse})
        setState({
            countryDetails: state.countryDetails, status: true, selectedData: selectedData
        })
    }

    const searchCountry = e =>{
        const value = e.target.value
        
        const CountryDetails = state.countryDetails

        

        if(value !== ""){

            const FindSpecificCountry = CountryDetails.filter(country => country.country.toLowerCase().includes(value.toLowerCase()))

            let sorted = ArraySort(FindSpecificCountry, 'cases', {reverse: true})
            setState({countryDetails: CountryDetails, status: true, selectedData: sorted})
        }else{
            setState({countryDetails: CountryDetails, status: true, selectedData: CountryDetails})
        }
    }
    
    return (
        <div className='countries-stats'>
            <h2 className='countries-stats-heading'>Countries Stats</h2>
            <div className="Filtering">
                <input type="text" placeholder='search country name...' onChange={searchCountry}/>
                <select className='sort-by' onChange={changeSortValue}>
                    <option>Highest</option>
                    <option>Lowest</option>
                </select>
            </div>
            <HeadingNames/>
            
            {state.selectedData.length > 0 ? 
            state.selectedData.map( (country) => (
            <CountryDetails
                key={country.countryInfo._id}
                Country={country.country}
                countryCode={country.countryInfo.iso2}
                totalCases={<NumberFormat value={country.cases} thousandSeparator={true} displayType='text' />}
                newCases={<NumberFormat value={country.todayCases} thousandSeparator={true} displayType='text' />}
                totalDeaths={<NumberFormat value={country.deaths} thousandSeparator={true} displayType='text' />}
                newDeaths={<NumberFormat value={country.todayDeaths} thousandSeparator={true} displayType='text' />}
                totalRecovered={<NumberFormat value={country.recovered} thousandSeparator={true} displayType='text' />}
                newRecovered={<NumberFormat value={country.todayRecovered} thousandSeparator={true} displayType='text' />}
            />
            ))
            : null}
        </div>
    )
}

export default Countries
