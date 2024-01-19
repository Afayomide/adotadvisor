import robot2 from "../assets/robot2.webp"
import HomeData from "./homedata"
import Card from "./homecard"
import Table from "./user/table"

function Home() {
return(
<div className="home-container">

<div className="first-section">
<div className="about">
     <h3>
        providing <span className="highlight">tested</span> and <br/><span className="highlight">approved</span> advise with<br/> our world leading technology. 
    </h3>
    <div>
        <img className="home-robot" src={robot2}/>
    </div>
</div>
   <div className="home-buttons">
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
   </div>
   </div>
   <Table/>

<div className="homecard-container">
    {HomeData.map(Card)}
</div>
</div>
)
}

export default Home