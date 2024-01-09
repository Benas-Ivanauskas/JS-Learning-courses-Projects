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
  // countriesContainer.style.opacity = 1;
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
// const request = fetch(`https://restcountries.com/v3.1/name/lithuania`);
// console.log(request);

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1

  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💣💣`);
      renderError(`Something went wrong 💣💣. ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//Not working neighbour country... Error with flag, country ....

btn.addEventListener('click', function (e) {
  e.preventDefault();
  getCountryData('iceland');
});

// getCountryData('asdasd');

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`)
//     .then(response => {
//       if (response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.country}`);
//     })
//     .catch(err => {
//       console.error(`${err} 💣💣`);
//     });
// };

// whereAmI(52.508, 13.381);

//Ehe Event loop-------------------------------------------

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// //Promise.resolve allow us to create a promise, which immediatelly resolved
// Promise.resolve('Resolved promise 1').then(response => console.log(response));
// console.log('Test end');

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

//Building a Simple Promise-------------------------------------------

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       //promise as fulfilled, we use the resolve function
//       resolve('You won ');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// //Promisifying setTimeout

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3)
//   .then(() => {
//     console.log('I waited for 3 sec');
//     return wait(1);
//   })
//   .then(() => console.log('i waited for 1 sec'));

//Promisifying the Geolocation API-------------------------------------------

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(position => console.log(position));

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log(`img 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log(`img 2 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

//Consuming Promises with Async/Await-------------------------------------------

// const whereAmI = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     const [data] = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.error(`${err} Something went wrong ${err.message}`);
//   }
// };

// whereAmI('lithuania');
// console.log('First');

//Running Promises in Parallel-------------------------------------------

const get3Countries = async function (country1, country2, country3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${country3}`
    // );

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${country1}`),
      getJSON(`https://restcountries.com/v3.1/name/${country2}`),
      getJSON(`https://restcountries.com/v3.1/name/${country3}`),
    ]);
    // console.log([data1.capital, data2.capital, data3.capital]);

    console.log(data.map(data => data[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('lithuania', 'germany', 'portugal');

//Other Promise Combinators: race, allSettled and any-------------------------------------------

//Promise.race
(async function () {
  try {
    const response = await Promise.race([
      getJSON('https://restcountries.com/v3.1/name/lithuania'),
      getJSON('https://restcountries.com/v3.1/name/mexico'),
      getJSON('https://restcountries.com/v3.1/name/iceland'),
    ]);

    console.log(response[0]);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
//now these three promises will basically race against each other, like in a real race.
//Now a promise that gets rejected can actually also win the race
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long!`));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON('https://restcountries.com/v3.1/name/tanzania'),
  timeout(0.002),
])
  .then(response => console.log(response[0]))
  .catch(err => console.error(err));

//Promise.allSettled
////This returns all promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//Promise.any [ES2021]

//This returns the first fulfilled promise
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
