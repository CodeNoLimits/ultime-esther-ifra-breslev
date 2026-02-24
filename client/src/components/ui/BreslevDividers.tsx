import { SVGProps } from "react";

export function TorahFloralDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-full flex justify-center py-6">
      <svg
        viewBox="0 0 800 40"
        width="100%"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Lignes latérales */}
        <line
          x1="0"
          y1="20"
          x2="350"
          y2="20"
          stroke="#d4a843"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <line
          x1="450"
          y1="20"
          x2="800"
          y2="20"
          stroke="#d4a843"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Motif floral central */}
        <path
          d="M370,20 Q385,0 400,20 T430,20"
          fill="none"
          stroke="#d4a843"
          strokeWidth="1.5"
        />
        <path
          d="M370,20 Q385,40 400,20 T430,20"
          fill="none"
          stroke="#d4a843"
          strokeWidth="1.5"
        />
        <circle cx="400" cy="20" r="4" fill="#d4a843" />
        <circle cx="360" cy="20" r="2" fill="#d4a843" />
        <circle cx="440" cy="20" r="2" fill="#d4a843" />
      </svg>
    </div>
  );
}

export function MagenDavidDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-full flex justify-center py-6">
      <svg
        viewBox="0 0 800 40"
        width="100%"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Lignes latérales */}
        <line
          x1="0"
          y1="20"
          x2="375"
          y2="20"
          stroke="#d4a843"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <line
          x1="425"
          y1="20"
          x2="800"
          y2="20"
          stroke="#d4a843"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Etoile de David (2 triangles entrelacés) */}
        <polygon
          points="400,8 412,28 388,28"
          stroke="#d4a843"
          fill="none"
          strokeWidth="1.5"
        />
        <polygon
          points="400,32 388,12 412,12"
          stroke="#d4a843"
          fill="none"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export function FiligreeDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-full flex justify-center py-6">
      <svg
        viewBox="0 0 800 40"
        width="100%"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {/* Motif en filigrane entrelacé continu */}
        <path
          d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20"
          fill="none"
          stroke="#d4a843"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <path
          d="M0,20 Q50,40 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20"
          fill="none"
          stroke="#d4a843"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        {/* Point central éclatant */}
        <circle cx="400" cy="20" r="3" fill="#d4a843" opacity="0.8" />
        <circle cx="200" cy="20" r="1.5" fill="#d4a843" opacity="0.5" />
        <circle cx="600" cy="20" r="1.5" fill="#d4a843" opacity="0.5" />
      </svg>
    </div>
  );
}
