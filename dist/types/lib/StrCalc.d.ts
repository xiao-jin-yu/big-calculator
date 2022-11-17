declare class StrCalc {
    stock: any;
    parenthesesPairPosition: any;
    add: any;
    sub: any;
    mul: any;
    div: any;
    constructor(add: (numOne: any, numTwo: any, digit?: number) => any, sub: (numOne: any, numTwo: any, digit?: number) => any, mul: (numOne: any, numTwo: any, digit?: number) => string | null, div: (numOne: any, numTwo: any, digit?: number) => string | null);
    removeBlank: (expression: string | any[], l: number, r: number) => number[];
    removeParentheses: (l: number, r: number) => number[];
    parse: (str: string, l?: number, r?: number, skipSearchTimeOrDivide?: boolean) => any;
    exec: (ast: any) => any;
}
export default StrCalc;
