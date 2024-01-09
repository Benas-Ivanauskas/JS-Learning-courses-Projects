'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Old school way XMLHttpRequest()-------------------------------------------

const renderCountry = function (data, className = '') {
  const html = `
  <article class="${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //AJAX call
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //Render country 1
//     renderCountry(data);

//     //Get neighbour country 2
//     const [neighbour] = data.borders;
//     if (!neighbour) return;

//     //If neighbour exists we can do another AJAX call 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${neighbour}
//     `
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('germany');

// //This is callback hell
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

//Promises and the fetch API-------------------------------------------

//Fetch function immediately return a promise here. And nor promise is stored to request variable
const request = fetch(`https://restcountries.com/v3.1/name/lithuania`);
console.log(request);

// //Consuming promise
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     //.then(response => {}); this how we hanndle fullfilled Promise
//     .then(response => {
//       // console.log(response);
//       //json() method that is available on all the response objects that is coming from the fetch function
//       return response.json();
//     })
//     //Gauname data itself
//     .then(data => {
//       // console.log(data[0]);
//       renderCountry(data[0]);
//     });
// };
// getCountryData('portugal');

//Theory:
//to read the data from the respons we need to use json() method. json() itself also returns a promise
//and so since this is a promise we can then again call the then() method

//Chaining promises

//Cleaner code------------
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    });
};
getCountryData('portugal');
