interface CircleProps {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}

interface Path {
  d: string;
  title: string;
  circle?: CircleProps;
}

export default function ContactSVG({ path }: { path: Path }) {
  return (
    <svg
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      fill="gold"
      width="64"
      height="64"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d={path.d}></path>
    </svg>
  );
}
