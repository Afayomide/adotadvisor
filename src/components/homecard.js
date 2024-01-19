
function Card(props){
    const {icon,imgsrc,h3,text} = props
return(
    <div className="homecard">
        <div>
            <img src={imgsrc}/>
        </div>
        <div className="card-texts">
        <p className="home-ic">
        {icon}
        </p>
            <h3>{h3}</h3>
            <p>{text}</p>
        </div>
    </div>
)
}
export default Card