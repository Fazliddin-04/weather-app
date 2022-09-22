import React, { useEffect, useState } from 'react';
import { BsCloudMoon, BsCloudRain, BsClouds, BsCloudSun, BsMoonStars, BsSun } from 'react-icons/bs'
import { getWeather, reset } from './features/weather/weatherSlice';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './components/SearchBar';

const images = {
  sunny:
    'https://images.unsplash.com/photo-1604506040301-99ce9b3c8467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1886&q=80',
  sunnyAfternoon:
    'https://images.unsplash.com/uploads/1411400493228e06a6315/ad711a20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  clear:
    'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80',
  cloudyDay:
    'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  cloudyNight:
    'https://images.unsplash.com/photo-1589763472885-46dd5b282f52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
  cloudyEvening:
    'https://images.unsplash.com/photo-1556912672-78d3869a6374?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  partlyCloudyDay:
    'https://images.unsplash.com/photo-1650977229123-93fcbb88b239?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  partlyCloudyNight:
    'https://images.unsplash.com/photo-1589763472885-46dd5b282f52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
  partlyCloudyEvening:
    'https://images.unsplash.com/photo-1556912672-78d3869a6374?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  partlyCloudyAfternoon:
    'https://images.unsplash.com/photo-1618534522314-e7835da3d566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  lightRainyDay:
    'https://images.unsplash.com/photo-1496034663057-6245f11be793?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  lightRainyNight:
    'https://images.unsplash.com/photo-1536424868245-13b715e11e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  lightRainyEvening:
    'https://images.unsplash.com/photo-1654325487620-1b73dbe4b37b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

}
function App() {
  const [condition, setCondition] = useState('')
  const [region, setRegion] = useState(null)

  // Getting location from IP address
  useEffect(() => {
    fetch('https://api.ipregistry.co/?key=d5bzqw8y8xkovuy2')
      .then(function (response) {
        return response?.json();
      })
      .then(function (payload) {
        setRegion(payload.location?.city);
      });
  }, [])

  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const { location, current, isLoading, isSuccess, isError, message } = useSelector(state => state.weather)


  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getWeather(region))
  }, [dispatch, region])

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message])

  useEffect(() => {
    if (current.condition?.text) {
      for (const key in images) {
        if (Object.hasOwnProperty.call(images, key)) {
          // Cloudy
          current.condition?.text.toLowerCase() === 'overcast' ?
            new Date(location.localtime).getHours() > 7 && new Date(location.localtime).getHours() < 13 ?
              setCondition('cloudyDay') : new Date(location.localtime).getHours() >= 13 && new Date(location.localtime).getHours() < 18 ?
                setCondition('cloudyAfternoon') : new Date(location.localtime).getHours() >= 18 && new Date(location.localtime).getHours() < 20 ?
                  setCondition('cloudyEvening') : setCondition('cloudyNight')
            :
            // Partly Cloudy
            current.condition?.text.toLowerCase() === 'partly cloudy' ?
              new Date(location.localtime).getHours() > 7 && new Date(location.localtime).getHours() < 13 ?
                setCondition('partlyCloudyDay') : new Date(location.localtime).getHours() >= 13 && new Date(location.localtime).getHours() < 18 ?
                  setCondition('partlyCloudyAfternoon') : new Date(location.localtime).getHours() >= 18 && new Date(location.localtime).getHours() < 20 ?
                    setCondition('partlyCloudyEvening') : setCondition('partlyCloudyNight')
              :
              // Light Rain
              current.condition?.text.toLowerCase() === 'light rain' ?
                new Date(location.localtime).getHours() > 7 && new Date(location.localtime).getHours() < 13 ?
                  setCondition('lightRainyDay') : new Date(location.localtime).getHours() >= 18 && new Date(location.localtime).getHours() < 20 ?
                    setCondition('lightRainyEvening') : setCondition('lightRainyNight')
                :
                // Clear or Sunny
                current.condition?.text.toLowerCase() === 'clear' ?
                  new Date(location.localtime).getHours() > 0 && new Date(location.localtime).getHours() < 14 ?
                    setCondition('sunny') : setCondition('sunnyAfternoon') : key === current.condition?.text.toLowerCase() ?
                    setCondition(key) : setCondition(current.condition?.text.toLowerCase())

        }
      }
    }
  }, [current, location, condition])

  return (
    <div className="App" >
      <div className='main' style={{ backgroundImage: `url(${images[condition]})` }}>
        <p className="logo">
          Weather App
        </p>
        <div className="main-info">
          <h1 className="tempreture">
            {current.temp_c}°
          </h1>
          <div className='main-details'>
            <div>
              <h2 className="location">{location.name}</h2>
              <p>{(new Date(location.localtime).getHours() < 10 ? '0' + new Date(location.localtime).getHours() : new Date(location.localtime).getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())} - {new Date(location.localtime).toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', year: '2-digit', month: 'short', })}</p>
            </div>
            <div>
              <div className="icons">
                {condition === 'sunny' ? <BsSun /> :
                  condition === 'partlyCloudyDay' || condition === 'partlyCloudyAfternoon'  ? <BsCloudSun /> :
                    condition === 'partlyCloudyNight' ? <BsCloudMoon /> :
                      condition === 'clear' ? <BsMoonStars /> :
                        condition === 'sunny' ? <BsSun /> :
                          (condition === 'cloudyDay') || (condition === 'cloudyNight') || (condition === 'cloudyEvening') ? <BsClouds /> :
                            <BsCloudRain />}</div>
              <p>{current.condition?.text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        <SearchBar />
        <div>
          <ul className='menu-regions'>
            <li className='hoverable' onClick={() => setRegion('Andijon')}>
              Andijon
            </li>
            <li className='hoverable' onClick={() => setRegion('Buxoro')}>
              Buxoro
            </li>
            <li className='hoverable' onClick={() => setRegion('Fergana')}>
              Fergana
            </li>
            <li className='hoverable' onClick={() => setRegion('Jizzax')}>
              Jizzax
            </li>
            <li className='hoverable' onClick={() => setRegion('Namangan')}>
              Namangan
            </li>
            <li className='hoverable' onClick={() => setRegion('Navoiy')}>
              Navoiy
            </li>
            <li className='hoverable' onClick={() => setRegion('Nukus')}>
              Nukus
            </li>
            <li className='hoverable' onClick={() => setRegion('Qarshi')}>
              Qarshi
            </li>
            <li className='hoverable' onClick={() => setRegion('Samarqand')}>
              Samarqand
            </li>
            <li className='hoverable' onClick={() => setRegion('Guliston')}>
              Guliston
            </li>
            <li className='hoverable' onClick={() => setRegion('Termez')}>
              Termez
            </li>
            <li className='hoverable' onClick={() => setRegion('Tashkent')}>
              Tashkent
            </li>
            <li className='hoverable' onClick={() => setRegion('Urganch')}>
              Urganch
            </li>
          </ul>
        </div>
        <div>
          <h4>Weather Details</h4>
          <ul className='details'>
            <li><p>Cloudy</p><div>{current.cloud}%</div></li>
            <li><p>Humidity</p><div>{current.humidity}%</div></li>
            <li><p>Wind</p><div>{current.wind_kph} km/h</div></li>
            <li><p>Rain</p><div>{current.precip_mm} mm</div></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
