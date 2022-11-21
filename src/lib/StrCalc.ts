class StrCalc {
  stock: any = [];
  parenthesesPairPosition: any = {};
  add: any;
  sub: any;
  mul: any;
  div: any;
  constructor(
    add: (numOne: any, numTwo: any, digit?: number) => any,
    sub: (numOne: any, numTwo: any, digit?: number) => any,
    mul: (numOne: any, numTwo: any, digit?: number) => string | null,
    div: (numOne: any, numTwo: any, digit?: number) => string | null
  ) {
    this.stock = []; // 先进后出，每一次出栈，即一对 ()
    this.parenthesesPairPosition = {};
    /* 计算方式 */
    this.add = add;
    this.sub = sub;
    this.mul = mul;
    this.div = div;
  }

  // 剔除两侧小括号
  removeParentheses = (l: number, r: number) => {
    if (this.parenthesesPairPosition[l] === r) return [++l, --r];

    return [l, r];
  };

  initStr(str: string) {
    const strSubstitution = str.replace(/\s+/g, "");
    /* 负数转换展示形式 */
    const strArr = strSubstitution.split("");
    strArr.forEach((item: string, index: number) => {
      if (item === "-" && ["+", "-", "*", "/"].includes(strArr[index - 1])) {
        strArr[index - 1] = `${strArr[index - 1]}(0`;
        let num = 1;
        while (!["+", "-", "*", "/"].includes(strArr[index + num])) {
          num += 1;
        }
        strArr[index + num - 1] = `${strArr[index + num - 1]})`;
      }
    });
    const strCopy = strArr.join('')
    return strCopy;
  }

  parse = (
    expression: string,
    l = 0,
    r = expression.length - 1,
    skipSearchTimeOrDivide = false
  ): any => {
    let isNumber = true;
    let parenthesesDep = 0; // 记录小括号深度
    let firstTimeOrDivideOperator = null; // 记录遇到的第一个 * / 运算符
    let firstTimeOrDivideOperatorIdx = 0; // 记录遇到的第一个 * / 运算符的位置

    [l, r] = this.removeParentheses(l, r);

    for (let i = r; i >= l; i--) {
      const v = expression[i];
      if (v === ")") {
        this.stock.push(i);
        parenthesesDep++;
      } else if (v === "(") {
        const last = this.stock.pop();
        this.parenthesesPairPosition[i] = last;
        parenthesesDep--;
      }
      // skipSearchTimeOrDivide 为 true 表示表达式是连续的 * /
      if (skipSearchTimeOrDivide && firstTimeOrDivideOperator) {
        return {
          type: firstTimeOrDivideOperator,
          left: this.parse(
            expression,
            l,
            firstTimeOrDivideOperatorIdx - 1,
            true
          ),
          right: this.parse(expression, firstTimeOrDivideOperatorIdx + 1, r),
        };
      }

      if (i === l) {
        if (isNumber) {
          return {
            type: "bigDecimal",
            value: String(expression.slice(l, r + 1)),
          };
        }

        if (this.parenthesesPairPosition[i] === r) {
          return this.parse(expression, l + 1, r - 1);
        }
        // * / 拆分，需要遍历到最左侧，所里拆分逻辑写这里
        return {
          type: firstTimeOrDivideOperator,
          left: this.parse(
            expression,
            l,
            firstTimeOrDivideOperatorIdx - 1,
            true
          ),
          right: this.parse(expression, firstTimeOrDivideOperatorIdx + 1, r),
        };
      }

      if (/[0-9]/.test(v) || v === ".") {
        continue;
      }

      isNumber = false;

      // parenthesesDep === 0 进行表达式分析的时候要确保是同一层级
      if (parenthesesDep === 0 && (v === "+" || v === "-")) {
        return {
          type: v,
          left: this.parse(expression, l, i - 1),
          right: this.parse(expression, i + 1, r),
        };
      }

      if (
        parenthesesDep === 0 &&
        (v === "*" || v === "/") &&
        !firstTimeOrDivideOperator
      ) {
        firstTimeOrDivideOperator = v;
        firstTimeOrDivideOperatorIdx = i;
      }
    }
  };

  exec = (ast: any) => {
    const recursion = (ast: {
      type: string;
      left: any;
      right: any;
      value: any;
    }): any => {
      if (ast.type === "+") {
        return this.add(recursion(ast.left), recursion(ast.right));
      } else if (ast.type === "-") {
        return this.sub(recursion(ast.left), recursion(ast.right));
      } else if (ast.type === "*") {
        return this.mul(recursion(ast.left), recursion(ast.right));
      } else if (ast.type === "/") {
        return this.div(recursion(ast.left), recursion(ast.right));
      } else if (ast.type === "bigDecimal") {
        return ast.value;
      }
    };

    return recursion(ast);
  };
}

export default StrCalc;
