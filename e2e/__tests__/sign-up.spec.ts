import { BrowserObject, remote, RemoteOptions } from "webdriverio";

const iOS: RemoteOptions = {
  path: "/wd/hub",
  host: "localhost",
  port: 4723,
  capabilities: {
    platformName: "iOS",
    automationName: "XCUITest",
    deviceName: "iPhone (2)",
    platformVersion: "14.1",
    app: "org.reactjs.native.example.LearnRnE2eTest",
    udid: process.env.IOS_DEVICE_UUID,
    xcodeOrgId: "xxx",
    xcodeSigningId: "Apple Development",
  },
  logLevel: "silent",
};

const android: RemoteOptions = {
  path: "/wd/hub",
  host: "localhost",
  port: 4723,
  capabilities: {
    automationName: "UiAutomator2",
    platformName: "android",
    platformVersion: "8.0.0",
    deviceName: "BH9057609A",
    appPackage: "com.learnrne2etest",
    appActivity: ".MainActivity",
  },
};

let client: BrowserObject;

beforeEach(async () => {
  client = await remote(iOS);
  console.error(client);
});

afterEach(async () => {
  if (client) {
    await client.deleteSession();
  }
});

const scrollTo = async (a11yId: string) => {
  console.error(client.options.capabilities);
  if (client.options.capabilities.platformName === "android") {
    await client.execute("mobile: scroll", {
      strategy: "accessibility id",
      selector: a11yId,
    });
  }
};

it("sign up the user", async () => {
  const toRegistrationScreenButton = await client.$("~login/toRegistrationScreenButton");
  await toRegistrationScreenButton.click();

  const registerButton = await client.$("~registration/registerButton");
  await scrollTo("registration/toLoginScreenButton");
  await registerButton.click();

  await scrollTo("registration/usernameInput-error");
  let usernameError = await client.$("~registration/usernameInput-error");
  expect(await usernameError.getText()).toMatch("Please enter username");

  const passwordError = await client.$("~registration/passwordInput-error");
  expect(await passwordError.getText()).toMatch("Please enter password");

  let passwordConfirmationError = await client.$("~registration/passwordConfirmationInput-error");
  expect(await passwordConfirmationError.getText()).toMatch("Please confirm your password");

  const fullNameError = await client.$("~registration/fullNameInput-error");
  expect(await fullNameError.getText()).toMatch("Please enter your full name");

  const usernameInput = await client.$("~registration/usernameInput");
  await usernameInput.setValue("user..01");
  usernameError = await client.$("~registration/usernameInput-error");
  expect(await usernameError.getText()).toMatch("Username must be alphabet and numbers");
  await usernameInput.setValue("user");

  const passwordInput = await client.$("~registration/passwordInput");
  await passwordInput.setValue("password");

  const passwordConfirmationInput = await client.$("~registration/passwordConfirmationInput");
  await passwordConfirmationInput.setValue("password123");
  passwordConfirmationError = await client.$("~registration/passwordConfirmationInput-error");
  expect(await passwordConfirmationError.getText()).toMatch("Password confirmation must match your password");
  await passwordConfirmationInput.setValue("password");

  const fullNameInput = await client.$("~registration/fullNameInput");
  await fullNameInput.setValue("Test");

  await client.hideKeyboard();

  await scrollTo("registration/toLoginScreenButton");
  await registerButton.click();

  await client.waitUntil(
    () => client.$("~registrationCompleted/toLoginScreenButton").then((element) => element.isDisplayed()),
    { timeout: 10000 }
  );
});
