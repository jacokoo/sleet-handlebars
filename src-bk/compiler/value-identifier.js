import { ValueCompiler } from 'sleet/lib/compiler/value';

export class ValueIdentifierCompiler extends ValueCompiler {
    compile (context, value) {
        return `{{${value.value}}}`;
    }
}
