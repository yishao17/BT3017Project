import { motion } from 'motion/react';
import { Trophy, RotateCcw, CheckCircle } from 'lucide-react';

interface CompletionModalProps {
  onRestart: () => void;
}

export function CompletionModal({ onRestart }: CompletionModalProps) {
  const achievements = [
    'Understood feedforward computation',
    'Learned how loss is calculated',
    'Mastered backpropagation',
    'Understood gradient descent',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, type: 'spring', duration: 0.8 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 inline-block">
              <Trophy size={48} className="text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-gray-300">
            You've completed the Neural Network Learning Lab!
          </p>
        </div>

        <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
          <div className="text-sm font-semibold text-gray-400 mb-4">
            What you learned:
          </div>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-white">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-200">
            You now have a solid understanding of how neural networks learn through the cycle of 
            forward propagation, loss calculation, backpropagation, and weight updates. 
            Keep exploring and building!
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Restart Lesson
        </button>
      </motion.div>
    </motion.div>
  );
}
