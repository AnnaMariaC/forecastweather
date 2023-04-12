import style from "./Home.module.css";

export function Home() {
  return (
    <div className={style["content-home"]}>
      <h2>Welcome to Weather Application</h2>
      <p>
        In this application you will see your current weather or search the
        weather for any other city from the country list. In the forecast
        section you will see the the forecast weather of you current location
        for the next 4 day from 3 to 3 hours.
      </p>
    </div>
  );
}
