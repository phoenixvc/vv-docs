/**
 * Enhanced sidebar plugin for Docusaurus
 */
import path from "path"
import type { LoadContext, Plugin } from "@docusaurus/types"

interface EnhancedSidebarOptions {
  showProgressIndicators?: boolean
  collapsibleCategories?: boolean
  defaultCollapsed?: boolean
  sectionNumbering?: boolean
  progressData?: Record<string, boolean>
  sections?: any[]
}

export default function enhancedSidebarPlugin(context: LoadContext, options: EnhancedSidebarOptions): Plugin<void> {
  return {
    name: "enhanced-sidebar-plugin",

    // Extend the Docusaurus configuration
    configureWebpack() {
      return {
        resolve: {
          alias: {
            "@sidebar-utils": path.resolve(__dirname, "../src/utils/sidebar-utils"),
          },
        },
      }
    },

    // Inject data into the global site config
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              window.sidebarEnhancedConfig = {
                showProgressIndicators: ${options.showProgressIndicators ?? true},
                collapsibleCategories: ${options.collapsibleCategories ?? true},
                defaultCollapsed: ${options.defaultCollapsed ?? false},
                sectionNumbering: ${options.sectionNumbering ?? true},
                progressData: ${JSON.stringify(options.progressData || {})},
                sections: ${JSON.stringify(options.sections || [])}
              };
            `,
          },
        ],
      }
    },

    // Extend the theme components
    getThemePath() {
      return path.resolve(__dirname, "../src/theme")
    },

    // Extend the client modules
    getClientModules() {
      return [path.resolve(__dirname, "../src/css/sidebar-enhancements.css")]
    },
  }
}
