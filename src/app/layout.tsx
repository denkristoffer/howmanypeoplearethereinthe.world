import React, { type ReactNode } from "react";

import "./global.css";
import styles from "./layout.module.css";
import Credits from "../components/credits";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>How many people are there in the world?</title>
        <meta
          name="description"
          content="A live projection of the number of people alive in the world."
        />
      </head>

      <body>
        <div className={styles.root}>
          {children}

          <Credits />

          {typeof window !== "undefined" &&
          window.location.host === "howmanypeoplearethereinthe.world" ? (
            <img
              className={styles.img}
              alt=""
              src="https://howmanypeoplearethereintheworld.goatcounter.com/count?p=/"
            />
          ) : null}
        </div>
      </body>
    </html>
  );
}
