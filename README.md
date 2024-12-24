# Please Star First GitHub Action

This GitHub Action automatically closes issues opened by non-stargazers.

**Feel free to try out in this repository!**

## Usage

```yml
on:
  issues:
    types: [opened, reopened]

jobs:
  greet:
    runs-on: ubuntu-latest
    name: Close issue opened by non-stargazer
    steps:
      - name: close
        uses: uhyo/please-star-first@v2
```

### Options

This action works out of the box, but you can customize the issue comment posted by GitHub Actions upon closing the issue by setting the `message` input.

Also, you can change the close reason by setting the `close_reason` input. The default is `not_planned`.

Example with options:

```yaml
- name: close
  uses: uhyo/please-star-first@v2
  with:
    message: |
      Your kind message on why you want them to star the repository
      before opening an issue.
    close_reason: completed # or "not_planned"
```
