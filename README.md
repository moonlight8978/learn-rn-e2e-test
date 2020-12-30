# Learn e2e testing

- Start appium server

```bash
cd e2e
yarn start
```

- Start RN app

```bash
cd rn-app
yarn start
yarn ios --device "deviceName" # or yarn android
```

- Start mock server

```bash
cd server
yarn start
```

- Test

```bash
cd e2e
yarn test
```
