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
        uses: uhyo/please-star-first@v1
```
