export declare const bigAdd: (numOne: any, numTwo: any, digit?: number) => any;
export declare const bigSub: (numOne: any, numTwo: any, digit?: number) => any;
export declare const bigMul: (numOne: any, numTwo: any, digit?: number) => string | null;
export declare const bigDiv: (numOne: any, numTwo: any, digit?: number) => string | null;
export declare const bigCompare: (numOne: any, numTwo: any, calc?: string) => boolean | null;
declare const MaxBigDecimal: {
    bigAdd: (numOne: any, numTwo: any, digit?: number) => any;
    bigSub: (numOne: any, numTwo: any, digit?: number) => any;
    bigMul: (numOne: any, numTwo: any, digit?: number) => string | null;
    bigDiv: (numOne: any, numTwo: any, digit?: number) => string | null;
    bigCompare: (numOne: any, numTwo: any, calc?: string) => boolean | null;
    bigCalc: (str: string | any[]) => any;
};
export default MaxBigDecimal;
