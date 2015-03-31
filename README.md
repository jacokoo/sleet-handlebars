# Sleet Handlebars
Sleet Handlebars is [Sleet](https://github.com/JacoKoo/sleetjs) extension that compiles Sleet file to 
[Handlebars](http://handlebarsjs.com) template

## Resources
* [Sleet](https://github.com/JacoKoo/sleetjs) Sleetjs is a litte indent-based language that compiles into HTML/XML.
* [Atom-Sleet](https://github.com/JacoKoo/atom-sleet) Sleet and Sleet Handlebars plugin(Syntax highlight, Compile on save, Preview) for Atom.
* [Handlebars-Sleet](https://github.com/JacoKoo/handlebars-sleet) Convert exist HTML / HBS(Handlebars template) files to Sleet

## Installation
```
npm install -g sleet-handlebars
```

## Command Line Usage

```
$ sleet-handlebars -h
/usr/local/bin/sleet-handlebars [options] input.st [input2.st...]

Options:
  -b, --block-helper         Block helpers. Separated by comma(,)
  -i, --inline-block-helper  Inline block helpers. Separated by comma(,)
  -p, --precompile           Precompile the output
  -a, --amd                  Precompile use AMD style
  -c, --commonjs             Precompile use CommonJs style
  -o, --output               The output directory
  -e, --extension            The file extension of output file
  -w, --watch                Watch file changes
  -v, --version              Show the version number
  -h, --help                 Show this message
```

Sleet handlebars have five extra options compare to Sleet.

`-p`, `-a` and `-c` are used to precompile handlebars template.

`-b` and `-i` are used to tell sleet-handlebars what tags are treated as
handlebars helpers.

**Block helper** is a helper that needs a starting tag and a paired closing tag. And
it could have a inside `{{else}}`. e.g.
```handlebars
{{#if}}
    something
{{else}}
    something else
{{/if}}
```

**Inline block** helpers have neither starting tag nor closing tag. They also don't
have else tag. e.g.
```handlebars
{{fullname person}}
{{{fullname person}}}
```

## Handlebars Expressions In Text

You can use `echo` to compose a handlebars expression. It compiles unquoted
attribute name as handlebars expression.

```sleet
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

There are four buildin block helpers `if`, `unless`, `each`, `with`. Just like
normal html tags, they don't need any brace.

```sleet
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
use `sleet-handlebars -b helper` to compile it to
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

There are not any buildin inline block helpers. You should use `-i` options to
specify them.

You could prefix a inline block helper with one `@` to compose a three brace
surrounded helper.

```sleet
fullname(person)
date(createTime 'yyyy-MM-dd')

@fullname(person)
@date(createTime 'yyyy-MM-dd')
```
use `sleet-handlebars -i fullname,date` to compile it to

```handlebars
{{fullname person}}
{{date createTime "yyyy-MM-dd"}}
{{{fullname person}}}
{{{date createTime "yyyy-MM-dd"}}}
```

## License

MIT
