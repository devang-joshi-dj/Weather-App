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
  const id: string = 'defa6d4900ca4eeb2dfc9dfc8eac780e';
  const units: string = 'metric';
  let api: string;
  
  // to focus input element on page load
  input.focus();

  const getSetValues:any = (data:any) => {
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
      api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + id + '&units=' + units;
      fetch(api)
        .then(response => response.json())
        .then(data => { getSetValues(data); })
        .catch(err => showErrorMessage(err));
    });
  }

  const showErrorMessage:any = (error:string) => {
    alert(error);
  }

  const celciusToFahrenheit:any = (value:any) => {
    // function to convert degrees to fahrenheit
    return ((value.innerHTML * 1.8) + 32).toFixed(2);
  }

  const FahrenheitToCelcius:any = (value:any) => {
    // function to convert fahrenheit to celcius
    return ((value.innerHTML - 32) / 1.8).toFixed(2);
  }

  temperature.addEventListener('click', () => {
    // event listener to change temperature scale from degrees to fahrenheit and vice versa of Actual Temperature
    if (tempScale.innerHTML == 'C') {
      temp.innerHTML = celciusToFahrenheit(temp);
      tempScale.innerHTML = 'F';
    } else {
      temp.innerHTML = FahrenheitToCelcius(temp);
      tempScale.innerHTML = 'C';
    }
  });
  
  feelsLike.addEventListener('click', () => {
    // event listener to change temperature scale from degrees to fahrenheit and vice versa of Feels Like Temperature
    if (feelsScale.innerHTML == 'C') {
      feels.innerHTML = celciusToFahrenheit(feels);
      feelsScale.innerHTML = 'F';
    } else {
      feels.innerHTML = FahrenheitToCelcius(feels);
      feelsScale.innerHTML = 'C';
    }
  });

  button.addEventListener('click', () => {
    // event listener to fetch api when button is clicked
    api = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + id + '&units=' + units;
    fetch(api)
      .then(response => response.json())
      .then(data => { getSetValues(data); })
      .catch(err => showErrorMessage('Not Valid Input. Enter A City.'));
  });

  const isFocused:any = (element:any) => {
    return document.activeElement === element;
  }

  document.addEventListener('keyup', (e) => {
    // button to check whether enter key is pressed while user is focused in  
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      if (isFocused(input)) {
        button.click();
      }
    }
  });
}