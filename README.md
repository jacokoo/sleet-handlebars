# Sleet Handlebars
Sleet Handlebars is [Sleet](https://github.com/JacoKoo/sleetjs) extension that compiles Sleet file to
[Handlebars](http://handlebarsjs.com) template.

[中文文档](https://github.com/JacoKoo/sleet-handlebars/blob/master/README.cn.md)

## Resources
* [Sleet](https://github.com/JacoKoo/sleetjs) Sleetjs is a litte indent-based language that compiles into HTML/XML.
* [Atom-Sleet](https://github.com/JacoKoo/atom-sleet) Sleet and Sleet Handlebars plugin(Syntax highlight, Compile on save, Preview) for [Atom](https://atom.io).
* [Handlebars-Sleet](https://github.com/JacoKoo/handlebars-sleet) Convert exist HTML / HBS(Handlebars template) files to Sleet

## Installation
```
npm install -g sleet-handlebars
```

## Declaration

To declare to use sleet-handlebars to compile the sleet file:
```
#!handlebars
```

By default the extension of output file is `.hbs`, you can change it to `.html` by:
```
#!handlebars html
```

There are two options can be specified: `block` and `inline`.
- `block` is used to indicate handlebars block helpers
- `inline` is used to indicate inline handlebars helpers

```
#!handlebars block=layout,view inline=date,shortDate
```

You can also config then via `package.json`:
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

**Block helper** is a helper that needs a starting tag and a paired closing tag. And
it could have a inside `{{else}}`. e.g.
```handlebars
{{#if}}
    something
{{else}}
    something else
{{/if}}
```

**Inline Helper** helpers have neither starting tag nor closing tag. They also don't
have else tag. e.g.
```handlebars
{{fullname person}}
{{{fullname person}}}
```

## Handlebars Expressions In Text

You can use `echo` to compose a handlebars expression. It compiles unquoted
attribute name as handlebars expression.

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
compiles to
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

## Handlebars Expressions In Html Attributes

Sleet-handlebars consider unquoted string value as Handlebars Expression.
```sleet
#!handlebars

ul(class=className)
    li > a(id=id href='static/images/' + imagePath) Preview
```
compiles to
```handlebars
<ul class="{{className}}">
    <li><a id="{{id}}" href="static/images/{{imagePath}}">Preview</a></li>
</ul>
```

Each attribute group could have a qualifier followed. Currently only `if` and
`unless` supported.
```sleet
#!handlebars

li(class='item')(class='active')&if(active)
    a(href='static/images/' + imagePath)&if(imagePath) Preview
li(class='inactive')&unless(active) hello
```
compiles to
```handlebars
<li class="item {{#if active}}active{{/if}}">
    <a {{#if imagePath}} href="static/images/{{imagePath}}"{{/if}}>Preview</a>
</li>
<li class="{{#unless active}}inactive{{/unless}}">hello</li>
```

## Block Helpers

There are four builtin block helpers `if`, `unless`, `each`, `with`. Just like
normal html tags, they don't need any brace.

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
compiles to:
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

## Inline Helpers

There are not any builtin inline helpers.

Once you specified a inline helper, you could prefix a inline helper with a `@`
to compose a three brace surrounded helper.

```sleet
#!handlebars inline=fullname,date

fullname(person)
date(createTime 'yyyy-MM-dd')

@fullname(person)
@date(createTime 'yyyy-MM-dd')
```
compiles to:

```handlebars
{{fullname person}}
{{date createTime "yyyy-MM-dd"}}
{{{fullname person}}}
{{{date createTime "yyyy-MM-dd"}}}
```

## License

MIT
