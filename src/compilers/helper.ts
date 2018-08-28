import {
    AbstractCompiler, Helper, Context, NodeType, SleetNode, SleetStack, Compiler,
    HelperAttribute, Attribute, CompareOperatorValue
} from 'sleet'

export class HelperCompiler extends AbstractCompiler<Helper> {
    static type = NodeType.Helper
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new HelperCompiler(node as Helper, stack)
    }

    count: number

    constructor (node: Helper, stack: SleetStack, count: number = 1) {
        super(node, stack)
        this.count = count
    }

    compile (context: Context) {
        if (!this.node.name) {
            this.noName(context)
            return
        }

        const helpers = this.stack.note('helpers') as {[name: string]: number}
        const count = helpers[this.node.name] || 1
        const cs = this.node.attributes.slice(0, count)
        const remain = this.node.attributes.slice(count)

        const ctx = context.sub()
        cs.map((it, idx) => {
            if (idx) ctx.push(' ')
            ctx.compileUp(it, this.stack)
        })
        if (!remain.length) {
            context.push(`{{${this.node.name} ${ctx.getOutput()}}}`)
            return
        }

        const o = this.stack.last()!
        o.note.content = true

        context.push(`{{#${this.node.name} ${ctx.getOutput()}}}`)
        const c = ctx.compile(remain[0], this.stack)
        const cc = c ? c.getOutput() : ''
        context.push(cc)

        if (remain.length > 1) {
            const ctx2 = context.sub()
            remain.slice(1).map(it => ctx2.compileUp(it, this.stack))
            const ccc = ctx2.getOutput()
            context.push(`{{else}}${ccc}`)
        }
        context.push(`{{/${this.node.name}}`)
    }

    noName (context: Context) {
        const attr = this.stack.last(NodeType.Attribute)
        const needSpace = attr && (attr.node as Attribute).name === 'class'
        this.node.attributes.forEach((it, idx) => {
            const c = context.compile(it, this.stack)
            if (c) {
                if (idx && needSpace) context.push(' ')
                c.mergeUp()
            }
        })
    }
}

export class HelperAttributeCompiler extends AbstractCompiler<HelperAttribute> {
    static type = NodeType.HelperAttribute
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new HelperAttributeCompiler(node as HelperAttribute, stack)
    }

    compile (context: Context) {
        context.compileUp(this.node.value, this.stack)
    }
}

export class CompareOperatorCompiler extends AbstractCompiler<CompareOperatorValue> {
    static type = NodeType.CompareOperator
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new CompareOperatorCompiler(node as CompareOperatorValue, stack)
    }

    compile (context: Context) {
        context.push(`"${this.node.value}"`)
    }
}
