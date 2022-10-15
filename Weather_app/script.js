const API_KEY ='440f8e07876056047055a662b864e6d1';


document.getElementById("search").addEventListener("click", myfun)

function myfun(){
    let city = document.getElementById("city").value;
    console.log("here")
    console.log(city)
    displayitems(city)
}

async function displayitems(city){
     
         
             

    try{
       var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

       var res = await fetch(url);

       var data_1 = await res.json()
       var latitude = data_1.coord.lat
       var longitude = data_1.coord.lon
     //  console.log(lat)
        console.log(data_1)

        getWeatherData(latitude, longitude)
       
       
    }
    catch(err){
        console.log("error")
       
    }
 document.getElementById("dis1").innerHTML = `<div class="mapouter"><div class="gmap_canvas">
 <iframe width="250%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
 <a href="https://www.whatismyip-address.com/divi-discount/"></a><br>
 <a href="https://www.embedgooglemap.net"></a></div></div>`    
}


displayitems(city)


const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current_items');
 
const weatherForecastEl = document.getElementById('weather_upcoming');
const currentTempEl = document.getElementById('current-temp');



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


//getWeatherData(latitude, longitude)
function getWeatherData(latitude, longitude){
  //  navigator.geolocation.getCurrentPosition((success) => {

      //  let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

   // })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
 

    currentWeatherItemsEl.innerHTML = 
    `<div class="item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
  <div class="item">
         <div>Sunrise</div>
         <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
     </div>
     <div class="item">
         <div>Sunset</div>
         <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
     </div>
     `;

   
     let otherDayForcast = ''
     data.daily.forEach((day, idx) => {
         if(idx == 0){
              currentTempEl.innerHTML = `
              <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
             <div class="other">
                 <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                  <div class="temp">Night - ${day.temp.night}&#176;C</div>
                  <div class="temp">Day - ${day.temp.day}&#176;C</div>
              </div>
             
              `
         }else{
             otherDayForcast += `
             <div class="weather_upcoming-items">
                 <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                 <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                 <div class="temp">Night - ${day.temp.night}&#176;C</div>
                 <div class="temp">Day - ${day.temp.day}&#176;C</div>
             </div>
             
             `
         }
     })
 
 
     weatherForecastEl.innerHTML = otherDayForcast;
 } 

  
