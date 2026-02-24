import { SVGProps } from "react";

export function MenorahDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-full flex justify-center py-8">
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-breslev-gold opacity-80"
        {...props}
      >
        <path
          d="M60 10 C60 25, 50 35, 60 50 C70 35, 60 25, 60 10 Z"
          fill="currentColor"
        />
        <path
          d="M20 20 C20 40, 55 55, 60 60 C65 55, 100 40, 100 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M35 15 C35 35, 55 50, 60 55 C65 50, 85 35, 85 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 10 C50 30, 58 45, 60 50 C62 45, 70 30, 70 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <line
          x1="60"
          y1="50"
          x2="60"
          y2="60"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="10"
          y1="30"
          x2="110"
          y2="30"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
      </svg>
    </div>
  );
}

export function ClassicOrnamentDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-full flex justify-center py-12">
      <svg
        width="200"
        height="24"
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-breslev-gold opacity-70"
        {...props}
      >
        <path d="M0 12 H80" stroke="currentColor" strokeWidth="1" />
        <path d="M120 12 H200" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="12" r="4" fill="currentColor" />
        <circle cx="88" cy="12" r="2" fill="currentColor" />
        <circle cx="112" cy="12" r="2" fill="currentColor" />
        <path d="M100 4 L104 12 L100 20 L96 12 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
