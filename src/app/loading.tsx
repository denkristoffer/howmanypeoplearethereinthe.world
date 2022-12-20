import React from "react";

import Skeleton from "../components/skeleton";
import styles from "./index.module.css";

export default function Loading() {
  return (
    <div className={styles.root}>
      <div>There are an estimated</div>
      <Skeleton />
      <div>people in the world.</div>
    </div>
  );
}
