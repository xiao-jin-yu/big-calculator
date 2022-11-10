import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default [
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].cjs.js",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      cleanup(),
      nodePolyfills()
    ],
  },
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].esm.js",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      cleanup(),
      nodePolyfills()
    ],
  },
];
