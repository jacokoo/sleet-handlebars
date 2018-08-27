import { AttributeCompiler } from 'sleet-html/lib/compilers/attribute';
import { SleetNode, SleetStack, Compiler, Context, NodeType, StringValue, IdentifierValue, AttributeGroup, Setting, AbstractCompiler } from 'sleet';
export declare class DynamicAttributeCompiler extends AttributeCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class StringValueCompiler extends AbstractCompiler<StringValue> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class IdentifierValueCompiler extends AbstractCompiler<IdentifierValue> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class SettingGroupCompiler extends AbstractCompiler<AttributeGroup> {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
export declare class GroupSettingCompiler implements Compiler {
    static type: NodeType;
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    private node;
    private stack;
    constructor(node: Setting, stack: SleetStack);
    compile(context: Context, group: AttributeGroup): void;
}
