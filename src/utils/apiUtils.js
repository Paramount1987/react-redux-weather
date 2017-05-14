import axios from "axios";

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '27801575c48007c245a45bbc5a3b9246';

export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    }else {
      reject('Geolocation is not supported by this browser.');
    }
  });
}

export function getLocationWeather(position){
  const { latitude, longitude } = position.coords;
  return axios.get(`${API_URL}lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);
}

export function getCityWeather(city) {
  return axios.get(`${API_URL}q=${city}&APPID=${API_KEY}&units=metric`)
}

//------------------------
export function localeDetect(){
  let userLang = navigator.language || navigator.userLanguage;
  if(userLang !== "ru") userLang = "en";

  return userLang;
}


