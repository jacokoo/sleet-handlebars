import { AbstractCompiler, Tag, NodeType, SleetStack, SleetNode, Compiler, Context, StaticText, DynamicText } from 'sleet';
export declare class HandlebarsTextCompiler extends AbstractCompiler<Tag> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
    inline(): boolean;
}
export declare class StaticTextCompiler extends AbstractCompiler<StaticText> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class DynamicTextCompiler extends AbstractCompiler<DynamicText> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
