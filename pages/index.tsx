import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import * as fs from 'fs/promises'
import * as path from 'path'
import Form from "../components/molecules/Form/Form";
import Header from "../components/organisms/Header/Header"

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



const Home: NextPage = ({ cityInfo }) => {
  return (
    <div>
      <Header />
      <Form props={cityInfo}/>
    </div>
  );
};

export default Home;
