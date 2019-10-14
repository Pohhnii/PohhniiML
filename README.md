# PohhniiML
Pohhnii's Library is coded by Pohhnii | Chris, an amateur. This Library is for Machine-Learning and Math. I hope this Library helps to understand the Math and Logic behind Machine-Learning.

This Library can be imported via HTML or Node.

## Documentation
The library includes JSDOCS for an easier use. But here are some examples of the library.

### `Pohhnii.MODELS`
Object for the Machine-Learning Models.

#### `Pohhnii.MODELS.ReferenceFunctions`
Object for Functions with Parameters with an UUID as a Reference.

##### `Pohhnii.MODELS.ReferenceFunctions.FunctionSystem`
Class for a Function System which defines the relations between the parameters.
With this class you are able to create mathematic functions. You can deriviate them with `.deriviative`.
Use `.regression` to fit the model with given data.

##### `Pohhnii.MODELS.ReferenceFunctions.MatrixFunction`
Class for a Matrix Function which is used for Matrix-Math.
With this class you are able to define mathematic functions with matrices.
Deriviate with `.deriviative` and use `regression` to train the model.

#### `Pohhnii.MODELS.ReferenceFunctions.Presets`
Object for Presets (Models) which can be easy used for machine-learning cases.

##### `Pohhnii.MODELS.ReferenceFunctions.Presets.PolynomialFunction`
Function which creates an Object with a Model, a reference to the X-Variable and an array with the references to the Parameters.
The model is a polynomial function and you can use `.regression` to fit the model to given data.

##### `Pohhnii.MODELS.ReferenceFunctions.Presets.SimpleNN`
Function which creates an Object with a Model, a reference to the X-Matrix and an array with the references to the Parameters.
The model is a representation of a simple Neural Network with an input-layer, hidden-layer and output-layer.
Use `.regression` to train the model.

##### `Pohhnii.MODELS.ReferenceFunctions.Presets.SimpleRecurrentModel`
Function which returns a representation of a simple recurrent model.
The model includes an input-layer, hidden-layer and output-layer. Furthermore the model has a recurrent-state and recurrent-layer.
Use `.reset` to reset the model and the recurrent-state.
Use `.time_step` to get a prediction for one time-step.
Use `.predict` to get predictions for more than one time-step.
Use `.regression` to train the model.

## Examples
### Simple Neural Network
```javascript
// Importing The Library
const Pohhnii = require('./PohhniiML/Pohhnii');
const rf = Pohhnii.MODELS.ReferenceFunctions; // refering to ReferenceFunctions
// Creating the Model with 2 input-nodes, 8 hidden-nodes and 1 output-node
const { Model, X, Parameters } = rf.Presets.SimpleNN(2, 8, 1);
// Model: MatrixFunction, X: Reference to the input-matrix, Parameters: References to each Parameter of the model
// Input-Arrays, Representing the XOR-Problem
const inputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
// Output-Arrays, Different inputs => 1, Same inputs => 0
const outputs = [
    [0], [1], [1], [0]
];
// Learnrate of the Neural Network
const LearnRate = 0.5;
// Training the Model for each outputs 3000 times.
for (let epochs = 0; epochs < 3000; epochs++) {
    //Parameters which will be trained, output-values, Learnrate, Reference to the input + value of the input.
    Model.regression(Parameters, outputs[0], LearnRate, X, inputs[0]);
    Model.regression(Parameters, outputs[1], LearnRate, X, inputs[1]);
    Model.regression(Parameters, outputs[2], LearnRate, X, inputs[2]);
    Model.regression(Parameters, outputs[3], LearnRate, X, inputs[3]);
}
// Getting the different outputs after the training
console.log(Model.valueOf(X, inputs[0]).data); //Outputs [0.04554866979985465]
console.log(Model.valueOf(X, inputs[1]).data); //Outputs [0.9369545968253754]
console.log(Model.valueOf(X, inputs[2]).data); //Outputs [0.9375005566696424]
console.log(Model.valueOf(X, inputs[3]).data); //Outputs [0.08844407604356203]
```