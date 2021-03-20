window.onload = function () {
    var button = document.querySelector('.button');
    var input = document.querySelector('.inputValue');
    var name = document.querySelector('.name');
    var temperature = document.querySelector('.temperature');
    var temp = document.querySelector('.temp');
    var tempScale = document.querySelector('.tempScale');
    var desc = document.querySelector('.desc');
    var feelsLike = document.querySelector('.feelsLike');
    var feelsLabel = document.querySelector('.feelsLabel');
    var feels = document.querySelector('.feels');
    var feelsScale = document.querySelector('.feelsScale');
    var long;
    var lat;
    var id = 'defa6d4900ca4eeb2dfc9dfc8eac780e';
    var units = 'metric';
    var api;
    // to focus input element on page load
    input.focus();
    var getSetValues = function (data) {
        // function to get Values from Weather API and set them in HTML Elements
        var tempValue = data['main']['temp'];
        var nameValue = data['name'];
        var descValue = data['weather'][0]['description'].toUpperCase();
        var feelsLikeValue = data['main']['feels_like'];
        name.innerHTML = nameValue;
        temp.innerHTML = tempValue.toFixed(2);
        tempScale.innerHTML = 'C';
        desc.innerHTML = descValue;
        feelsLabel.innerHTML = 'Feels Like: ';
        feels.innerHTML = feelsLikeValue.toFixed(2);
        feelsScale.innerHTML = 'C';
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // getting longitude and latitude of user
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // fetching api
            api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + id + '&units=' + units;
            fetch(api)
                .then(function (response) { return response.json(); })
                .then(function (data) { getSetValues(data); })["catch"](function (err) { return showErrorMessage(err); });
        });
    }
    var showErrorMessage = function (error) {
        // function to show error message
        alert(error);
    };
    var celciusToFahrenheit = function (value) {
        // function to convert degrees to fahrenheit
        return ((value.innerHTML * 1.8) + 32).toFixed(2);
    };
    var FahrenheitToCelcius = function (value) {
        // function to convert fahrenheit to celcius
        return ((value.innerHTML - 32) / 1.8).toFixed(2);
    };
    temperature.addEventListener('click', function () {
        // event listener to change temperature scale from degrees to fahrenheit and vice versa of Actual Temperature
        if (tempScale.innerHTML == 'C') {
            temp.innerHTML = celciusToFahrenheit(temp);
            tempScale.innerHTML = 'F';
        }
        else {
            temp.innerHTML = FahrenheitToCelcius(temp);
            tempScale.innerHTML = 'C';
        }
    });
    feelsLike.addEventListener('click', function () {
        // event listener to change temperature scale from degrees to fahrenheit and vice versa of Feels Like Temperature
        if (feelsScale.innerHTML == 'C') {
            feels.innerHTML = celciusToFahrenheit(feels);
            feelsScale.innerHTML = 'F';
        }
        else {
            feels.innerHTML = FahrenheitToCelcius(feels);
            feelsScale.innerHTML = 'C';
        }
    });
    button.addEventListener('click', function () {
        // event listener to fetch api when button is clicked
        api = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + id + '&units=' + units;
        fetch(api)
            .then(function (response) { return response.json(); })
            .then(function (data) { getSetValues(data); })["catch"](function (err) { return showErrorMessage('Not Valid Input. Enter A City.'); });
    });
    var isFocused = function (element) {
        return document.activeElement === element;
    };
    document.addEventListener('keyup', function (e) {
        // button to check whether enter key is pressed while user is focused in  
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            if (isFocused(input)) {
                button.click();
            }
        }
    });
};
