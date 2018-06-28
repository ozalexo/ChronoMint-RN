Mobile app for ChronoBank

## Install
```bash
yarn
```

## Development


### Preparations

If you want to work on ChronoMint/core and ChronoMint/login packages in parallel please preform the following additional steps before first launch:

Let's assume that current directory is `ChronoMint-RN` (root of current repo)

1. Clone ChronoMint git repo near to ChronoMint-RN:
```bash
cd ..
git clone git@github.com:ozalexo/ChronoMint.git
git checkout feature/uuid
```
Note: Chanages from feature/uuid are required. In the nearest future it will be replaced to origin repo with develop (or release) branch
2. Enable yarn links:
```bash
cd ChronoMint/packages/core
yarn link
cd ../login
yarn link
```
3. Make yarn link for the `@chronobank/core-dependencies`:
```bash
cd ../../../ChronoMint-RN/src/platform
yarn link
```
4. Make yarn link at ChronoMint-RN:
```bash
cd ../..
yarn link @chronobank/core @chronobank/login @chronobank/core-dependencies
```
4. Install dependencies:
```bash
yarn
```
Note: the package @waves/waves-api will be patched automatically

### Now you may start development

Start a Metro bundler:
```bash
yarn start
```

Run app on iOS simulator:
```bash
yarn run ios
```

Run app on android device or emulator:
```bash
yarn run android
```

## License
 [GNU AGPLv3](LICENSE)

## Copyright
LaborX PTY
