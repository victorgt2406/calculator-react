/*
Logica de una calculadora aritmetológica
*/

const strNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const strParenthesis = ["(", ")", "[", "]"];
const strSpecial = ["-", "."];
const strOperators = ["+", "*", "/"];
const strAllowed = [...strNumbers, ...strParenthesis, ...strOperators, ...strSpecial, " "];
enum enumOperator { add, mul, div };
type posOperator = {
    index: number,
    type: enumOperator
}
type posParenthesis = {
    start: number,
    end: number,
    operation: string
}

class CalculatorLogic {
    calcOperation(operation: string, showError: boolean = false): string {
        if (this.isOperation(operation)) {
            operation = this.fixOperation(operation);
            let parenthesis: posParenthesis | null = this.getParenthesis(operation);
            if (parenthesis !== null) {
                let solution = this.calcOperation(parenthesis.operation);
                let leftOperation = operation.substring(0, parenthesis.start);
                let rightOperation = operation.substring(parenthesis.end + 1, operation.length);
                operation = `${leftOperation}${solution}${rightOperation}`;
                return this.calcOperation(operation);
            }
            else {
                return this.calcSimpleOperation(operation);
            }
        }
        else {
            let sol = "";
            if (showError) {
                sol = `sintaxError ${operation}`;
            }
            return sol;
        }
    }

    private calcSimpleOperation(operation: string, showError: boolean = false): string {
        operation
        if (this.isSimpleOperation(operation)) {
            operation = this.fixOperation(operation);
            // Register all operators
            let operators: posOperator[] = [];
            Array.from(operation).forEach((char, index) => {
                let type = strOperators.indexOf(char);
                if (type != -1) {
                    operators.push({
                        index,
                        type
                    });
                }
            });
            if (operators.length > 0) {
                // sort order of operations
                operators.sort((a, b) => {
                    let a_multDiv = (a.type == enumOperator.mul || a.type == enumOperator.div) ? 1 : -1;
                    let b_multDiv = (b.type == enumOperator.mul || b.type == enumOperator.div) ? 1 : -1;
                    return b_multDiv - a_multDiv;
                });

                // Do the operation
                let op = operators[0];

                // get number of the left
                let left = this.getNum(operation, op.index, true);
                // get number of the right
                let right = this.getNum(operation, op.index, false);
                let newOperation = "0";
                right
                left
                if(!(isNaN(left.num) || isNaN(right.num))){
                             
                    let solution = this.operate(left.num, right.num, op.type);
                    let leftOperation = operation.substring(0, left.start);
                    let rightOperation = operation.substring(right.end, operation.length);
                    newOperation = `${leftOperation}${solution}${rightOperation}`;
                }
                return this.calcSimpleOperation(newOperation);
            }
            else {
                return operation;
            }
        }
        else {
            let sol = "";
            if (showError) {
                sol = `sintaxError ${operation}`;
            }
            return sol;
        }
    }

    private operate(a: number, b: number, op: enumOperator) {
        let sol = 0;
        switch (op) {
            case enumOperator.add:
                sol = a + b;
                break;
            case enumOperator.mul:
                sol = a * b;
                break;
            case enumOperator.div:
                sol = a / b;
                break;
        }
        return sol;
    }

    private getParenthesis(operation: string): posParenthesis | null {
        let parenthesis: posParenthesis | null = null;
        if (this.haveParenthesis(operation)) {
            let checker: number = 0;
            let start: number = 0, end: number = 0;

            let suboperation: string = "";
            let index: number = 0;
            let char: string = operation.charAt(index);
            while (index < operation.length && end === 0) {
                if (strParenthesis.indexOf(char) !== -1) {
                    if (strParenthesis.indexOf(char) % 2 === 0) {
                        if (checker === 0) {
                            start = index;
                        }
                        checker++;
                    }
                    else {
                        checker--;
                        if (checker === 0) {
                            end = index;
                            parenthesis = {
                                operation: suboperation,
                                start,
                                end
                            };
                        }
                    }
                }
                if (checker > 0 && index !== start) {
                    suboperation += char;
                }
                char = operation.charAt(++index);
            }

        }
        return parenthesis;
    }

