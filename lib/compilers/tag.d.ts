import { TagCompiler } from 'sleet-html/lib/compilers/tag';
import { Context, SleetNode, SleetStack, Compiler, Tag } from 'sleet';
export declare function compileTags(context: Context, tags: Tag[], stack: SleetStack, indent?: number): void;
export declare class HandlebarsTagCompiler extends TagCompiler {
    static create(node: SleetNode, stack: SleetStack): Compiler | undefined;
    content(context: Context): void;
}
