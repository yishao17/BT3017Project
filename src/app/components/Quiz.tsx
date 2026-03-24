import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizProps {
  quiz: QuizQuestion;
  onCorrectAnswer: () => void;
}

export function Quiz({ quiz, onCorrectAnswer }: QuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = quiz.options[selectedOption].isCorrect;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onCorrectAnswer();
      }, 1500);
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="text-xs text-blue-400 font-semibold mb-2">MINI QUIZ</div>
        <div className="text-white font-medium">{quiz.question}</div>
      </div>

      <div className="space-y-2">
        {quiz.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const showCorrect = showFeedback && option.isCorrect;
          const showIncorrect = showFeedback && isSelected && !option.isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => !showFeedback && setSelectedOption(index)}
              disabled={showFeedback}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all
                ${showCorrect ? 'bg-green-500/20 border-green-500' : 
                  showIncorrect ? 'bg-red-500/20 border-red-500' :
                  isSelected ? 'bg-blue-500/20 border-blue-500' : 
                  'bg-white/5 border-white/10 hover:border-white/30'}
                ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              whileHover={!showFeedback ? { scale: 1.02 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{option.text}</span>
                {showCorrect && (
                  <div className="bg-green-500 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
                {showIncorrect && (
                  <div className="bg-red-500 rounded-full p-1">
                    <X size={16} className="text-white" />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-4 ${
            isCorrect 
              ? 'bg-green-500/20 border border-green-500/50' 
              : 'bg-red-500/20 border border-red-500/50'
          }`}
        >
          <div className={`font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
          </div>
          <div className="text-sm text-gray-300">
            {quiz.correctExplanation}
          </div>
        </motion.div>
      )}

      {!showFeedback ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Submit Answer
          <ArrowRight size={20} />
        </button>
      ) : !isCorrect ? (
        <button
          onClick={handleTryAgain}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Try Again
        </button>
      ) : (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
        >
          <Check size={20} />
          Moving to next step...
        </motion.div>
      )}
    </div>
  );
}
