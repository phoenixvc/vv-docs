import clsx from "clsx"
import Link from "@docusaurus/Link"
import { useThemeConfig } from "@docusaurus/theme-common"
import useBaseUrl from "@docusaurus/useBaseUrl"
import { useThemeContext } from "../ThemeProvider"
import styles from "./styles.module.css"

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to)
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true })

  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
    </Link>
  )
}

function FooterLogo({ sources, alt, width, height }) {
  const { isDarkTheme } = useThemeContext()
  const source = isDarkTheme && sources.dark ? sources.dark : sources.light
  return (
    <img
      className="footer__logo"
      alt={alt}
      src={useBaseUrl(source) || "/placeholder.svg"}
      width={width}
      height={height}
    />
  )
}

function MultiColumnLinks({ links }) {
  return (
    <div className="row footer__links">
      {links.map((linkItem, i) => (
        <div key={i} className="col footer__col">
          {linkItem.title != null ? <div className="footer__title">{linkItem.title}</div> : null}
          {linkItem.items != null && Array.isArray(linkItem.items) && linkItem.items.length > 0 ? (
            <ul className="footer__items">
              {linkItem.items.map((item, key) =>
                item.html ? (
                  <li
                    key={key}
                    className="footer__item"
                    dangerouslySetInnerHTML={{
                      __html: item.html,
                    }}
                  />
                ) : (
                  <li key={item.href || item.to} className="footer__item">
                    <FooterLink {...item} />
                  </li>
                ),
              )}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function SimpleLinks({ links }) {
  return (
    <div className="footer__links text--center">
      <div className="footer__items">
        {links.map((item, key) => (
          <span key={key} className="footer__link-separator">
            <FooterLink {...item} />
          </span>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  const { footer } = useThemeConfig()
  const { enhancedConfig } = useThemeContext()

  if (!footer) {
    return null
  }

  const { copyright, links = [], logo = {} } = footer
  const isCompactMode = enhancedConfig.enhancedFooter?.compactMode ?? false

  return (
    <footer
      className={clsx("footer", {
        "footer--dark": footer.style === "dark",
        [styles.enhancedFooter]: true,
        [styles.compactFooter]: isCompactMode,
      })}
    >
      <div className="container">
        {logo && (logo.src || logo.srcDark) && (
          <div className="margin-bottom--sm text--center">
            {logo.href ? (
              <Link href={logo.href} className={styles.footerLogoLink}>
                <FooterLogo
                  alt={logo.alt}
                  sources={{
                    light: logo.src,
                    dark: logo.srcDark || logo.src,
                  }}
                  width={logo.width}
                  height={logo.height}
                />
              </Link>
            ) : (
              <FooterLogo
                alt={logo.alt}
                sources={{
                  light: logo.src,
                  dark: logo.srcDark || logo.src,
                }}
                width={logo.width}
                height={logo.height}
              />
            )}
          </div>
        )}

        {links &&
          links.length > 0 &&
          (isCompactMode ? (
            <SimpleLinks links={links.flat().flatMap((item) => item.items)} />
          ) : (
            <MultiColumnLinks links={links} />
          ))}

        {(copyright || enhancedConfig.enhancedFooter?.showCopyright) && (
          <div className="footer__copyright">{copyright}</div>
        )}
      </div>
    </footer>
  )
}

export default Footer
