# Github Repos To Markdown

[Github Action](https://docs.github.com/en/actions) to generate markdown for your Github repos.

Useful for static site generators like [VitePress](https://vitepress.dev) or [VuePress](https://vuepress.vuejs.org/).

---

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

---

## Permission

```yaml
permissions:
  contents: write
```

---

## Usage

```yaml
uses: dalezak/github-repos-to-markdown@main
with:
  username: 'GITHUB_USERNAME'
  folder: 'repos'
  forked: 'false'
```

---

## Example

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

---

## Build

```shell
ncc build index.js --license licenses.txt
```