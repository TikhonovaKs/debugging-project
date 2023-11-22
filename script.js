// SOURCE CODE:
// "use strict";

// let formEl = document.querySelector("search');
// let cityInputEl = document.querySelectr("city");
// let tempEl = document.querySelector("temp");
// let messageEl = document.querySelector("message");

// async function getData() {
//   // Fetch data from Open Weather Map API, passing the input value as city
//   let res = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&appid=8f20807cea52eed92572aea82df038d5`
//   );
//   let data = await res.json();

//   // We get temperatures back in Kelvin so we need to convert nto Celsius
//   // https://www.rapidtables.com/convert/temperature/kelvin-to-celsius.html
//   let temp = data.temp - 273.15;

//   tempEl.textContent = "${temp}°C";

//   // Different temperature ranges should print different messages:
//   //
//   // Below 0 = Winter is coming
//   // 0-10 = Sweater weather
//   // 11-20 = Put a jacket on and regret it as soon as you start moving
//   // Above 21 = Hotter outside than Taylor Swift's latest single

//   if (temp > 0) {
//     messageEl.textContent = "Winter is coming...";
//   } else if (temp > 0) {
//     messageEl.textContent = "Sweater weather!"
//   } else if (temp > 10) {
//     messageEl.textContent = "Put a jacket on and regret it as soon as you start moving";
//   } else if (temp > 20) {
//     messageEl.textContent = "Hotter outside than Taylor Swift's latest single";
//   }
// }

// formEl.addEventListener("submit", function e {
//   preventDefault();
//   getData();
// });



// FIXED CODE:
'use strict';

let formEl = document.querySelector('#search');
let cityInputEl = document.querySelector('#city');
let tempEl = document.querySelector('#temp');
let messageEl = document.querySelector('#message');

async function getData() {
  try {
    // Fetch data from Open Weather Map API, passing the input value as city

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl.value}&appid=8f20807cea52eed92572aea82df038d5`
    );
    let data = await res.json();

    // We get temperatures back in Kelvin so we need to convert nto Celsius
    // https://www.rapidtables.com/convert/temperature/kelvin-to-celsius.html
    let temp = Math.floor(data.main.temp - 273.15);

    tempEl.textContent = `${temp}°C`;

    // Different temperature ranges should print different messages:
    //
    // Below 0 = Winter is coming
    // 0-10 = Sweater weather
    // 11-20 = Put a jacket on and regret it as soon as you start moving
    // Above 21 = Hotter outside than Taylor Swift's latest single

    if (temp < 0) {
      messageEl.textContent = 'Winter is coming...';
    } else if (temp <= 10) {
      messageEl.textContent = 'Sweater weather!';
    } else if (temp <= 20) {
      messageEl.textContent = 'Put a jacket on and regret it as soon as you start moving';
    } else if (temp > 20) {
      messageEl.textContent = "Hotter outside than Taylor Swift's latest single";
    }
  } catch (error) {
    console.error('Error:', error);
    // Inform user about error
    messageEl.textContent = 'The city does not exist. Try again';
  }
}

let buttonEl = document.querySelector('#button');

// FORM:
// - attach an input event handler to the form
formEl.addEventListener('input', function () {
  const inputValue = cityInputEl.value;

  //Checking for invalid characters (numbers, signs, spaces)
  const hasInvalidCharacters = /[\d\s\W]/.test(inputValue);

  const isValid = inputValue.length > 0 && !hasInvalidCharacters;

  setButtonState(isValid);
});
// - swith button condition
function setButtonState(isValid) {
  if (isValid) {
    buttonEl.removeAttribute('disabled');
    buttonEl.classList.remove('button_disabled');
    messageEl.textContent = '';
  } else {
    messageEl.textContent = 'Enter valid data';
    tempEl.textContent = '';
    buttonEl.setAttribute('disabled', true);
    buttonEl.classList.add('button_disabled');
  }
}
// - attach a submit event handler to the form
formEl.addEventListener('submit', function (evt) {
  evt.preventDefault();

  // check input
  getData(cityInputEl.value);
});
