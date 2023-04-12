import { useEffect, useState } from "react";
import style from "./Forecast.module.css";

export function Forecast() {
  const [data, setData] = useState(null);
  const [geolocation, setGeolocation] = useState({
    lat: null,
    lon: null,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geo) => {
      setGeolocation({ lat: geo.coords.latitude, lon: geo.coords.longitude });
    }, console.warn);
  }, []);
  useEffect(() => {
    const { lat, lon } = geolocation;
    if (!lat || !lon) {
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5944347868b1e95dcefea346a5fc0bf7&units=metric`
    )
      .then((res) => res.json())
      .then((weather) => setData(weather));
  }, [geolocation]);

  return (
    data && (
      <div className={style["content-forecast"]}>
        <div>
          <p className={style.city}>{data.city.name}</p>
        </div>
        <div>
          {data.list.map((item, index) => (
            <div key={index} className={style["item-forecast"]}>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                width="50px"
                alt={item.weather[0].main + "icon"}
              />
              <label>{item.dt_txt}</label>
              <label>{item.weather[0].main}</label>
              <label>{item.main.temp}&deg;C</label>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
