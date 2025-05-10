import { Card, CardContent } from "@/components/ui/card"

export function TokenomicsDownloadContent() {
  return (
    <div className="space-y-8 print-content">
      <section id="tokenomics">
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Tokenomics Overview</h2>

        <p className="mb-6 text-lg">
          The VeritasVault.ai token (VVT) is designed to align incentives across the ecosystem, reward participation,
          and enable governance of the protocol. This document outlines the token distribution, utility, and governance
          mechanisms.
        </p>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Token Distribution</h3>
          <Card>
            <CardContent className="p-6">
              <p className="font-medium mb-3">Initial Token Allocation:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Team & Advisors: 20% (200,000,000 VVT)</li>
                <li>Community & Ecosystem: 30% (300,000,000 VVT)</li>
                <li>Treasury: 15% (150,000,000 VVT)</li>
                <li>Investors: 25% (250,000,000 VVT)</li>
                <li>Liquidity: 10% (100,000,000 VVT)</li>
              </ul>

              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                    <span className="ml-2 min-w-[80px]">20% Team</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-green-600 h-4 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <span className="ml-2 min-w-[80px]">30% Community</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-yellow-600 h-4 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <span className="ml-2 min-w-[80px]">15% Treasury</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-purple-600 h-4 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <span className="ml-2 min-w-[80px]">25% Investors</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div className="bg-red-600 h-4 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                    <span className="ml-2 min-w-[80px]">10% Liquidity</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Vesting Schedule</h3>
          <Card>
            <CardContent className="p-6">
              <p className="font-medium mb-3">Token Release Timeline:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Team & Advisors: 4-year vesting with 1-year cliff</li>
                <li>Community & Ecosystem: Released over 5 years</li>
                <li>Treasury: Locked with governance release</li>
                <li>Investors: 2-year vesting with 6-month cliff</li>
                <li>Liquidity: Immediately available</li>
              </ul>

              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="relative h-16">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="absolute top-0 left-0 w-1/4 h-2 bg-blue-600"></div>
                  <div className="absolute top-0 left-1/4 w-1/4 h-2 bg-green-600"></div>
                  <div className="absolute top-0 left-1/2 w-1/4 h-2 bg-yellow-600"></div>
                  <div className="absolute top-0 left-3/4 w-1/4 h-2 bg-purple-600"></div>

                  <div className="absolute top-4 left-0 text-xs">Year 1</div>
                  <div className="absolute top-4 left-1/4 text-xs">Year 2</div>
                  <div className="absolute top-4 left-1/2 text-xs">Year 3</div>
                  <div className="absolute top-4 left-3/4 text-xs">Year 4</div>
                  <div className="absolute top-4 right-0 text-xs">Year 5</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Governance</h3>
          <Card>
            <CardContent className="p-6">
              <p className="font-medium mb-3">Governance Mechanism:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>1 token = 1 vote</li>
                <li>Proposal threshold: 1% of circulating supply</li>
                <li>Quorum requirement: 10% of circulating supply</li>
                <li>Timelock: 48 hours for standard proposals</li>
                <li>Emergency proposals: 2/3 majority of governance council</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Token Economics</h3>
          <Card>
            <CardContent className="p-6">
              <p className="font-medium mb-3">Economic Model:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Total supply: 1,000,000,000 VVT</li>
                <li>Deflationary mechanism: 2% of fees used for buyback and burn</li>
                <li>Staking rewards: 5-12% APY based on lock-up period</li>
                <li>Fee distribution: 70% to stakers, 20% to treasury, 10% to buyback</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Token Utility</h3>
          <Card>
            <CardContent className="p-6">
              <p className="font-medium mb-3">Use Cases:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Governance voting</li>
                <li>Fee discounts</li>
                <li>Access to premium features</li>
                <li>Staking rewards</li>
                <li>Liquidity mining</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
