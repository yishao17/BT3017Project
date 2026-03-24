import { motion } from 'motion/react';
import { NetworkData } from '../types';

interface CalculationDisplayProps {
  stepId: number;
  networkData: NetworkData;
}

export function CalculationDisplay({ stepId, networkData }: CalculationDisplayProps) {
  const renderCalculationBox = (
    title: string,
    steps: Array<{ label: string; formula: string; substitution?: string; result: string }>,
    delay: number = 0
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-slate-800/80 border border-white/20 rounded-lg p-5 space-y-4"
    >
      <h4 className="font-semibold text-blue-300 text-base flex items-center gap-2">
        <div className="w-1 h-5 bg-blue-400 rounded"></div>
        {title}
      </h4>
      {steps.map((step, index) => (
        <div key={index} className="space-y-2 pl-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide">{step.label}</div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <div className="font-mono text-sm text-white">{step.formula}</div>
          </div>
          {step.substitution && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
              <div className="font-mono text-sm text-purple-200">{step.substitution}</div>
            </div>
          )}
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <div className="font-mono text-base text-green-300 font-bold">= {step.result}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );

  // Step 2: Hidden Layer Computation
  if (stepId === 2) {
    const w11 = networkData.hiddenWeights[0][0]; // weight from x1 to h1
    const w12 = networkData.hiddenWeights[0][1]; // weight from x2 to h1
    const w21 = networkData.hiddenWeights[1][0]; // weight from x1 to h2
    const w22 = networkData.hiddenWeights[1][1]; // weight from x2 to h2
    const x1 = networkData.inputs[0];
    const x2 = networkData.inputs[1];
    const h1 = networkData.hiddenActivations[0];
    const h2 = networkData.hiddenActivations[1];
    const b1 = 0.1;
    const b2 = 0.1;

    const z1 = w11 * x1 + w12 * x2 + b1;
    const z2 = w21 * x1 + w22 * x2 + b2;

    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Step-by-step computation for hidden layer neurons</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderCalculationBox(
            'Hidden Neuron h₁',
            [
              {
                label: 'Step 1: Compute weighted sum (z₁)',
                formula: 'z₁ = w₁₁·x₁ + w₁₂·x₂ + b₁',
                substitution: `z₁ = (${w11.toFixed(2)}) × (${x1.toFixed(2)}) + (${w12.toFixed(2)}) × (${x2.toFixed(2)}) + ${b1.toFixed(2)}`,
                result: z1.toFixed(4),
              },
              {
                label: 'Step 2: Apply sigmoid activation',
                formula: 'h₁ = σ(z₁) = 1 / (1 + e^(-z₁))',
                substitution: `h₁ = 1 / (1 + e^(${(-z1).toFixed(4)}))`,
                result: h1.toFixed(4),
              },
            ],
            0
          )}

          {renderCalculationBox(
            'Hidden Neuron h₂',
            [
              {
                label: 'Step 1: Compute weighted sum (z₂)',
                formula: 'z₂ = w₂₁·x₁ + w₂₂·x₂ + b₂',
                substitution: `z₂ = (${w21.toFixed(2)}) × (${x1.toFixed(2)}) + (${w22.toFixed(2)}) × (${x2.toFixed(2)}) + ${b2.toFixed(2)}`,
                result: z2.toFixed(4),
              },
              {
                label: 'Step 2: Apply sigmoid activation',
                formula: 'h₂ = σ(z₂) = 1 / (1 + e^(-z₂))',
                substitution: `h₂ = 1 / (1 + e^(${(-z2).toFixed(4)}))`,
                result: h2.toFixed(4),
              },
            ],
            0.15
          )}
        </div>
      </div>
    );
  }

  // Step 3: Output Prediction
  if (stepId === 3) {
    const h1 = networkData.hiddenActivations[0];
    const h2 = networkData.hiddenActivations[1];
    const w1 = networkData.outputWeights[0];
    const w2 = networkData.outputWeights[1];
    const output = networkData.outputActivation;
    const b_out = 0.05;
    const z_out = w1 * h1 + w2 * h2 + b_out;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Computing the final output prediction</p>
        </div>
        {renderCalculationBox(
          'Output Neuron y',
          [
            {
              label: 'Step 1: Compute weighted sum (z_out)',
              formula: 'z_out = w_out,₁·h₁ + w_out,₂·h₂ + b_out',
              substitution: `z_out = (${w1.toFixed(2)}) × (${h1.toFixed(4)}) + (${w2.toFixed(2)}) × (${h2.toFixed(4)}) + ${b_out.toFixed(2)}`,
              result: z_out.toFixed(4),
            },
            {
              label: 'Step 2: Apply sigmoid activation',
              formula: 'y = σ(z_out) = 1 / (1 + e^(-z_out))',
              substitution: `y = 1 / (1 + e^(${(-z_out).toFixed(4)}))`,
              result: output.toFixed(4),
            },
          ],
          0
        )}
      </div>
    );
  }

  // Step 4: Loss Calculation
  if (stepId === 4) {
    const output = networkData.outputActivation;
    const target = networkData.target;
    const error = target - output;
    const loss = (error * error) / 2;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Computing the loss (error) of our prediction</p>
        </div>
        {renderCalculationBox(
          'Mean Squared Error (MSE) Loss',
          [
            {
              label: 'Step 1: Calculate prediction error',
              formula: 'error = target - prediction',
              substitution: `error = ${target.toFixed(4)} - ${output.toFixed(4)}`,
              result: error.toFixed(4),
            },
            {
              label: 'Step 2: Calculate loss (MSE)',
              formula: 'L = (1/2) × error²',
              substitution: `L = (1/2) × (${error.toFixed(4)})²`,
              result: loss.toFixed(6),
            },
          ],
          0
        )}
      </div>
    );
  }

  // Step 5: Error at Output
  if (stepId === 5) {
    const output = networkData.outputActivation;
    const target = networkData.target;
    const error = target - output;
    const loss = (error * error) / 2;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Understanding the error signal</p>
        </div>
        {renderCalculationBox(
          'Loss and Error Computation',
          [
            {
              label: 'Loss function value',
              formula: 'L = (1/2) × (target - y)²',
              substitution: `L = (1/2) × (${target.toFixed(4)} - ${output.toFixed(4)})²`,
              result: loss.toFixed(6),
            },
            {
              label: 'Error signal',
              formula: 'error = target - y',
              substitution: `error = ${target.toFixed(4)} - ${output.toFixed(4)}`,
              result: error.toFixed(4),
            },
          ],
          0
        )}
      </div>
    );
  }

  // Step 6: Gradient Calculation
  if (stepId === 6) {
    const y = networkData.outputActivation;
    const target = networkData.target;
    const error = target - y;
    
    // Derivative of loss w.r.t. y: dL/dy = -(target - y) = y - target
    const dL_dy = y - target;
    
    // Derivative of sigmoid: dy/dz = y(1-y)
    const dy_dz = y * (1 - y);
    
    // Chain rule: dL/dz = dL/dy × dy/dz
    const dL_dz = dL_dy * dy_dz;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Computing gradients using the chain rule</p>
        </div>
        <div className="space-y-6">
          {renderCalculationBox(
            'Output Layer Gradient (δ_out)',
            [
              {
                label: 'Step 1: Derivative of loss w.r.t. output',
                formula: '∂L/∂y = ∂/∂y [(1/2)(target - y)²] = y - target',
                substitution: `∂L/∂y = ${y.toFixed(4)} - ${target.toFixed(4)}`,
                result: dL_dy.toFixed(6),
              },
              {
                label: 'Step 2: Derivative of sigmoid activation',
                formula: '∂y/∂z_out = y × (1 - y)',
                substitution: `∂y/∂z_out = ${y.toFixed(4)} × (1 - ${y.toFixed(4)})`,
                result: dy_dz.toFixed(6),
              },
              {
                label: 'Step 3: Apply chain rule',
                formula: 'δ_out = ∂L/∂z_out = (∂L/∂y) × (∂y/∂z_out)',
                substitution: `δ_out = (${dL_dy.toFixed(6)}) × (${dy_dz.toFixed(6)})`,
                result: dL_dz.toFixed(6),
              },
            ],
            0
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5"
          >
            <div className="text-sm text-yellow-400 font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">📐</span> Understanding the Chain Rule
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              The chain rule allows us to compute how the loss changes with respect to z_out (the input to the output neuron) 
              by multiplying two derivatives: (1) how loss changes with y, and (2) how y changes with z_out. 
              This gives us δ_out, which tells us how to adjust the output layer.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Step 7: Error Propagation
  if (stepId === 7) {
    const y = networkData.outputActivation;
    const target = networkData.target;
    const h1 = networkData.hiddenActivations[0];
    const h2 = networkData.hiddenActivations[1];
    const w1 = networkData.outputWeights[0];
    const w2 = networkData.outputWeights[1];
    
    const dL_dy = y - target;
    const dy_dz = y * (1 - y);
    const delta_out = dL_dy * dy_dz;
    
    // Propagate to hidden layer
    const dL_dh1 = delta_out * w1;
    const dh1_dz1 = h1 * (1 - h1);
    const delta_h1 = dL_dh1 * dh1_dz1;
    
    const dL_dh2 = delta_out * w2;
    const dh2_dz2 = h2 * (1 - h2);
    const delta_h2 = dL_dh2 * dh2_dz2;

    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Propagating error backward to hidden layer</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderCalculationBox(
            'Error Propagation to h₁',
            [
              {
                label: 'Step 1: Backpropagate error from output',
                formula: '∂L/∂h₁ = δ_out × w_out,₁',
                substitution: `∂L/∂h₁ = (${delta_out.toFixed(6)}) × (${w1.toFixed(2)})`,
                result: dL_dh1.toFixed(6),
              },
              {
                label: 'Step 2: Sigmoid derivative at h₁',
                formula: '∂h₁/∂z₁ = h₁ × (1 - h₁)',
                substitution: `∂h₁/∂z₁ = ${h1.toFixed(4)} × (1 - ${h1.toFixed(4)})`,
                result: dh1_dz1.toFixed(6),
              },
              {
                label: 'Step 3: Chain rule for δ_h₁',
                formula: 'δ_h₁ = (∂L/∂h₁) × (∂h₁/∂z₁)',
                substitution: `δ_h₁ = (${dL_dh1.toFixed(6)}) × (${dh1_dz1.toFixed(6)})`,
                result: delta_h1.toFixed(8),
              },
            ],
            0
          )}

          {renderCalculationBox(
            'Error Propagation to h₂',
            [
              {
                label: 'Step 1: Backpropagate error from output',
                formula: '∂L/∂h₂ = δ_out × w_out,₂',
                substitution: `∂L/∂h₂ = (${delta_out.toFixed(6)}) × (${w2.toFixed(2)})`,
                result: dL_dh2.toFixed(6),
              },
              {
                label: 'Step 2: Sigmoid derivative at h₂',
                formula: '∂h₂/∂z₂ = h₂ × (1 - h₂)',
                substitution: `∂h₂/∂z₂ = ${h2.toFixed(4)} × (1 - ${h2.toFixed(4)})`,
                result: dh2_dz2.toFixed(6),
              },
              {
                label: 'Step 3: Chain rule for δ_h₂',
                formula: 'δ_h₂ = (∂L/∂h₂) × (∂h₂/∂z₂)',
                substitution: `δ_h₂ = (${dL_dh2.toFixed(6)}) × (${dh2_dz2.toFixed(6)})`,
                result: delta_h2.toFixed(8),
              },
            ],
            0.15
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5 mt-6"
        >
          <div className="text-sm text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🔗</span> Chain Rule Through Layers
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            We multiply δ_out by each weight to "distribute" the error to the hidden neurons. 
            Then we multiply by the sigmoid derivative at each hidden neuron. This chains the derivatives 
            from the output all the way back to the hidden layer.
          </p>
        </motion.div>
      </div>
    );
  }

  // Step 8: Weight Update
  if (stepId === 8) {
    const y = networkData.outputActivation;
    const target = networkData.target;
    const h1 = networkData.hiddenActivations[0];
    const h2 = networkData.hiddenActivations[1];
    const w1 = networkData.outputWeights[0];
    const w2 = networkData.outputWeights[1];
    
    const dL_dy = y - target;
    const dy_dz = y * (1 - y);
    const delta_out = dL_dy * dy_dz;
    
    const learningRate = 0.1;
    
    // Gradients for output weights
    const dL_dw1 = delta_out * h1;
    const dL_dw2 = delta_out * h2;
    
    // New weights
    const w1_new = w1 - learningRate * dL_dw1;
    const w2_new = w2 - learningRate * dL_dw2;

    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Mathematical Calculations</h3>
          <p className="text-sm text-gray-400">Updating weights using gradient descent</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderCalculationBox(
            'Update Weight w_out,₁',
            [
              {
                label: 'Step 1: Calculate gradient',
                formula: '∂L/∂w_out,₁ = δ_out × h₁',
                substitution: `∂L/∂w_out,₁ = (${delta_out.toFixed(6)}) × (${h1.toFixed(4)})`,
                result: dL_dw1.toFixed(6),
              },
              {
                label: 'Step 2: Gradient descent update',
                formula: 'w_out,₁ ← w_out,₁ - α × (∂L/∂w_out,₁)',
                substitution: `w_out,₁ ← ${w1.toFixed(4)} - (${learningRate}) × (${dL_dw1.toFixed(6)})`,
                result: w1_new.toFixed(4),
              },
            ],
            0
          )}

          {renderCalculationBox(
            'Update Weight w_out,₂',
            [
              {
                label: 'Step 1: Calculate gradient',
                formula: '∂L/∂w_out,₂ = δ_out × h₂',
                substitution: `∂L/∂w_out,₂ = (${delta_out.toFixed(6)}) × (${h2.toFixed(4)})`,
                result: dL_dw2.toFixed(6),
              },
              {
                label: 'Step 2: Gradient descent update',
                formula: 'w_out,₂ ← w_out,₂ - α × (∂L/∂w_out,₂)',
                substitution: `w_out,₂ ← ${w2.toFixed(4)} - (${learningRate}) × (${dL_dw2.toFixed(6)})`,
                result: w2_new.toFixed(4),
              },
            ],
            0.15
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-5 mt-6"
        >
          <div className="text-sm text-purple-400 font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">⚡</span> Gradient Descent
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            The learning rate α = {learningRate} controls the step size. We subtract (not add) because we want to move 
            in the direction that <strong>decreases</strong> the loss. The gradient points in the direction of increasing loss, 
            so we go in the opposite direction.
          </p>
          <div className="bg-black/20 rounded p-3 font-mono text-xs text-gray-300">
            If ∂L/∂w &gt; 0: Loss increases when w increases → Decrease w<br/>
            If ∂L/∂w &lt; 0: Loss decreases when w increases → Increase w
          </div>
        </motion.div>
      </div>
    );
  }

  // Step 9: Training Loop
  if (stepId === 9) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">The Complete Training Cycle</h3>
          <p className="text-sm text-gray-400">How neural networks learn through iteration</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6"
        >
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                1
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">Forward Propagation</div>
                <div className="text-sm text-gray-300 mb-2">
                  Compute predictions by passing inputs through the network
                </div>
                <div className="bg-black/20 rounded p-2 font-mono text-xs text-blue-200">
                  z = w·x + b  →  a = σ(z)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                2
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">Calculate Loss</div>
                <div className="text-sm text-gray-300 mb-2">
                  Measure how far the prediction is from the target
                </div>
                <div className="bg-black/20 rounded p-2 font-mono text-xs text-orange-200">
                  L = (1/2)(target - y)²
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                3
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">Backpropagation</div>
                <div className="text-sm text-gray-300 mb-2">
                  Compute gradients using the chain rule
                </div>
                <div className="bg-black/20 rounded p-2 font-mono text-xs text-red-200">
                  ∂L/∂w = ∂L/∂y × ∂y/∂z × ∂z/∂w
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
                4
              </div>
              <div>
                <div className="font-semibold text-white text-lg mb-1">Update Weights</div>
                <div className="text-sm text-gray-300 mb-2">
                  Adjust weights to reduce the loss
                </div>
                <div className="bg-black/20 rounded p-2 font-mono text-xs text-purple-200">
                  w ← w - α × (∂L/∂w)
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-300 leading-relaxed">
              This cycle repeats for many iterations (epochs). Each iteration slightly adjusts the weights 
              to reduce the loss. Over hundreds or thousands of iterations, the network learns the optimal 
              weights that minimize prediction error on the training data.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
