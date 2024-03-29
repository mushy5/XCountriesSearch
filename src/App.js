import './App.css';
import {useState, useEffect} from 'react';


function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [query, setQuery] = useState('');

  const fetchCountries = async ()=>{
    try{
      let response = await fetch('https://restcountries.com/v3.1/all');
      let data = await response.json();
      
      setCountries(data);
      setFilteredCountries(data);
    }catch(err){
      console.log(err);
    }
  }

  const handleChange = (e)=>{
    setQuery(e.target.value);
    const query = e.target.value.toLowerCase(); // Get the query in lowercase
  

  // Filter countries based on the query
  const filtered = countries.filter((country) => {
    const name = country.name.common.toLowerCase();
    return name.startsWith(query) || name.includes(query);
  });

  // Update the filtered countries
  setFilteredCountries(filtered);

  }
  useEffect(()=>{fetchCountries() },[]);

  return (
    <div className="App">
     <input type='text' placeholder='Search for countries...' className='searchbox' value={query} onChange={handleChange}/>
     <div className='allFlags'>
      {filteredCountries.map((country)=>{
        return <div key={country.cca2} className='countryCard'>
          <img src={country.flags.png} alt={country.flags.alt} className='countryImg'/>
          <h2>{country.name.common}</h2>
        </div>
      })}
     </div>
    </div>
  );
}

export default App;
