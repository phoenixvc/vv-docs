import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function RiskManagement() {
  return (
    <section id="risk-management" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Risk Management
            <SectionAnchor id="risk-management" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai incorporates advanced risk management integrations to monitor, analyze, and mitigate risks
            across multiple blockchain networks. These tools provide real-time risk assessment and automated risk
            mitigation strategies.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold">Key Benefits of Risk Management Integrations:</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Real-time risk monitoring across multiple blockchains</li>
                <li>AI-powered risk prediction and analysis</li>
                <li>Automated risk mitigation strategies</li>
                <li>Comprehensive security threat detection</li>
                <li>Portfolio stress testing and scenario analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
