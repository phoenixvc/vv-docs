import { SectionLevelOne } from "./section-level-one"
import { SectionLevelTwo } from "./section-level-two"
import { SectionLevelThree } from "./section-level-three"

export default function ExampleImplementation() {
  return (
    <div className="space-y-12">
      {/* Level 1 Section Example */}
      <SectionLevelOne
        id="tokenomics"
        title="Tokenomics"
        description="VVAI Token Economics and Governance"
        sectionNumber="5"
      >
        <p className="mb-4">
          VeritasVault.ai implements a dual-token economic model designed to create a sustainable ecosystem that rewards
          participants while ensuring the long-term growth and stability of the platform.
        </p>

        {/* Level 2 Section Example */}
        <SectionLevelTwo
          id="token-model"
          title="Token Model"
          description="Dual-token system design and distribution"
          sectionNumber="5.2"
        >
          <p className="mb-4">
            Our dual-token model consists of the VVAI governance token and the VV-X utility token, each serving distinct
            purposes within the ecosystem.
          </p>

          {/* Level 3 Section Example */}
          <SectionLevelThree
            id="token-distribution"
            title="Token Distribution"
            description="Allocation of tokens across stakeholders"
            sectionNumber="5.2.1"
          >
            <p>
              The initial token distribution is designed to ensure broad participation while maintaining sufficient
              reserves for future development and ecosystem growth.
            </p>

            <div className="mt-4">
              <img
                src="/token-distribution-pie-chart.png"
                alt="Token Distribution Chart"
                className="mx-auto max-w-md rounded-lg border"
              />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Figure 5.2.1: Distribution of VVAI tokens by stakeholder category
              </p>
            </div>
          </SectionLevelThree>
        </SectionLevelTwo>
      </SectionLevelOne>
    </div>
  )
}
