const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const date = document.getElementById("dt");
const mnth = document.getElementById("mth");
const year = document.getElementById("yr");
const cityname = document.getElementById("city");
const temprch = document.getElementById("temp");
const srch = document.getElementById("srch");
const srch_btn = document.getElementById("srchbtn");
const main = document.getElementById("main");
const tempmax = document.getElementById("temp-max");
const tempmin = document.getElementById("temp-min");
const winspd = document.getElementById("wind");
const srise = document.getElementById("srise");
const sset = document.getElementById("sset");
const humm = document.getElementById("humm");
const lsrch = document.getElementById("lsrch");
const desc = document.getElementById("desc");
const cross = document.querySelector(".cross");


//https://api.openweathermap.org/data/2.5/weather?q=buxar&appid=97e86babb8b966a4413e10efc66c29bd


async function check_weather(city){
    const API_KEY = `97e86babb8b966a4413e10efc66c29bd`;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    console.log(URL);
    console.log(API_KEY);

   const response = await fetch(URL);
   const data = await response.json();

   if( data.cod == 200){
    document.querySelector(".container").classList.add('showdata');
    cityname.innerHTML = `${data.name}`;
    temprch.innerHTML= `${Math.round(data.main.temp-273.15)}°C`;
    tempmax.innerHTML= `${Math.round(data.main.temp_max-273.15)}°C`;
    tempmin.innerHTML= `${Math.round(data.main.temp_min-273.15)}°C`;
    humm.innerHTML= `${data.main.humidity}%`;
    winspd.innerHTML= `${data.wind.speed} km/h`;
    desc.innerHTML = `${data.weather[0].description}`;
    // srise.innerHTML = `${Date('h:i:sa',data.sys.sunrise)}`;
    // sset.innerHTML = `${Date("h:i:sa",data.sys.sunset)}`;
    // console.log(data.sys.sunrise);


}
else if(data.cod == 404){
        document.querySelector(".elif").classList.add('showerror');
        document.querySelector(".container").classList.remove('showdata');
        console.log("error");
    cross.addEventListener('click',() =>{
        document.querySelector(".elif").classList.remove('showerror');

    });
}
else if(data.cod == 400){
    console.log("error empty");
}
else{
    console.log("please check your conection");
}

}
srch_btn.addEventListener('click', () =>{
    var data = srch.value;
    console.log(data);
    check_weather(data);
});
setInterval(() => {
    let time = new Date();
        date.innerHTML = time.getDate(); 
        mnth.innerHTML = time.getMonth();       
        year.innerHTML = time.getYear();       
        hrs.innerHTML = time.getHours();
        min.innerHTML = time.getMinutes();
        sec.innerHTML = time.getSeconds();

},1000);



   





lsrch.addEventListener('click', async()=>{

    async function getData(lat,lon){
        const API_KEY = `97e86babb8b966a4413e10efc66c29bd`;
        const loc_url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        console.log("locationed searched !!!!");
        const response = await fetch(loc_url);
        return await response.json();
        
    }
    
    async function gotlocation(position){
        const result = await getData(
            position.coords.latitude,
            position.coords.longitude
        );
        console.log(result.name);

        if( result.cod == 200){
            document.querySelector(".container").classList.add('showdata');
            cityname.innerHTML = `${result.name}`;
            temprch.innerHTML= `${Math.round(result.main.temp-273.15)}°C`;
            tempmax.innerHTML= `${Math.round(result.main.temp_max-273.15)}°C`;
            tempmin.innerHTML= `${Math.round(result.main.temp_min-273.15)}°C`;
            humm.innerHTML= `${result.main.humidity}%`;
            winspd.innerHTML= `${result.wind.speed} km/h`;
            desc.innerHTML = `${result.weather[0].description}`;
            srise.innerHTML = `${result.sys.sunrise}`;
            sset.innerHTML = `${result.sys.sunset}`;
            // console.log(result.sys.sunrise);
    
    
        }
    
        
    }
    function failedtogetlocation(){
        console.log("failed to get location");
    }
    
    navigator.geolocation.getCurrentPosition(gotlocation, failedtogetlocation);
    
    
    

});