import React, { Component } from 'react';
import calculatorLogic from './CalculatorLogic';
import Display from './Display';
import Keyboard from './Keyboard';

type MyState = {
    operation: string,
    solution: string
}

interface CalculatorComponent {
    handleOperation?: (operation:string)=>void,
    operation?:string,
    solution?:string
}

class Calculator extends Component<{},MyState> {
    state: MyState = {
        operation: "",
        solution: ""
    }

    handleOperation(operation:string){
        console.log(operation);
        let solution = calculatorLogic.calcOperation(operation);
        this.setState({operation, solution});
    }

    render() {
        return (
            <div className="d-flex flex-column p-2 m-2">
                <Display operation={this.state.operation} solution={this.state.solution} handleOperation={(operation)=>this.handleOperation(operation)}/>
                <Keyboard operation={this.state.operation} handleOperation={(operation)=>this.handleOperation(operation)}/>
            </div>
        );
    }
}

export default Calculator;

export type {CalculatorComponent};