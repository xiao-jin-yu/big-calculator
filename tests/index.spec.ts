import calculator, { add, sub, mul, div, compare, calc } from "../src/index";

describe("计算函数测试", () => {
  test("是否正确相加", () => {
    expect(add("123.788", "78345.22123458")).toBe("78469.00923458");
  });

  test("是否正确相减", () => {
    expect(sub("123.788", "78345.22123458")).toBe("-78221.43323458");
  });

  test("是否正确相乘", () => {
    expect(mul("123.788", "78345.22123458")).toBe("9698198.2461861890400000");
  });

  test("是否正确相除", () => {
    expect(div("123.788", "78345.22123458")).toBe("0.0015800325539876");
  });

  test("是否正确保留精度", () => {
    expect(div("123.788", "78345.22123458", 8)).toBe("0.00158003");
  });

  test("是否相等", () => {
    expect(compare("123123.999", "123123.999", "===")).toBe(true);
  });

  test("是否小于", () => {
    expect(compare("12312.999", "123123.999", "<")).toBe(true);
  });

  test("是否大于", () => {
    expect(compare("9123123.999", "123123.999", ">")).toBe(true);
  });

  test("是否小于等于", () => {
    expect(compare("12312.999", "123123.999", "<=")).toBe(true);
  });

  test("是否大于等于", () => {
    expect(compare("9123123.999", "123123.999", ">=")).toBe(true);
  });

  test("字符串模板计算是否正确", () => {
    expect(calc("123123.999 + 123123.999 - 25451.34 * 5415418.44 / 96342")).toBe('-1184380.9692075481098586');
  });

  test("是否正确相加", () => {
    expect(calculator.add("123.788", "78345.22123458")).toBe("78469.00923458");
  });

  test("是否正确相减", () => {
    expect(calculator.sub("123.788", "78345.22123458")).toBe("-78221.43323458");
  });

  test("是否正确相乘", () => {
    expect(calculator.mul("123.788", "78345.22123458")).toBe("9698198.2461861890400000");
  });

  test("是否正确相除", () => {
    expect(calculator.div("123.788", "78345.22123458")).toBe("0.0015800325539876");
  });

  test("是否正确保留精度", () => {
    expect(calculator.div("123.788", "78345.22123458", 8)).toBe("0.00158003");
  });

  test("是否相等", () => {
    expect(calculator.compare("123123.999", "123123.999", "===")).toBe(true);
  });

  test("是否小于", () => {
    expect(calculator.compare("12312.999", "123123.999", "<")).toBe(true);
  });

  test("是否大于", () => {
    expect(calculator.compare("9123123.999", "123123.999", ">")).toBe(true);
  });

  test("是否小于等于", () => {
    expect(calculator.compare("12312.999", "123123.999", "<=")).toBe(true);
  });

  test("是否大于等于", () => {
    expect(calculator.compare("9123123.999", "123123.999", ">=")).toBe(true);
  });

  test("字符串模板计算是否正确", () => {
    expect(calculator.calc("123123.999 + 123123.999 - 25451.34 * 5415418.44 / 96342")).toBe('-1184380.9692075481098586');
  });
});
