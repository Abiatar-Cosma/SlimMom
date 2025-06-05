const Loader = () => {
  const shades = [
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        width="320"
        height="100"
        viewBox="0 0 320 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,50 Q70,10 160,50 Q250,90 300,50 Q250,70 160,50 Q70,30 20,50 Z"
          fill="#4CAF50"
        />

        {[60, 100, 140, 180, 220, 260].map((cx, i) => (
          <circle key={i} cx={cx} cy="50" r="6" fill={shades[i]}>
            <animate
              attributeName="cy"
              values="50;35;50"
              dur="0.8s"
              repeatCount="indefinite"
              begin={`${i * 0.15}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default Loader;
