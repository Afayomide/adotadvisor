import { useState, useEffect } from "react";
import axios from "axios";
import "./table.css"


function Table () {
    const [datas, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);


    useEffect(() => {
        // Fetch all blog posts
        axios.get('https://adotadvisor-u4zq.vercel.app/api/instruments')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
    return(
        <div className='api-container'> 
        <div className="table-header">
            Instruments Weight, Adds Up To 100%(from mongoDB)
        </div>
        {loading ?    (
          <div className="loader-container">
          <div className="spinner"></div>
      </div>) : (                     
  <div className='table-container'>
        <table>
    <tbody>
  <tr>
  <th>
    RiskScore/Toler
  </th>
    <th>
    Nigerian Stocks
    </th>
    <th>
      Foreign Stocks
    </th>
    <th>
      Tech Stocks
    </th>
    <th>
      Emergin Stocks
    </th>
    <th>
      Nigerian Bonds
    </th>
    <th>
        Foreign Bonds
    </th>
    <th>
        Commodities
    </th>
    <th>
        Real Estate
    </th>
    <th>
        T-Bills
    </th>
    <th>
        Alternative
    </th>
  </tr>
            {datas.map(data => (  
              <tr key={data._id}>
              <th>
                {data.RiskScore}
              </th>
              <th>
                {data.nigerianStocks}
              </th>
              <th>
                {data.foreignStocks}
              </th>
              <th>
                {data.techStocks}
              </th>
              
              <th>
                {data.emergingStocks}
              </th> 
              <th>
                {data.nigerianBonds}
              </th>
              <th>
                {data.foreignBonds}
              </th>
              <th>
                {data.commodities}
              </th>
              <th>
                {data.realEstate}
              </th>
              <th>
                {data.tBills}
              </th>
              <th>
                {data.Alternative}
              </th>
              </tr>            
            ))}   
           </tbody>
          </table>
        </div>
        )}
        </div>
    )
}

export default Table