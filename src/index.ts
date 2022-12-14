import Decimal from "decimal.js";
import StrCalc from "./lib/TreeCalc";

/* 正则集合 */
const regExpMap = {
  /* 科学计数 */
  FEreg: new RegExp(/\d(?:\.(\d*))?e([+-]\d+)/),
  /* 正负整数，小数 */
  numReg: new RegExp(/^(\-|\+)?\d+(\.\d+)?$/),
  /* 全0匹配 */
  zeroReg: new RegExp(/^[0]*$/),
};

const bigNumberFormat = (num: string = "") => {
  const numStr = BigInt(num);
  return numStr;
};

const transformString = (num: any) => {
  let str = num;
  if (regExpMap.FEreg.test(num)) {
    str = new Decimal(num).toFixed();
  }
  /* bigint */
  const isBigInt = typeof num === "bigint";
  if (isBigInt) {
    str = num.toString();
  }
  /* number */
  const isNumber = typeof num === "number";
  if (isNumber) {
    str = String(num);
  }
  return str;
};

/* 检测输入类型 */
const checkNum = (num: string = "") => {
  return regExpMap.numReg.test(num);
};

/* 0填充 */
const zeroFill = (str: string = "", length: number = 0) => {
  if (length <= 0) return str;
  let zeroStr = str;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    zeroStr += "0";
  }
  return zeroStr;
};

/* 输出整数，小数,是否交换 */
const digitLengthComparison = (numOne: string = "", numTwo: string = "") => {
  const [numOneInt, numOneDecimal = "0"] = numOne.split(".");
  const [numTwoInt, numTwoDecimal = "0"] = numTwo.split(".");
  let numOneDecimalCopy = numOneDecimal;
  let numTwoDecimalCopy = numTwoDecimal;
  if (numOneDecimal.length !== numTwoDecimal.length) {
    if (numOneDecimal.length > numTwoDecimal.length) {
      numOneDecimalCopy = numOneDecimal;
      numTwoDecimalCopy = zeroFill(
        numTwoDecimal,
        numOneDecimal.length - numTwoDecimal.length
      );
    }
    if (numOneDecimal.length < numTwoDecimal.length) {
      numOneDecimalCopy = zeroFill(
        numOneDecimal,
        numTwoDecimal.length - numOneDecimal.length
      );
      numTwoDecimalCopy = numTwoDecimal;
    }
  }
  return {
    numOneInt: numOneInt,
    numOneDecimal: numOneDecimalCopy,
    numTwoInt: numTwoInt,
    numTwoDecimal: numTwoDecimalCopy,
  };
};

/* 输出结果 */
const resultNum = (numInt: string, numDecimal: string, digit: number) => {
  return `${numInt}${regExpMap.zeroReg.test(numDecimal)
    ? ""
    : `.${numDecimal.substring(0, digit)}`
    }`;
};

