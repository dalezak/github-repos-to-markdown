# Github Repos To Markdown
This [Github Action](https://docs.github.com/en/actions) generates markdown files for your public Github repos.

---

## Inputs

### `username`

**Required** Your Github username

### `forked`

**Optional** Include forked repos

---

## Usage

```yaml
uses: dalezak/github-repos-to-markdown
with:
  username: 'GITHUB_USERNAME'
  forked: 'false'
```

---

## Build

```shell
ncc build index.js --license licenses.txt
```