'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
  //old school way doinng AJAX in JS
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    console.log(this.responseText);
    //Converting this here to actual JS object
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
    <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${data.languages.lit}</p>
    <p class="country__row"><span>💰</span>${data.currencies}</p>
    </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('lithuania');
getCountryData('usa');
