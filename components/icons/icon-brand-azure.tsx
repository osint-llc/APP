import type { SVGProps } from "react"

export const IconBrandAzure = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      data-slot="icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="url(#a)"
        d="M8.668 3h5.918L8.443 21.205a.94.94 0 0 1-.895.638H2.943A.94.94 0 0 1 2.05 20.6L7.773 3.645a.94.94 0 0 1 .895-.643z"
      />
      <path
        fill="#0078D4"
        d="M17.266 15.21H7.882a.434.434 0 0 0-.296.752l6.03 5.627a.95.95 0 0 0 .648.257h5.313z"
      />
      <path
        fill="url(#b)"
        d="M8.668 3a.94.94 0 0 0-.898.655L2.057 20.587a.94.94 0 0 0 .888 1.259H7.67a1.01 1.01 0 0 0 .773-.66l1.141-3.359 4.07 3.796a.97.97 0 0 0 .607.22h5.294l-2.323-6.634h-6.768l4.143-12.207z"
      />
      <path
        fill="url(#c)"
        d="M16.228 3.64a.94.94 0 0 0-.894-.64H8.74a.94.94 0 0 1 .893.64l5.723 16.96a.943.943 0 0 1-.893 1.246h6.595a.942.942 0 0 0 .893-1.246z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="16.023"
          x2="11.899"
          y1="4.398"
          y2="23.757"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#114A8B" />
          <stop offset="1" stopColor="#0669BC" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="14.239"
          x2="12.669"
          y1="12.859"
          y2="13.463"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity=".3" />
          <stop offset=".07" stopOpacity=".2" />
          <stop offset=".32" stopOpacity=".1" />
          <stop offset=".62" stopOpacity=".05" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="11.963"
          x2="18.709"
          y1="3.868"
          y2="21.841"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CCBF4" />
          <stop offset="1" stopColor="#2892DF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
