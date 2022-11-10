import Decimal from "decimal.js";
import JSBI from "jsbi";
console.log('JSBI: ', JSBI);

const bigNumberFormat = (num: string = "") => {
  const numStr = JSBI.BigInt(num);
  return numStr;
};

/* 检测输入类型 */
const checkNum = (num: string = "") => {
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

/* 输出整数，小数 */
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
    numOneInt,
    numOneDecimal: numOneDecimalCopy,
    numTwoInt,
    numTwoDecimal: numTwoDecimalCopy,
  };
};

/* 输出结果 */
const resultNum = (
  numInt: string = "",
  numDecimal: string = "",
  digit: number = 2
) =>
  `${numInt}${numDecimal !== "0" ? `.${numDecimal.substring(0, digit)}` : ""}`;

/* 加 */
const bigAdd = (
  numOne: string = "",
  numTwo: string = "",
  digit: number = 2
) => {
  if (!checkNum(numOne) || !checkNum(numTwo)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOne, numTwo);
  let numInt = "";
  let numDecimal = "";
  const isAddOne =
    (bigNumberFormat(numOneDecimal) + bigNumberFormat(numTwoDecimal)).toString()
      .length > numOneDecimal.length;
  if (isAddOne) {
    // 截取
    numDecimal = (
      bigNumberFormat(numOneDecimal) + bigNumberFormat(numTwoDecimal)
    )
      .toString()
      .substring(1);
    // 进位
    numInt = (
      bigNumberFormat(numOneInt) +
      bigNumberFormat(numTwoInt) +
      bigNumberFormat("1")
    ).toString();
  } else {
    numDecimal = (
      bigNumberFormat(numOneDecimal) + bigNumberFormat(numTwoDecimal)
    ).toString();
    numInt = (
      bigNumberFormat(numOneInt) + bigNumberFormat(numTwoInt)
    ).toString();
  }

  return resultNum(numInt, numDecimal, digit);
};

/* 减 */
const bigSub = (
  numOne: string = "",
  numTwo: string = "",
  digit: number = 2
) => {
  if (!checkNum(numOne) || !checkNum(numTwo)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOne, numTwo);
  let numInt = "";
  let numDecimal = "";
  if (
    bigNumberFormat(numOneInt) >= bigNumberFormat(numTwoInt) &&
    bigNumberFormat(numOneDecimal) >= bigNumberFormat(numTwoDecimal)
  ) {
    // 整数小数皆大于/等于
    numDecimal = (
      bigNumberFormat(
        zeroFill(numOneDecimal, numOneDecimal.length - numTwoDecimal.length)
      ) - bigNumberFormat(numTwoDecimal)
    ).toString();
    numInt = (
      bigNumberFormat(numOneInt) - bigNumberFormat(numTwoInt)
    ).toString();
  } else if (
    bigNumberFormat(numOneInt) < bigNumberFormat(numTwoInt) &&
    bigNumberFormat(numOneDecimal) < bigNumberFormat(numTwoDecimal)
  ) {
    // 整数小数皆小于
    numDecimal = (
      bigNumberFormat(numTwoDecimal) - bigNumberFormat(numOneDecimal)
    ).toString();
    numInt = `-${(
      bigNumberFormat(numTwoInt) - bigNumberFormat(numOneInt)
    ).toString()}`;
  } else if (
    bigNumberFormat(numOneInt) > bigNumberFormat(numTwoInt) &&
    bigNumberFormat(numOneDecimal) < bigNumberFormat(numTwoDecimal)
  ) {
    // 整数大于等于 小数小于
    numDecimal = (
      bigNumberFormat(`1${numOneDecimal}`) - bigNumberFormat(numTwoDecimal)
    ).toString();
    numInt = (
      bigNumberFormat(numOneInt) -
      bigNumberFormat(numTwoInt) -
      bigNumberFormat("1")
    ).toString();
  } else if (
    bigNumberFormat(numOneInt) < bigNumberFormat(numTwoInt) &&
    bigNumberFormat(numOneDecimal) > bigNumberFormat(numTwoDecimal)
  ) {
    // 整数小于等于 小数大于
    numDecimal = (
      bigNumberFormat(numOneDecimal) - bigNumberFormat(numTwoDecimal)
    ).toString();
    numInt = `-${(
      bigNumberFormat(numTwoInt) - bigNumberFormat(numOneInt)
    ).toString()}`;
  }
  return resultNum(numInt, numDecimal, digit);
};

/* 乘 */
const bigMul = (
  numOne: string = "",
  numTwo: string = "",
  digit: number = 2
) => {
  if (!checkNum(numOne) || !checkNum(numTwo)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOne, numTwo);
  const mulStr = (
    bigNumberFormat(numOneInt + numOneDecimal) *
    bigNumberFormat(numTwoInt + numTwoDecimal)
  ).toString();
  const length = numOneDecimal.length + numTwoDecimal.length;
  const numInt = mulStr.slice(0, mulStr.length - length);
  const numDecimal = mulStr.slice(length, mulStr.length);
  return resultNum(numInt, numDecimal, digit);
};

/* 除 */
const bigDiv = (
  numOne: string = "",
  numTwo: string = "",
  digit: number = 2
) => {
  if (!checkNum(numOne) || !checkNum(numTwo)) {
    console.error("请输入正确数字字符串");
    return null;
  }
  const { numOneInt, numOneDecimal, numTwoInt, numTwoDecimal } =
    digitLengthComparison(numOne, numTwo);
  /* 取余数 */
  const numRemainder =
    bigNumberFormat(numOneInt + numOneDecimal) %
    bigNumberFormat(numTwoInt + numTwoDecimal);
  const [floatInt, floatDecimal] = new Decimal(Number(numRemainder))
    .div(new Decimal(Number(bigNumberFormat(numTwoInt + numTwoDecimal))))
    .toNumber()
    .toFixed(digit)
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

export { bigAdd, bigSub, bigMul, bigDiv };
