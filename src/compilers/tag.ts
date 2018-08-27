import { TagCompiler } from 'sleet-html/lib/compilers/tag'
import { Context, SleetNode, SleetStack, Compiler, Tag } from 'sleet'
import { BlockTagCompiler } from './block-tag'

export function compileTags (context: Context, tags: Tag[], stack: SleetStack, indent = 0) {
    let i = 0
    while (i < tags.length) {
        const item = tags[i]
        const next = tags[i + 1]
        if (!next || next.name !== 'else') {
            const co = context.compile(item, stack, indent)
            if (co) co.mergeUp()
            i ++
            continue
        }

        const c = context.create(item, stack)
        if (!c || !(c instanceof BlockTagCompiler)) {
            const { start } = item.location
            throw new SyntaxError(`not paired else tag, line: ${start.line}, column: ${start.column}`)
        }
        const sub = context.sub(indent)
        c.compile(sub, next)
        sub.mergeUp()
        i += 2
    }
}

export class HandlebarsTagCompiler extends TagCompiler {
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new HandlebarsTagCompiler(node as Tag, stack)
    }

    content (context: Context) {
        if (this.selfClosing()) return
        compileTags(context, this.tag.children, this.stack)
    }
}
