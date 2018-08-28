import {
    AbstractCompiler, Tag, NodeType, SleetStack, SleetNode,
    Compiler, Context, StaticText, DynamicText
} from 'sleet'

export class HandlebarsTextCompiler extends AbstractCompiler<Tag> {
    static type = NodeType.Tag
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if ((node as Tag).name === '|') return new HandlebarsTextCompiler(node as Tag, stack)
    }

    compile (context: Context) {
        if (!this.node.text.length) return

        const lines = this.node.text.filter(it => !!it.length)
        if (!this.inline()) context.eol()
        lines.forEach(line => {
            if (!line.map(it => it.toHTMLString()).join('').length) {
                context.eol()
                return
            }

            if (!this.inline()) context.indent()
            line.forEach(it => context.compileUp(it, this.stack))
            context.eol()
        })
        context.pop()
    }

    inline () {
        return this.node.namespace === 'inline'
    }
}

export class StaticTextCompiler extends AbstractCompiler<StaticText> {
    static type = NodeType.StaticText
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new StaticTextCompiler(node as StaticText, stack)
    }

    compile (context: Context) {
        context.push(this.node.toHTMLString())
    }
}

export class DynamicTextCompiler extends AbstractCompiler<DynamicText> {
    static type = NodeType.DynamicText
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new DynamicTextCompiler(node as DynamicText, stack)
    }

    compile (context: Context) {
        context.compileUp(this.node.value, this.stack)
    }
}
