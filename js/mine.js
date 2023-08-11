let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

search("cairo")

async function search(city) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=654be396dc484f1fac6231322230908&q=${city}&days=3`);
    if (t.ok && 400 != t.status) {
        let city = await t.json();
       
        displayCurrent(city.location, city.current),
        displayAnother(city.forecast.forecastday)
    }
    
}

document.getElementById("search").addEventListener("keyup", city=>{
    search(city.target.value)
}
);






function displayCurrent(city, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "t"));
   
        let n=`<div class="today forecast">
        <div class="forecast-header" id="today">
        <div class="day float-end">${days[e.getDay()]}</div>
        <div class=" date float-start">${e.getDate() + monthNames[e.getMonth()]}</div>
        <div class="clear-fix"></div>
        </div> 
        <div class="forecast-content" id="current">
    <div class="location">${city.name}</div>
    <div class="degree ">
        <div class="num ">${t.temp_c}<sup>o</sup>C</div>
      
        <div class="forecast-icon">
            <img src="https:${t.condition.icon}" alt="" width="90">
        </div>	
    <div class="clear-fix"></div>
    </div>
    <div class="custom">${t.condition.text}</div>
    <span><img src="img/icon-umberella.png" alt="">20%</span>
								<span><img src="img/icon-wind.png" alt="">18km/h</span>
								<span><img src="img/icon-compass.png" alt="">East</span>
    </div>
     </div>
	`
        document.getElementById("forecast").innerHTML = n
    }
}




function displayAnother(city) {
    let t = "";
    for (let e = 1; e < city.length; e++)
        t +=`
        <div class="forecast bg-bla">
        <div class="forecast-header ">
            <div class="day">${days[new Date(city[e].date.replace(" ", "T")).getDay()]}</div>
        </div> 
        <div class="forecast-content bg-bla">
        <div class="forecast-icon">
            <img src="https:${city[e].day.condition.icon}"  width="48">
        </div>
        <div class="degree">${city[e].day.maxtemp_c}<sup>o</sup>C</div>
        <small>${city[e].day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${city[e].day.condition.text}</div>
    </div>
    </div>	
  `
    document.getElementById("forecast").innerHTML += t
}
search("");