    private getNum(operation: string, index: number, left: boolean): { num: number, start: number, end: number } {
        let num = 0;
        let start = left?0:index+1;
        let end = left?index-1:operation.length-1;

        if (index > 0 && index < operation.length) {
            start = index + 1;
            end = index;
            let sum = left ? -1 : 1;
            let i = index + sum;

            // While the character is not an operator and index is within bounds
            while (i >= 0 && i < operation.length && strOperators.indexOf(operation.charAt(i)) === -1) {
                i += sum;
            }

            if (left) {
                start = i + 1;
            } else {
                end = i;
            }
            num = parseFloat(operation.substring(start, end));
        }

        return { num, start, end };
    }

    private isOperation(operation: string): boolean {
        return this.stringOkay(operation) && this.parathentesOkay(operation)
            && this.operatorsOkay(operation) && this.specialOkay(operation);
    }

    private isSimpleOperation(operation: string): boolean {
        return this.stringOkay(operation) && !this.haveParenthesis(operation)
            && this.operatorsOkay(operation) && this.specialOkay(operation);
    }

    private stringOkay(str: string): boolean {
        let index = 0;
        let char = str.charAt(index);
        while ((strAllowed.indexOf(char) !== -1) && (index < str.length)) {
            index++;
            char = str.charAt(index);
        }

        return index === str.length;
    }

    private operatorsOkay(operation: string) {
        let index = 0;
        let char = operation.charAt(index);
        let lastChar = "";
        let okay: boolean = true;
        while ((index < operation.length) && okay) {
            if (strOperators.indexOf(lastChar) !== -1 && strOperators.indexOf(char) !== -1) {
                okay = false;
            }
            lastChar = char;
            char = operation.charAt(++index);
        }
        index
        return okay;
    }

    private parathentesOkay(operation: string): boolean {
        let checker: number = 0;
        let okay: boolean = true;
        let index = 0;
        let char = operation.charAt(index);
        while ((index < operation.length) && okay) {
            if (strParenthesis.indexOf(char) !== -1) {
                if (strParenthesis.indexOf(char) % 2 === 0) {
                    checker++;
                }
                else {
                    checker--;
                }
            }
            if (checker < 0) {
                okay = false;
            }
            char
            char = operation.charAt(++index);
        }
        index
        return (checker === 0 && okay);
    }

    private specialOkay(operation: string): boolean {
        let index = 0;
        let char = operation.charAt(index);
        let lastChar = "";
        let okay: boolean = true;
        while ((index < operation.length) && okay) {
            if ((strSpecial.indexOf(lastChar) !== -1) && (strSpecial.indexOf(lastChar) === strSpecial.indexOf(char))) {
                okay = false;
            }
            lastChar = char;
            char = operation.charAt(++index);
        }
        index
        return okay;
    }

    private haveParenthesis(operation: string) {
        let have: boolean = false;
        let index = 0;
        let char = operation.charAt(index);
        while ((index < operation.length) && !have) {
            if (strParenthesis.indexOf(char) !== -1) {
                have = true;
            }
            char = operation.charAt(++index);
        }
        return have;
    }

    private fixOperation(operation: string): string {
        let lastChar = "";
        let index = 0;
        let char = operation.charAt(index);
        operation = operation.replace(/\s/g, "");
        let newOperation = "";
        while (index < operation.length) {
            // subtracting case
            if (strNumbers.indexOf(lastChar) !== -1 && char === "-") {
                newOperation += "+";
            }
            // parenthesis case
            if (strNumbers.indexOf(lastChar) !== -1 && char === "(") {
                newOperation += "*";
            }
            if (lastChar === ")" && strNumbers.indexOf(char) !== -1) {
                newOperation += "*";
            }
            if (lastChar === ")" && char === "(") {
                newOperation += "*";
            }
            if (lastChar === "." && strOperators.indexOf(char) !== -1) {
                newOperation += "0";
            }
            newOperation += char;
            lastChar = char;
            char = operation.charAt(++index);
        }
        if([...strOperators, ...strSpecial].indexOf(operation.charAt(operation.length-1)) !== -1){
            newOperation += "0";
        }
        return newOperation;
    }
}

const calculatorLogic: CalculatorLogic = new CalculatorLogic();
console.log(calculatorLogic.calcOperation("112."))

export default calculatorLogic as CalculatorLogic;