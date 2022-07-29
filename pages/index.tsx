import type { GetStaticProps, NextPage } from "next";
import * as fs from 'fs/promises'
import * as path from 'path'
import Form from "../components/molecules/Form/Form";
import Header from "../components/organisms/Header/Header"
import { createContext } from "react";


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


export const getStaticProps: GetStaticProps = async (context) => {
  // JSON ファイルを読み込む
  const jsonPath = path.join(process.cwd(), "constants", "cityList.json");
  const jsonText = await fs.readFile(jsonPath, "utf-8");
  const cityInfo = JSON.parse(jsonText);
  //console.log("cityInfoo",cityInfo)


  return {
    props: { cityInfo },
  };
};

export const CityContext = createContext<cityProps[]>([])


const Home: NextPage = ({ cityInfo }) => {
  return (
    <div className="items-center space-y-20">
      <Header/>
      <CityContext.Provider value={cityInfo}>
      <Form/>
      </CityContext.Provider>
    </div>
  );
};

export default Home;
