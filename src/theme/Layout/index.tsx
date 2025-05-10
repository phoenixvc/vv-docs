import clsx from "clsx"
import ErrorBoundary from "@docusaurus/ErrorBoundary"
import { PageMetadata, ThemeClassNames } from "@docusaurus/theme-common"
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal"
import SkipToContent from "@theme/SkipToContent"
import AnnouncementBar from "@theme/AnnouncementBar"
import Navbar from "@theme/Navbar"
import Footer from "@theme/Footer"
import LayoutProvider from "@theme/Layout/Provider"
import { useThemeContext } from "../ThemeProvider"
import styles from "./styles.module.css"

export default function Layout(props) {
  const { children, noFooter, wrapperClassName, title, description, image, keywords, permalink, pageClassName } = props

  const { enhancedConfig } = useThemeContext()

  useKeyboardNavigation()

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} keywords={keywords} image={image} permalink={permalink} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <div
        className={clsx(
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          styles.enhancedMainWrapper,
          wrapperClassName,
          pageClassName,
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorBoundary {...params} />}>{children}</ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  )
}
