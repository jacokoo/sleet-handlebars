import { AbstractCompiler, Helper, Context, NodeType, SleetNode, SleetStack, Compiler, HelperAttribute, Transformer, TransformValue } from 'sleet';
export declare class HelperCompiler extends AbstractCompiler<Helper> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    count: number;
    constructor(node: Helper, stack: SleetStack, count?: number);
    compile(context: Context): void;
}
export declare class HelperAttributeCompiler extends AbstractCompiler<HelperAttribute> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class TransformCompiler extends AbstractCompiler<TransformValue> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class TransformerCompiler extends AbstractCompiler<Transformer> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context, ...next: SleetNode[]): void;
}
