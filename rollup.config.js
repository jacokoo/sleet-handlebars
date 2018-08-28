import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

export default {
    input: 'src/index.ts',
    external: ['fs', 'path', 'sleet'],
    plugins: [
        typescript({
            typescript: require('typescript'),
            module: 'es6'
        }),
        resolve(),
        commonjs(),
        babel({
            presets: ['es2015-rollup']
        }),
        uglify()
    ],
    output: {
        file: 'dist/sleet-handlebars.min.js',
        format: 'umd',
        name: 'SleetHandlebars',
        sourcemap: true,
        globals: {
            sleet: 'Sleet',
            fs: 'NODE_FS',
            path: 'NODE_PATH'
        }
    }
}
