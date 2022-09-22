import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { getWeather } from '../features/weather/weatherSlice'

function SearchBar() {
  const [searchRegion, setSearchRegion] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchRegion) {
      fetch(
        `https://api.weatherapi.com/v1/search.json?key=3f26bfeb5b2349c692874026222109&q=${searchRegion}`
      )
        .then(function (response) {
          return response.json()
        })
        .then(function (payload) {
          setSearchResults(payload)
        })
    }
  }, [searchRegion])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(getWeather(searchRegion))
    setSearchRegion('')
  }

  const searchResultClick = (region) => {
    dispatch(getWeather(region))
    setSearchRegion(region)
    setSearchResults([])
  }

  return (
    <form onSubmit={onSubmit} className="searchBar">
      <input
        type="text"
        placeholder="Another Location"
        value={searchRegion}
        onChange={(e) => setSearchRegion(e.target.value)}
      />
      <button title="Search..." type="submit">
        <FiSearch />
      </button>
      <ul className="results">
        {searchResults &&
          searchRegion !== '' &&
          searchResults?.map((item) => (
            <li key={item.id} onClick={() => searchResultClick(item.name)}>
              {item.name}, {item.country}
            </li>
          ))}
      </ul>
    </form>
  )
}

export default SearchBar
