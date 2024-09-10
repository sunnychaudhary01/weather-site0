import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';

export const myContext = React.createContext();

const MyContext = ({children}) => {
  const [weather, setWeather] = useState([]);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);




  const API_key = "01b6d8fae19acf5a476e47eefc596630";

  useEffect(() => {
    // Function to get coordinates
    const getCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsError(error)
        }
      );
    };

    getCoordinates();
  }, [latitude, longitude]);


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let API_URL;
        if (search) {
          API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`;
        } else if (latitude && longitude) {
          API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`;
        } else {
          console.error('Search or coordinates are required to fetch weather data.');
          return;
        }

        const response = await axios.get(API_URL);
        const weatherData = response.data;
        console.log(response.data)


        setWeather(weatherData);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [search, latitude, longitude]); // Dependency array

  return (
    <myContext.Provider value={{ weather, isError, search, setSearch }}>
      {children}
      <Home />
    </myContext.Provider>
  );
};

export default MyContext;
