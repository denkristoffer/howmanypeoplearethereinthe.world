"use client";

import React, { useEffect, useState } from "react";

import styles from "./counter.module.css";

const formatter = new Intl.NumberFormat("fr-FR");
const localizeNumber = (number: number): string => {
  return formatter.format(number);
};

interface CounterProps extends React.HTMLProps<HTMLSpanElement> {
  rate: number;
  value: number;
}

export default function Counter({
  rate,
  value: originalValue,
  ...props
}: CounterProps): React.ReactElement {
  const [value, setValue] = useState(originalValue);

  useEffect(() => {
    const oneBirthEvery = 1000 / rate;
    const timer = setTimeout(() => {
      setValue(value + 1);
    }, oneBirthEvery);

    return () => clearTimeout(timer);
  }, [rate, value]);

  const displayValue = localizeNumber(value);

  return (
    <span className={styles.root} {...props}>
      {displayValue}
    </span>
  );
}
