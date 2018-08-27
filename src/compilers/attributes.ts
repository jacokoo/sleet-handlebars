import { AttributeCompiler } from 'sleet-html/lib/compilers/attribute'
import {blocks} from './block-tag'
import { SleetNode, SleetStack, Compiler, Attribute, Context, NodeType, Tag, StringValue, IdentifierValue } from 'sleet'

const isInDynamic = (stack: SleetStack): boolean => {
    const s = stack.last(NodeType.Tag)
    if (!s || !(s.node as Tag).name) return false
    const tag = s.node as Tag
    if (tag.name && blocks.indexOf(tag.name) !== -1) return true
    return false
}

export class DynamicAttributeCompiler extends AttributeCompiler {
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if (isInDynamic(stack)) return new DynamicAttributeCompiler(node as Attribute, stack)
    }

    compile (context: Context) {
        const key = this.key(context)
        const value = this.value(context)

        if (key) context.push(key).push('=').push(value)
        else context.push(value)
    }
}

export class StringValueCompiler implements Compiler {
    static type = NodeType.StringValue
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if (isInDynamic(stack)) return new StringValueCompiler(node as StringValue)
    }

    private value: StringValue
    constructor (value: StringValue) {
        this.value = value
    }

    compile (context: Context) {
        context.push(`"${this.value.value}"`)
    }
}

export class IdentifierValueCompiler implements Compiler {
    static type = NodeType.IdentifierValue
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if (!isInDynamic(stack)) return new IdentifierValueCompiler(node as IdentifierValue)
    }

    private value: IdentifierValue
    constructor (value: IdentifierValue) {
        this.value = value
    }

    compile (context: Context) {
        context.push(`{{${this.value.value}}}`)
    }
}
