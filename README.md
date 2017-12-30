![Channels](internals/img/repo-banner.png)

## About

Channels, began as a 3 week, final project at a coding bootcamp. Since then, in an effort to gain a better understanding of React and Redux, I've completely rewritten the 3 week app. The rewrite includes some great new tooling and libraries such as: Flow, ESLint, and Jest.

## Download

You can download Channels for **free** from the GitHub repository [releases](https://github.com/BuckyMaler/channels/releases) page.

## Contribute

### Prerequisites

- [npm](https://www.npmjs.com/get-npm) >= 4.x
- [node](https://nodejs.org/en/download/) >= 7.x
- [yarn](https://yarnpkg.com/en/docs/install) >= 0.21.3

### Development

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Install the dependencies: `yarn`
3. Start the app in the `dev` environment: `yarn run dev`

#### Additional Commands

- Start the app in the `prod` environment: `yarn run start`
- Verify your code works in the packaged app: `yarn run package`

💡 You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```
DEBUG_PROD=true yarn run start
```
```
DEBUG_PROD=true yarn run package
```

- Flow type checking: `yarn run flow`
- ESLint: `yarn run lint`
- stylelint: `yarn run lint-styles`
- To run Unit Tests: `yarn run test`
- To run End-to-End Test: `yarn run test-e2e`

#### Known issues that can happen during development

##### Error with `codesign` when running `yarn run package`

If you have issues in the `codesign` step when running `yarn run package`, you can temporarily disable code signing locally by setting `export CSC_IDENTITY_AUTO_DISCOVERY=false` for the current terminal session.

## Acknowledgments

- [ElectronReact](https://github.com/chentsulin/electron-react-boilerplate) a boilerplate for scalable cross-platform desktop apps
