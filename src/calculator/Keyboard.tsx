import React, { Component } from 'react';
import { CalculatorComponent } from './Calculator';
import Key from './Key';

interface MyProps extends CalculatorComponent{
    handleOperation: (operation:string)=>void;
    operation: string;
}

class Keyboard extends Component<MyProps,{}> {
    render() {
        const operation = this.props.operation;
        const handleOperation = (operation:string)=>this.props.handleOperation(operation);
        const props = {operation, handleOperation};

        return (
            <div className="mx-2 d-flex bg-primary-subtle rounded-bottom border border-dark-subtle">
                <div className="col-9 d-flex flex-wrap">
                    <Key {...props}>7</Key>
                    <Key {...props}>8</Key>
                    <Key {...props}>9</Key>
                    <div className="w-100"></div>
                    <Key {...props}>4</Key>
                    <Key {...props}>5</Key>
                    <Key {...props}>6</Key>
                    <div className="w-100"></div>
                    <Key {...props}>1</Key>
                    <Key {...props}>2</Key>
                    <Key {...props}>3</Key>
                    <div className="w-100"></div>
                    <Key {...props}>.</Key>
                    <Key {...props}>0</Key>
                    <Key {...props}> </Key>
                </div>
                <div className="col-3 d-flex flex-column">
                    <Key {...props}>/</Key>
                    <Key {...props}>*</Key>                    
                    <Key {...props}>-</Key>
                    <Key {...props}>+</Key>
                    
                </div>
            </div>
        );
    }
}

export default Keyboard;