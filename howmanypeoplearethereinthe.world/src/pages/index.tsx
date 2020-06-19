import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Counter from "../components/counter";
import { PopulationData } from "./api/data";
import type { Fetch } from "../lib/types";

interface IndexProps {
  population: PopulationData["population"];
  rate: PopulationData["rate"];
}

export default function Index({
  population,
  rate,
}: IndexProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>How many people are there in the world?</title>
        <meta
          name="description"
          content="A live projection of the number of people alive in the world."
        />
      </Head>

      <div>
        <span>There are an estimated</span>
        <Counter className="counter" rate={rate} value={population} />
        <span>people in the world.</span>

        <style global jsx>{`
          body {
            background: #fff;
            box-sizing: border-box;
            color: #080808;
            font-family: system-ui, -apple-system, "Segoe UI", Helvetica, Arial,
              sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol";
            margin: 0;
            padding: 0;
          }

          @media (prefers-color-scheme: dark) {
            body {
              background: #181a1c;
              color: #fdfdfd;
            }
          }
        `}</style>
        <style jsx>{`
          div {
            align-items: center;
            display: flex;
            flex-direction: column;
            height: 100vh;
            justify-content: center;
            width: 100vw;
          }

          .counter {
            margin: 10px 0 0;
          }
        `}</style>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req: request,
}) => {
  if (!request.headers.host) {
    throw new Error("Host header not set");
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fetch = require("node-fetch") as Fetch;
  const baseUrl = `http://${request.headers.host}`;
  const data = await fetch(`${baseUrl}/api/data`);
  const json = (await data.json()) as PopulationData;

  return {
    props: {
      ...json,
    },
  };
};
