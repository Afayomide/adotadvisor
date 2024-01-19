import React, { useState } from 'react';
import axios from 'axios';
import "./tolerance.css"
import profile from "../../assets/profile.png"

function Tolerance () {
    
  const [level, setLevel] = useState('');
  const [resultData, setResultData] = useState(null);


  const handleSearch = async () => {
    try {
      // Replace with your server URL and API endpoint
      const serverUrl = 'http://localhost:3001/api/search';
      
      const response = await axios.post(serverUrl, { level });

      // Update the state with the result data
      setResultData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const changeLevel = (event) => {
      setLevel(event.target.value)
  }
    return(
<div>

<div className='search-form'>
<form>
<div>
     <label className='search-label' for="range">
            Please enter your risk tolerance level
            </label> 
</div>
          
            {/* <input
             type='range'
             onChange={changeLevel}
              min="0"
               max="10"
               value={level}></input> */}
               <input type='num'
               onChange={changeLevel}
               min= "0"
               max= "10"
               value={level}/>
        </form>
               <button onClick={handleSearch}>submit</button>
</div>

        {resultData && (
        <div className='search-result-container'>
          <h3>Search Results:</h3>
          <img className="profile-img" src={profile}/>
            {resultData.map((item) => (
              <div key={item._id}>

              <div className='search-result'>
              <p>
              Risk Score
              </p>
              <p>
              {item.RiskScore}
              </p>
              </div>


              <div className='search-result'> 
              <p>Nigerian Stocks=</p>
              <p>{item.nigerianStocks}</p>
              </div>

              <div className='search-result'> 
              <p>Foreign Stocks=</p>
              <p>{item.foreignStocks}</p>
              </div>

              <div className='search-result'> 
              <p>Tech Stocks=</p>
              <p>{item.techStocks}</p>
              </div>

              <div className='search-result'> 
              <p>Emerging Stocks=</p>
              <p>{item.emergingStocks}</p>
              </div>

              <div className='search-result'> 
              <p>Nigerian Bonds=</p>
              <p>{item.nigerianBonds}</p>
              </div>

              <div className='search-result'> 
              <p>Foreign Bonds=</p>
              <p>{item.foreignBonds}</p>
              </div>

              <div className='search-result'> 
              <p>Commodities=</p>
              <p>{item.commodities}</p>
              </div>

              <div className='search-result'> 
              <p>Real Estate=</p>
              <p>{item.realEstate}</p>
              </div>

              <div className='search-result'> 
              <p>T-Bills=</p>
              <p>{item.tBills}</p>
              </div>

              <div className='search-result'> 
              <p>Alternative=</p>
              <p>{item.Alternative}</p>
              </div>
              
              

              
           </div>
            ))}
        </div>
      )}
</div>
    )
}

export default Tolerance