# Github Repos To Markdown
[Github Action](https://docs.github.com/en/actions) to generate markdown for Github repos.

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

## Usage

```yaml
uses: dalezak/github-repos-to-markdown@main
with:
  username: 'GITHUB_USERNAME'
  folder: 'repos'
  forked: 'false'
```

---

## Build

```shell
ncc build index.js --license licenses.txt
```