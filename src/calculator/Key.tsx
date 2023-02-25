import React, { Component, ReactNode } from 'react';
import { CalculatorComponent } from './Calculator';
import calculatorLogic from './CalculatorLogic';

interface MyProps extends CalculatorComponent{
    operation:string;
    children: string;
    handleOperation:(operation:string)=>void;
    color?:string;
}

class Key extends Component<MyProps, {}> {

    handleClick(){
        this.props.handleOperation(this.props.operation + this.props.children);
    }

    render() {
        return (
            <button className="btn btn-primary col m-2" onClick={()=>this.handleClick()}>
                {this.props.children}
            </button>
        );
    }
}

export default Key;