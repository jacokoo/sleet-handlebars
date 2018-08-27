import { TagCompiler } from 'sleet-html/lib/compilers/tag';
import { SleetNode, Compiler, SleetStack, Context } from 'sleet';
export declare const blocks: string[];
export declare class BlockTagCompiler extends TagCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    openStartMark: string;
    openEndMark: string;
    closeStartMark: string;
    closeEndMark: string;
    openStart(context: Context): void;
    openEnd(context: Context): void;
    tagClose(context: Context): void;
}
