import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface CalculationStep {
  label: string;
  formula: string;
  substitution?: string;
  result: string;
  explanation: string;
}

interface CalculationModalProps {
  nodeType: 'input' | 'hidden' | 'output';
  nodeIndex: number;
  stepSection: 'feedforward' | 'backpropagation';
  currentStepId: number;
  networkData: any;
  onClose: () => void;
}

export function CalculationModal({ 
  nodeType, 
  nodeIndex, 
  stepSection,
  currentStepId,
  networkData, 
  onClose 
}: CalculationModalProps) {
  const getCalculationSteps = (): CalculationStep[] => {
    if (nodeType === 'input') {
      return [
        {
          label: 'Input Value',
          formula: `x${nodeIndex + 1} = ${networkData.inputs[nodeIndex]}`,
          result: networkData.inputs[nodeIndex].toFixed(3),
          explanation: 'This is a feature value from the input data. Input neurons simply hold the raw data values.',
        },
      ];
    }

    if (nodeType === 'hidden') {
      const w1 = networkData.hiddenWeights[nodeIndex][0];
      const w2 = networkData.hiddenWeights[nodeIndex][1];
      const x1 = networkData.inputs[0];
      const x2 = networkData.inputs[1];
      const z = w1 * x1 + w2 * x2;
      const activation = networkData.hiddenActivations[nodeIndex];
      const bias = 0.1; // Adding a bias for educational purposes

      const steps: CalculationStep[] = [
        {
          label: 'Weighted Sum (z)',
          formula: `z${nodeIndex + 1} = w${nodeIndex + 1},1 × x1 + w${nodeIndex + 1},2 × x2 + b${nodeIndex + 1}`,
          substitution: `z${nodeIndex + 1} = ${w1.toFixed(2)} × ${x1.toFixed(2)} + ${w2.toFixed(2)} × ${x2.toFixed(2)} + ${bias.toFixed(2)}`,
          result: (z + bias).toFixed(3),
          explanation: 'Each input is multiplied by its corresponding weight, then summed together with a bias term.',
        },
        {
          label: 'Activation Function (sigmoid)',
          formula: `h${nodeIndex + 1} = σ(z${nodeIndex + 1}) = 1 / (1 + e^(-z${nodeIndex + 1}))`,
          substitution: `h${nodeIndex + 1} = 1 / (1 + e^(-${(z + bias).toFixed(3)}))`,
          result: activation.toFixed(3),
          explanation: 'The sigmoid function squashes the weighted sum into a range between 0 and 1, introducing non-linearity.',
        },
      ];

      // Add backpropagation calculations if in that section
      if (stepSection === 'backpropagation' && currentStepId >= 6) {
        const outputError = networkData.target - networkData.outputActivation;
        const outputWeight = networkData.outputWeights[nodeIndex];
        const gradient = outputError * outputWeight * activation * (1 - activation);

        steps.push({
          label: 'Gradient via Chain Rule',
          formula: `∂L/∂w${nodeIndex + 1} = ∂L/∂y × ∂y/∂h${nodeIndex + 1} × ∂h${nodeIndex + 1}/∂z${nodeIndex + 1} × ∂z${nodeIndex + 1}/∂w${nodeIndex + 1}`,
          substitution: `∂L/∂w${nodeIndex + 1} = ${outputError.toFixed(3)} × ${outputWeight.toFixed(3)} × ${(activation * (1 - activation)).toFixed(3)}`,
          result: gradient.toFixed(4),
          explanation: 'The chain rule breaks down how this weight affects the final loss by multiplying partial derivatives along the path.',
        });

        steps.push({
          label: 'Sigmoid Derivative',
          formula: `∂σ(z)/∂z = σ(z) × (1 - σ(z))`,
          substitution: `∂σ/∂z = ${activation.toFixed(3)} × ${(1 - activation).toFixed(3)}`,
          result: (activation * (1 - activation)).toFixed(4),
          explanation: 'The derivative of sigmoid has a nice property: it can be computed from the sigmoid output itself.',
        });
      }

      return steps;
    }

    if (nodeType === 'output') {
      const h1 = networkData.hiddenActivations[0];
      const h2 = networkData.hiddenActivations[1];
      const w1 = networkData.outputWeights[0];
      const w2 = networkData.outputWeights[1];
      const z = w1 * h1 + w2 * h2;
      const output = networkData.outputActivation;
      const target = networkData.target;
      const bias = 0.05;

      const steps: CalculationStep[] = [
        {
          label: 'Weighted Sum (z)',
          formula: 'z_out = w_out,1 × h1 + w_out,2 × h2 + b_out',
          substitution: `z_out = ${w1.toFixed(2)} × ${h1.toFixed(2)} + ${w2.toFixed(2)} × ${h2.toFixed(2)} + ${bias.toFixed(2)}`,
          result: (z + bias).toFixed(3),
          explanation: 'Hidden layer outputs are weighted and summed to compute the output neuron\'s input.',
        },
        {
          label: 'Activation Function (sigmoid)',
          formula: 'y = σ(z_out) = 1 / (1 + e^(-z_out))',
          substitution: `y = 1 / (1 + e^(-${(z + bias).toFixed(3)}))`,
          result: output.toFixed(3),
          explanation: 'The sigmoid activation produces the final prediction between 0 and 1.',
        },
      ];

      if (currentStepId >= 4) {
        const loss = Math.pow(target - output, 2) / 2;
        steps.push({
          label: 'Loss Function (MSE)',
          formula: 'L = 1/2 × (target - y)²',
          substitution: `L = 1/2 × (${target.toFixed(2)} - ${output.toFixed(2)})²`,
          result: loss.toFixed(4),
          explanation: 'Mean Squared Error measures the squared difference between prediction and target, divided by 2 for easier derivatives.',
        });
      }

      if (stepSection === 'backpropagation' && currentStepId >= 5) {
        const error = target - output;
        steps.push({
          label: 'Error Signal',
          formula: '∂L/∂y = -(target - y)',
          substitution: `∂L/∂y = -(${target.toFixed(2)} - ${output.toFixed(2)})`,
          result: (-error).toFixed(4),
          explanation: 'The derivative of the loss with respect to the output tells us how to adjust the prediction.',
        });

        steps.push({
          label: 'Output Gradient',
          formula: 'δ_out = ∂L/∂y × ∂y/∂z_out = -(target - y) × y × (1 - y)',
          substitution: `δ_out = ${(-error).toFixed(3)} × ${output.toFixed(3)} × ${(1 - output).toFixed(3)}`,
          result: ((-error) * output * (1 - output)).toFixed(4),
          explanation: 'This is the gradient at the output layer, combining the loss derivative with the sigmoid derivative (chain rule).',
        });
      }

      return steps;
    }

    return [];
  };

  const steps = getCalculationSteps();
  const nodeLabels = {
    input: ['x₁', 'x₂'],
    hidden: ['h₁', 'h₂'],
    output: ['y'],
  };

  const getNodeLabel = () => {
    if (nodeType === 'input') return nodeLabels.input[nodeIndex];
    if (nodeType === 'hidden') return nodeLabels.hidden[nodeIndex];
    return nodeLabels.output[0];
  };

  const getTitle = () => {
    if (nodeType === 'input') return `Input Neuron ${getNodeLabel()}`;
    if (nodeType === 'hidden') return `Hidden Neuron ${getNodeLabel()}`;
    return `Output Neuron ${getNodeLabel()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 border border-white/20 rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{getTitle()}</h3>
            <p className="text-sm text-blue-100">Step-by-step calculation breakdown</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-white/10 rounded-lg p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">{step.label}</h4>
                  <p className="text-sm text-gray-400 mb-3">{step.explanation}</p>
                </div>
              </div>

              <div className="ml-11 space-y-2">
                {/* Formula */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <div className="text-xs text-blue-300 mb-1 font-semibold">FORMULA</div>
                  <div className="font-mono text-white text-sm">{step.formula}</div>
                </div>

                {/* Substitution */}
                {step.substitution && (
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                    <div className="text-xs text-purple-300 mb-1 font-semibold">SUBSTITUTION</div>
                    <div className="font-mono text-white text-sm">{step.substitution}</div>
                  </div>
                )}

                {/* Result */}
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-xs text-green-300 mb-1 font-semibold">RESULT</div>
                  <div className="font-mono text-white text-lg font-bold">{step.result}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Additional calculus notes for backpropagation */}
          {stepSection === 'backpropagation' && currentStepId >= 6 && nodeType !== 'input' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: steps.length * 0.1 }}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">📐</div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Understanding the Chain Rule</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    The chain rule is fundamental to backpropagation. It tells us how to compute the derivative of composite functions:
                  </p>
                  <div className="bg-black/30 rounded p-3 font-mono text-sm text-gray-300 mb-2">
                    If y = f(g(x)), then dy/dx = (dy/dg) × (dg/dx)
                  </div>
                  <p className="text-sm text-gray-300">
                    In neural networks, we chain these derivatives from the loss back to each weight, 
                    which tells us exactly how to adjust each parameter to reduce the error.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4 bg-slate-900/50">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
