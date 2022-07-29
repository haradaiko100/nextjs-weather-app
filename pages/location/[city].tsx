import React from "react";
import Link from "next/link";
import Head from "next/head";
import Form from "../../components/molecules/Form/Form";
import type { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect, useState } from "react";
//import { CityContext } from "../index";
import { useRouter } from "next/router";
import Image from "next/image";

type weatherInfo = {
  city: string;
  currentWeather: any;
  main: any;
  windSpeed: number;
  country: string;
};

const getWeatherData = async (id: number) => {
  //console.log(id)
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&mode=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await res.json();

  if (!data) console.log("error");
  return data;
};

const City = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<weatherInfo>();

  // const imageLoader = ({src,with,quality})=>{
  //   return `http://openweathermap.org/img/wn/${src}@2x.png?w=${width}&q=${quality || 75}`
  // }

  async function getWeatherDataDic(city_id: number) {
    const data = await getWeatherData(city_id);

    if (!data) return;

    return {
      city: data.name,
      currentWeather: data.weather[0],
      main: data.main,
      windSpeed: data.wind.speed,
      country: data.sys.country,
    };
  }

  useEffect(() => {
    getWeatherDataDic(router.query.city)
      .then((res) => {
        console.log(res);
        setWeatherData(res);
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  }, []);

  return (
    <div>
      <div>
        {weatherData ? (
          <div>
            <div>
              <p>{weatherData.city}</p>
              <p>{weatherData.country}</p>
            </div>
            <div>
              <Image
                src={
                  "http://openweathermap.org/img/wn/" +
                  weatherData.currentWeather.icon +
                  "@2x.png"
                }
                alt="お天気アイコン"
                width={200}
                height={200}
              />
              <div>
                <p>{Math.round(weatherData.main.temp_max / 10)}</p>
                <p>/</p>
                <p>{Math.round(weatherData.main.temp_min / 10)}</p>
                <p>°C</p>
              </div>
              <div>
                <p>wind:</p>
                <p>{weatherData.windSpeed}</p>
              </div>
              <p>{weatherData.currentWeather.main}</p>
            </div>
          </div>
        ) : (
          <h2>No data</h2>
        )}
      </div>
      <div>
        <Link href="/">
          <a>home</a>
        </Link>
      </div>
    </div>
  );
};

export default City;
