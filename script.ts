window.onload = () => {
  const button: any = (<HTMLInputElement>document.querySelector('.button'));
  const input: any = (<HTMLInputElement>document.querySelector('.inputValue'));
  const name: any = (<HTMLInputElement>document.querySelector('.name'));
  const temperature: any = (<HTMLInputElement>document.querySelector('.temperature'));
  const temp: any = (<HTMLInputElement>document.querySelector('.temp'));
  const tempScale: any = (<HTMLInputElement>document.querySelector('.tempScale'));
  const desc: any = (<HTMLInputElement>document.querySelector('.desc'));
  const feelsLike: any = (<HTMLInputElement>document.querySelector('.feelsLike'));
  const feelsLabel: any = (<HTMLInputElement>document.querySelector('.feelsLabel'));
  const feels: any = (<HTMLInputElement>document.querySelector('.feels'));
  const feelsScale: any = (<HTMLInputElement>document.querySelector('.feelsScale'));

  let long: number;
  let lat: number;
  let api: string;
  
  // to focus input element on page load
  input.focus();

  const getSetValues = (data) => {
    // function to get Values from Weather API and set them in HTML Elements
    let tempValue = data['main']['temp'];
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'].toUpperCase();
    let feelsLikeValue = data['main']['feels_like'];
    name.innerHTML = nameValue;
    temp.innerHTML = tempValue.toFixed(2);
    tempScale.innerHTML = 'C';
    desc.innerHTML = descValue;
    feelsLabel.innerHTML = 'Feels Like: ';
    feels.innerHTML = feelsLikeValue.toFixed(2);
    feelsScale.innerHTML = 'C';
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // getting longitude and latitude of user
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // fetching api
      api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=defa6d4900ca4eeb2dfc9dfc8eac780e&units=metric';
      fetch(api)
        .then(response => response.json())
        .then(data => {getSetValues(data);})
        .catch(err => alert(err));
    });
  }

  const celciusToFahrenheit = value => {
    // function to convert degrees to fahrenheit
    return ((value.innerHTML * 1.8) + 32);
  }

  const FahrenheitToCelcius = value => {
    // function to convert fahrenheit to celcius
    return ((value.innerHTML - 32) / 1.8);
  }

  temperature.addEventListener('click', () => {
    // event listener to change temperature scale from degrees to fahrenheit and vice versa of Actual Temperature
    if (tempScale.innerHTML == 'C') {
      temp.innerHTML = celciusToFahrenheit(temp).toFixed(2);
      tempScale.innerHTML = 'F';
    }else
    if (tempScale.innerHTML == 'F') {
      temp.innerHTML = FahrenheitToCelcius(temp).toFixed(2);
      tempScale.innerHTML = 'C';
    }
  })
  
  feelsLike.addEventListener('click', () => {
    // event listener to change temperature scale from degrees to fahrenheit and vice versa of Feels Like Temperature
    if (feelsScale.innerHTML == 'C') {
      feels.innerHTML = celciusToFahrenheit(feels).toFixed(2);
      feelsScale.innerHTML = 'F';
    }else
    if (feelsScale.innerHTML == 'F') {
      feels.innerHTML = FahrenheitToCelcius(feels).toFixed(2);
      feelsScale.innerHTML = 'C';
    }
  })

  button.addEventListener('click', () => {
    // event listener to fetch api when button is clicked
    api = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=defa6d4900ca4eeb2dfc9dfc8eac780e&units=metric';
    fetch(api)
      .then(response => response.json())
      .then(data => {getSetValues(data)})
      .catch(err => alert('Not Valid Input. Enter A City.'));
  });

  document.addEventListener('keyup', (e) => {
    // button to check whether enter key is pressed while user is focused in  
      var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      if (document.activeElement === input) {
        button.click();
      }
    }
  })
}
