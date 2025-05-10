import "./css/custom.css"

// Export theme constants
export const ThemeConstants = {
  colorMode: {
    defaultMode: "light",
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },
  navbar: {
    hideOnScroll: true,
  },
  footer: {
    style: "dark",
  },
}

// This default export is required for theme packages
export default {
  name: "docusaurus-enhanced-theme",
  options: ({ options }) => options,
}
