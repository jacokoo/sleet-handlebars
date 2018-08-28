import { TagCompiler } from 'sleet-html/lib/compilers/tag';
import { SleetNode, Compiler, SleetStack, Context } from 'sleet';
export declare class BlockTagCompiler extends TagCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context, elseNode?: SleetNode): void;
    openStart(context: Context): void;
    openEnd(context: Context): void;
    tagClose(context: Context): void;
}
export declare class ElseCompiler extends TagCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    compile(context: Context): void;
}
