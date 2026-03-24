import { NetworkVisualization } from './NetworkVisualization';
import { CalculationDisplay } from './CalculationDisplay';
import { VisualState, NetworkData } from '../types';

interface NetworkWithCalculationsProps {
  visualState: VisualState;
  networkData: NetworkData;
  stepId: number;
  onNodeClick: (nodeType: 'input' | 'hidden' | 'output', index: number) => void;
}

export function NetworkWithCalculations({ 
  visualState, 
  networkData, 
  stepId,
  onNodeClick 
}: NetworkWithCalculationsProps) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto">
      {/* Network Visualization */}
      <div className="flex-shrink-0">
        <NetworkVisualization
          visualState={visualState}
          networkData={networkData}
          onNodeClick={onNodeClick}
        />
      </div>

      {/* Calculations Section */}
      <div className="flex-shrink-0 px-8 pb-8">
        <CalculationDisplay stepId={stepId} networkData={networkData} />
      </div>
    </div>
  );
}
