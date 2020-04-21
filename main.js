if (!navigator.geolocation) {
  alert('your browser sucks!');
} else {
  navigator.geolocation.getCurrentPosition(success, error);
}

const mappedIcons = {
  'clear sky': 'fa-sun',
  'few clouds': 'fa-cloud-sun',
  'scattered clouds': 'fa-cloud',
  'broken clouds': 'fa-cloud',
  'shower rain': 'fa-cloud-showers-heavy',
  rain: 'fa-cloud-showers-heavy',
  thunderstorm: 'fa-bolt',
  snow: 'fa-snowflake',
  mist: 'fa-smog'
};

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let coordinates = {
    latitude,
    longitude
  };
  getWeather(coordinates);
  getCurrentLocation(coordinates);
}

function error() {
  alert('Error');
}

function getWeather(coordinates) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&&units=metric&appid=c052d4d81037893fa96f7c602bbceed0`;
  fetch(url).then(response => {
    response.json().then(data => {
      updateUI(data);
    });
  });
}

function getCurrentLocation(coordinates) {
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=c052d4d81037893fa96f7c602bbceed0`;
  fetch(url).then(response => {
    response.json().then(data => {
      updateLocation(data);
    });
  });
}

function updateUI(data) {
  const conditionsDescription = Array.from(
    document.querySelectorAll('.description__conditions')
  );
  const temperatures = Array.from(document.querySelectorAll('.temperature'));
  const icons = Array.from(document.querySelectorAll('.icon i'));

  const days = Array.from(document.querySelectorAll('.daily__item__day.day'));

  data.daily.forEach((data, index) => {
    const description = data.weather[0].description;
    const mainDescription = data.weather[0].main;
    const conditionDescription = mainDescription + ', ' + description;
    const temperature = data.temp.day;
    const icon = mappedIcons[description] || 'fa-cloud-sun';
    const day = moment()
      .add(index + 1, 'days')
      .format('dddd');

    conditionsDescription[index]
      ? (conditionsDescription[index].textContent = conditionDescription)
      : null;
    temperatures[index]
      ? (temperatures[index].textContent = temperature)
      : null;
    icons[index] ? icons[index].classList.add(icon) : null;
    days[index] ? (days[index].textContent = day) : '';
  });
}

function updateLocation(data) {
  const cityLocation = document.querySelector(
    '.today__forecast.description__container__city'
  );
  const countryLocation = document.querySelector(
    '.today__forecast.description__container__country'
  );

  const cityLocationValue = data.name;
  const countryLocationValue = data.sys.country;
  cityLocation.textContent = cityLocationValue;
  countryLocation.textContent = countryLocationValue;
}
