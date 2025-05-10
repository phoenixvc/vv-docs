export function PDFCoverPage({ title, documentType }: { title: string; documentType?: string }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl mb-8">VeritasVault.ai</p>
        <p className="text-lg text-muted-foreground">Multi-Chain Architecture</p>

        {/* Document type indicator */}
        {documentType && <p className="text-md text-muted-foreground mt-4 italic">{documentType}</p>}

        <div className="mt-12 text-sm text-muted-foreground">
          <p className="mb-1">Prepared by: VeritasVault Research Team</p>
          <p className="mb-1">Contact: research@veritasvault.ai</p>
          <p className="mb-1">Version: 1.0</p>
          <p>{currentDate}</p>
        </div>
      </div>
    </div>
  )
}
