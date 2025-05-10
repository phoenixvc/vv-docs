export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 mt-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} VeritasVault.ai. All rights reserved.
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
          Version 0.1.0 | Last Updated: May 7, 2025
        </p>
      </div>
    </footer>
  )
}
