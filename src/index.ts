import Decimal from "decimal.js";
import StrCalc from "./lib/StrCalc";

const bigNumberFormat = (num: string = "") => {
  const numStr = BigInt(num);
  return numStr;
};

const transformString = (num: any) => {
  let str = num;
  /* 科学计数 */
  const FEreg = /\d(?:\.(\d*))?e([+-]\d+)/;
  if (FEreg.test(num)) {
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
  /* 正负整数，小数 */
  const reg = /^(\-|\+)?\d+(\.\d+)?$/;
  return reg.test(num);
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
  /* 全0匹配 */
  const zeroReg = /^0+$/g;
  return `${numInt}${
    zeroReg.test(numDecimal) ? "" : `.${numDecimal.substring(0, digit)}`
  }`;
};

/* 加 */
export const bigAdd = (numOne: any, numTwo: any, digit: number = 16): any => {
  let numOneCopy = transformString(numOne);
  let numTwoCopy = transformString(numTwo);

  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  const tempStr = (
    bigNumberFormat(numOneInt + numOneDecimal) +
    bigNumberFormat(numTwoInt + numTwoDecimal)
  ).toString();
  const length = numOneDecimal.length;
  const numInt =
    tempStr.length - length === 0
      ? "0"
      : tempStr.substring(0, tempStr.length - length);
  const numDecimal = tempStr.substring(tempStr.length - length, tempStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 减 */
export const bigSub = (numOne: any, numTwo: any, digit: number = 16): any => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);
  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  const tempStr = (
    bigNumberFormat(numOneInt + numOneDecimal) -
    bigNumberFormat(numTwoInt + numTwoDecimal)
  ).toString();
  const length = numOneDecimal.length;
  const numInt =
    tempStr.length - length === 0
      ? "0"
      : tempStr.substring(0, tempStr.length - length);
  const numDecimal = tempStr.substring(tempStr.length - length, tempStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 乘 */
export const bigMul = (numOne: any, numTwo: any, digit: number = 16) => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);
  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  const tempStr = (
    bigNumberFormat(numOneInt + numOneDecimal) *
    bigNumberFormat(numTwoInt + numTwoDecimal)
  ).toString();
  const length = numOneDecimal.length + numTwoDecimal.length;
  const numInt =
    tempStr.length - length === 0
      ? "0"
      : tempStr.substring(0, tempStr.length - length);
  const numDecimal = tempStr.substring(tempStr.length - length, tempStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 除 */
export const bigDiv = (numOne: any, numTwo: any, digit: number = 16) => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);
  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOneCopy, numTwoCopy);
  /* 取余数 */
  const numRemainder =
    bigNumberFormat(numOneInt + numOneDecimal) %
    bigNumberFormat(numTwoInt + numTwoDecimal);
  const [floatInt, floatDecimal] = new Decimal(Number(numRemainder))
    .div(new Decimal(Number(bigNumberFormat(numTwoInt + numTwoDecimal))))
    .toNumber()
    .toString()
    .split(".");
  const numDecimal = floatDecimal;
  const numInt = (
    bigNumberFormat(numOneInt + numOneDecimal) /
      bigNumberFormat(numTwoInt + numTwoDecimal) +
    bigNumberFormat(floatInt)
  ).toString();
  return resultNum(numInt, numDecimal, digit);
};

/* 比较 */
export const bigCompare = (numOne: any, numTwo: any, calc: string = "===") => {
  const numOneCopy = transformString(numOne);
  const numTwoCopy = transformString(numTwo);
  if (!checkNum(numOneCopy) || !checkNum(numTwoCopy)) {
    console.error("请输入正确数字字符串");
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
export const bigCalc = (str: string) => {
  const strCalc = new StrCalc(bigAdd, bigSub, bigMul, bigDiv);
  const ast = strCalc.parse(str);
  return strCalc.exec(ast);
};

const MaxBigDecimal = { bigAdd, bigSub, bigMul, bigDiv, bigCompare, bigCalc };
export default MaxBigDecimal;
