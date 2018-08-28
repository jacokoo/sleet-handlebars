import { AttributeCompiler } from 'sleet-html/lib/compilers/attribute'
import {
    SleetNode, SleetStack, Compiler, Attribute, Context, NodeType, Tag,
    StringValue, IdentifierValue, AttributeGroup, Setting, AbstractCompiler, Helper
} from 'sleet'

const isInDynamic = (stack: SleetStack): boolean => {
    if (stack.last(NodeType.Setting)) return true
    if (stack.last(NodeType.TransformValue)) return true
    const h = stack.last(NodeType.Helper)
    if (h && (h.node as Helper).name && !h.note.content) return true

    const s = stack.last(NodeType.Tag)
    if (!s || !(s.node as Tag).name) return false
    const tag = s.node as Tag
    if (!tag.name) return false
    if (stack.note('blocks').indexOf(tag.name) !== -1) return true
    if (stack.note('inlines').indexOf(tag.name) !== -1) return true
    if (tag.name.slice(0, 1) === '@' && stack.note('inlines').indexOf(tag.name.slice(1)) !== -1) return true
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

export class StringValueCompiler extends AbstractCompiler<StringValue> {
    static type = NodeType.StringValue
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if (isInDynamic(stack)) return new StringValueCompiler(node as StringValue, stack)
    }

    compile (context: Context) {
        context.push(`"${this.node.value}"`)
    }
}

export class IdentifierValueCompiler extends AbstractCompiler<IdentifierValue> {
    static type = NodeType.IdentifierValue
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if (!isInDynamic(stack)) return new IdentifierValueCompiler(node as IdentifierValue, stack)
    }

    compile (context: Context) {
        const s = this.stack.last(NodeType.Tag)!
        context.push(s.note.noEscape ? `{{{${this.node.value}}}}` : `{{${this.node.value}}}`)
    }
}

export class SettingGroupCompiler extends AbstractCompiler<AttributeGroup> {
    static type = NodeType.AttributeGroup
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        if (!(node as AttributeGroup).setting) return
        return new SettingGroupCompiler(node as AttributeGroup, stack)
    }

    compile (context: Context) {
        if (!this.node.setting) return
        const compiler = context.create(this.node.setting, this.stack)
        if (!compiler) return
        const sub = context.sub()
        compiler.compile(sub, this.node)
        sub.mergeUp()
    }
}

export class GroupSettingCompiler implements Compiler {
    static type = NodeType.Setting
    static create (node: SleetNode, stack: SleetStack): Compiler | undefined {
        return new GroupSettingCompiler(node as Setting, stack)
    }

    private node: Setting
    private stack: SleetStack

    constructor(node: Setting, stack: SleetStack) {
        this.node = node
        this.stack = stack
    }

    compile (context: Context, group: AttributeGroup) {
        context.push('{{#').push(this.node.name)
        const stack = this.stack.concat(this.node)
        if (this.node.attributes.length) context.push(' ')
        this.node.attributes.forEach((it, idx) => {
            const sub = context.compile(it, stack)
            if (sub) {
                if (idx) context.push(' ')
                sub.mergeUp()
            }
        })
        context.push('}}')

        group.attributes.forEach((it, idx) => {
            const sub = context.compile(it, this.stack)
            if (sub) {
                if (idx) context.push(' ')
                sub.mergeUp()
            }
        })
        context.push(`{{/${this.node.name}}}`)
    }
}
