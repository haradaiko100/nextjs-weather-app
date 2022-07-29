import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Header } from "../../components/organisms/Header";
import WeatherIcon from "../../components/atoms/WeatherIcon/WeatherIcon";

type weatherInfo = {
  city: string;
  currentWeather: any;
  main: any;
  windSpeed: number;
  country: string;
};

const getWeatherData = async (id: number) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&mode=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await res.json();

  if (!data) console.log("error");
  return data;
};

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

const City = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<weatherInfo>();

  useEffect(() => {
    getWeatherDataDic(router.query.city)
      .then((res) => {
        //console.log(res);
        setWeatherData(res);
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  }, []);

  return (
    <div className="space-y-20 items-center">
      <Header />
      <div>
        {weatherData ? (
          <div className=" flex flex-col shadow-xl bg-gray-50">
            <div className=" text-7xl text-center">
              <p>{weatherData.city + ", " + weatherData.country}</p>
            </div>
            <div className=" flex flex-row space-x-44 items-center">
              <WeatherIcon
                iconstr={weatherData.currentWeather.icon}
                alt="お天気アイコン"
                width={200}
                height={200}
              />
              <div className="flex flex-row space-x-10 text-5xl">
                <p className=" ">
                  {Math.round(weatherData.main.temp_max / 10) +
                    "/" +
                    Math.round(weatherData.main.temp_min / 10) +
                    "°C"}
                </p>
                <p>{weatherData.currentWeather.main}</p>
                <p className="">
                  {"wind : " + weatherData.windSpeed + "[m/s]"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h2>No data</h2>
        )}
      </div>
      <div className=" flex flex-col items-center">
        <Link href="/">
          <a className=" shadow-md rounded-xl font-bold text-4xl bg-orange-200 hover:bg-orange-300">Home Page</a>
        </Link>
      </div>
    </div>
  );
};

export default City;
