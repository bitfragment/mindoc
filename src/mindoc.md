---
title: 'mindoc'
---

## About

**mindoc** is a template for a single self-contained, very mobile-friendly
HTML document. A [Pandoc] template is included and is the most
useful of the three template files.

**mindoc** is deliberately tiny. It uses a subset of [Pure.css] modules loaded
from a CDN, with added or modified styles and [JavaScript] inlined.

It was designed for publishing single essays and course syllabi, but
might also be suitable for very simple documentation of other kinds.

**mindoc** has been tested with Pandoc 1.19.2.1.


## Installation

Get a blank HTML template [here][mindoc-download-html-blank] or the Pandoc
template [here][mindoc-download-pandoc] (right-click and choose "Save Link As…",
"Download Linked File", "Download Linked File As…", etc.). All three files can be found in the **[dist][mindoc-repo-dist]** directory of the project
[repository][mindoc-repo].


## Usage

Simply edit [mindoc-blank.html][mindoc-download-html-blank], or use
[mindoc-pandoc.html][mindoc-download-pandoc] with Pandoc's
`--template` option:

    pandoc mydocument.md --template mindoc-pandoc.html -o mydocument.html

Pandoc's `stdout` can be piped to a utility like [html-minifier]:

    pandoc mydocument.md --template mindoc-pandoc.html | html-minifier -c -minifier.conf -o mydocument.html

Use [Grunt] with a plugin like [grunt-panda] to automate document conversion:

    grunt.initConfig({

        panda: {
          options: {
            pandocOptions: [
              '--template=lib/mindoc/dist/mindoc-pandoc.html',
              '--to=html5',
              '--section-divs',
              '--smart',
              '--variable=lang:en'
            ]
          },
          files: {
            src:  'src/mydocument.md',
            dest: 'dist/mydocument.html'
          }
        },

    });


## Features

### Navigation

If you invoke Pandoc's option `--section-divs`, **mindoc** will add a
page navigation menu like the one on this demo page. The menu will
include all **level 2** headers (no subheaders) plus sections for an
abstract and footnotes, if either exist.

If you want a "References" section providing sources for [citations],
you should end your document with a **level 2** header titled
"References".

Navigation menu item text is formed from Pandoc's automatically
generated [header identifiers] by replacing hyphens with spaces and
capitalizing the first letter:

  Identifier                     Navigation item text
  ------------------------------ ----------------------------
  `header-identifiers-in-html`   Header identifiers in html
  `dogs--in-my-house`            Dogs in my house
  `html-s5-or-rtf`               Html s5 or rtf
  `applications`                 Applications
  `section`                      Section

This has obvious limitations, worth keeping in mind when composing
section headers in your source document.


### Pandoc template variables

**mindoc** adds the following additional [template variables] to Pandoc's
default html template, along with minimal styling. You can use these
additional variables in a YAML [metadata block] in your Markdown document:

  Template variable              Value appears in:
  ------------------------------ ---------------------------------------------
  `description`                  Content of HTML tag `meta name="description"`
  `headnote`                     Document, preceding value of variable `published`
  `published`                    Document, preceding value of variable `license`
  `license`                      Document, preceding value of variable `title`
  `version`                      Document, preceding value of variable `date`
  `abstract`                     Document, preceding the table of contents (if any)

`headnote` is useful for prepending a distribution notice (for example, "Draft
copy. Please do not redistribute without permission").

`published` can be used to prepend publication information.

#### Multiple authors

**mindoc** also adds the variables `affiliation` and `email` for document
authors, and handles multiple authors (the following example is modified from
Pandoc's documentation):

    ---
    author:
    - name: Author One
      affiliation: University of Somewhere
      email: foo@bar
    - name: Author Two
      affiliation: University of Nowhere
      email: bar@foo
    ---

#### Passing values of template variables to Pandoc with Grunt

As with other Pandoc commands and variables, you can pass the values of
template variables to Pandoc using [Grunt] with a plugin like [grunt-panda]:

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        panda: {
          options: {
            pandocOptions: [
              '--template=lib/mindoc/dist/mindoc-pandoc.html',
              '--to=html5',
              '--section-divs',
              '--smart',
              '--variable=lang:en',
              '--variable=description:<%= pkg.description %>',
              '--variable=version:<%= pkg.version %>',
              '--variable=headnote:"Draft copy."'
            ]
          },
          files: {
            src:  'src/mydocument.md',
            dest: 'dist/mydocument.html'
          }
        },

    });

Here the values of the Pandoc template variables `description` and `version`
are taken from values in the file `package.json` and inserted using Grunt
template strings, whereas the value of `headnote` is specified explicitly.


### Pure.css classes

**mindoc** also adds the following Pure.css classes to HTML elements in
Pandoc output:

* [Table classes], as above


## Examples

1. You're looking at one. View the [Markdown source][this-src] that produced this page.
2. A [course syllabus] for "Historicizing 'Digital Humanities'"
3. Author's preprint version of an [article]



[this-src]:                   https://raw.githubusercontent.com/bitfragment/mindoc/master/src/mindoc.md
[JavaScript]:                 https://bitfragment.github.io/mindoc/docs/mindoc.html
[course syllabus]:            http://bitfragment.net/dhhist/
[article]:                    http://bitfragment.net/files/multilingualism.html

[mindoc-site]:                https://bitfragment.github.io/mindoc
[mindoc-repo]:                https://github.com/bitfragment/mindoc
[mindoc-repo-dist]:           https://github.com/bitfragment/mindoc/tree/master/dist
[mindoc-download-html]:       https://raw.githubusercontent.com/bitfragment/mindoc/master/dist/mindoc.html
[mindoc-download-html-blank]: https://raw.githubusercontent.com/bitfragment/mindoc/master/dist/mindoc-blank.html
[mindoc-download-pandoc]:     https://raw.githubusercontent.com/bitfragment/mindoc/master/dist/mindoc-pandoc.html

[Pure.css]:               https://github.com/yahoo/pure/
[Table classes]:          http://purecss.io/tables/

[Pandoc]:                 http://pandoc.org/
[header identifiers]:     http://pandoc.org/README.html#header-identifiers
[template variables]:     http://pandoc.org/README.html#templates
[metadata block]:         http://pandoc.org/README.html#metadata-blocks
[citations]:              http://pandoc.org/README.html#citations

[html-minifier]:          https://github.com/kangax/html-minifier

[Grunt]:                  http://gruntjs.com/
[grunt-panda]:            https://github.com/gmp26/grunt-panda
