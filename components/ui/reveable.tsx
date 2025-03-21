"use client"

import React from "react"

import { IconBulletFill, IconEye, IconEyeOff } from "justd-icons"
import { Button } from "react-aria-components"

type RevealableProps = {
  children: string
}

const Revealable = ({ children }: RevealableProps) => {
  const [isRevealed, setIsRevealed] = React.useState(false)

  const toggleReveal = () => setIsRevealed(!isRevealed)

  return (
    <div className="flex min-w-56 max-w-56 items-center gap-x-2 font-mono">
      <div>
        {isRevealed ? (
          children
        ) : (
          <div className="flex items-center gap-x-1 *:data-[slot=icon]:size-2">
            {children.length > 1 && children.slice(0, 1)}
            <IconBulletFill />
            <IconBulletFill />
            <IconBulletFill />
            <IconBulletFill />
            <IconBulletFill />
            <IconBulletFill />
            <IconBulletFill />
            <IconBulletFill />
          </div>
        )}
      </div>
      <Button className="-mr-1.5 ml-auto" onPress={toggleReveal}>
        {isRevealed ? <IconEyeOff /> : <IconEye />}
      </Button>
    </div>
  )
}

export { Revealable }
