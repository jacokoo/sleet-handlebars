import { TagCompiler } from 'sleet-html/lib/compilers/tag';
import { SleetNode, SleetStack, Compiler, Tag, Context } from 'sleet';
export declare class InlineTagCompiler extends TagCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    readonly noEscape: boolean;
    constructor(node: Tag, stack: SleetStack, noEscape: boolean);
    openStart(context: Context): void;
    openEnd(context: Context): void;
    selfClosing(): boolean;
}
