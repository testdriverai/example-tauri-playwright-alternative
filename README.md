# Can You Use Playwright with Tauri? What Works Instead

[![TestDriver running this test (sped up)](media/speedrun.gif)](https://console.testdriver.ai/replay/6ad91d3ac2408c0c24595c82?share=iVjGeIlcd99zfpKNqUhN1Q)

*Sped up: idle time removed. Click to watch the full replay with step-by-step logs.*

This repo is the complete, runnable example from the TestDriver tutorial **[Can You Use Playwright with Tauri? What Works Instead](https://testdriver.ai/blog/tauri-playwright-alternative)**. The post walks through every line.

## What the test does

Installs [Yaak](https://github.com/mountain-loop/yaak), an open-source API client built with Tauri, on Linux. It sends a GET request to `https://httpbin.org/json` and checks the 200 response, then opens Settings from Yaak's custom title bar, switches the appearance to Dark, and checks that the whole window changed.

It runs on a fresh cloud machine, installs the app the way a user would, and drives it from screenshots with plain-language steps. No selectors, test IDs or changes to the app.

## Run it

You need Node.js 20+ and a TestDriver API key (free to start at [console.testdriver.ai](https://console.testdriver.ai)).

```bash
git clone https://github.com/testdriverai/example-tauri-playwright-alternative.git
cd example-tauri-playwright-alternative
npm install
cp .env.example .env   # then paste your key into .env
npx vitest run
```

The run prints a link to its replay, so you can watch what happened.

## Run it in CI

[`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml) runs the test on every push and pull request using [`testdriverai/action`](https://github.com/testdriverai/action). Set up OIDC for your team, or add your key as a repository secret named `TD_API_KEY`. See [CI/CD](https://docs.testdriver.ai/ci-cd).

## Files

- [`tests/tauri-playwright-alternative.test.mjs`](tests/tauri-playwright-alternative.test.mjs): the test
- [`vitest.config.js`](vitest.config.js): Vitest with the TestDriver reporter
- [`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml): CI

## Learn more

- Tutorial: https://testdriver.ai/blog/tauri-playwright-alternative
- Docs: https://docs.testdriver.ai/quickstart
- More examples: https://docs.testdriver.ai
