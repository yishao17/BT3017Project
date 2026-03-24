import { useState, useEffect } from "react";
import { StepNavigation } from "./components/StepNavigation";
import { NetworkWithCalculations } from "./components/NetworkWithCalculations";
import { ContentPanel } from "./components/ContentPanel";
import { CompletionModal } from "./components/CompletionModal";
import { CalculationModal } from "./components/CalculationModal";
import { steps } from "./data/steps";
import { NetworkData } from "./types";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<
    Set<number>
  >(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [selectedNode, setSelectedNode] = useState<{
    type: "input" | "hidden" | "output";
    index: number;
  } | null>(null);

  // Initialize network data with realistic values
  const [networkData] = useState<NetworkData>({
    inputs: [1.0, 0.5],
    hiddenWeights: [
      [0.42, 0.15],
      [0.72, 0.38],
    ],
    outputWeights: [0.65, 0.28],
    hiddenActivations: [0.63, 0.78],
    outputActivation: 0.72,
    target: 1.0,
    loss: 0.0392,
  });

  const handleQuizComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);

    // Move to next step
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1500);
    } else {
      // Show completion modal
      setTimeout(() => {
        setShowCompletion(true);
      }, 1500);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setShowCompletion(false);
  };

  const handleNodeClick = (
    nodeType: "input" | "hidden" | "output",
    index: number,
  ) => {
    setSelectedNode({ type: nodeType, index });
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="h-screen bg-slate-900 text-white flex overflow-hidden">
      <StepNavigation
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      <NetworkWithCalculations
        visualState={currentStepData.visualState}
        networkData={networkData}
        stepId={currentStep}
        onNodeClick={handleNodeClick}
      />

      <ContentPanel
        step={currentStepData}
        onQuizComplete={handleQuizComplete}
      />

      {showCompletion && (
        <CompletionModal onRestart={handleRestart} />
      )}

      {selectedNode && (
        <CalculationModal
          nodeType={selectedNode.type}
          nodeIndex={selectedNode.index}
          stepSection={currentStepData.section}
          currentStepId={currentStep}
          networkData={networkData}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

export default App;