import React from "react";
import Link from "next/link";
import Head from "next/head";
import Form from "../../components/molecules/Form/Form"
import type { GetServerSideProps, NextPage } from "next";


const getWeatherData = async (city: string) => {
  console.log(city)
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await res.json();
  return data;
};


export const getServerSideProps: GetServerSideProps = async (context) =>{
  const city = context.query.city;
  console.log("city::",city)

  if (!city) {
    return {
      notFound: true,
    };
  }

  const data = await getWeatherData(city)

  return {
    props: {
      city: data.name,
      currentWeather: data.weather,
      main:data.main,
      windSpeed:data.wind,
      country: data.sys,
    }, 
  };
}

export default function City({city,currentWeather,main,windSpeed,country}) {
  return (
    <>
      <div>
        <div>
          <Link href="/">
            <a>home</a>
          </Link>
          <Form placeholder="Search for another location..." />
          <TodaysWeather
            city={city}
            weather={weeklyWeather[0]}
            timezone={timezone}
          />
        </div>
      </div>
    </>
  );
}


