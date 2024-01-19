import { Link } from "react-router-dom"
import {BsTelephone} from "react-icons/bs"
import {BsPinMap} from "react-icons/bs"
import { BsWhatsapp } from "react-icons/bs"
import { BsInstagram } from "react-icons/bs"
import "./footer.css"
import Robot from "../../assets/robot.webp"


function Footer () {
    return(
    <footer>
    <section className="footer-first-section">
         <h2>
<img src={Robot} className="roboimg"/>
    ROBOADVISOR
     </h2>
     <ul>
    
     </ul>

     <div className="address ">
     <BsPinMap className="icon"/>
      <p>
      <br/>
         Lagos Ikeja<br/>
       no 24, Allen Road, shop Plaza <br/>
        Laogs State<br/>
      </p>
     </div>

     <div className="icons">     
     <div className="contacts-link">
        <BsTelephone className="icon"/>
        <a href="tel:+2348051539903">Telephone:+2348051539903</a>
     </div>
     <div className="contacts-link">
         <BsWhatsapp className="icon"/>
          <a href="https://wa.link/lwv983">WhatsApp:+2348051539903</a>
     </div>
     <div className="contacts-link">
        <BsInstagram className="icon"/>
         <a href="https://instagram.com/shoplahni">ROBOADVISOR</a>
     </div>

     </div>
     </section>
        
     <section className="second-section">
        <hr/>
        <p>
        © 2024 ROBO-Advisor. All rights reserved.<br/>
Reproduction, in whole or in part, is prohibited.
        </p>
     </section>   
     
    </footer>
    )                        
}

export default Footer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           