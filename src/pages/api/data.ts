import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.DATA_URL) {
  throw new Error("Missing ENV var");
}

const dataUrl = process.env.DATA_URL;

interface RawData {
  world: {
    last_updated: string;
    population: number;
    population_rate: number;
  };
}

const getData = async (): Promise<RawData> =>
  fetch(dataUrl)
    .then((response) => response.text())
    .then((data) => JSON.parse(data) as RawData);

export interface PopulationData {
  lastUpdated: string;
  population: number;
  rate: number;
}

const extractData = (data: RawData): PopulationData => {
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
};

export default async (
  _request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    const rawData = await getData();
    const data = extractData(rawData);

    response.status(200).json(data);
  } catch (error) {
    console.log("-----");
    console.log("error:");
    console.error(error);
    console.log("-----");

    response.status(500).send("");
  }
};
