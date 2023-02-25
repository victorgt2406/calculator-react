import React, { Component } from 'react';
import { CalculatorComponent } from './Calculator';
import calculatorLogic from './CalculatorLogic';

interface MyProps extends CalculatorComponent {
    solution:string;
    operation: string;
    handleOperation: (operation:string)=>void;
}

type MyState = {
    copying: boolean
}

class Display extends Component<MyProps, MyState> {
    state: MyState = {
        copying: false
    }

    handleCopy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        navigator.clipboard.writeText(this.props.solution);
        setTimeout(() => this.setState({ copying: false }), 200);
        this.setState({ copying: true });
    }


    render() {
        let solution = this.props.solution;
        const copying = this.state.copying ? "bi bi-clipboard-check" : "bi bi-clipboard";
        return (
            <div className="mx-2 d-flex flex-column">
                <input className="form-control form-control-lg rounded-0 rounded-top fw-bold text-end" onChange={(event) => this.props.handleOperation(event.target.value)} type="text" placeholder="0" style={{ fontSize: "24px" }} value={this.props.operation}/>
                <div className='d-flex flex-center border border-dark-subtle'>
                    <div className="col-10 d-flex">
                        <input className="form-control rounded-0 text-end border border-0" type="text" value={solution} aria-label={`solution: ${solution}`} readOnly={true} />
                    </div>
                    <button className="col-2 btn btn-primary rounded-0" onClick={(event) => this.handleCopy(event)} disabled={this.state.copying}><i className={copying}></i></button>
                </div>
            </div>
        );
    }
}

export default Display;