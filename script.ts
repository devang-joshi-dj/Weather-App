window.onload = () => {
  let long:number;
  let lat:number;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // getting longitude and latitude of user
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // fetching api
      let api = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=defa6d4900ca4eeb2dfc9dfc8eac780e&units=metric';
      fetch(api)  
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // var tempValue = data['main']['temp'];
          // var nameValue = data['name'];
          // var descValue = data['weather'][0]['description'];

          // main.innerHTML = nameValue;
          // desc.innerHTML = "Desc - " + descValue;
          // temp.innerHTML = "Temp - " + tempValue;
          // input.value = "";
        })
    });
  }
}