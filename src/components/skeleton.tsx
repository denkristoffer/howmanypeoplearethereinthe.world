import React from "react";

import styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <svg className={styles.root} role="img" aria-label="loading" width="100%">
      <title>loading</title>
      <rect
        className={styles.rect}
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip)"
      />

      <defs>
        <clipPath id="clip">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </clipPath>

        <linearGradient id="light">
          <stop stopColor="#e5ebed" offset="0%" stopOpacity="1">
            <animate
              id="animation"
              attributeName="stop-color"
              values="#e5ebed;#f7f9fa;#e5ebed"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop stopColor="#f7f9fa" offset="50%" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="#e5ebed;#f7f9fa;#e5ebed"
              begin="animation.begin+0.25s"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop stopColor="#e5ebed" offset="100%" stopOpacity="1">
            <animate
              attributeName="stop-color"
              begin="animation.begin+0.5s"
              values="#e5ebed;#f7f9fa;#e5ebed;"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        <linearGradient id="dark">
          <stop stopColor="#202a2e" offset="0%" stopOpacity="1">
            <animate
              id="animation"
              attributeName="stop-color"
              values="#202a2e;#172024;#202a2e"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop stopColor="#172024" offset="50%" stopOpacity="1">
            <animate
              attributeName="stop-color"
              values="#202a2e;#172024;#202a2e"
              begin="animation.begin+0.25s"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop stopColor="#202a2e" offset="100%" stopOpacity="1">
            <animate
              attributeName="stop-color"
              begin="animation.begin+0.5s"
              values="#202a2e;#172024;#202a2e;"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
