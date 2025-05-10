import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function RiskBotIntegration() {
  return (
    <section id="risk-bot-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Risk Bot Integration
            <SectionAnchor id="risk-bot-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with Risk Bot's advanced risk analysis platform to provide comprehensive risk
            assessment and management across multiple blockchain networks.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Real-time Risk Monitoring:</strong> Continuous assessment of portfolio risk factors.
            </li>
            <li className="text-base font-normal">
              <strong>AI-powered Analysis:</strong> Machine learning algorithms for risk prediction and mitigation.
            </li>
            <li className="text-base font-normal">
              <strong>Multi-chain Coverage:</strong> Risk assessment across different blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Automated Alerts:</strong> Proactive notification of potential risk factors.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The Risk Bot integration is implemented through a specialized module in the Core Protocol. This module
            interfaces with Risk Bot's API to retrieve risk assessments and incorporate them into portfolio optimization
            strategies.
          </p>
          <p className="text-base font-normal">
            Risk Bot's advanced analytics capabilities enhance VeritasVault.ai's risk management framework, enabling
            more informed decision-making and improved portfolio performance across multiple blockchain networks.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
