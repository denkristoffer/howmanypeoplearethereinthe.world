import React from "react";

import Counter from "../components/counter";
import styles from "./index.module.css";

interface RawData {
  world: {
    last_updated: string;
    population: number;
    population_rate: number;
  };
}

export interface PopulationData {
  lastUpdated: string;
  population: number;
  rate: number;
}

function extractData(data: RawData): PopulationData {
  const {
    last_updated: lastUpdated,
    population,
    population_rate: rate,
  } = data.world;

  return {
    lastUpdated,
    population,
    rate,
  };
}

async function getData() {
  if (!process.env.DATA_URL) {
    throw new Error("Missing URL");
  }

  const data = await fetch(process.env.DATA_URL)
    .then((response) => response.text())
    .then((data) => JSON.parse(data) as RawData);

  return extractData(data);
}

export default async function Index() {
  const { rate, population } = await getData();

  return (
    <div className={styles.root}>
      <div>There are an estimated</div>
      <Counter rate={rate} value={population} />
      <div>people in the world.</div>
    </div>
  );
}
