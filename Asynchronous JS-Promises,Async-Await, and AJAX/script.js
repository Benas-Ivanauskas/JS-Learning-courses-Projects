'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Old school way
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const httml = `
//     <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${data.population}</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.lit}</p>
//     <p class="country__row"><span>💰</span>${data.currencies.EUR.symbol}</p>
//     </div>
//     </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', httml);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('lithuania');
// getCountryData('portugal');
// getCountryData('germany');

const renderCountry = function (data, className = '') {
  const httml = `
  <article class="${className}">
  <img class="country__img" src="${data.flags?.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name?.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${data.population}</p>
  <p class="country__row"><span>🗣️</span>${data.languages?.lit}</p>
  <p class="country__row"><span>💰</span>${data.currencies?.EUR.name}</p>
  </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', httml);
  countriesContainer.style.opacity = 1;
};

// const renderError = function (message) {
//   countriesContainer.insertAdjacentText('beforeend', message);
// countriesContainer.style.opacity = 1;
// };

// //AJAX call country 1
// const getCountryNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //Render country 1
//     renderCountry(data);

//     //Get neighbour country 2
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;
//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       //Render country 2
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryNeighbour('lithuania');
// getCountryNeighbour('lithuania');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// /   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

///////////////////////////////////////
//Promises and the fetch API
// const request = fetch('https://restcountries.com/v3.1/name/lithuania');
// console.log(request);

//Consume promise

const getCountryData = function (country) {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err}`);
      renderError(`Something went wrong${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('lithuania');
});

///////////////////////////////////////
//The Event loop in practise

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(response => console.log(response));

// Promise.resolve('Resolved promise 2').then(response => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(response);
// });
// console.log('Test end');

///////////////////////////////////////
//Building a Simple Promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You win');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });
// lotteryPromise
//   .then(resolved => console.log(resolved))
//   .catch(error => console.log(error));

// //Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('i waited for 1 second'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.log(x));

///////////////////////////////////////
//Promisifying the Geolocation API

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(position => console.log(position));

// const whereAmI = function () {
//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(resolve => {
//       if (!resolve.ok)
//         throw new Error(`Problem with geocoding $(response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not fount (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(`${err.message} error`));
// };

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
//Promises with ASYNS/AWAIT

const whereIAm = async function (country) {
  try {
    const responsed = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    const data = await responsed.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.log(`${err.message}error`);
  }
};
whereIAm('lithuania');
