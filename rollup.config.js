import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import {babel} from '@rollup/plugin-babel';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      postcss(),
      commonjs(),
      // typescript({ tsconfig: "./tsconfig.json" }),
     
      babel({ 
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react']
    }),
    
    ],
  },
  {
    input: "dist/esm/index.js",
    output: [{ file: "dist/index.js", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];