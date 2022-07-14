import { useState } from 'react'

function App() {
  const [count, setCount] = useState<'small' | 'max'>('small')

  return (
    <>
      <button className="hello" onClick={() => setCount('max')}>
        {count}
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100" style={{ width: '120px' }}>
        <defs>
          <linearGradient
            id="icon-bottom"
            x1="774.37"
            y1="140.57"
            x2="774.37"
            y2="25.45"
            gradientTransform="matrix(-0.88 0.47 0.47 0.88 687 -372)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00e155" />
            <stop offset="1" stopColor="#003f37" />
          </linearGradient>
          <linearGradient
            id="icon-top"
            x1="720"
            y1="39"
            x2="734"
            y2="108"
            gradientTransform="matrix(-0.9 0.44 0.44 0.9 657 -347)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fb304f" />
            <stop offset="1" stopColor="#fc0" />
          </linearGradient>
        </defs>
        <g>
          <g>
            <path
              d="M75.45 51.3L53.88 28.18a11.19 11.19 0 0 0-18.52 3.41L18 84.55A11.18 11.18 0 0 0 32.4 99.2l42.67-31.39s8.19-7.64.38-16.51z"
              opacity="0.8"
              fill="url(#icon-bottom)"
            />
            <path
              d="M5.05 47.57L31.81 71.8a11.19 11.19 0 0 0 16.92-6.41L64 14.17A11.18 11.18 0 0 0 47.05 1.88l-42 27a11.19 11.19 0 0 0 0 18.69z"
              opacity="0.9"
              fill="url(#icon-top)"
            />
            <path
              d="M24.37 65.07l11-33.48a11.19 11.19 0 0 1 18.52-3.41L58.38 33l-9.65 32.4a11.19 11.19 0 0 1-16.92 6.4z"
              fill="#ffd739"
            />
          </g>
        </g>
      </svg>
    </>
  )
}

export default App
