import { RemoteOptions } from "webdriverio";

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
    xcodeOrgId: "YMA7U6H34P",
    xcodeSigningId: "Apple Development",
  },
};

export default {
  iOS,
};
