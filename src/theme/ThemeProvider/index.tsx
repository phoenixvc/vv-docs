"use client"

import { type ReactNode, useEffect, useState } from "react"
import { createThemeContext } from "@docusaurus/theme-common"
import { useThemeConfig } from "@docusaurus/theme-common"
import { type EnhancedThemeConfig, DEFAULT_THEME_CONFIG } from "../../theme"

type ThemeContextValue = {
  isDarkTheme: boolean
  setLightTheme: () => void
  setDarkTheme: () => void
  toggleTheme: () => void
  colorMode: {
    defaultMode: string
    disableSwitch: boolean
    respectPrefersColorScheme: boolean
  }
  enhancedConfig: EnhancedThemeConfig
}

const [ThemeProvider, useThemeContext] = createThemeContext<ThemeContextValue>({
  isDarkTheme: false,
  setLightTheme: () => {},
  setDarkTheme: () => {},
  toggleTheme: () => {},
  colorMode: {
    defaultMode: "light",
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },
  enhancedConfig: DEFAULT_THEME_CONFIG,
})

export { useThemeContext }

interface Props {
  children: ReactNode
}

export default function EnhancedThemeProvider({ children }: Props): JSX.Element {
  const themeConfig = useThemeConfig() as EnhancedThemeConfig
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Merge default config with user config
  const enhancedConfig = {
    ...DEFAULT_THEME_CONFIG,
    ...themeConfig,
    enhancedNavbar: {
      ...DEFAULT_THEME_CONFIG.enhancedNavbar,
      ...themeConfig.enhancedNavbar,
    },
    enhancedFooter: {
      ...DEFAULT_THEME_CONFIG.enhancedFooter,
      ...themeConfig.enhancedFooter,
    },
    enhancedCodeBlock: {
      ...DEFAULT_THEME_CONFIG.enhancedCodeBlock,
      ...themeConfig.enhancedCodeBlock,
    },
    enhancedColorMode: {
      ...DEFAULT_THEME_CONFIG.enhancedColorMode,
      ...themeConfig.enhancedColorMode,
    },
  }

  const colorMode = {
    defaultMode: themeConfig.colorMode?.defaultMode || "light",
    disableSwitch: themeConfig.colorMode?.disableSwitch || false,
    respectPrefersColorScheme: themeConfig.colorMode?.respectPrefersColorScheme || true,
  }

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark")
    } else if (colorMode.respectPrefersColorScheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkTheme(prefersDark)
    } else {
      setIsDarkTheme(colorMode.defaultMode === "dark")
    }

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light")
    document.documentElement.style.colorScheme = isDarkTheme ? "dark" : "light"
  }, [isDarkTheme, colorMode.defaultMode, colorMode.respectPrefersColorScheme])

  const setLightTheme = () => {
    localStorage.setItem("theme", "light")
    setIsDarkTheme(false)
  }

  const setDarkTheme = () => {
    localStorage.setItem("theme", "dark")
    setIsDarkTheme(true)
  }

  const toggleTheme = () => {
    isDarkTheme ? setLightTheme() : setDarkTheme()
  }

  return (
    <ThemeProvider
      value={{
        isDarkTheme,
        setLightTheme,
        setDarkTheme,
        toggleTheme,
        colorMode,
        enhancedConfig,
      }}
    >
      {children}
    </ThemeProvider>
  )
}
