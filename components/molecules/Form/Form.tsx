import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

import {CityContext} from "../../../pages/index"

//const cityInfo = useContext(CityContext)

type item = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: coord;
};

type coord = {
  lon: number;
  lat: number;
};

type matchItem = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: coord;
  slug: string;
};

const Form = () => {
  //const [location, setLocation] = useState<string>("");
  const [results, setResults] = useState<matchItem[]>([]);

  const [query, setQuery] = useState("");
  const router = useRouter()

  const cityInfo = useContext(CityContext)
  // console.log(cityInfo)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //setLocation(e.target.value);
    setQuery(e.target.value);

    let matchingCities = [] as matchItem[];

    if (e.target.value.length >= 3) {
      //cityInfo.props.forEach((city: item) =>
      for (let city of cityInfo) {
        if (matchingCities.length >= 10) {
          break;
        }
        //console.log(city);
        const match = city.name
          .toLowerCase()
          .startsWith(e.target.value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
        }
      }
    }

    setResults(matchingCities);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for location"
        required
        onChange={(e) => handleChange(e)}
      />

      {query.length >= 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => {
              return (
                <li key={city.id} >
                  <Link
                    href={{
                      pathname: `/location/${city.id}`,
                    }}
                  >
                    <div>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}{" "}
                      <span>({city.country})</span>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="search__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Form;
