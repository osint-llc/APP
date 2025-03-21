import type { SVGProps } from "react"

export const IconBrandDo = (props: SVGProps<SVGSVGElement>) => {
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
      <g fill="#0080FF" clipRule="evenodd" fillRule="evenodd">
        <path d="M12 22.01v-3.878c4.106 0 7.292-4.07 5.716-8.39a5.8 5.8 0 0 0-3.459-3.459c-4.32-1.565-8.39 1.61-8.39 5.715H2C2 5.456 8.327.353 15.187 2.496c2.994.942 5.386 3.322 6.316 6.316 2.143 6.871-2.948 13.198-9.502 13.198" />
        <path d="M8.157 18.144h3.855v-3.855H8.157zm-2.97 2.97h2.97v-2.97h-2.97zm-2.484-2.97h2.483V15.66H2.703z" />
      </g>
    </svg>
  )
}
