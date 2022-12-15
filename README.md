# big-calculator

big-calculator 是基于 ES2020 新增的基础数据类型 BigInt 及 [decimal.js](https://github.com/MikeMcl/decimal.js) 进行超大整数/小数计算简单工具函数。
---

### 安装

```
npm install big-calculator --save
# or
yarn add big-calculator
```

---

### 使用

```
// 全量引用
import calculator, { add, sub, mul, div, compare, calc } from "../src/index";
// 加
const addNum = calculator.add("123.788", "78345.22123458");
// -> 78469.00923458
// 减
const subNum = calculator.sub("4354.3", "0.14498832");
// -> 4354.15501168
// 乘
const mulNum = calculator.mul("253365.458", "778552.7852");
// -> 197258382999.37362160
// 除
const divNum = calculator.div("0.72045456", "3564566154345");
// -> 2.0211563730464296
# or
// 按需引用
import { add, sub, mul, div } from "big-calculator";

const addNum = add("1115321211.9982054", "1398415615111.28");
// -> 1399530936323.2782054
const subNum = sub("1.3", "0.1");
// -> 1.2
const mulNum = mul("99984412349.222", "99989419.4566");
// -> 9997383345508015560.67276520
const divNum = div("0.45565213424511", "0.12121341234234");
// -> 3.7590900663552240
```
---

### 精度
加减乘除默认精度为有效数，最大精度为16

```
const addNum = add("1115321211.9982054", "1398415615111.28", 6);
// -> 1399530936323.278205
const subNum = sub("1.3", "0.1",4);
// -> 1.2
```
---
### 比较
```
const isResult_1 = compare("123123.999", "123123.999", "===")
// -> true
const isResult_2 = compare("123123.999", "123123.999", "<")
// -> false
const isResult_3 = compare("123123.999", "123123.999", ">")
// -> false
const isResult_4 = compare("123123.999", "123123.999", "<=")
// -> true
const isResult_5 = compare("123123.999", "123123.999", ">=")
// -> true
```

### 字符串模板计算
```
const calc_1 = calc("123123.999 + 123123.999")
// -> 246247.998
const calc_2 = calc("123123.999 + 123123.999 - -25451.34 * 5415418.44 / 96342")
// -> 1676876.9652075481098586
```

