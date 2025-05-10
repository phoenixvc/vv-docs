import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { SecurityArchitectureDiagram } from "./security-architecture-diagram"

export function SecurityArchitectureOverview() {
  return (
    <section id="security-architecture" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Security Architecture
            <SectionAnchor id="security-architecture" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai's security architecture is designed with a defense-in-depth approach, implementing multiple
            layers of security controls to protect against various threats. This comprehensive security framework
            ensures the integrity, confidentiality, and availability of user assets and data across multiple blockchain
            networks.
          </p>

          <h3 className="text-xl font-semibold mb-3">Security Architecture Layers</h3>

          <div className="mb-6">
            <SecurityArchitectureDiagram />
          </div>

          <h3 className="text-xl font-semibold mb-2">Key Security Components</h3>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-medium">Perimeter Security</h4>
              <p className="text-base font-normal">
                The first line of defense includes DDoS protection, Web Application Firewalls (WAF), and API gateways
                that filter and validate incoming traffic before it reaches the application servers.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-medium">Application Security</h4>
              <p className="text-base font-normal">
                Secure coding practices, input validation, output encoding, and regular security testing ensure that the
                application itself is resilient against common vulnerabilities such as injection attacks, cross-site
                scripting, and broken authentication.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-medium">Data Security</h4>
              <p className="text-base font-normal">
                All sensitive data is encrypted both in transit and at rest using industry-standard encryption
                algorithms. Access to data is strictly controlled through role-based access control (RBAC) and the
                principle of least privilege.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="text-lg font-medium">Blockchain Security</h4>
              <p className="text-base font-normal">
                Specialized security measures for blockchain interactions include multi-signature wallets, transaction
                verification, and secure key management. Integration with EigenLayer enhances security through restaking
                capabilities.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-lg font-medium">Monitoring and Incident Response</h4>
              <p className="text-base font-normal">
                Continuous monitoring of system activities, real-time threat detection, and automated alerting enable
                rapid response to security incidents. A comprehensive incident response plan ensures that security
                events are handled efficiently and effectively.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">Cross-Chain Security Considerations</h3>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai's multi-chain architecture introduces unique security challenges that are addressed through
            specialized security controls:
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Cross-Chain Transaction Verification:</strong> All cross-chain transactions are verified through
              multiple independent validators before execution.
            </li>
            <li className="text-base font-normal">
              <strong>Bridge Security:</strong> Custom security protocols for cross-chain bridges minimize the risk of
              bridge exploits and ensure the integrity of cross-chain asset transfers.
            </li>
            <li className="text-base font-normal">
              <strong>Chain-Specific Security Measures:</strong> Security controls are tailored to the specific
              characteristics and vulnerabilities of each blockchain network.
            </li>
            <li className="text-base font-normal">
              <strong>Consensus Mechanism Security:</strong> The platform leverages the security properties of each
              blockchain's consensus mechanism while implementing additional security layers where needed.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Security Compliance and Certification</h3>

          <p className="text-base font-normal">
            VeritasVault.ai adheres to industry-standard security frameworks and best practices, including NIST
            Cybersecurity Framework, ISO 27001, and OWASP Top 10. Regular security audits and penetration testing by
            independent third parties ensure that the platform maintains the highest security standards.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
