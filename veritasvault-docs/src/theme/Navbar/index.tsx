"use client"

import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import { useThemeConfig } from "@docusaurus/theme-common"
import { useHideableNavbar, useNavbarMobileSidebar } from "@docusaurus/theme-common/internal"
import NavbarItem from "@theme/NavbarItem"
import NavbarLogo from "@theme/NavbarLogo"
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle"
import NavbarSearch from "@theme/Navbar/Search"
import SearchBar from "@theme/SearchBar"
import { useThemeContext } from "../ThemeProvider"
import styles from "./styles.module.css"

function NavbarContent() {
  const { enhancedConfig } = useThemeContext()
  const mobileSidebar = useNavbarMobileSidebar()
  const {
    navbar: { items, hideOnScroll, style },
  } = useThemeConfig()

  const hasSearchNavbarItem = items.some((item) => item.type === "search")

  return (
    <div className="navbar__inner">
      <div className="navbar__items">
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        <NavbarLogo />
        {items
          .filter((item) => item.position === "left")
          .map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
      </div>
      <div className="navbar__items navbar__items--right">
        {items
          .filter((item) => item.position === "right")
          .map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        {!hasSearchNavbarItem && (
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
        )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const { enhancedConfig } = useThemeContext()
  const { navbarRef, isNavbarVisible } = useHideableNavbar(enhancedConfig.enhancedNavbar?.hideOnScroll ?? true)

  const [hasScrolled, setHasScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setHasScrolled(scrollTop > 0)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <nav
      ref={navbarRef}
      className={clsx("navbar", "navbar--fixed-top", {
        "navbar--dark": enhancedConfig.navbar?.style === "dark",
        "navbar--primary": enhancedConfig.navbar?.style === "primary",
        "navbar-sidebar--show": false,
        [styles.navbarHidden]: !isNavbarVisible,
        [styles.navbarScrolled]: hasScrolled,
        [styles.navbarBlurred]: enhancedConfig.enhancedNavbar?.blurEffect && hasScrolled,
      })}
    >
      <NavbarContent />
    </nav>
  )
}
