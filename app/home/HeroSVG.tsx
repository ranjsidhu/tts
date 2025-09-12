export default function HeroSVG() {
  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full rounded-xl"
    >
      <title>Hero</title>
      {/* Background */}
      <rect width="600" height="400" fill="#1a1a1a" />

      {/* Abstract shapes */}
      <path
        d="M50,200 Q150,50 300,200 T550,200"
        stroke="#fbbf24"
        strokeWidth="4"
        fill="none"
        className="opacity-50 animate-[flow_3s_ease-in-out_infinite]"
      />
      <path
        d="M50,220 Q150,70 300,220 T550,220"
        stroke="#fbbf24"
        strokeWidth="4"
        fill="none"
        className="opacity-50 animate-[flow_3s_ease-in-out_infinite_0.5s]"
      />
      <path
        d="M50,240 Q150,90 300,240 T550,240"
        stroke="#fbbf24"
        strokeWidth="4"
        fill="none"
        className="opacity-50 animate-[flow_3s_ease-in-out_infinite_1s]"
      />

      {/* Books stack with hover effect */}
      <g className="transition-transform duration-300 hover:translate-y-1">
        <rect x="100" y="150" width="120" height="20" fill="#fbbf24" rx="2" />
        <rect x="90" y="170" width="140" height="20" fill="#f59e0b" rx="2" />
        <rect x="110" y="190" width="100" height="20" fill="#d97706" rx="2" />
      </g>

      {/* Mathematical symbols */}
      <text x="350" y="150" fill="#fbbf24" className="text-2xl">
        ∑
      </text>
      <text x="400" y="180" fill="#f59e0b" className="text-2xl">
        π
      </text>
      <text x="450" y="150" fill="#d97706" className="text-2xl">
        ×
      </text>

      {/* Grid pattern */}
      <g className="opacity-10">
        <path
          d="M0,50 h600 M0,100 h600 M0,150 h600 M0,200 h600 M0,250 h600 M0,300 h600 M0,350 h600"
          stroke="white"
          strokeWidth="1"
        />
        <path
          d="M50,0 v400 M100,0 v400 M150,0 v400 M200,0 v400 M250,0 v400 M300,0 v400 M350,0 v400 M400,0 v400 M450,0 v400 M500,0 v400 M550,0 v400"
          stroke="white"
          strokeWidth="1"
        />
      </g>

      {/* Floating particles */}
      <circle
        cx="200"
        cy="100"
        r="3"
        fill="#fbbf24"
        className="animate-[float_3s_ease-in-out_infinite]"
      />
      <circle
        cx="350"
        cy="250"
        r="3"
        fill="#fbbf24"
        className="animate-[float_3s_ease-in-out_infinite_0.5s]"
      />
      <circle
        cx="450"
        cy="150"
        r="3"
        fill="#fbbf24"
        className="animate-[float_3s_ease-in-out_infinite_1s]"
      />
      <circle
        cx="150"
        cy="300"
        r="3"
        fill="#fbbf24"
        className="animate-[float_3s_ease-in-out_infinite_1.5s]"
      />
      <circle
        cx="400"
        cy="80"
        r="3"
        fill="#fbbf24"
        className="animate-[float_3s_ease-in-out_infinite_2s]"
      />
    </svg>
  );
}
