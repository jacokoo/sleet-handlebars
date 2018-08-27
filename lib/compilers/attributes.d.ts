import { AttributeCompiler } from 'sleet-html/lib/compilers/attribute';
import { SleetNode, SleetStack, Compiler, Context, NodeType, StringValue, IdentifierValue } from 'sleet';
export declare class DynamicAttributeCompiler extends AttributeCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class StringValueCompiler implements Compiler {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    private value;
    constructor(value: StringValue);
    compile(context: Context): void;
}
export declare class IdentifierValueCompiler implements Compiler {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    private value;
    constructor(value: IdentifierValue);
    compile(context: Context): void;
}
