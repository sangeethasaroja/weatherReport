import { useEffect, useRef, useState } from "react";

const WeatherReport = () => {
    let[report,setreport]=useState(null);
	let[pending,setpending]=useState(false);
	let place=useRef();
	let weather=()=>{
		setpending(true);
			setTimeout(()=>{
				const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${place.current.value}&language=en`;
				const options = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': 'a5d63ba27fmshdfd6c3ff4c29cb3p1810c9jsnc2d38487baf9',
						'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
					}
				};
				fetch(url,options)
				.then((res)=>{return res.json()})
				.then((data)=>{ console.log(data[0].country);console.log(data); 
	
					let url1 =`https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${data[0].lat}&lon=${data[0].lon}&timezone=auto&language=en&units=auto`;
				const options1 = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': 'a5d63ba27fmshdfd6c3ff4c29cb3p1810c9jsnc2d38487baf9',
						'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
					}
				};
				fetch(url1,options1)
				.then((res)=>{return res.json()})
				.then((dat)=>{console.log(dat); setreport(dat); setpending(false)})
				})
				
			},500)
	}

    return ( 
        <div className="body">
			<section>
				<h1>CURRENT WEATHER REPORT</h1>
			<input type="text" placeholder="set location" ref={place} />
			<button onClick={weather}>click</button>
			</section>
			{report==null&&pending&&<h1 className="pending">lodaing.... please wait</h1>}
            {report && <div className="info">
			<div>{report.current.temperature>30?<i class='bx bxs-sun bx-burst bx-rotate-180' ></i>:<i class='bx bxs-cloud-rain'   ></i>}</div>
			<h1>Weather Report on {place.current.value}</h1>
			{/* <h2>{country&& country.map((m)=>{return(<h2>Country:{m.country}
			
			<h2> lat:  {report.lat} </h2> 
			<h2>lon:	{report.lon} </h2>
			<h2>summary:	{report.current.summary}</h2>
			<h2>temperature:	{report.current.temperature}</h2>
			<h2>wind speed:{report.current.wind.speed}</h2>
		    <h2>wind direction:		{report.current.wind.dir}</h2>
			</h2>)})}</h2> */}
		
		
			<h2> lat:  {report.lat} </h2> 
			<h2>lon:	{report.lon} </h2>
			<h2>summary:	{report.current.summary}</h2>
			<h2>temperature:	{report.current.temperature}</h2>
			<h2>wind speed:{report.current.wind.speed}</h2>
		    <h2>wind direction:		{report.current.wind.dir}</h2>
			</div>}
        </div>
     );
}
 
export default WeatherReport;