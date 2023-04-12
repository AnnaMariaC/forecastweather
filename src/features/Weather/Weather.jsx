import { useEffect, useState } from "react";
import style from "./Weather.module.css";

export function Weather() {
  const [data, setData] = useState(null);
  const [geolocation, setGeolocation] = useState({
    lat: null,
    lon: null,
  });

  const [inputValues, setInputValues] = useState({ city: "", country: "RO" });

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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5944347868b1e95dcefea346a5fc0bf7&units=metric`
    )
      .then((res) => res.json())
      .then((weather) => {
        setInputValues({ city: weather.name, country: weather.sys.country }) ||
          setData(weather);
      });
  }, [geolocation]);

  function handelInputChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  function handelSearch(e) {
    e.preventDefault();

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValues.city},${inputValues.country}&appid=5944347868b1e95dcefea346a5fc0bf7&units=metric`
    )
      .then((res) => res.json())
      .then((weather) => setData(weather));
  }

  return (
    <>
      <h3>Weather</h3>
      <form onSubmit={handelSearch} className={style["form-weather"]}>
        <label htmlFor="city">Write a City Name </label>
        <input
          type="text"
          name="city"
          id="city"
          value={inputValues.city}
          onChange={handelInputChange}
        />
        <label htmlFor="country">Choose a country</label>

        <select
          name="country"
          id="country"
          value={inputValues.country}
          onChange={handelInputChange}
        >
          <option value="RO">Romania</option>
          <option value="ES">Spain</option>
          <option value="US">USA</option>
          <option value="FR">France</option>
          <option value="IT">Italy</option>
        </select>

        <button type="submit" className={style["searchBtn"]}>
          Search
        </button>
      </form>
      {data && (
        <>
          <div className={style.weatherDiv}>
            <div className={style.top}>
              <div>
                <p className={style.city}>{inputValues.city}</p>
                <p className={style.clouds}>{data.weather[0].main}</p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                width="50px"
                alt={data.weather[0].main + "icon"}
              />
            </div>

            <div className={style.bottom}>
              <p className={style.temperature}>
                {data.main.temp.toFixed(1)}&deg;C
              </p>
              <div className={style.details}>
                <div className={style["parameter-row"]}>
                  <span className={style["parameter-label-first"]}>
                    Details:
                  </span>
                </div>
                <div className={style["parameter-row"]}>
                  <span className={style["parameter-label"]}>Feels like</span>
                  <span className={style["parameter-value"]}>
                    {data.main.feels_like.toFixed(1)}&deg;C
                  </span>
                </div>
                <div className={style["parameter-row"]}>
                  <span className={style["parameter-label"]}>Wind</span>
                  <span className={style["parameter-value"]}>
                    {data.wind.speed} m/s
                  </span>
                </div>
                <div className={style["parameter-row"]}>
                  <span className={style["parameter-label"]}>Humidity</span>
                  <span className={style["parameter-value"]}>
                    {data.main.humidity} %
                  </span>
                </div>
                <div className={style["parameter-row"]}>
                  <span className={style["parameter-label"]}>Pressure</span>
                  <span className={style["parameter-value"]}>
                    {data.main.pressure} hPa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
