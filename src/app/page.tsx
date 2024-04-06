"use client"

import { useState } from "react";
import { Input, message } from "antd";
import styles from "./page.module.css";

function getWeather(city: string) {
  return fetch(`/api/weather/?city=${encodeURIComponent(city)}`);
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState(null);

  async function updateWeather() {
      if (!city) {
        message.warning("no city provided")
      }
      const response = await getWeather(city);
      const data = await response.json();
      if (response.status !== 200) {
        message.error(data.error);
      } else {
        setInfo(data);
      }
  }

  return (
    <div className={styles.bounding}>
      <Input.Search
        placeholder="input city"
        allowClear
        enterButton="Search"
        value={city}
        onChange={(e) => {
          setInfo(null);
          setCity(e.target.value);
        }}
        onSearch={updateWeather}
      />
      <div className={styles.weather_info}>
        <h2>{city? city: "N/A"} - {info? (info as any).weather[0].description: "N/A"}</h2>
        <div>
          <p>temp: {info? (info as any).main.temp: "N/A"}</p>
          <p>humidity: {info? (info as any).main.humidity: "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
