import React from "react";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";

import Counter from "../components/counter";
import Credits from "../components/credits";
import type { PopulationData } from "./api/data";

export default function Index({
  population,
  rate,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>How many people are there in the world?</title>
        <meta
          name="description"
          content="A live projection of the number of people alive in the world."
        />
      </Head>

      <div className="root">
        <div>
          <div>There are an estimated</div>
          <Counter className="counter" rate={rate} value={population} />
          <div>people in the world.</div>
        </div>

        <style global jsx>{`
          body {
            background: #fff;
            box-sizing: border-box;
            color: #080808;
            font-family: system-ui, sans-serif;
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
          .root {
            display: grid;
            height: 100vh;
            place-items: center;
          }

          .root > div {
            margin: auto auto 0 auto;
            text-align: center;
          }

          img {
            display: none;
          }
        `}</style>

        <Credits />

        {typeof window !== "undefined" &&
        window.location.host === "howmanypeoplearethereinthe.world" ? (
          <img
            alt=""
            src="https://howmanypeoplearethereintheworld.goatcounter.com/count?p=/"
          />
        ) : null}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  if (!process.env.ROOT_URL) {
    throw new Error("ROOT_URL ENV var not set");
  }

  const response = await fetch(`${process.env.ROOT_URL}/api/data`);
  const data = (await response.json()) as PopulationData;

  return {
    props: data,
  };
};
