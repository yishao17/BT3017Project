Product Requirements Document (PRD)
Product Name

Neural Network Learning Lab

Subtitle:
A Step-by-Step Visual Guide to Feedforward and Backpropagation

1. Product Vision

The goal of this tool is to help undergraduate computing students deeply understand how neural networks learn.

Instead of reading equations passively, students will:

interact with a visual neural network
follow the learning process step by step
answer mini quizzes at every stage
receive explanations if they make mistakes

The experience should feel like a guided interactive lesson, similar to platforms like Duolingo or Brilliant.

2. Target Users

Primary users:

Undergraduate students studying:

Machine Learning
Artificial Intelligence
Neural Networks
Data Science

Typical difficulties students face:

understanding how forward pass works
understanding why backpropagation is needed
understanding gradients
understanding how weights update

This tool should make the entire learning loop visually clear.

3. Learning Objectives

After completing the lesson, students should understand:

What a neural network is
How inputs move through the network
How predictions are computed
How loss is calculated
How gradients are computed
How backpropagation distributes error
How weights are updated to improve predictions
4. Learning Flow Overview

The lesson is divided into two main sections.

Section 1

Feedforward

Section 2

Backpropagation

Each section contains multiple guided steps.

Each step includes:

Visual animation
Text explanation
Mini quiz

Students must complete the quiz to continue.

5. Interface Layout

The interface should contain three main panels.

Left Panel – Lesson Progress

Shows the steps in order.

Example:

Feedforward
1. Network Overview
2. Input Layer
3. Hidden Layer Computation
4. Output Prediction
5. Loss Calculation

Backpropagation
6. Error at Output
7. Gradient Calculation
8. Error Propagation
9. Weight Update
10. Training Loop

Students can see where they are in the process.

Center Panel – Neural Network Visualization

This is the main visual component.

Show a neural network with:

input neurons
hidden neurons
output neuron
connections (weights)

Each neuron displays:

activation value

Each connection displays:

weight value

Animations show signals moving through the network.

Right Panel – Learning Content

This panel changes for each step.

It contains:

Explanation text
Key concept
Mini quiz
6. Step-by-Step Lesson Structure

Below is the full guided learning sequence.

SECTION 1 — FEEDFORWARD
Step 1 — Neural Network Overview
Visual

Display the full neural network.

Highlight layers:

Input layer
Hidden layer
Output layer

No animation yet.

Explanation Text

Explain that a neural network is a system that:

takes inputs
processes them through layers
produces an output

Mention that weights determine how signals move through the network.

Mini Quiz

Question example:

What is the purpose of a neural network?

Options:

Store data
Transform inputs into predictions
Sort arrays
Compress files

Correct answer:

Transform inputs into predictions.

Step 2 — Input Layer
Visual

Highlight input neurons.

Display example input values.

Example:

x1 = 1
x2 = 0.5

Input nodes glow.

Explanation Text

Explain that inputs represent features of the data.

Example:

house size
temperature
exam score

These values are fed into the neural network.

Mini Quiz

Question:

What do input neurons represent?

Options:

features of the data
final predictions
weights
gradients

Correct answer:

features of the data

Step 3 — Hidden Layer Computation
Visual

Signals move from input neurons to hidden neurons.

Connections light up.

Show weighted sum happening inside hidden neurons.

Explanation Text

Explain that each hidden neuron:

multiplies inputs by weights
adds them together
applies an activation function

This produces the neuron activation.

Mini Quiz

Question:

What role do weights play in the network?

Options:

they store training data
they control the strength of connections
they measure prediction error
they remove noise

Correct answer:

they control the strength of connections

Step 4 — Output Prediction
Visual

Signals travel from hidden neurons to the output neuron.

The predicted value appears.

Example:

Prediction = 0.72

The output neuron glows.

Explanation Text

Explain that the output neuron represents the network’s prediction.

Example predictions:

probability of spam email
house price
exam pass probability
Mini Quiz

Question:

What does the output neuron represent?

Correct answer:

The model’s prediction.

Step 5 — Loss Calculation
Visual

Show comparison:

Prediction vs Target

Example:

Prediction = 0.72
Target = 1.00

Display a loss value.

The output neuron turns orange to indicate error.

Explanation Text

Explain that the loss function measures how wrong the prediction is.

A higher loss means the prediction is further from the correct answer.

The goal of training is to reduce this loss.

Mini Quiz

Question:

What does the loss function measure?

Correct answer:

How far the prediction is from the correct value.

SECTION 2 — BACKPROPAGATION
Step 6 — Error at Output
Visual

The output neuron flashes red.

Error begins to move backward through the network.

Explanation Text

Explain that the network must determine which weights caused the error.

Backpropagation sends error signals backward to identify responsible weights.

Mini Quiz

Question:

Why does the network send error backward?

Correct answer:

To determine which weights contributed to the error.

Step 7 — Gradient Calculation
Visual

Connections display gradient values.

Edges glow red.

Thickness of edges represents gradient magnitude.

Explanation Text

Explain that gradients measure how much the loss would change if a weight changed.

Large gradient means the weight strongly affects the error.

Small gradient means it has little impact.

Mini Quiz

Question:

What does a gradient represent?

Correct answer:

How much a weight affects the loss.

Step 8 — Error Propagation
Visual

Error signals move from output layer to hidden layer.

Hidden neurons briefly display gradient values.

Explanation Text

Explain that the error is distributed across earlier layers using the chain rule.

This allows the network to understand how earlier weights contributed to the error.

Mini Quiz

Question:

Why must error propagate to earlier layers?

Correct answer:

Because earlier weights also influence the final prediction.

Step 9 — Weight Update
Visual

Connections briefly glow purple.

Weight values change.

Example:

w1 = 0.42 → 0.39

Explanation Text

Explain that weights are updated using gradients.

The update moves weights in a direction that reduces the loss.

This process is called gradient descent.

Mini Quiz

Question:

What is the goal of updating weights?

Correct answer:

To reduce prediction error.

Step 10 — Training Loop
Visual

Show a small graph of loss decreasing over time.

Run several training iterations automatically.

Explanation Text

Explain that training repeats the process:

forward pass
loss calculation
backpropagation
weight update

Over time, predictions improve.

Final Quiz

Example question:

What is the full learning cycle of a neural network?

Correct answer:

Forward pass → Loss → Backpropagation → Weight update.

7. Gamification

To increase engagement:

progress bar
correct answer animations
completion badge

Students should feel like they completed a learning journey.

8. Visual Design

The design should feel modern and educational.

Suggested style:

Dark background
Neon flow animations
Minimalist neural network diagram

Color coding:

Forward pass → blue
Activations → green
Loss → orange
Gradients → red
Weight updates → purple

9. Success Criteria

The tool is successful if students can:

explain feedforward
explain backpropagation
describe the role of gradients
describe why weights update

Students should leave the lesson with a clear mental model of how neural networks learn.