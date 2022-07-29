import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

import { CityContext } from "../../../pages/index";
import Header from "../../organisms/Header/Header";
import SearchList from "../../atoms/SearchList/SearchList";
import Input from "../../atoms/Input/Input";



type cityProps = {
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

type Item = cityProps & {
  slug: string;
};

const Form = () => {
  const [results, setResults] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const cityInfo = useContext(CityContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    let matchingCities = [] as Item[];

    if (e.target.value.length >= 3) {
      for (let city of cityInfo) {
        if (matchingCities.length >= 10) {
          break;
        }

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
    <div className="flex flex-col items-center text-4xl space-y-5 ">
      <Input onChange={(e) => handleChange(e)} 
      className="  bg-orange-200 rounded-2xl"/>

      {query.length >= 3 && (
        <ul className=" text-2xl text-gray-500">
          {results.length > 0 ? (
            results.map((city) => {
              return <SearchList {...city} key={city.id} />;
            })
          ) : (
            <li className="">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Form;
