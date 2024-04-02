# Genetic Algorithm Simulation

This repository contains a simple genetic algorithm simulation implemented in JavaScript. The simulation uses HTML5
canvas to visualize the movement of objects towards a goal, evolving over generations through a genetic algorithm.

## Overview

The primary focus of this project is to demonstrate the concept of genetic algorithms applied to the movement of objects
on a canvas. Each object's movement is determined by a set of genes, and these genes evolve over generations through the
principles of natural selection.

## Genetic Algorithm

In this simulation:

- Each object is represented by a set of genes, which determine its movement behavior.
- Genes encode specific actions (e.g., move left, move right, move up, move down).
- The simulation evolves over generations, with individuals inheriting genes from the fittest individuals of the
  previous generation.
- Random mutations occur in each generation, introducing variability in the gene pool.

## Parameters

Adjustable parameters allow customization of the genetic algorithm:

- **Mutation Percentage**: Percentage of genes to mutate in each generation.
- **Generation Size**: Number of individuals in each generation.
- **Inheritance Factor**: Number of top-performing individuals whose genes are inherited.
- **Step Length**: Distance an individual moves in each step.
- **Pixel Size**: Size of the pixels representing individuals on the canvas.
- **Speed**: Simulation speed, controlling the frames per second.

## How to Use

1. Open the `index.html` file in a web browser.
2. Adjust the parameters using the input fields.
3. Click the "Reset" button to restart the simulation.
4. Watch as the objects evolve their movement towards the goal over generations.

## Contributing

Contributions to enhance the genetic algorithm or introduce new features are welcome. Feel free to open issues or submit
pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

