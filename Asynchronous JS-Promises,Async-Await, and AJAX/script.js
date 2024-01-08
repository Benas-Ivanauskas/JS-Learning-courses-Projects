'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
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
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${data.population}</p>
  <p class="country__row"><span>🗣️</span>${data.languages.lit}</p>
  <p class="country__row"><span>💰</span>${data.currencies.EUR?.name}</p>
  </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', httml);
  countriesContainer.style.opacity = 1;
};

//AJAX call country 1
const getCountryNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country 1
    renderCountry(data);

    //Get neighbour country 2
    const neighbour = data.borders?.[0];

    if (!neighbour) return;
    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      //Render country 2
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryNeighbour('lithuania');
getCountryNeighbour('lithuania');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
