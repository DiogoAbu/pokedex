<h1 align="center">Pokedex</h1><br>
<p align="center">
  <img alt="Pokedex" title="Pokedex" src="android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" width="192">
</p>

## Contributing

When contributing to this repository, please first discuss the change you wish to make via [issue](https://github.com/DiogoAbu/pokedex/issues).

## Setting up a development environment

- Follow the [React Native Guide](https://reactnative.dev/docs/environment-setup) for getting started building a project with native code. **A Mac is required if you wish to develop for iOS.**
- Clone or download the repo
- Copy and rename the file `.env.example` to `.env` and fill the necessary variables.
- `yarn` to install dependencies
- `yarn android` to start the packager and run the app in the the Android device/emulator
- `yarn ios` to start the packager and run the app in the iOS simulator

### Building a release variant
To build a release variant of the app you need to fill the `.env` with the correct info.
```ini
RELEASE_KEY_ALIAS=the alias used when creating the store. default: Pokedex
RELEASE_KEY_PASSWORD=the password used for both the alias and the keystore
```
Then run:
```sh
yarn android-dev
```

### Different environments
You can have different dotenv files for staging and production.
| Environment | Dotenv            | Command           | Variant |
| ----------- | ----------------- | ----------------- | ------- |
| Development | `.env`            | `android`         | Debug   |
| Development | `.env`            | `android-dev`     | Release |
| Staging     | `.env.staging`    | `android-staging` | Release |
| Production  | `.env.production` | `android-prod`    | Release |

## Issues needing help

Are you out of ideas, but still wanna help? Check out the [help wanted](https://github.com/DiogoAbu/pokedex/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) or the [good first issue](https://github.com/DiogoAbu/pokedex/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) labels.

## Code style

We have a pre-commit hook enforcing commits to follow our lint rules.

- [ESLint](https://eslint.org/) to enforce code style and best practices on JavaScript and TypeScript files.
- [Prettier](https://prettier.io/) to format JSON files.

To check for lint issues on your code, run this on your terminal:

```sh
yarn lint
```
And to auto-fix some of them:
```sh
yarn lint-fix
```

## Tests

It's always important to ensure everything is working properly and that's why tests are great.

### Unit tests

We use Jest for our unit tests. We have a pre-commit hook that prevents commits that breaks any test.

To check for test issues on your code, run this on your terminal:

```sh
yarn test
```

## Commits

We enforce the commit messages to follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

## Pull request

The title of your PR should be descriptive, including either [NEW], [IMPROVEMENT] or [FIX] at the beginning, e.g. [FIX] App crashing on startup.

You may share working results prior to finishing, please include [WIP] in the title. This way anyone can look at your code: you can ask for help within the PR if you don't know how to solve a problem.

Your PR is automatically inspected by various tools, check their response and try to improve your code accordingly. Requests that fail to build or have wrong coding style won't be merged.
