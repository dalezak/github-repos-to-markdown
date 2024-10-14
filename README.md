# Github Repos To Markdown

[Github Action](https://docs.github.com/en/actions) to generate markdown for your Github repos.

Useful for static site generators like [VitePress](https://vitepress.dev) or [VuePress](https://vuepress.vuejs.org/).

--

## Inputs

#### `username` 
- _Description_: Github username
- _Required_: true

#### `folder`
- _Description_: Output folder
- _Required_: false
- _Default_: repos

#### `forked`
- _Description_: Include forked repos
- _Required_: false
- _Default_: true

--

## Permission

```yaml
permissions:
  contents: write
```

--

## Usage

```yaml
uses: dalezak/github-repos-to-markdown@main
with:
  username: 'GITHUB_USERNAME'
  folder: 'repos'
  forked: 'false'
```

--

## Output

```markdown
---
title: github-repos-to-markdown
url: https://github.com/dalezak/github-repos-to-markdown
link: 
path: dalezak/github-repos-to-markdown
owner: dalezak
private: false
stars: 0
forks: 0
issues: 0
language: JavaScript
forked: false
archived: false
disabled: false
visibility: public
license: MIT
keywords: javascript,0 stars,0 forks
description: >
    Generate markdown for you Github repos
---

# dalezak/github-repos-to-markdown
#### Generate markdown from Github repos

[https://github.com/dalezak/github-repos-to-markdown](https://github.com/dalezak/github-repos-to-markdown)
```

--

## Build

```shell
ncc build index.js --license licenses.txt
```

--

## License

```
MIT License

Copyright (c) 2024 Dale Zak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```