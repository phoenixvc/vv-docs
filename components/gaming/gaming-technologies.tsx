import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { MarketShareChart } from "./market-share-chart"
import { CompetitorRadarChart } from "./competitor-radar-chart"

export function GamingTechnologies() {
  return (
    <section id="gaming-technologies" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Gaming Technologies
            <SectionAnchor id="gaming-technologies" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with gaming ecosystems to provide seamless asset management across traditional
            gaming platforms and blockchain-based games. Our gaming technologies enable secure ownership, trading, and
            utilization of in-game assets across multiple blockchain networks.
          </p>

          {/* SECTION: Core Gaming Infrastructure */}
          <div className="mt-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Core Gaming Infrastructure</h3>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="text-lg font-semibold mb-2">NFT Gaming Integration</h4>
                <p className="mb-2 text-base font-normal">
                  VeritasVault.ai provides comprehensive support for NFT-based gaming assets across multiple blockchain
                  networks.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-base font-normal">
                    <strong>Smart Contract Templates:</strong> Pre-built NFT contract templates optimized for gaming
                    assets with support for metadata, attributes, and game-specific functionality.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Cross-Chain Asset Transfer:</strong> Secure movement of gaming NFTs between different
                    blockchain networks using Etherlink and other bridge technologies.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Tezos Integration:</strong> Specialized support for Tezos-based gaming NFTs, leveraging the
                    platform's energy efficiency and low transaction costs.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Plurality Network Wallet:</strong> Seamless integration with Plurality Network for managing
                    gaming assets across multiple platforms with a unified user experience.
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold mb-2">Game Developer Tools</h4>
                <p className="mb-2 text-base font-normal">
                  Comprehensive toolkit for game developers to integrate blockchain assets into their games.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-base font-normal">
                    <strong>Unity SDK:</strong> Plug-and-play integration for Unity-based games to interact with
                    blockchain assets.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Unreal Engine Plugin:</strong> Native support for Unreal Engine to incorporate NFT
                    functionality.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Asset Verification API:</strong> Real-time verification of asset ownership and attributes
                    across multiple blockchain networks.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Marketplace Integration:</strong> Tools for developers to create in-game marketplaces with
                    cross-chain support.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Gaming Ecosystem Benefits</h4>
              <p className="text-base font-normal">
                By integrating with VeritasVault.ai's multi-chain architecture, gaming platforms can offer their users
                true ownership of in-game assets, interoperability between different games, and secure trading on
                decentralized marketplaces. Game developers benefit from new revenue streams, enhanced player
                engagement, and reduced infrastructure costs for managing digital assets. Players gain the ability to
                securely store, trade, and use their gaming assets across multiple platforms with a seamless user
                experience.
              </p>
            </div>
          </div>

          {/* SECTION: VV-X Gaming Asset Financialization */}
          <div className="mt-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">VV-X: Gaming Asset Financialization</h3>
            <p className="text-base font-normal mb-4">
              VeritasVault.ai is extending its protocol with VV-X, a dedicated token and system for higher-risk,
              higher-yield DeFi primitives specifically designed for gaming assets. VV-X enables NFT fractionalization,
              NFT-backed lending, and specialized liquidity pools for gaming assets while compartmentalizing collateral
              risk.
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-amber-500 pl-4">
                <h4 className="text-lg font-semibold mb-2">NFT Fractionalization for Gaming Assets</h4>
                <p className="mb-2 text-base font-normal">
                  VV-X introduces Fractional NFTs (FNFTs) by locking base gaming NFTs in a secure vault and minting
                  fungible shards.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-base font-normal">
                    <strong>Fractional Vault:</strong> ERC-1155/FA2 compatible system that locks the original NFT and
                    mints tradable fractions.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Liquidity Mining:</strong> Incentives for FNFT-ETH liquidity pairs to ensure market depth.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Cross-Chain Compatibility:</strong> Bridge adapters for secure cross-chain FNFT transfers.
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-rose-500 pl-4">
                <h4 className="text-lg font-semibold mb-2">NFT-Backed Lending</h4>
                <p className="mb-2 text-base font-normal">
                  Gaming assets can now be used as collateral for loans through specialized lending pools.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li className="text-base font-normal">
                    <strong>Collateral Manager:</strong> Tracks Loan-to-Value (LTV) ratios and triggers liquidation when
                    necessary.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Variable-Rate Markets:</strong> Fuse-style lending pools segregated by asset class.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Liquidation Engine:</strong> Dutch auction with 30-minute decay window and treasury
                    backstop.
                  </li>
                  <li className="text-base font-normal">
                    <strong>Oracle System:</strong> Multi-layered price feeds with TWAP buffer and governance fallback
                    for illiquid assets.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION: VV-X Tokenomics & Governance */}
          <div className="mt-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">VV-X Tokenomics & Governance</h3>

            <div className="border-l-4 border-cyan-500 pl-4 mb-6">
              <h4 className="text-lg font-semibold mb-2">Token Utility & Value Capture</h4>
              <p className="mb-2 text-base font-normal">
                The VV-X token underpins the gaming asset financialization system with carefully designed economics.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300 my-3">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Utility</th>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Mechanism</th>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Value Flow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 text-sm">Fee Asset</td>
                      <td className="px-3 py-2 text-sm">50% of lending interest & FNFT swap fees paid in VV-X</td>
                      <td className="px-3 py-2 text-sm">Buy-and-burn mechanism</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">Governance</td>
                      <td className="px-3 py-2 text-sm">VV-X votes on Phase-2 contract parameters</td>
                      <td className="px-3 py-2 text-sm">Stakers earn share of fees</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">Insurance Staking</td>
                      <td className="px-3 py-2 text-sm">VV-X staked in Safety Module backs bad debt</td>
                      <td className="px-3 py-2 text-sm">Slashing risk balanced by extra yield</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground">
                VV-X has a fixed supply of 1 billion tokens with no inflation, distributed across treasury, insurance
                fund, team, community, and strategic partners.
              </p>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4">
              <h4 className="text-lg font-semibold mb-2">Governance Model</h4>
              <p className="mb-2 text-base font-normal">
                VV-X implements a dual-token governance structure that balances innovation with security.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Dual-Token Hierarchy:</strong> VVAI veto overrides VV-X for protocol-wide upgrades; VV-X
                  controls only Phase-2 modules.
                </li>
                <li className="text-base font-normal">
                  <strong>Voting Mechanism:</strong> Snapshot + Tally for off-chain voting with on-chain execution via
                  Safe module.
                </li>
                <li className="text-base font-normal">
                  <strong>Emergency Controls:</strong> 3/5 multi-sig (core devs + external auditors) for emergency pause
                  functionality.
                </li>
                <li className="text-base font-normal">
                  <strong>Parameter Governance:</strong> VV-X holders vote on lending parameters, oracle configurations,
                  and fee distributions.
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION: Risk Management & Compliance */}
          <div className="mt-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Risk Management & Compliance</h3>

            <div className="bg-muted p-4 rounded-md mb-6">
              <h4 className="text-lg font-semibold mb-2">Risk Mitigation Strategies</h4>
              <p className="text-base font-normal mb-3">
                VV-X implements robust risk management strategies to protect users and ensure regulatory compliance:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-1">Technical Risk Mitigation:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Oracle manipulation protection via TWAP + dual feeds</li>
                    <li>Bridge exploit prevention with light client validation</li>
                    <li>Illiquid auction handling with treasury auto-bid</li>
                    <li>Circuit breakers for extreme market volatility</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Compliance Framework:</h5>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Cayman-based SPV for token issuance</li>
                    <li>Service agreement with Veritas Foundation (Swiss)</li>
                    <li>IP licensing back to DAO</li>
                    <li>Legal opinions classifying VV-X as utility token</li>
                    <li>Geo-fenced front-end for regulatory compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-semibold mb-2">Implementation Roadmap</h4>
              <div className="space-y-2">
                <div className="flex">
                  <div className="w-24 font-medium">Q3 2025:</div>
                  <div>Smart-contract audit ×2, Testnet v1</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Q4 2025:</div>
                  <div>Mainnet launch, initial FNFT collections</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Q1 2026:</div>
                  <div>Lending markets, insurance module</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Q2 2026:</div>
                  <div>Cross-chain FNFT bridge (Etherlink, Base)</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Q3 2026:</div>
                  <div>Permissionless asset onboarding</div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: Market Analysis & Projections */}
          <div className="mt-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Market Analysis & Projections</h3>

            <div className="mb-6">
              <MarketShareChart />
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 mb-6">
              <h4 className="text-lg font-semibold mb-2">Market Share Projection</h4>
              <p className="mb-3 text-base font-normal">
                Based on current market trends and VV-X's competitive advantages, we project the following market share
                growth in the NFT financialization sector:
              </p>

              <div className="overflow-x-auto mb-3">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Time Period</th>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Projected TVL</th>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Market Share</th>
                      <th className="px-3 py-2 text-left text-sm font-semibold">Key Growth Drivers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 text-sm">Q1 2026</td>
                      <td className="px-3 py-2 text-sm">$25M</td>
                      <td className="px-3 py-2 text-sm">5%</td>
                      <td className="px-3 py-2 text-sm">Initial FNFT collections, early adopters</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">Q3 2026</td>
                      <td className="px-3 py-2 text-sm">$75M</td>
                      <td className="px-3 py-2 text-sm">12%</td>
                      <td className="px-3 py-2 text-sm">Lending markets, cross-chain functionality</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">Q1 2027</td>
                      <td className="px-3 py-2 text-sm">$150M</td>
                      <td className="px-3 py-2 text-sm">18%</td>
                      <td className="px-3 py-2 text-sm">Gaming partnerships, permissionless onboarding</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm">Q4 2027</td>
                      <td className="px-3 py-2 text-sm">$300M</td>
                      <td className="px-3 py-2 text-sm">25%</td>
                      <td className="px-3 py-2 text-sm">Institutional adoption, expanded chain support</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                These projections are based on the following assumptions:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Overall NFT financialization market grows to $1.2B by end of 2027</li>
                <li>Gaming NFTs represent 40% of total NFT market value by 2027</li>
                <li>Cross-chain functionality drives 30% of new user acquisition</li>
                <li>Strategic partnerships with 3-5 major gaming platforms</li>
                <li>Successful implementation of all roadmap milestones</li>
              </ul>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h4 className="text-lg font-semibold mb-2">Growth Strategy</h4>
              <p className="mb-2 text-base font-normal">
                VV-X will execute a multi-pronged growth strategy to achieve the projected market share:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Strategic Gaming Partnerships:</strong> Collaborate with top gaming studios to integrate VV-X
                  as the primary financialization layer for their NFT assets.
                </li>
                <li className="text-base font-normal">
                  <strong>Liquidity Mining Programs:</strong> Allocate 30% of token supply to incentivize liquidity
                  provision for gaming NFT fractions.
                </li>
                <li className="text-base font-normal">
                  <strong>Developer Grants:</strong> Fund ecosystem projects building on top of VV-X infrastructure.
                </li>
                <li className="text-base font-normal">
                  <strong>Cross-Chain Expansion:</strong> Prioritize integration with emerging L2s and gaming-focused
                  chains.
                </li>
                <li className="text-base font-normal">
                  <strong>Educational Content:</strong> Create comprehensive resources to onboard traditional gamers to
                  NFT financialization.
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION: Competitive Landscape */}
          <div className="mt-8 mb-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Competitive Landscape & SWOT</h3>
            <p className="text-base font-normal mb-4">
              Below is a high-level SWOT comparison between VV-X and four primary protocols operating in either NFT
              fractionalisation, NFT-backed lending, or both.
            </p>

            <div className="mb-6">
              <CompetitorRadarChart />
            </div>

            <h4 className="text-lg font-semibold mb-3">Competitor Matrix</h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Protocol</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Core Focus</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">Chain Coverage</th>
                    <th className="px-3 py-2 text-left text-sm font-semibold">TVL (Apr 2025)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 text-sm font-medium">NFTfi</td>
                    <td className="px-3 py-2 text-sm">Peer-to-Peer NFT Loans</td>
                    <td className="px-3 py-2 text-sm">Ethereum</td>
                    <td className="px-3 py-2 text-sm">≈ US$180m</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-sm font-medium">Arcade.xyz</td>
                    <td className="px-3 py-2 text-sm">Institutional NFT Loans & Bundles</td>
                    <td className="px-3 py-2 text-sm">Ethereum, Polygon</td>
                    <td className="px-3 py-2 text-sm">≈ US$90m</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-sm font-medium">BendDAO</td>
                    <td className="px-3 py-2 text-sm">Peer-to-Pool NFT Lending & Auctions</td>
                    <td className="px-3 py-2 text-sm">Ethereum</td>
                    <td className="px-3 py-2 text-sm">≈ US$140m</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-sm font-medium">Tessera (Fractional)</td>
                    <td className="px-3 py-2 text-sm">NFT Fractionalisation</td>
                    <td className="px-3 py-2 text-sm">Ethereum</td>
                    <td className="px-3 py-2 text-sm">≈ US$40m</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-lg font-semibold mb-3">SWOT Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-indigo-400 pl-4">
                <h5 className="font-semibold mb-2">NFTfi</h5>
                <ul className="space-y-1">
                  <li>
                    <strong>Strengths</strong> — Established liquidity marketplace; reputation for fair peer-to-peer
                    deals; simple UI.
                  </li>
                  <li>
                    <strong>Weaknesses</strong> — Single-chain; manual price discovery; slow liquidation.
                  </li>
                  <li>
                    <strong>Opportunities</strong> — Cross-chain expansion; automated pricing oracles.
                  </li>
                  <li>
                    <strong>Threats</strong> — VV-X's automated oracle + insurance model; regulatory scrutiny of P2P
                    loan contracts.
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-violet-400 pl-4">
                <h5 className="font-semibold mb-2">Arcade.xyz</h5>
                <ul className="space-y-1">
                  <li>
                    <strong>Strengths</strong> — Bundle collateral support; institutional partners; audited contracts.
                  </li>
                  <li>
                    <strong>Weaknesses</strong> — High listing friction; limited to blue-chip NFTs; small lender base.
                  </li>
                  <li>
                    <strong>Opportunities</strong> — Incorporate real-time risk analytics (VV-X already native);
                    multi-chain bridge.
                  </li>
                  <li>
                    <strong>Threats</strong> — Liquidity fragmentation; SEC interest in bundled NFT securities.
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-teal-400 pl-4">
                <h5 className="font-semibold mb-2">BendDAO</h5>
                <ul className="space-y-1">
                  <li>
                    <strong>Strengths</strong> — Instant loans; peer-to-pool model; on-chain liquidation auctions.
                  </li>
                  <li>
                    <strong>Weaknesses</strong> — Oracle dependency; past liquidity crunch (Aug 2022); ETH-only lending.
                  </li>
                  <li>
                    <strong>Opportunities</strong> — Broadening collateral types; cross-chain AMM pools.
                  </li>
                  <li>
                    <strong>Threats</strong> — VV-X's treasury-backed auction backstop; oracle manipulation exploits.
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-400 pl-4">
                <h5 className="font-semibold mb-2">Tessera (Fractional)</h5>
                <ul className="space-y-1">
                  <li>
                    <strong>Strengths</strong> — Battle-tested fractional vaults; community governance of shards.
                  </li>
                  <li>
                    <strong>Weaknesses</strong> — No lending facility; shard liquidity varies; SEC attention on
                    fractional NFTs.
                  </li>
                  <li>
                    <strong>Opportunities</strong> — Pair with lending (gap VV-X fills natively); extend to gaming
                    assets.
                  </li>
                  <li>
                    <strong>Threats</strong> — VV-X offering integrated fractional + lending + insurance; regulatory
                    tightening.
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="text-lg font-semibold mt-6 mb-3">VV-X Competitive Edge</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-base font-normal">
                <strong>Risk-segregated Tokenomics</strong> — VV-X isolates high-risk features; rivals commingle them
                with core governance.
              </li>
              <li className="text-base font-normal">
                <strong>Cross-Chain by Design</strong> — Bridge adapters ship day-one; most competitors are
                Ethereum-centric.
              </li>
              <li className="text-base font-normal">
                <strong>Integrated Insurance Fund</strong> — 10% genesis allocation + fee inflows; competitors rely on
                socialised losses.
              </li>
              <li className="text-base font-normal">
                <strong>Oracle-of-Last-Resort</strong> — Mitigates thin-market manipulation; none of the listed
                competitors offers a formal manual override.
              </li>
              <li className="text-base font-normal">
                <strong>Dual-Token Governance</strong> — VVAI veto adds systemic safety net absent in rival DAOs.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
