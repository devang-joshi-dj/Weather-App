window.onload = () => {
  const button: any = (<HTMLInputElement>document.querySelector('.button'));
  const input: any = (<HTMLInputElement>document.querySelector('.inputValue'));
  const name: any = (<HTMLInputElement>document.querySelector('.name'));
  const temperature: any = (<HTMLInputElement>document.querySelector('.temp'));
  const scale: any = (<HTMLInputElement>document.querySelector('.scale'));
  const desc: any = (<HTMLInputElement>document.querySelector('.desc'));

  let long: number;
  let lat: number;
  let api: string;
  
  input.focus();

  const getSetValues = (data) => {
    let tempValue = data['main']['temp'];
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'];
    name.innerHTML = nameValue;
    temperature.innerHTML = tempValue;
    desc.innerHTML = descValue;
    scale.innerHTML = 'C';
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
        .then(data => { getSetValues(data); })
        .catch(err => alert(err));
    });
  }

  temperature.addEventListener('click', () => {
    if (scale.innerHTML == 'C') {
      temperature.innerHTML = (temperature.innerHTML * 1.8) + 32;
      scale.innerHTML = 'F';
    }else
    if (scale.innerHTML == 'F') {
      temperature.innerHTML = (temperature.innerHTML - 32) / 1.8;
      scale.innerHTML = 'C';
    }
    })

  button.addEventListener('click', () => {
    api = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=defa6d4900ca4eeb2dfc9dfc8eac780e&units=metric';
    fetch(api)
      .then(response => response.json())
      .then(data => { getSetValues(data) })
      .catch(err => alert('Not Valid Input. Enter A City.'));
  });

  document.addEventListener('keyup', (e) => {
      var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      if (document.activeElement === input) {
        button.click();
      }
    }
  })
}