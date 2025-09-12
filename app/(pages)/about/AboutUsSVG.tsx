export default function AboutUsSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" fill="none">
      <title>About Us</title>
      {/* Background */}
      <rect width="600" height="400" fill="#F5F5F5" />

      {/* Desk */}
      <rect x="100" y="300" width="400" height="20" fill="#8B4513" />
      <rect x="120" y="250" width="360" height="50" fill="#D2691E" />

      {/* Book Stack */}
      <rect
        x="250"
        y="180"
        width="100"
        height="20"
        fill="#4682B4"
        transform="rotate(-5)"
      />
      <rect
        x="240"
        y="160"
        width="120"
        height="20"
        fill="#228B22"
        transform="rotate(3)"
      />
      <rect
        x="230"
        y="140"
        width="140"
        height="20"
        fill="#FFD700"
        transform="rotate(-2)"
      />

      {/* Student Silhouette */}
      <path
        d="M300 200 
       Q330 240, 300 280 
       Q270 240, 300 200Z"
        fill="#333333"
      />

      {/* Thought Bubble */}
      <path
        d="M350 150 
       Q380 130, 410 140 
       Q440 150, 430 180 
       Q420 210, 390 200 
       Q360 190, 350 150Z"
        fill="rgba(0,0,0,0.1)"
      />

      {/* Math and Science Elements */}
      <text x="380" y="170" fontFamily="Arial" fontSize="12" fill="#000">
        2x + 5 = 15
      </text>
      <circle
        cx="420"
        cy="130"
        r="10"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
      <path d="M400 130 L440 130" stroke="#000" strokeWidth="2" />

      {/* Rays of Light/Inspiration */}
      <g stroke="#FFD700" strokeWidth="3" opacity="0.6">
        <line x1="300" y1="100" x2="250" y2="50" />
        <line x1="300" y1="100" x2="350" y2="50" />
        <line x1="300" y1="100" x2="300" y2="30" />
      </g>
    </svg>
  );
}
