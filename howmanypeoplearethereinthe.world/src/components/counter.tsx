import React, { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("fr-FR");
const localizeNumber = (number: number): string => {
  return formatter.format(number);
};

interface CounterProps extends React.HTMLProps<HTMLSpanElement> {
  rate: number;
  value: number;
}

const Counter = ({
  rate,
  value: originalValue,
  ...props
}: CounterProps): React.ReactElement => {
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
    <span {...props}>
      {displayValue}

      <style jsx>{`
        span {
          font-size: calc(48px + 104 * (100vw - 320px) / 1728);
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </span>
  );
};

export default Counter;
