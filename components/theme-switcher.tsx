"use client"

import { IconDeviceDesktop2, IconMoon, IconSun } from "justd-icons"
import { useTheme } from "next-themes"
import { Button, composeTailwindRenderProps } from "ui"

export function ThemeSwitcher({
  shape = "circle",
  intent = "plain",
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    setTheme(nextTheme)
  }

  return (
    <Button
      shape={shape}
      intent={intent}
      size="square-petite"
      className={composeTailwindRenderProps(className, "**:data-[slot=icon]:text-fg")}
      aria-label="Switch theme"
      onPress={toggleTheme}
      {...props}
    >
      {theme === "light" ? (
        <IconSun className="animate-in" />
      ) : theme === "dark" ? (
        <IconMoon className="animate-in" />
      ) : theme === "system" ? (
        <IconDeviceDesktop2 className="animate-in" />
      ) : null}
    </Button>
  )
}
