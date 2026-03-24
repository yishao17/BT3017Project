export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  correctExplanation: string;
}

export interface Step {
  id: number;
  title: string;
  section: 'feedforward' | 'backpropagation';
  explanation: string;
  keyPoint: string;
  quiz: QuizQuestion;
  visualState: VisualState;
}

export interface VisualState {
  highlightInputs?: boolean;
  highlightHidden?: boolean;
  highlightOutput?: boolean;
  showSignalFlow?: boolean;
  signalFlowDirection?: 'forward' | 'backward';
  showWeights?: boolean;
  showGradients?: boolean;
  showError?: boolean;
  colorMode?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  animationType?: 'forward' | 'backward' | 'update' | 'loss' | 'none';
}

export interface NetworkData {
  inputs: number[];
  hiddenWeights: number[][];
  outputWeights: number[];
  hiddenActivations: number[];
  outputActivation: number;
  target: number;
  loss: number;
  gradients?: number[][];
}
