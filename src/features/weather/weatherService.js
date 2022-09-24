import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`

// Get user weather
const getWeather = async (location) => {
  const response = await axios.get(`${BASE_URL}/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`)

  return response.data
}


const weatherService = {
 getWeather,
}

export default weatherService