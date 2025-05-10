import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function NeuralNetworks() {
  return (
    <section id="neural-networks" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Neural Networks
            <SectionAnchor id="neural-networks" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai leverages advanced neural network architectures to enhance portfolio management across
            multiple blockchain networks. These deep learning models are specifically designed to capture complex
            patterns in crypto markets, providing predictive insights and optimization strategies that traditional
            statistical models cannot achieve.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">Recurrent Neural Networks (RNNs)</h3>
              <p className="mb-2 text-base font-normal">
                Our platform employs specialized RNN architectures to analyze temporal patterns in crypto asset prices
                and on-chain metrics across multiple blockchain networks.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>LSTM Networks:</strong> Long Short-Term Memory networks capture long-term dependencies in time
                  series data, enabling more accurate predictions of market trends.
                </li>
                <li className="text-base font-normal">
                  <strong>GRU Models:</strong> Gated Recurrent Units provide efficient processing of sequential data
                  with reduced computational complexity.
                </li>
                <li className="text-base font-normal">
                  <strong>Attention Mechanisms:</strong> Enhanced focus on relevant time periods improves prediction
                  accuracy during market volatility.
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Convolutional Neural Networks (CNNs)</h3>
              <p className="mb-2 text-base font-normal">
                CNNs extract spatial patterns from multi-dimensional market data, identifying complex relationships
                between different assets and blockchain networks.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Price Chart Pattern Recognition:</strong> Automated identification of technical patterns
                  across multiple timeframes and assets.
                </li>
                <li className="text-base font-normal">
                  <strong>Multi-Chain Correlation Analysis:</strong> Detection of cross-chain relationships and
                  dependencies that affect portfolio performance.
                </li>
                <li className="text-base font-normal">
                  <strong>Volume Profile Analysis:</strong> Identification of significant support and resistance levels
                  based on historical trading volumes.
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Transformer Models</h3>
              <p className="mb-2 text-base font-normal">
                State-of-the-art transformer architectures process market data and on-chain metrics to generate
                sophisticated investment insights.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Self-Attention Mechanisms:</strong> Capture relationships between different market factors
                  without regard to their sequence position.
                </li>
                <li className="text-base font-normal">
                  <strong>Multi-Head Attention:</strong> Simultaneously attend to information from different
                  representation subspaces, enhancing model capacity.
                </li>
                <li className="text-base font-normal">
                  <strong>Cross-Chain Transformers:</strong> Specialized models that process data from multiple
                  blockchain networks simultaneously to identify cross-chain opportunities.
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Reinforcement Learning</h3>
              <p className="mb-2 text-base font-normal">
                VeritasVault.ai implements reinforcement learning algorithms to optimize portfolio management strategies
                in dynamic market conditions.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Deep Q-Networks:</strong> Learn optimal portfolio allocation strategies through trial and
                  error in simulated market environments.
                </li>
                <li className="text-base font-normal">
                  <strong>Policy Gradient Methods:</strong> Directly optimize portfolio management policies to maximize
                  risk-adjusted returns.
                </li>
                <li className="text-base font-normal">
                  <strong>Multi-Agent Systems:</strong> Coordinate multiple reinforcement learning agents to manage
                  different aspects of cross-chain portfolio optimization.
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Neural Network Training and Deployment</h3>
          <p className="text-base font-normal">
            Our neural network models are trained on extensive historical data from multiple blockchain networks,
            including price movements, on-chain metrics, social sentiment, and macroeconomic indicators. The training
            process incorporates advanced techniques such as transfer learning, domain adaptation, and continual
            learning to ensure the models remain effective in evolving market conditions. Once deployed, these models
            operate within a robust framework that includes regular retraining, performance monitoring, and anomaly
            detection to maintain prediction accuracy and reliability.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
