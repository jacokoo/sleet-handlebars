# Sleet Handlebars
Sleet Handlebars 是 [Sleet](https://github.com/JacoKoo/sleetjs) 的一个扩展，用于把 Sleet
代码编译成 [Handlebars](http://handlebarsjs.com) 模板

## 相关资源
* [Sleet](https://github.com/JacoKoo/sleetjs) Sleetjs 是一种把代码编译成 HTML/XML 的语言
* [Atom-Sleet](https://github.com/JacoKoo/atom-sleet) Sleet 与 Sleet-Handlebars 在
  [Atom](https://atom.io) 编辑器里的插件(包括语法高亮、保存时编译、预览等功能)
* [Handlebars-Sleet](https://github.com/JacoKoo/handlebars-sleet) 用于把已有的
  HTML/HBS(Handlebars 模板) 转换成 Sleet 文件

## 安装
```
npm install -g sleet-handlebars
```

## 声明

可以在`sleet`文件的第一行声明这个文件用`sleet-handlebars`来编译:
```
#!handlebars
```

输出文件的默认扩展名为:`.hbs`, 你可以在声明中更改扩展名, 如改为`.html`:
```
#!handlebars html
```

`sleet-handlebars` 有两个参数可以在声明中配置: `block`与`inline`
- `block` 用来指定 Handlebars Block Helper
- `inline` 用来指定 Handlebars Inline Helper

```
#!handlebars block=layout,view inline=date,shortDate
```

也可以通过 `package.json` 文件来配置这些参数:
```json
{
    ...
    "dependencies": {
        ...
    },
    "sleet": {
        "handlebars": {
            "block": ["layout", "view"],
            "inline": ["date", "shortDate"]
        }
    }
}
```

所谓的 **Block helper** 是那种有开始标记与结束标记的 Helper, 并且在它内部可以有一个 `{{else}}` 标记.

例如：
```handlebars
{{#if}}
    something
{{else}}
    something else
{{/if}}
```

所谓的 **Inline helper** 不需要开始结束标记的那种 Helper.

例如：
```handlebars
{{fullname person}}
{{{fullname person}}}
```

## 文本中的 Handlebars 表达式

在文本中， 可以用 `echo` 标记来写 Handlebars表达式. 这个标记把没有用引号引起来的属性当成表达式

例如:

```sleet
#!handlebars

a > echo(name)
if(name)
    echo('Hello ' name '!')
echo('My name is ' firstName ' ' lastName)
echo('My name is ') + echo(firstName) + echo(' ') + echo(lastName)
echo(
    text = 'My name is ' + firstName + ' ' + lastName
)
p
    | My name is
    echo(firstName)
    echo(lastName)
```
会编译成:
```handlebars
<a>{{name}}</a>
{{#if name}}
    Hello {{name}}!
{{/if}}
My name is {{firstName}} {{lastName}}
My name is {{firstName}} {{lastName}}
My name is {{firstName}} {{lastName}}
<p>
    My name is
    {{firstName}}
    {{lastName}}
</p>
```

## HTML 属性里的 Handlebars 表达式

所有没有被引号引起来的属性值都会被当作表达式

例如:
```sleet
#!handlebars

ul(class=className)
    li > a(id=id href='static/images/' + imagePath) Preview
```
会编译为:
```handlebars
<ul class="{{className}}">
    <li><a id="{{id}}" href="static/images/{{imagePath}}">Preview</a></li>
</ul>
```

所有的属性组后面都可以跟一个 `限定符`, 目前只支持 `if` 与 `unless`

例如:
```sleet
#!handlebars

li(class='item')(class='active')&if(active)
    a(href='static/images/' + imagePath)&if(imagePath) Preview
li(class='inactive')&unless(active) hello
```
会编译为:
```handlebars
<li class="item {{#if active}}active{{/if}}">
    <a {{#if imagePath}} href="static/images/{{imagePath}}"{{/if}}>Preview</a>
</li>
<li class="{{#unless active}}inactive{{/unless}}">hello</li>
```

## Block Helpers

内置的 `Block Helper` 一共有四个，分别是: `if`, `unless`, `each`, `with`.
它们的写法跟普通的 HTML 标记的写法没有区别, 不用像 Handlebars 里一样用两个大括号包起来.

例如:
```sleet
#!handlebars block=helper

if(links)
    .list-group
        each(links)
            a.list-group-item(href=link)(class='active')&if(active)
                echo(linkText)
else.
    Have no links

helper(data 'string' 1 hash='string' hash2=data)
    h1 content
else
    h2 else content
```
将会编译为:
```handlebars
{{#if links}}
    <div class="list-group">
        {{#each links}}
            <a class="list-group-item {{#if active}}active{{/if}}" href="{{link}}">
                {{linkText}}
            </a>
        {{/each}}
    </div>
{{else}}
    Have no links
{{/if}}
{{#helper data "string" 1 hash="string" hash2=data}}
    <h1>content</h1>
{{else}}
    <h2>else content</h2>
{{/helper}}
```

## Inline Block Helpers

在 Sleet-Handlebars 里面，并没有内置的 `Inline helper`.

你可以在 `inline helper` 前加上一个 `@`来表明这个表达式不需要 HTML 转码(与 Handlebars里
    的3个大括号包起来是一样的效果)

例如:
```sleet
#!handlebars inline=fullname,date

fullname(person)
date(createTime 'yyyy-MM-dd')

@fullname(person)
@date(createTime 'yyyy-MM-dd')
```
将会编译为:

```handlebars
{{fullname person}}
{{date createTime "yyyy-MM-dd"}}
{{{fullname person}}}
{{{date createTime "yyyy-MM-dd"}}}
```

## License

MIT
