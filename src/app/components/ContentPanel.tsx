import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import { Step } from '../types';
import { Quiz } from './Quiz';

interface ContentPanelProps {
  step: Step;
  onQuizComplete: () => void;
}

export function ContentPanel({ step, onQuizComplete }: ContentPanelProps) {
  return (
    <div className="w-96 bg-black/40 border-l border-white/10 p-6 overflow-y-auto">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Step header */}
        <div>
          <div className="text-xs text-gray-400 mb-1">
            Step {step.id + 1} of 10
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {step.title}
          </h2>
          <div className={`text-xs font-semibold uppercase tracking-wider ${
            step.section === 'feedforward' ? 'text-blue-400' : 'text-red-400'
          }`}>
            {step.section === 'feedforward' ? 'Feedforward' : 'Backpropagation'}
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-gray-300 leading-relaxed">
            {step.explanation}
          </p>
        </div>

        {/* Key point */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex gap-3">
            <Lightbulb className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <div className="text-xs text-yellow-400 font-semibold mb-1">KEY CONCEPT</div>
              <div className="text-sm text-yellow-100">{step.keyPoint}</div>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <Quiz quiz={step.quiz} onCorrectAnswer={onQuizComplete} />
      </motion.div>
    </div>
  );
}