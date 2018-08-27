import { AbstractCompiler, Helper, Context, NodeType, SleetNode, SleetStack, Compiler, HelperAttribute } from 'sleet';
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
