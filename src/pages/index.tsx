import React from "react";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";

import Counter from "../components/counter";
import { PopulationData } from "./api/data";

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
