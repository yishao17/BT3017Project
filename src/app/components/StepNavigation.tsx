import { Check } from 'lucide-react';
import { steps } from '../data/steps';

interface StepNavigationProps {
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (stepId: number) => void;
}

export function StepNavigation({ currentStep, completedSteps, onStepClick }: StepNavigationProps) {
  const feedforwardSteps = steps.filter(s => s.section === 'feedforward');
  const backpropagationSteps = steps.filter(s => s.section === 'backpropagation');

  const renderStep = (step: typeof steps[0]) => {
    const isCompleted = completedSteps.has(step.id);
    const isCurrent = currentStep === step.id;
    const isAccessible = step.id === 0 || completedSteps.has(step.id - 1);

    return (
      <button
        key={step.id}
        onClick={() => isAccessible && onStepClick(step.id)}
        disabled={!isAccessible}
        className={`
          w-full text-left px-4 py-3 rounded-lg transition-all
          ${isCurrent ? 'bg-blue-500/20 border-l-4 border-blue-500' : 'hover:bg-white/5'}
          ${!isAccessible ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center gap-3">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center text-xs
            ${isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}
          `}>
            {isCompleted ? <Check size={14} /> : step.id + 1}
          </div>
          <span className={`text-sm ${isCurrent ? 'text-white font-medium' : 'text-gray-300'}`}>
            {step.title}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="w-80 bg-black/40 border-r border-white/10 p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Neural Network Learning Lab</h2>
        <p className="text-sm text-gray-400">Step-by-step guide to understanding neural networks</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Section 1: Feedforward
          </h3>
          <div className="space-y-1">
            {feedforwardSteps.map(renderStep)}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
            Section 2: Backpropagation
          </h3>
          <div className="space-y-1">
            {backpropagationSteps.map(renderStep)}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-400 mb-2">Progress</div>
        <div className="flex gap-1">
          {steps.map(step => (
            <div
              key={step.id}
              className={`h-1.5 flex-1 rounded-full ${
                completedSteps.has(step.id) ? 'bg-green-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {completedSteps.size} / {steps.length} completed
        </div>
      </div>
    </div>
  );
}