/* 加 */
export const add = (numOne: any, numTwo: any, digit: number = 16): any => {
  let numOneCopy = transformString(numOne);
  let numTwoCopy = transformString(numTwo);

  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确值!");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  const tempStr = (
    bigNumberFormat(`${numOneInt}${numOneDecimal}`) +
    bigNumberFormat(`${numTwoInt}${numTwoDecimal}`)
  ).toString();
  const length = numOneDecimal.length;
  let numInt =
    tempStr.length - length <= 0
      ? "0"
      : tempStr.substring(0, tempStr.length - length);
  if (numInt === "-") {
    numInt = "-0";
  }
  const numDecimal = tempStr.substring(tempStr.length - length, tempStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 减 */
export const sub = (numOne: any, numTwo: any, digit: number = 16): any => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);

  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确值!");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  const tempStr = (
    bigNumberFormat(`${numOneInt}${numOneDecimal}`) -
    bigNumberFormat(`${numTwoInt}${numTwoDecimal}`)
  ).toString();
  const length = numOneDecimal.length;
  let numInt =
    tempStr.length - length <= 0
      ? "0"
      : tempStr.substring(0, tempStr.length - length);
  if (numInt === "-") {
    numInt = "-0";
  }
  const numDecimal = tempStr.substring(tempStr.length - length, tempStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 乘 */
export const mul = (numOne: any, numTwo: any, digit: number = 16) => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);

  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确值!");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  if (
    (regExpMap.zeroReg.test(numOneInt) &&
      regExpMap.zeroReg.test(numOneDecimal)) ||
    (regExpMap.zeroReg.test(numTwoInt) && regExpMap.zeroReg.test(numTwoDecimal))
  ) {
    return "0";
  }
  const tempStr = (
    bigNumberFormat(`${numOneInt}${numOneDecimal}`) *
    bigNumberFormat(`${numTwoInt}${numTwoDecimal}`)
  ).toString();
  const length = numOneDecimal.length * 2;
  let numInt =
    tempStr.length - length <= 0
      ? "0"
      : tempStr.substring(0, tempStr.length - length);
  if (numInt === "-") {
    numInt = "-0";
  }
  const numDecimal = tempStr.substring(tempStr.length - length, tempStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 除 */
export const div = (numOne: any, numTwo: any, digit: number = 16) => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);

  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确值!");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  if (
    (regExpMap.zeroReg.test(numOneInt) &&
      regExpMap.zeroReg.test(numOneDecimal)) ||
    (regExpMap.zeroReg.test(numTwoInt) && regExpMap.zeroReg.test(numTwoDecimal))
  ) {
    return "0";
  }
  /* 取余数 */
  const numRemainder = (
    bigNumberFormat(`${numOneInt}${numOneDecimal}`) %
    bigNumberFormat(`${numTwoInt}${numTwoDecimal}`)
  ).toString();
  const [floatInt, floatDecimal] = new Decimal(numRemainder)
    .div(new Decimal(`${numTwoInt}${numTwoDecimal}`))
    .toString()
    .split(".");
  const numDecimal = floatDecimal || '0';
  const numInt = (
    bigNumberFormat(numOneInt + numOneDecimal) /
    bigNumberFormat(numTwoInt + numTwoDecimal) +
    bigNumberFormat(floatInt)
  ).toString();
  return resultNum(numInt, numDecimal, digit);
};

/* 比较 */
export const compare = (numOne: any, numTwo: any, calc: string = "===") => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);
  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确值!");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  const compare: any = {
    "===": (a: BigInt, b: BigInt) => a === b,
    "<": (a: BigInt, b: BigInt) => a < b,
    ">": (a: BigInt, b: BigInt) => a > b,
  };
  let isCompare = false;
  /* 等于 */
  if (calc === "===" || calc === "<=" || calc === ">=") {
    isCompare =
      compare["==="](bigNumberFormat(numOneInt), bigNumberFormat(numTwoInt)) &&
      compare["==="](
        bigNumberFormat(numOneDecimal),
        bigNumberFormat(numTwoDecimal)
      );
  }
  /* 小于等于 */
  if ((!isCompare && calc === "<=") || calc === "<") {
    isCompare =
      compare["<"](bigNumberFormat(numOneInt), bigNumberFormat(numTwoInt)) ||
      (compare["==="](bigNumberFormat(numOneInt), bigNumberFormat(numTwoInt)) &&
        compare["<"](
          bigNumberFormat(numOneDecimal),
          bigNumberFormat(numTwoDecimal)
        ));
  }
  /* 大于等于 */
  if ((!isCompare && calc === ">=") || calc === ">") {
    isCompare =
      compare[">"](bigNumberFormat(numOneInt), bigNumberFormat(numTwoInt)) ||
      (compare["==="](bigNumberFormat(numOneInt), bigNumberFormat(numTwoInt)) &&
        compare[">"](
          bigNumberFormat(numOneDecimal),
          bigNumberFormat(numTwoDecimal)
        ));
  }
  return isCompare;
};

/* 字符串模板计算 */
export const calc = (str: string) => {
  const strCalc = new StrCalc(add, sub, mul, div);
  const init = strCalc.init(str);
  if (!init) return null;
  const ast = strCalc.parse(init);
  return strCalc.exec(ast);
};

export default { add, sub, mul, div, compare, calc };
