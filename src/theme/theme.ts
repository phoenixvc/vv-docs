import type { ThemeConfig } from "@docusaurus/preset-classic"

export interface EnhancedThemeConfig extends ThemeConfig {
  enhancedNavbar?: {
    blurEffect?: boolean
    stickyNavbar?: boolean
    hideOnScroll?: boolean
    logoHeight?: number
    logoWidth?: number
  }
  enhancedFooter?: {
    compactMode?: boolean
    showLastUpdated?: boolean
    showCopyright?: boolean
  }
  enhancedCodeBlock?: {
    showLineNumbers?: boolean
    showCopyButton?: boolean
    defaultLanguage?: string
  }
  enhancedColorMode?: {
    respectPrefersColorScheme?: boolean
    switchConfig?: {
      darkIcon?: string
      lightIcon?: string
      darkIconStyle?: Record<string, string>
      lightIconStyle?: Record<string, string>
    }
  }
}

export const DEFAULT_THEME_CONFIG: EnhancedThemeConfig = {
  enhancedNavbar: {
    blurEffect: true,
    stickyNavbar: true,
    hideOnScroll: true,
    logoHeight: 32,
    logoWidth: 32,
  },
  enhancedFooter: {
    compactMode: false,
    showLastUpdated: true,
    showCopyright: true,
  },
  enhancedCodeBlock: {
    showLineNumbers: true,
    showCopyButton: true,
    defaultLanguage: "text",
  },
  enhancedColorMode: {
    respectPrefersColorScheme: true,
    switchConfig: {
      darkIcon: "moon",
      lightIcon: "sun",
    },
  },
}
