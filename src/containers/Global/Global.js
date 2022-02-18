import './Global.css'
import React,{useEffect, useState} from 'react'
import WorldStats from '../../components/WorldStats/WorldStats'
import axios from 'axios'
import NumberFormat from 'react-number-format'

export const Global = () => {

    const [state, setState]= useState({
        result:{
            "TotalConfirmed": 0,
            "TodayCases": 0,
            "TotalDeaths": 0,
            "TodayDeaths": 0,
            "TotalRecovered": 0,
            "TodayRecovered": 0,
            "ActiveCase": 0,
        }})
    
    useEffect(() => {
        const fetch = async () => {
 
        var global = await axios.get("https://disease.sh/v3/covid-19/all");
       
        let data = global.data
        setState({
            result:{
                "TotalConfirmed": <NumberFormat value={data.cases} thousandSeparator={true} displayType='text' /> ,
                "TotalDeaths": <NumberFormat value={data.deaths} thousandSeparator={true} displayType='text' />,
                "TotalRecovered": <NumberFormat value={data.recovered} thousandSeparator={true} displayType='text' />,
                "ActiveCase": <NumberFormat value={data.active} thousandSeparator={true} displayType='text' />,
                "TodayCases": <NumberFormat value={data.todayCases} thousandSeparator={true} displayType='text' /> ,
                "TodayDeaths": <NumberFormat value={data.todayDeaths} thousandSeparator={true} displayType='text' />,
                "TodayRecovered": <NumberFormat value={data.todayRecovered} thousandSeparator={true} displayType='text' />,
            }
        })
    
    }
        fetch();
    }, [])

    return (
        <div className="Global">
            <div className="c1">
            <h1 className='heading'>Covid-19 Tracker</h1>
            <p className='description'>Information About Covid-19</p>
            </div>
            

            <div className="world-stats">
                <WorldStats
                    key="1"
                    about="Total Cases"
                    total={state.result.TotalConfirmed}
                    new={state.result.TodayCases}/>
                    
                <WorldStats
                    key="2"
                    about="Total Deaths"
                    total={state.result.TotalDeaths}
                    new={state.result.TodayDeaths}/>
                   
                <WorldStats
                    key="3"
                    about="Total Recovered"
                    total={state.result.TotalRecovered}
                    new={state.result.TodayRecovered}/>
                    
                <WorldStats
                    key="4"
                    about="Active Cases"
                    total={state.result.ActiveCase}/>
            </div>
        </div>
    )
}
