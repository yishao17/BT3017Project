import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { VisualState, NetworkData } from '../types';

interface NetworkVisualizationProps {
  visualState: VisualState;
  networkData: NetworkData;
  onNodeClick: (nodeType: 'input' | 'hidden' | 'output', index: number) => void;
}

export function NetworkVisualization({ visualState, networkData, onNodeClick }: NetworkVisualizationProps) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [visualState.animationType]);

  const { inputs, hiddenActivations, outputActivation, target, loss } = networkData;

  // Layout positions
  const inputPositions = [
    { x: 100, y: 150 },
    { x: 100, y: 350 },
  ];
  const hiddenPositions = [
    { x: 350, y: 150 },
    { x: 350, y: 350 },
  ];
  const outputPosition = { x: 600, y: 250 };

  const getColorForMode = () => {
    switch (visualState.colorMode) {
      case 'blue': return '#3b82f6';
      case 'green': return '#22c55e';
      case 'orange': return '#f97316';
      case 'red': return '#ef4444';
      case 'purple': return '#a855f7';
      default: return '#3b82f6';
    }
  };

  const color = getColorForMode();

  const renderNeuron = (
    x: number, 
    y: number, 
    value: number, 
    label: string, 
    isHighlighted: boolean,
    nodeType: 'input' | 'hidden' | 'output',
    index: number
  ) => (
    <g key={`${label}-${x}-${y}`} className="cursor-pointer" onClick={() => onNodeClick(nodeType, index)}>
      <motion.circle
        cx={x}
        cy={y}
        r={35}
        fill={isHighlighted ? `${color}33` : '#1e293b'}
        stroke={isHighlighted ? color : '#475569'}
        strokeWidth={isHighlighted ? 3 : 2}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hover:fill-white/10 transition-all"
      />
      {isHighlighted && (
        <motion.circle
          cx={x}
          cy={y}
          r={40}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <text
        x={x}
        y={y - 5}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        className="pointer-events-none"
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="14"
        className="pointer-events-none"
      >
        {value.toFixed(2)}
      </text>
    </g>
  );

  const renderConnection = (
    x1: number, y1: number, 
    x2: number, y2: number, 
    weight: number, 
    index: string,
    shouldHighlight: boolean
  ) => {
    const gradient = weight >= 0 ? weight : -weight;
    const strokeWidth = visualState.showGradients ? 2 + gradient * 3 : 2;

    return (
      <g key={`conn-${index}`}>
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={shouldHighlight ? color : '#334155'}
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: shouldHighlight ? 0.8 : 0.3 }}
          transition={{ duration: 0.5 }}
        />
        {visualState.showWeights && (
          <text
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2 - 10}
            textAnchor="middle"
            fill={shouldHighlight ? color : '#64748b'}
            fontSize="11"
            fontWeight={shouldHighlight ? 'bold' : 'normal'}
          >
            {weight.toFixed(2)}
          </text>
        )}
      </g>
    );
  };

  const renderSignalFlow = () => {
    if (!visualState.showSignalFlow) return null;

    const isForward = visualState.signalFlowDirection === 'forward';
    const paths: Array<{from: {x: number, y: number}, to: {x: number, y: number}}> = [];

    if (isForward) {
      // Input to hidden
      inputPositions.forEach(inp => {
        hiddenPositions.forEach(hid => {
          paths.push({ from: inp, to: hid });
        });
      });
      // Hidden to output
      hiddenPositions.forEach(hid => {
        paths.push({ from: hid, to: outputPosition });
      });
    } else {
      // Backward flow
      hiddenPositions.forEach(hid => {
        paths.push({ from: outputPosition, to: hid });
      });
      inputPositions.forEach(inp => {
        hiddenPositions.forEach(hid => {
          paths.push({ from: hid, to: inp });
        });
      });
    }

    return paths.map((path, i) => (
      <motion.circle
        key={`signal-${animationKey}-${i}`}
        r={5}
        fill={color}
        initial={{ x: path.from.x, y: path.from.y, opacity: 0 }}
        animate={{ 
          x: [path.from.x, path.to.x],
          y: [path.from.y, path.to.y],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1,
          delay: i * 0.1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    ));
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="relative">
        <svg width="750" height="500" className="drop-shadow-2xl">
          {/* Connections from input to hidden */}
          {inputPositions.map((inp, i) => 
            hiddenPositions.map((hid, j) => 
              renderConnection(
                inp.x, inp.y, hid.x, hid.y,
                networkData.hiddenWeights[j][i],
                `ih-${i}-${j}`,
                (visualState.showWeights || visualState.showGradients) ?? false
              )
            )
          )}

          {/* Connections from hidden to output */}
          {hiddenPositions.map((hid, i) =>
            renderConnection(
              hid.x, hid.y, outputPosition.x, outputPosition.y,
              networkData.outputWeights[i],
              `ho-${i}`,
              (visualState.showWeights || visualState.showGradients) ?? false
            )
          )}

          {/* Signal flow animations */}
          {renderSignalFlow()}

          {/* Input neurons */}
          {inputPositions.map((pos, i) => 
            renderNeuron(pos.x, pos.y, inputs[i], `x${i + 1}`, visualState.highlightInputs ?? false, 'input', i)
          )}

          {/* Hidden neurons */}
          {hiddenPositions.map((pos, i) => 
            renderNeuron(pos.x, pos.y, hiddenActivations[i], `h${i + 1}`, visualState.highlightHidden ?? false, 'hidden', i)
          )}

          {/* Output neuron */}
          {renderNeuron(
            outputPosition.x, 
            outputPosition.y, 
            outputActivation, 
            'y', 
            visualState.highlightOutput ?? false,
            'output',
            0
          )}

          {/* Layer labels */}
          <text x={100} y={80} textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
            Input Layer
          </text>
          <text x={350} y={80} textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
            Hidden Layer
          </text>
          <text x={600} y={80} textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
            Output Layer
          </text>
        </svg>

        {/* Loss display */}
        {visualState.showError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500/20 border border-orange-500 rounded-lg px-6 py-3 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="text-xs text-orange-300 mb-1">Loss Calculation</div>
              <div className="text-sm text-white">
                <span className="font-mono">Prediction: {outputActivation.toFixed(2)}</span>
                <span className="mx-3 text-orange-300">vs</span>
                <span className="font-mono">Target: {target.toFixed(2)}</span>
              </div>
              <div className="text-lg font-bold text-orange-400 mt-1">
                Loss: {loss.toFixed(3)}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}