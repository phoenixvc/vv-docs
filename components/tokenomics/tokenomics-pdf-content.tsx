import { Card, CardContent } from "@/components/ui/card"

export function TokenomicsPDFContent() {
  return (
    <div className="space-y-8 print-content">
      {/* Tokenomics Overview */}
      <section id="tokenomics-overview" className="tokenomics-section">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Tokenomics Overview</h2>
            <p className="mb-4 text-base font-normal">
              The VeritasVault.ai ecosystem is powered by the VVAI token, which serves as the primary utility and
              governance token within the platform. Our tokenomics model is designed to align incentives among all
              stakeholders and ensure the long-term sustainability of the ecosystem.
            </p>
            <p className="text-base font-normal">
              The VVAI token has a total supply of 100 million tokens, distributed across various stakeholders including
              the team, investors, community, and ecosystem development fund. The token distribution is designed to
              ensure a fair and sustainable allocation that supports the long-term growth of the platform.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Token Distribution */}
      <section id="token-distribution" className="tokenomics-section">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Token Distribution</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Initial Allocation</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Team & Advisors:</strong> 20% (2-year vesting with 6-month cliff)
                </li>
                <li className="text-base font-normal">
                  <strong>Ecosystem Development:</strong> 25% (allocated for grants, partnerships, and development)
                </li>
                <li className="text-base font-normal">
                  <strong>Community & Users:</strong> 30% (rewards, airdrops, and incentives)
                </li>
                <li className="text-base font-normal">
                  <strong>Treasury:</strong> 15% (platform operations and emergency reserves)
                </li>
                <li className="text-base font-normal">
                  <strong>Private Sale:</strong> 10% (1-year vesting with 3-month cliff)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Vesting Schedule</h3>
              <p className="mb-4 text-base font-normal">
                To ensure long-term alignment of incentives and prevent market disruption, tokens allocated to the team,
                advisors, and private sale investors are subject to vesting periods:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Team & Advisors:</strong> 2-year vesting with 6-month cliff, followed by monthly unlocks
                </li>
                <li className="text-base font-normal">
                  <strong>Private Sale:</strong> 1-year vesting with 3-month cliff, followed by monthly unlocks
                </li>
                <li className="text-base font-normal">
                  <strong>Ecosystem Development:</strong> 3-year gradual release based on milestone achievements
                </li>
                <li className="text-base font-normal">
                  <strong>Community & Users:</strong> Released over 4 years through various incentive programs
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Token Utility */}
      <section id="token-utility" className="tokenomics-section">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Token Utility</h2>
            <p className="mb-4 text-base font-normal">
              The VVAI token is designed with multiple utilities to drive value accrual and ecosystem growth:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-base font-normal">
                <strong>Governance:</strong> VVAI holders can vote on protocol upgrades, parameter changes, and treasury
                allocations. Voting power is proportional to the number of tokens held or staked.
              </li>
              <li className="text-base font-normal">
                <strong>Fee Discounts:</strong> Users can receive discounts on platform fees by holding or staking VVAI
                tokens. The discount rate increases with the number of tokens held.
              </li>
              <li className="text-base font-normal">
                <strong>Staking Rewards:</strong> Users can stake VVAI tokens to earn rewards from protocol fees and
                token emissions. Staking also increases voting power in governance decisions.
              </li>
              <li className="text-base font-normal">
                <strong>Access to Premium Features:</strong> Certain advanced portfolio management tools and features
                are only accessible to users who hold a minimum number of VVAI tokens.
              </li>
              <li className="text-base font-normal">
                <strong>Liquidity Mining:</strong> Users can provide liquidity to VVAI trading pairs and earn rewards in
                the form of additional VVAI tokens.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Token Governance */}
      <section id="token-governance" className="tokenomics-section">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Token Governance</h2>
            <p className="mb-4 text-base font-normal">
              The VVAI token enables decentralized governance of the VeritasVault.ai platform through a transparent and
              inclusive decision-making process:
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Governance Process</h3>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Proposal Submission:</strong> Any user holding at least 1% of the total VVAI supply can submit
                  a governance proposal.
                </li>
                <li className="text-base font-normal">
                  <strong>Discussion Period:</strong> Each proposal undergoes a 7-day discussion period for community
                  feedback and refinement.
                </li>
                <li className="text-base font-normal">
                  <strong>Voting Period:</strong> After the discussion period, proposals enter a 5-day voting period
                  where VVAI holders can cast their votes.
                </li>
                <li className="text-base font-normal">
                  <strong>Implementation:</strong> If approved, proposals are implemented by the protocol according to
                  the specified timeline.
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Voting Power</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Basic Voting:</strong> 1 VVAI token = 1 vote
                </li>
                <li className="text-base font-normal">
                  <strong>Staked Voting:</strong> Staked VVAI tokens receive a voting multiplier based on the staking
                  duration
                </li>
                <li className="text-base font-normal">
                  <strong>Delegation:</strong> Token holders can delegate their voting power to other addresses
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Token Economics */}
      <section id="token-economics" className="tokenomics-section">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Token Economics</h2>
            <p className="mb-4 text-base font-normal">
              The VVAI token economics are designed to create a sustainable ecosystem with balanced incentives for all
              participants:
            </p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Supply Dynamics</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Initial Supply:</strong> 100 million VVAI tokens
                </li>
                <li className="text-base font-normal">
                  <strong>Emission Schedule:</strong> Gradual release over 5 years to incentivize long-term
                  participation
                </li>
                <li className="text-base font-normal">
                  <strong>Supply Cap:</strong> Maximum supply capped at 150 million tokens
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Value Accrual Mechanisms</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-base font-normal">
                  <strong>Fee Sharing:</strong> 50% of platform fees are distributed to VVAI stakers
                </li>
                <li className="text-base font-normal">
                  <strong>Buyback and Burn:</strong> 30% of platform fees are used to buy back and burn VVAI tokens,
                  reducing the circulating supply
                </li>
                <li className="text-base font-normal">
                  <strong>Treasury Allocation:</strong> 20% of platform fees are allocated to the treasury for ecosystem
                  development
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
