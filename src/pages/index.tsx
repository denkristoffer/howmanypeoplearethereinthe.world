import React from "react";
import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import Counter from "../components/counter";
import { PopulationData } from "./api/data";

interface IndexProps {
  children?: never;
  population: PopulationData["population"];
  rate: PopulationData["rate"];
}

const Index: NextComponentType<
  NextPageContext,
  { population: IndexProps["population"]; rate: IndexProps["rate"] },
  IndexProps
> = ({ population, rate }) => {
  return (
    <div>
      <Head>
        <title>How many people are there in the world?</title>
        <meta
          name="Description"
          content="A live projection of the number of people alive in the world."
        />
      </Head>

      <span>There are an estimated</span>
      <Counter className="counter" rate={rate} value={population} />
      <span>people in the world.</span>

      <style global jsx>{`
        body {
          background: #fff;
          color: #080808;
          font-family: system-ui, /* -apple-system, */ BlinkMacSystemFont,
            "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol";
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          transition: background 300ms ease-in-out;
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
  );
};

export const getServerSideProps: GetServerSideProps =  async ({ req: request }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fetch = require("node-fetch");
  const baseUrl = `http://${request.headers.host}`;
  const data = await fetch(`${baseUrl}/api/data`);
  const json = await data.json();

  return {
    props: {
      ...json,
    }
  };
};

export default Index;
