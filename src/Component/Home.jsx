import React, { useContext, useEffect, useState } from 'react'
import { myContext } from './MyContext'
import { IoSearchSharp } from "react-icons/io5";





const Home = () => {
  const { weather, isError, search, setSearch } = useContext(myContext);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [inputValue, setInputValue] = useState(search);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [hasError, setHasError] = useState(false);


  const currentDate = new Date();
  useEffect(() => {
    const updateTimeAndDate = () => {
      const currentDate = new Date();

      const date = currentDate.getDate();
      const day = currentDate.toLocaleString('en-US', { weekday: 'long' });
      const month = currentDate.toLocaleString('en-US', { month: 'long' });
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes().toString().padStart(2, '0');
      const second = currentDate.getSeconds().toString().padStart(2, '0');

      setFormattedDate(`${day}, ${month} ${date}, ${year}`);
      setFormattedTime(`${hour}:${minute}:${second}`);
    };

    updateTimeAndDate(); // Initial call to set date and time immediately
    const intervalId = setInterval(updateTimeAndDate, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
  
  if (weather.sys) {
    const sunriseDate = new Date(weather.sys.sunrise * 1000)
    const sunsetDate = new Date(weather.sys.sunset * 1000)

    setSunrise(sunsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setSunset(sunriseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }
}, [weather])
  
 const handleInput = (e) => {
  setInputValue(e.target.value);
  }

  const searchCity = () => {
    if (!navigator.onLine) {
      setHasError(true);
      return;
    }else{
   setSearch(inputValue);
   setHasError(false);
   setInputValue(' ');
  }
}

const weatherImages = {
  Clear: 'sky.png',
  Clouds: 'clouds.png',
  Haze: 'haze.png',
  Rain: 'heavy-rain.png',
  Snow: 'snow.png',
  Thunderstorm: 'thunderstorm.png',
  Drizzle: 'drizzle.png',
  Mist: 'mist.png',
  // Add more mappings as needed
};
const weatherVideos = {
  Clear: "clear.mp4.mp4",
  Haze: "haze.mp4.mp4",
  Cold: "cold.mp4.mp4",
  Clouds: "clouds.mp4.mp4",
  Rain: "rain.mp4.mp4",
  Thunderstorm: "thunderstorm.mp4.mp4",
  Snow: "snow.mp4.mp4",
  Smoke: "smoke.mp4.mp4",
  Mist: "mist.mp4.mp4",
  Fog: "fog.mp4.mp4",
  Drizzle: "drizzle.mp4.mp4",
  Tornado: "tornado.mp4",
  Hot: "hot.mp4.mp4",
};




const currentWeather = weather?.weather?.[0].main;
const weatherImage = weatherImages[currentWeather] || `default.png`;
const weatherVideo = weatherVideos[currentWeather] || `default.mp4`;  


  return (
    <>
           {!hasError ? (
             <div className='w-full h-screen flex flex-col gap-2 items-center justify-center md:w-full md:h-full sm:w-[100vw] sm:h-[750px] lg:w-full lg:h-full '>
             <div className='w-full h-screen flex sm:w-[100vw] sm:h-full md:w-full md:h-full sm:flex-col md:flex md:flex-col lg:flex-col md:items-center md:justify-center lg:w-full lg:h-full'>
               <div className='w-full h-screen flex flex-col md:flex sm:items-center bg-neutral-800  justify-between sm:w-[100vw] sm:h-[750px] md:w-full md:h-full md:items-center lg:flex lg:justify-center lg:items-center lg:w-full lg:h-full'>
                 <div className='w-full h-[150px] sm:flex sm:items-start sm:justify-center bg-neutral-800 z-10 bg-transparent sm:w-[100vw] md:w-full md:h-[150px] md:flex lg:w-full lg:flex lg:justify-center lg:items-center lg:h-[150px] '>
                  <div className='sm:flex sm:flex-col'>
                   {<p><span className='w-full h-[20px] text-[55px] sm:text-[45px] text-white relative lg:pl-16 top-6 sm:top-8 left-5 md:left-[80px] font-bold'>{weather.name}</span></p>}
                   {weather.sys ? (<p><span className='w-full h-[20px] text-[18px] text-white relative lg:pl-16 top-3 sm:top-6 left-[21px] md:left-[82px] font-normal'>{weather.sys.country}</span></p>) : null}
                   </div>
                   <div className='hidden w-full lg:w-full md:relative md:left-[120px] sm:w-[65%] md:w-[39%] md:h-[180px] sm:h-[140px] text-black sm:flex sm:flex-col sm:justify-center sm:items-center md:flex md:flex-col md:justify-center md:items-center lg:flex lg:flex-col lg:justify-center lg:items-center justify-center'>
                     <img className='hidden md:block lg:block sm:block w-[150px] h-[150px] sm:w-[85px] sm:h-[70px] md:h-[80px] lg:h-[70px] lg:w-[100px] md:w-[130px] invert object-cover' src={weatherImage} alt={currentWeather} />
                     {weather.main ? ( <p className='sm:h-[20px] lg:w-[20px]  text-white font-semibold text-[18px] md:text-[25px]'>
                      {weather.weather[0].main}
                      </p> ): null}
                   </div>
                 </div>
                 <div className='hidden  md:w-[80%] lg:w-[80%] sm:w-[78%] md:h-full sm:h-[40px] sm:mb-4 w-[95%] sm:flex sm:items-center rounded-3xl border-2 pr-2 md:flex lg:flex lg:items-center lg:mb-5 md:items-center md:justify-center '>
                     <input className='xl:hidden lg:w-full lg:block md:w-full sm:w-full sm:block bg-transparent w-[350px] outline-none text-white p-3 h-[40px]' onChange={handleInput} value={inputValue} type="text" />
                     <IoSearchSharp onClick={searchCity} className='text-white text-[27px] cursor-pointer md:block xl:hidden lg:block' />
                     </div>
                 <div className='w-full lg:w-full lg:h-[350px] h-[350px] md:w-[100vw] xl:w-full xl:h-[400px] md:h-[230px] sm:h-[230px]  bg-neutral-800 rounded-2xl flex justify-center sm:w-[100vw] md:relative md:top-5 xl:relative xl:top-0'>
                 <video className='w-[900px] xl:w-[690px] lg:w-full lg:relative xl:h-full xl:pl-5 h-full md:w-[90vw] md:h-[350px] sm:h-[250px] sm:w-full sm:relative  rounded-2xl xl:rounded-none absolute top-0' src={weatherVideo} muted autoPlay loop></video>
                 </div>
                 <div className='w-full h-[150px] xl:h-[165px] lg:w-[97%] md:w-[95%] md:pr-20 sm:w-full  flex justify-between items-start sm:items-start lg:absolute lg:top-[465px]'>
                   <p className='w-full h-full md:w-full md:h-full flex flex-col sm:w-[90%] xl:gap-0 lg:gap-6 gap-8 items-start'>
                     <span className='w-full h-[20px] text-[40px] sm:leading-none sm:text-[30px] text-white relative top-7 xl:top-0 lg:top-0 left-5 font-normal '>
                     {formattedTime}
                     </span>
                     <span className='w-full h-[20px] sm:w-full md:w-full sm:leading-none sm:text-[25px] sm:h-full text-[35px] text-white relative top-7 lg:top-0 sm:top-4 left-5 font-semibold '>
                     {formattedDate}
                     </span>
                   </p>
                   <p className='sm:w-[30px] sm:flex sm:justify-between sm:pr-[100px] md:pr-0 ' >
                     <span className='w-full h-[20px] md:pr-0 pr-14 text-[40px] sm:pr-4 sm:leading-none sm:text-[30px] text-white relative top-7 md:top-[75px] xl:top-0 lg:top-8 left-5 font-semibold'>
                       {weather.main && typeof weather.main.temp === 'number'
                         ? Math.round(weather.main.temp)
                         : 'N/A'}°C
                     </span>
                   </p>
                 </div>
               </div>
               <div className='w-[650px] sm:w-full sm:h-full md:w-full md:h-full h-full flex flex-col items-center  justify-between bg-neutral-800 lg:w-full lg:h-full'>
                 <div className='h-[500px] lg:h-[360px] lg:pt-[80px] w-full  text-white flex flex-col items-center justify-around ' >
                   <div className='w-full h-[100px] md:hidden sm:hidden lg:hidden md:w-full md:h-full flex items-center justify-center pt-4 '>
                 <div className='w-[90%] md:w-[60%] md:hidden lg:hidden sm:hidden rounded-3xl flex items-center justify-center border-2 pr-3' >
                     <input className='bg-transparent w-[350px] outline-none text-white p-3 h-[40px]' onChange={handleInput} value={inputValue} type="text" />
                     <IoSearchSharp onClick={searchCity} className='text-white text-[27px] cursor-pointer' />
                     </div>
                 </div>    
                   <div className='w-full h-[200px] xl:h-[165px] md:h-[465px]  text-black flex flex-col items-center sm:justify-end justify-center md:justify-end xl:items-center'>
                     <img className='w-[150px] h-[150px] sm:h-[100px] xl:h-[90px] invert object-cover ' src={weatherImage} alt={currentWeather} />
                     {weather.main ? ( <p className='text-white font-semibold text-[25px]' >{weather.weather[0].main}</p> ): null}
                   </div>
                   <div className='w-full h-[150px] xl:h-[125px] sm:h-[145px] md:w-[95%]  flex items-center xl:items-start justify-around pb-4'>
                       <div className='w-full h-[50px]'>
                         <p className='w-full h-full flex flex-col items-center  font-semibold' >
                           <img src="sunrise.png" alt="sunrise.png" className='h-[60px] w-[60px]' />
                           {sunrise}<span>sunrise</span>
                         </p></div>
                       <div className='w-full h-[50px]'>
                         <p className='w-full h-full flex flex-col items-center font-semibold' >
                         <img src="sunset.png" alt="sunset.png" />
                         {sunset}<span>sunset</span>
                         </p></div>
                   </div>
                 </div>
                 {weather.main ? (
                   <div className='w-full h-[500px] lg:h-[285px] md:h-[240px] sm:h-[235px] md:w-[75%] flex flex-col justify-center items-end sm:justify-center pb-0'>
                     <div className='flex flex-col justify-center gap-2 xl:gap-0 tracking-wide items-center sm:justify-end text-white   w-full  h-[80%] sm:h-[65%]'>
                     <p className='w-[75%] flex justify-around  text-[21px] '><b className='w-full flex justify-between items-center'>Humidity:</b><span className=' h-[20px] font-semibold tracking-wider'>{weather.main.humidity}%</span></p>
                     <p className='w-[75%] flex justify-around  text-[21px] '><b className='w-full flex justify-between items-center'>Wind Speed:</b> <span className=' h-[20px] font-semibold tracking-wider '>{weather.wind.speed}km/h</span></p>
                     <p className='w-[75%] flex justify-around  text-[21px] '><b className='w-full flex justify-between items-center'>Feels Like:</b>  <span className=' h-[20px] font-semibold tracking-wider '>{weather.main.feels_like}°C </span> </p>
                     <p className='w-[75%] flex justify-around  text-[21px] '><b className='w-full flex justify-between items-center'>Max Temp:</b>    <span className=' h-[20px] font-semibold tracking-wider '>{weather.main.temp_max}°C</span></p>
                     </div>
                   </div>
                 ) : (
                   <p>No weather data available.</p>
                 )}
               </div>
             </div>
           </div> 
      ) : (
        <p>Error: Unable to fetch data</p>
      )}

    </>
  )
}

export default Home