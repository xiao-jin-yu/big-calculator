# max-big-decimal

---

max-big-decimal 是基于 ES2020 新增的基础数据类型 BigInt 及 decimal.js 进行超大整数/小数计算简单工具函数。

### 安装

```
npm install max-big-decimal --save
# or
yarn add max-big-decimal
```

---

### 使用

```
// 全量引用
import MaxBigDecimal from "max-big-decimal";
// 加
const addNum = MaxBigDecimal.bigAdd("123.788", "78345.22123458");
// -> 78469
// 减
const subNum = MaxBigDecimal.bigSub("4354.3", "0.14498832");
// -> 4354
// 乘
const mulNum = MaxBigDecimal.bigMul("253365.458", "778552.7852");
// -> 197258382999
// 除
const divNum = MaxBigDecimal.bigDiv("0.72045456", "3564566154345");
// -> 2
# or
// 按需引用
import { bigAdd, bigSub, bigMul, bigDiv } from "max-big-decimal";

const addNum = bigAdd("1115321211.9982054", "1398415615111.28");
// -> 1399530936323
const subNum = bigSub("1.3", "0.1");
// -> 1
const mulNum = bigMul("99984412349.222", "99989419.4566");
// -> 9997383345508015560
const divNum = bigDiv("0.45565213424511", "0.12121341234234");
// -> 3
```


### 精度
加减乘除默认精度为0，最大精度为16,会自动截取或补零

```
const addNum = bigAdd("1115321211.9982054", "1398415615111.28", 6);
// -> 1399530936323.278205
const subNum = bigSub("1.3", "0.1",4);
// -> 1.2000
```

