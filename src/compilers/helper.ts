import { AbstractCompiler, Helper, Context, NodeType, SleetNode, SleetStack, Compiler, HelperAttribute, Transformer, TransformValue } from 'sleet'

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
            const it = this.node.attributes[0]
            const c = context.compile(it, this.stack)
            if (c) c.mergeUp()
            return
        }
    }
}

export class HelperAttributeCompiler extends AbstractCompiler<HelperAttribute> {
    static type = NodeType.HelperAttribute
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new HelperAttributeCompiler(node as HelperAttribute, stack)
    }

    compile (context: Context) {
        const c = context.compile(this.node.value, this.stack)
        if (c) c.mergeUp()
    }
}

export class TransformCompiler extends AbstractCompiler<TransformValue> {
    static type = NodeType.TransformValue
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new TransformCompiler(node as TransformValue, stack)
    }

    compile (context: Context) {
        const ts = this.node.transformers.slice(1)
        ts.unshift(this.node.value)
        const sub = context.create(this.node.transformers[0], this.stack)
        if (!sub) return

    }
}

export class TransformerCompiler extends AbstractCompiler<Transformer> {
    static type = NodeType.Transformer
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new TransformerCompiler(node as Transformer, stack)
    }

    compile (context: Context, ...next: SleetNode[]) {

    }
}

