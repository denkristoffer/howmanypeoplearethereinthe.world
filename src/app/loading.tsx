import React from "react";

import Skeleton from "../components/skeleton";

export default function Loading() {
  return (
    <div>
      <div>There are an estimated</div>
      <Skeleton />
      <div>people in the world.</div>
    </div>
  );
}
