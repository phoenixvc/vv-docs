"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { SectionLevelOne } from "@/components/section-templates/section-level-one"
import { SectionLevelTwo } from "@/components/section-templates/section-level-two"
import { SectionLevelThree } from "@/components/section-templates/section-level-three"
import { ContentBlock } from "@/components/section-templates/content-block"
import { CodeExampleBlock } from "@/components/section-templates/code-example-block"
import { DiagramBlock } from "@/components/section-templates/diagram-block"
import { TableBlock } from "@/components/section-templates/table-block"
import { InteractiveBlock } from "@/components/section-templates/interactive-block"
import { CalloutBlock } from "@/components/section-templates/callout-block"
import { SectionNavigation } from "@/components/section-templates/section-navigation"
import { SectionProgress } from "@/components/section-templates/section-progress"
import { SectionToc } from "@/components/section-templates/section-toc"
import { PageHeader } from "@/components/page-header"

export default function ExamplePage() {
  const [activeSection, setActiveSection] = useState("tokenomics")
  const breadcrumbs = [
    { label: "Home", value: "/" },
    { label: "Tokenomics", value: "tokenomics" },
  ]

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Layout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      previousPage={{ title: "Technical Infrastructure", href: "/technical-infrastructure" }}
      nextPage={{ title: "Security", href: "/security" }}
    >
      <PageHeader
        title="Tokenomics"
        description="VVAI Token Economics and Governance"
        breadcrumbs={breadcrumbs}
        onNavigate={handleNavigate}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar with section TOC */}
        <div className="md:col-span-1 md:order-2">
          <div className="md:sticky md:top-24 space-y-6">
            <SectionToc sectionId="tokenomics" title="On this page" />
            <SectionProgress sectionId="tokenomics" />
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3 md:order-1">
          <SectionLevelOne
            id="tokenomics"
            title="Tokenomics"
            description="Comprehensive overview of the VVAI token economics and governance model"
            sectionNumber="5"
          >
            <SectionLevelTwo
              id="tokenomics-overview"
              title="Tokenomics Overview"
              description="Introduction to the dual-token system and economic model"
              sectionNumber="5.1"
            >
              <ContentBlock>
                <p className="mb-4">
                  VeritasVault.ai implements a dual-token system designed to optimize utility, governance, and value
                  accrual within the ecosystem. The two tokens, VVAI and VV-X, serve complementary functions to create a
                  balanced economic model that supports platform growth and user engagement.
                </p>
                <p className="mb-4">The tokenomics model is designed with several key objectives:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Align incentives between users, developers, and token holders</li>
                  <li>Create sustainable value accrual mechanisms</li>
                  <li>Enable effective decentralized governance</li>
                  <li>Support long-term ecosystem growth</li>
                  <li>Provide utility across multiple blockchain networks</li>
                </ul>
              </ContentBlock>

              <CalloutBlock title="Key Tokenomics Principles" variant="info">
                <p>
                  The dual-token model separates governance rights (VVAI) from utility functions (VV-X), allowing for
                  more efficient token economics and reduced volatility for platform users.
                </p>
              </CalloutBlock>
            </SectionLevelTwo>

            <SectionLevelTwo
              id="token-model"
              title="Token Model"
              description="Detailed explanation of the token distribution and vesting schedule"
              sectionNumber="5.2"
            >
              <ContentBlock>
                <p className="mb-4">
                  The token model is structured to ensure fair distribution and long-term alignment of incentives among
                  all stakeholders in the VeritasVault.ai ecosystem.
                </p>
              </ContentBlock>

              <SectionLevelThree
                id="token-distribution"
                title="Token Distribution"
                description="Allocation of tokens across different stakeholder groups"
                sectionNumber="5.2.1"
              >
                <DiagramBlock
                  title="VVAI Token Distribution"
                  description="Initial allocation of VVAI governance tokens"
                  imageSrc="/token-distribution-pie-chart.png"
                  imageAlt="VVAI Token Distribution Chart"
                  caption="Total supply: 100,000,000 VVAI tokens"
                  width={600}
                  height={400}
                />

                <TableBlock
                  title="Token Allocation Breakdown"
                  description="Detailed allocation percentages and purposes"
                  columns={[
                    { header: "Allocation", accessorKey: "allocation" },
                    { header: "Percentage", accessorKey: "percentage" },
                    { header: "Amount", accessorKey: "amount" },
                    { header: "Purpose", accessorKey: "purpose" },
                  ]}
                  data={[
                    {
                      allocation: "Community Treasury",
                      percentage: "30%",
                      amount: "30,000,000",
                      purpose: "Ecosystem development, grants, and community initiatives",
                    },
                    {
                      allocation: "Team & Advisors",
                      percentage: "20%",
                      amount: "20,000,000",
                      purpose: "Compensation for core team and advisors",
                    },
                    {
                      allocation: "Private Sale",
                      percentage: "15%",
                      amount: "15,000,000",
                      purpose: "Early investors and strategic partners",
                    },
                    {
                      allocation: "Public Sale",
                      percentage: "10%",
                      amount: "10,000,000",
                      purpose: "Initial DEX offering and exchange listings",
                    },
                    {
                      allocation: "Liquidity Provision",
                      percentage: "10%",
                      amount: "10,000,000",
                      purpose: "Market making and exchange liquidity",
                    },
                    {
                      allocation: "Staking Rewards",
                      percentage: "15%",
                      amount: "15,000,000",
                      purpose: "Incentives for token staking and platform participation",
                    },
                  ]}
                />
              </SectionLevelThree>

              <SectionLevelThree
                id="token-vesting"
                title="Token Vesting Schedule"
                description="Release schedule for allocated tokens"
                sectionNumber="5.2.2"
              >
                <ContentBlock>
                  <p className="mb-4">
                    To ensure long-term commitment and prevent market disruption, tokens allocated to team members,
                    advisors, and investors are subject to vesting schedules.
                  </p>
                </ContentBlock>

                <DiagramBlock
                  title="Vesting Timeline"
                  description="Visual representation of token release schedule"
                  imageSrc="/token-vesting-timeline.png"
                  imageAlt="Token Vesting Schedule Timeline"
                  caption="4-year vesting schedule with various cliff periods depending on allocation"
                  width={700}
                  height={300}
                />

                <TableBlock
                  title="Vesting Schedule Details"
                  description="Specific vesting terms for each allocation"
                  columns={[
                    { header: "Allocation", accessorKey: "allocation" },
                    { header: "Cliff Period", accessorKey: "cliff" },
                    { header: "Vesting Duration", accessorKey: "duration" },
                    { header: "Release Schedule", accessorKey: "schedule" },
                  ]}
                  data={[
                    {
                      allocation: "Team & Advisors",
                      cliff: "12 months",
                      duration: "36 months",
                      schedule: "Linear monthly vesting after cliff",
                    },
                    {
                      allocation: "Private Sale",
                      cliff: "6 months",
                      duration: "24 months",
                      schedule: "Linear monthly vesting after cliff",
                    },
                    {
                      allocation: "Public Sale",
                      cliff: "None",
                      duration: "12 months",
                      schedule: "25% at TGE, then linear monthly vesting",
                    },
                    {
                      allocation: "Community Treasury",
                      cliff: "None",
                      duration: "48 months",
                      schedule: "Controlled by governance votes",
                    },
                  ]}
                />
              </SectionLevelThree>
            </SectionLevelTwo>

            <SectionLevelTwo
              id="token-utility"
              title="Token Utility"
              description="Use cases and functionality of both tokens in the ecosystem"
              sectionNumber="5.3"
            >
              <ContentBlock>
                <p className="mb-4">
                  Both VVAI and VV-X tokens have distinct utilities within the VeritasVault.ai ecosystem, creating a
                  complementary system that supports all platform functions.
                </p>
              </ContentBlock>

              <InteractiveBlock
                title="Token Utility Comparison"
                description="Interactive comparison of VVAI and VV-X token utilities"
                tabs={[
                  {
                    title: "VVAI Token",
                    content: (
                      <div className="space-y-4">
                        <h4 className="font-medium">Governance Token (VVAI)</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Voting rights on protocol upgrades and parameter changes</li>
                          <li>Staking for passive income through protocol fees</li>
                          <li>Access to premium features and advanced portfolio strategies</li>
                          <li>Participation in community treasury allocation</li>
                          <li>Validator node operation rights</li>
                        </ul>
                      </div>
                    ),
                  },
                  {
                    title: "VV-X Token",
                    content: (
                      <div className="space-y-4">
                        <h4 className="font-medium">Utility Token (VV-X)</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Payment for platform services and transaction fees</li>
                          <li>Cross-chain transaction facilitation</li>
                          <li>Liquidity provision incentives</li>
                          <li>Collateral for certain platform operations</li>
                          <li>Rewards for platform participation and referrals</li>
                        </ul>
                      </div>
                    ),
                  },
                ]}
              />

              <SectionLevelThree
                id="token-utility-diagram"
                title="Token Utility Diagram"
                description="Visual representation of token flow within the ecosystem"
                sectionNumber="5.3.1"
              >
                <DiagramBlock
                  title="Token Flow Diagram"
                  description="How tokens circulate through the VeritasVault.ai ecosystem"
                  imageSrc="/blockchain-token-circulation.png"
                  imageAlt="Token Utility Flow Diagram"
                  caption="Circulation of VVAI and VV-X tokens through various platform functions"
                  width={800}
                  height={500}
                />
              </SectionLevelThree>
            </SectionLevelTwo>

            <SectionLevelTwo
              id="token-economics"
              title="Token Economics"
              description="Economic mechanisms and value accrual models"
              sectionNumber="5.4"
            >
              <ContentBlock>
                <p className="mb-4">
                  The token economics of VeritasVault.ai are designed to create sustainable value accrual for token
                  holders while maintaining utility for platform users.
                </p>
              </ContentBlock>

              <SectionLevelThree
                id="token-economics-flow"
                title="Token Economics Flow"
                description="How value flows through the token ecosystem"
                sectionNumber="5.4.1"
              >
                <CodeExampleBlock
                  title="Fee Distribution Smart Contract"
                  description="Example of how platform fees are distributed to stakeholders"
                  tabs={[
                    {
                      title: "Solidity",
                      language: "solidity",
                      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FeeDistributor {
    address public treasury;
    address public stakingRewards;
    address public burnAddress;
    
    // Fee distribution percentages (basis points)
    uint256 public treasuryShare = 3000; // 30%
    uint256 public stakingRewardsShare = 5000; // 50%
    uint256 public burnShare = 2000; // 20%
    
    event FeesDistributed(
        uint256 totalAmount,
        uint256 treasuryAmount,
        uint256 stakingAmount,
        uint256 burnAmount
    );
    
    constructor(address _treasury, address _stakingRewards, address _burnAddress) {
        treasury = _treasury;
        stakingRewards = _stakingRewards;
        burnAddress = _burnAddress;
    }
    
    function distributeFees() external payable {
        uint256 totalAmount = msg.value;
        
        uint256 treasuryAmount = (totalAmount * treasuryShare) / 10000;
        uint256 stakingAmount = (totalAmount * stakingRewardsShare) / 10000;
        uint256 burnAmount = (totalAmount * burnShare) / 10000;
        
        (bool treasurySent, ) = treasury.call{value: treasuryAmount}("");
        require(treasurySent, "Treasury transfer failed");
        
        (bool stakingSent, ) = stakingRewards.call{value: stakingAmount}("");
        require(stakingSent, "Staking rewards transfer failed");
        
        (bool burnSent, ) = burnAddress.call{value: burnAmount}("");
        require(burnSent, "Burn transfer failed");
        
        emit FeesDistributed(totalAmount, treasuryAmount, stakingAmount, burnAmount);
    }
}`,
                    },
                    {
                      title: "TypeScript",
                      language: "typescript",
                      code: `// Fee distribution simulation in TypeScript

interface FeeDistribution {
  treasuryAmount: number;
  stakingAmount: number;
  burnAmount: number;
}

class TokenEconomics {
  private treasuryShare: number = 0.3; // 30%
  private stakingRewardsShare: number = 0.5; // 50%
  private burnShare: number = 0.2; // 20%
  
  constructor(
    private treasury: string,
    private stakingRewards: string,
    private burnAddress: string
  ) {}
  
  public distributeFees(totalAmount: number): FeeDistribution {
    const treasuryAmount = totalAmount * this.treasuryShare;
    const stakingAmount = totalAmount * this.stakingRewardsShare;
    const burnAmount = totalAmount * this.burnShare;
    
    console.log(\`Distributing \${totalAmount} tokens:\`);
    console.log(\`- Treasury (\${this.treasury}): \${treasuryAmount}\`);
    console.log(\`- Staking Rewards (\${this.stakingRewards}): \${stakingAmount}\`);
    console.log(\`- Burn Address (\${this.burnAddress}): \${burnAmount}\`);
    
    return {
      treasuryAmount,
      stakingAmount,
      burnAmount
    };
  }
}`,
                    },
                  ]}
                />
              </SectionLevelThree>

              <SectionLevelThree
                id="token-burn"
                title="Token Burn Mechanism"
                description="Deflationary mechanisms to reduce token supply over time"
                sectionNumber="5.4.2"
              >
                <ContentBlock>
                  <p className="mb-4">
                    VeritasVault.ai implements a systematic token burning mechanism to create deflationary pressure on
                    the token supply, potentially increasing value for long-term holders.
                  </p>
                </ContentBlock>

                <DiagramBlock
                  title="Token Burn Schedule"
                  description="Projected token burn rate over time"
                  imageSrc="/token-burn-rate-graph.png"
                  imageAlt="Token Burn Schedule"
                  caption="Projected reduction in circulating supply through systematic burning"
                  width={700}
                  height={400}
                />

                <CalloutBlock title="Burn Mechanism" variant="warning">
                  <p>
                    20% of all platform fees are used to buy back and burn VVAI tokens from the open market, permanently
                    reducing the circulating supply. This process occurs automatically through smart contracts on a
                    weekly basis.
                  </p>
                </CalloutBlock>
              </SectionLevelThree>
            </SectionLevelTwo>

            <SectionLevelTwo
              id="token-governance"
              title="Token Governance"
              description="Governance mechanisms and voting processes"
              sectionNumber="5.5"
            >
              <ContentBlock>
                <p className="mb-4">
                  VVAI token holders participate in decentralized governance through a proposal and voting system that
                  allows the community to guide the development and operation of the platform.
                </p>
                <p className="mb-4">
                  The governance process follows a structured approach to ensure transparency, fairness, and effective
                  decision-making:
                </p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>Proposal submission by token holders with sufficient stake</li>
                  <li>Discussion period for community feedback</li>
                  <li>Formal voting period with quadratic voting mechanism</li>
                  <li>Implementation of approved proposals</li>
                </ol>
              </ContentBlock>

              <DiagramBlock
                title="Governance Process Flow"
                description="Visual representation of the governance workflow"
                imageSrc="/governance-workflow-flowchart.png"
                imageAlt="Governance Process Flowchart"
                caption="End-to-end workflow from proposal creation to implementation"
                width={800}
                height={400}
              />
            </SectionLevelTwo>

            <SectionLevelTwo
              id="token-staking"
              title="Token Staking Calculator"
              description="Interactive tool to calculate staking rewards"
              sectionNumber="5.6"
            >
              <InteractiveBlock
                title="Staking Rewards Calculator"
                description="Estimate your potential staking rewards based on amount and duration"
                tabs={[
                  {
                    title: "Calculator",
                    content: (
                      <div className="p-4 border rounded-md">
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Staking Amount (VVAI)</label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter amount to stake"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Staking Duration (months)</label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter staking duration"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">APY (%)</label>
                          <select className="w-full p-2 border rounded-md">
                            <option value="5">5% (Basic Tier)</option>
                            <option value="8">8% (Silver Tier)</option>
                            <option value="12">12% (Gold Tier)</option>
                            <option value="18">18% (Platinum Tier)</option>
                          </select>
                        </div>
                        <button className="w-full bg-primary text-white p-2 rounded-md">Calculate Rewards</button>
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <h4 className="font-medium mb-2">Estimated Rewards</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div>Monthly Rewards:</div>
                            <div className="font-medium">0 VVAI</div>
                            <div>Total Rewards:</div>
                            <div className="font-medium">0 VVAI</div>
                            <div>Final Balance:</div>
                            <div className="font-medium">0 VVAI</div>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    title: "Staking Tiers",
                    content: (
                      <div className="space-y-4">
                        <h4 className="font-medium">Staking Tier Benefits</h4>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border p-2 text-left">Tier</th>
                              <th className="border p-2 text-left">Minimum Stake</th>
                              <th className="border p-2 text-left">Base APY</th>
                              <th className="border p-2 text-left">Additional Benefits</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">Basic</td>
                              <td className="border p-2">1,000 VVAI</td>
                              <td className="border p-2">5%</td>
                              <td className="border p-2">Basic platform access</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Silver</td>
                              <td className="border p-2">10,000 VVAI</td>
                              <td className="border p-2">8%</td>
                              <td className="border p-2">Reduced fees, basic strategies</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Gold</td>
                              <td className="border p-2">50,000 VVAI</td>
                              <td className="border p-2">12%</td>
                              <td className="border p-2">Advanced strategies, priority support</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Platinum</td>
                              <td className="border p-2">100,000 VVAI</td>
                              <td className="border p-2">18%</td>
                              <td className="border p-2">All features, governance boost, exclusive access</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ),
                  },
                ]}
              />
            </SectionLevelTwo>

            <SectionLevelTwo
              id="token-comparison"
              title="Token Comparison"
              description="Comparison with other similar tokens in the market"
              sectionNumber="5.7"
            >
              <TableBlock
                title="Market Comparison"
                description="How VVAI compares to other governance tokens in the DeFi space"
                columns={[
                  { header: "Feature", accessorKey: "feature" },
                  { header: "VVAI", accessorKey: "vvai" },
                  { header: "Token A", accessorKey: "tokenA" },
                  { header: "Token B", accessorKey: "tokenB" },
                  { header: "Token C", accessorKey: "tokenC" },
                ]}
                data={[
                  {
                    feature: "Governance Model",
                    vvai: "Quadratic Voting",
                    tokenA: "1 Token = 1 Vote",
                    tokenB: "Delegated Voting",
                    tokenC: "Reputation-based",
                  },
                  {
                    feature: "Utility Functions",
                    vvai: "Multi-chain, Dual-token",
                    tokenA: "Single-chain",
                    tokenB: "Multi-chain",
                    tokenC: "Single-chain",
                  },
                  {
                    feature: "Fee Sharing",
                    vvai: "50% to Stakers",
                    tokenA: "30% to Stakers",
                    tokenB: "40% to Stakers",
                    tokenC: "20% to Stakers",
                  },
                  {
                    feature: "Burn Mechanism",
                    vvai: "20% of Fees",
                    tokenA: "10% of Fees",
                    tokenB: "None",
                    tokenC: "5% of Fees",
                  },
                  {
                    feature: "Staking APY",
                    vvai: "5-18%",
                    tokenA: "3-10%",
                    tokenB: "4-12%",
                    tokenC: "2-8%",
                  },
                ]}
              />

              <CalloutBlock title="Competitive Advantage" variant="success">
                <p>
                  VeritasVault.ai's dual-token model provides a unique advantage by separating governance from utility,
                  allowing for more efficient economic design and reduced volatility compared to single-token systems.
                </p>
              </CalloutBlock>
            </SectionLevelTwo>
          </SectionLevelOne>

          <SectionNavigation
            previous={{
              title: "Technical Infrastructure",
              href: "/technical-infrastructure",
              description: "Technical components and infrastructure details",
            }}
            next={{
              title: "Security",
              href: "/security",
              description: "Security architecture and protection mechanisms",
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
