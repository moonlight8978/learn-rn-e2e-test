# 1. Mở đầu

Do dòng đời đưa đẩy và khách thì tiền ít nhưng lại thích hít hàng thơm nên mình cũng đã kinh qua [react-native-testing-library](https://github.com/callstack/react-native-testing-library) một thời gian kha khá, và cũng cưỡi ngựa xem hoa [Detox](https://github.com/wix/Detox), nhưng chưa thằng nào làm mình hài lòng:

* Testing-library: Khi test e2e thì phải mock quá nhiều, khá khó để mock component sao cho hoạt động giống như component thật. Có những lúc mình chỉ viết để cho % coverage lên chứ các fn của test đó bị mock hết, thành ra chả có ý nghĩa gì nhiều. Các thành phần UI bị mock hết, nên test pass mà vẫn chết là điều bình thường như cân đường hộp sữa.
* Detox: chơi với mỗi simulator, device thật ko rõ tới giờ đã được đánh điện tử chưa.

Và gần đây thì mình đọc lại [docs của React Native](https://reactnative.dev/docs/testing-overview#end-to-end-tests) có recommend thêm 1 thằng - Appium. Appium sử dụng driver như XCUITest, UIAutomator, Espresso, ... Được các teito (tay to :v) native ở công ty bảo mấy thằng driver trên toàn là hàng hịn bên native dùng để chạy test, nên thử nghịch luôn. Sau một thời gian mày mò thì khá hài lòng.

#### Tại sao lại dùng Appium mà ko chạy cơm cho khỏe?

Nói thế chứ thực ra thì chạy cơm không hề khỏe tí nào đâu các bạn.

Khi ta phát triển 1 feature mới cho app, ta phải test cho cả những tính năng đã có, ảnh hưởng tới chúng là điều khó tránh khỏi.

Thông thường dev chúng ta sẽ nghĩ là "Có tester rồi xoắn gì" đúng không nào? Tuy nhiên phận dev quèn thì cũng vẫn phải check qua những case cơ bản, (test thêm case dị càng tốt) trước khi chuyển qua cho tester. Nhưng không lẽ cứ viết một feature là ngồi bật app lên bấm từng nút, chưa kể ~~xe đạp mới ( mình có một người bạn rất hay nhầm newbie và newbike =)) )~~ newbie không nắm rõ hệ thống, lack case là điều tất nhiên, hơn nữa con người chúng ta không giỏi trong những việc nhàm chán có tính lặp lại cao như test app, vì vậy dù có là bô lão thì cũng sẽ có lúc nhầm lẫn.

Ngoài ra, ở cuốn "The Effective Engineer" của Edmond Lau (nếu ko có gì sai sót thì là trang 159) có viết: 

> If you have to do something manually more than twice, then write a tool for the third time

Vậy thì sao chúng ta không để máy làm những công việc nhàm chán như test, và focus vào những việc khiến ta hứng thú hơn. Hãy cùng học viết test tự động cho ứng dụng React Native của chúng ta thôi nào!

### Một vài kiến thức cần có

- React Native, Babel (không cần quá mát tơ)
- Nắm được cơ bản về viết unit test (với jest, hay gì đó tương tự)
- Typescript (optional): do ở bài viết sẽ dùng Typescript

### Hardware

* Máy Mac/Hackintosh để build iOS hoặc máy Win (chỉ chạy được Android thôi)
* 1 con điện thoại iOS hoặc Android - nói không với integration test trên simulator :v

# 2. Chạy thử ví dụ nhỏ

Tự dưng nhồi một đống lý thuyết suông, trong khi không biết mình sẽ làm gì có phải rất chán không nào? Vì vậy trước tiên ta hãy chạy thử một ví dụ nhỏ sau trước đã: Đăng kí account

Ví dụ sau dùng Typescript + WebdriverIO, và có cấu trúc tương đương với ví dụ trên trang chủ của Appium [link](https://github.com/appium/appium/tree/master/sample-code/javascript-webdriverio) (Các bạn cũng có thể vào link trên bằng truy cập [trang chủ Appium](http://appium.io/) rồi bấm vào nút Examples), tất nhiên để go pro thì ta sẽ ko code như vậy, mình sẽ thực hiện refactor và chuyển đổi môi trường chạy test ở các bài sau ( nếu có =)) ).

Sau khi setup Babel cùng với Jest (do Jest luôn đi kèm với React Native nên mình dùng luôn để demo cho thân thiện), hãy viết 1 đoạn test đơn giản cho quá trình sign up của ta.
Hiện tại mình chỉ fill những field text input, vì field select, date picker viết khá dài, nên mình sẽ đề cập sau.

> Nói nhiều quá, code đâu?

Vâng, code đây (ở [dưới](#Ví dụ trên làm gì?) có giải thích)

```js
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

```

Chi tiết source code có thể xem tại [đây](https://github.com/moonlight8978/learn-rn-e2e-test/tree/jest/e2e)

Source code của các màn hình có thể xem tại đây:

- Login screen [link](https://github.com/moonlight8978/learn-rn-e2e-test/blob/jest/rn-app/src/screens/login/login.tsx)
- Registration screen [link](https://github.com/moonlight8978/learn-rn-e2e-test/blob/jest/rn-app/src/screens/registration/registration.tsx)

Và đây là thành phẩm:

```js
 PASS  __tests__/sign-up.spec.ts (18.817 s)
  ✓ sign up the user (17179 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        18.869 s, estimated 29 s
Ran all test suites.
✨  Done in 21.80s.
```

iOS | Android 
:-------------------------:|:-------------------------:
![](https://images.viblo.asia/30a3e57a-44ab-4c56-b4cf-0047bb221353.gif) | ![](https://images.viblo.asia/907005db-f46a-40ea-9b3c-f269fe06646d.gif)

### Ví dụ trên làm gì?

1. Từ màn **Login**, bấm vào button 「Create an account」 `login/toRegistrationScreenButton` để vào màn **Registration**

2. Tại màn **Registration**

   1.1.Bấm vào nút 「Register」`registration/registerButton`, do máy Android của mình màn hơi ngắn, nên trước khi click phải scroll tới element đó trước.

   1.2. Do chưa fill gì nên expect error message hiển thị tương ứng

   1.3. Fill 「user..01」vào input username, do field này chỉ nhận alphabet và số, nên giá trị đó ko hợp lệ, expect hiển thị error message

   1.4. Fill username 1 giá trị hợp lệ 「user」

   1.5. Fill password 「password」

   1.6. Fill password confirmation「password123」, do ko match password đã nhập nên sẽ hiển thị error

   1.7. Fill password confirmation hợp lệ 「password」

   1.8. Fill full name

   1.9. Bấm vào nút 「Register」

3. User được chuyển qua màn RegistrationCompleted, nên ta expect button ở màn này được hiển thị.

### Phân tích một vài note về cú pháp

Cú pháp của WebdriverIO nhìn khá trong sáng và dễ hiểu, nên mình sẽ không giải thích nhiều, tuy nhiên có một vài chú ý dưới đây cho các bạn.

- Khi tìm element, mình đã dùng `~`, đây là shorthand để tìm element theo `accessibility id` của WebdriverIO, tuỳ theo OS mà ta sẽ phải gán prop khác nhau để có thể dùng được strategy tìm theo `accessibility id` này [link](https://github.com/webdriverio/native-demo-app/blob/master/js/config/TestProperties.js), chỉ vì cái này mà mình mất vài tiếng, ko hiểu tại sao ko tìm thấy element =))

  - Ở bên iOS ta phải dùng `testID`, và tránh gán `accessibilityLabel` và `accessibilityHint` cho component.
  - Ở bên Android, hãy dùng `accessibilityLabel`

  * Các bạn có thể tham khảo các strategy khác ở docs của webdriverio [link](https://webdriver.io/docs/selectors.html)

- Tại sao lại dùng `accessibility id` mà không dùng content của nó?

  - Đúng ra là khi bấm button hay thao tác trên màn hình, chúng ta nên dùng text của nó, để khi text (requirement) thay đổi thì test cũng oẳng. Nhưng mà cơ bản là do ~~hơi bận~~ lười =)) và trường hợp accessibility id đúng nhưng text sai thì phải chấp nhận thôi à =))

* Do API của WebdriverIO toàn trả về Promise, nên hầu như câu lệnh nào cũng cần phải dùng `async/await`, các bạn có thể sử dụng kèm package [`@wdio/sync`](https://www.npmjs.com/package/@wdio/sync) để API của WebdriverIO trở nên đồng bộ.

* Các bạn có để ý đoạn code ở `beforeEach` và `afterEach` không? Mỗi test, chúng ta đang tạo ra một session mới, và xoá session đó sau mỗi test. Nếu dùng CLI của wdio thì sẽ thuận tiện hơn.

* Options `xcodeOrgId` và `xcodeSigningId` bên trong `capabilities` của `RemoteOptions` iOS

  * Để chạy test trên thiết bị iOS, Appium sẽ cài một phần mềm tên là `WebDriverAgent` lên thiết bị, và để cài đặt được, ta phải cung cấp developer team và signing certificate.

    Các bạn có thể xem thêm tại đây [link](http://appium.io/docs/en/drivers/ios-xcuitest-real-devices/)

    ![](https://images.viblo.asia/8915c299-098f-4f94-a9a4-cbdf450e371b.jpg)

* Đối với thiết bị thật thì ta cần thêm UUID, có thể xem cách tìm UUID tại [đây](https://www.idownloadblog.com/2018/11/20/how-to-find-udid-iphone-xs-max-xr/)

* `capabilities` của Android

  * Để lấy `deviceName`, hãy chạy `adb devices`

  * `com.learnrne2etest` và `.MainActivity` có thể lấy từ `android/app/src/main/AndroidManifest.xml`

    ```xml
    <manifest package="com.learnrne2etest">
        <!-- ... -->
        <activity android:name=".MainActivity">
           <!-- ... -->
        </activity>
    </manifest>
    ```

    Hoặc tham khảo bài sau [link](http://www.automationtestinghub.com/apppackage-and-appactivity-name/)

Cưỡi ngựa xem hoa như vậy đủ rồi, chúng ta hãy cùng tìm hiểu thêm về cách hoạt động của Appium

# 3. Kiến trúc, flow của Appium

![](https://images.viblo.asia/d5fa4bea-70c4-4bfa-9d89-03aac8d9a92c.jpg)

Appium dựa trên kiến trúc client-server, bản thân Appium là 1 server, có thể dễ dàng nhận thấy điều này ở đoạn config.

```ts
const iOS: RemoteOptions = {
  path: "/wd/hub",
  host: "localhost",
  port: 4723,
  // ...
};
```

#### 3.1. Test library + WebDriver client

Khi viết test, ta sẽ dành phần lớn thời gian để làm việc với chúng, như ví dụ ở phần 2, ta đã sử dụng Jest (với các câu lệnh `it`, `describe`, `afterEach`, `afterAll`) là công cụ để chạy test, và WebdriverIO (với `$`, `click()`, `setValue(value)`) để giao tiếp với Appium server.

Ngoài bộ đôi này, chúng ta có thể sử dụng bất cứ ngôn ngữ nào mà ta thích (miễn là Appium nó support :v), từ Ruby, Python cho đến PHP, C#, có thể xem list tại [đây](http://appium.io/docs/en/about-appium/appium-clients/index.html)

Nhưng mà mình recommend combo sau:

* Ngôn ngữ: JS/TS thân thiện với React Native dev

* WebDriver client: [WebdriverIO](https://webdriver.io/) vì trong đám client, thằng này nhiều star trên github nhất =))

- Test library: [jasmine](https://jasmine.github.io/index.html)
  - Vì nó có cú pháp giống Jest, mà anh em code React Native thì quá quen thuộc với Jest rồi
  - Là 1 trong 3 test framework được WebdriverIO support sẵn để go pro =)) (ngoài ra còn có mocha và cucumber), dùng Jest nếu lỗi thì phải tự mày mò thôi :v

Như đã nói ở trên, Appium áp dụng kiến trúc client-server. Khi ta viết những câu lệnh sau

```ts
// ./__tests__/sign-up.spec.ts
await passwordConfirmationInput.setValue("password123");
```

nếu để ý log ta có thể thấy những dòng log dưới đây, webdriverio chỉ đơn thuần gửi 1 HTTP request tới server, server làm gì thì chúng ta sẽ tìm hiểu sau :v

* iOS

```js
[HTTP] --> POST /wd/hub/session/b891507e-4d84-4e62-a5b2-e9110c529c9e/element/6F000000-0000-0000-E00E-000000000000/value
[HTTP] {"text":"password123"}
[debug] [W3C (b891507e)] Calling AppiumDriver.setValue() with args: ["password123","6F000000-0000-0000-E00E-000000000000","b891507e-4d84-4e62-a5b2-e9110c529c9e"]
[debug] [XCUITest] Executing command 'setValue'
[debug] [WD Proxy] Matched '/element/6F000000-0000-0000-E00E-000000000000/value' to command name 'setValue'
[debug] [Protocol Converter] Added 'text' property "password123" to 'setValue' request body
[debug] [WD Proxy] Proxying [POST /element/6F000000-0000-0000-E00E-000000000000/value] to [POST http://127.0.0.1:8100/session/01BFCDD1-27D7-4904-A95A-C75086994546/element/6F000000-0000-0000-E00E-000000000000/value] with body: {"value":["p","a","s","s","w","o","r","d","1","2","3"],"text":"password123"}
[debug] [WD Proxy] Got response with status 200: {"value":null,"sessionId":"01BFCDD1-27D7-4904-A95A-C75086994546"}
[debug] [W3C (b891507e)] Responding to client with driver.setValue() result: null
[HTTP] <-- POST /wd/hub/session/b891507e-4d84-4e62-a5b2-e9110c529c9e/element/6F000000-0000-0000-E00E-000000000000/value 200 821 ms - 14
```

* Android

```js
console.info
  2020-12-31T02:12:23.288Z INFO webdriver: COMMAND findElement("accessibility id", "login/toRegistrationScreenButton")

    at node_modules/@wdio/logger/build/node.js:76:9

console.info
  2020-12-31T02:12:23.289Z INFO webdriver: [POST] http://localhost:4723/wd/hub/session/7fc4b801-deae-49dc-947d-292d67ba5467/element

    at node_modules/@wdio/logger/build/node.js:76:9

console.info
  2020-12-31T02:12:23.289Z INFO webdriver: DATA {
    using: 'accessibility id',
    value: 'login/toRegistrationScreenButton'
  }

    at node_modules/@wdio/logger/build/node.js:76:9

console.info
  2020-12-31T02:12:23.414Z INFO webdriver: RESULT {
    'element-6066-11e4-a52e-4f735466cecf': 'bb82f194-16d1-4ba0-a520-33f47e117211',
    ELEMENT: 'bb82f194-16d1-4ba0-a520-33f47e117211'
  }

    at node_modules/@wdio/logger/build/node.js:76:9
```

#### 3.2. Appium server, Automation tool, Devices

Đây là phần xương sống trong kiến trúc của Appium, nó đảm nhận việc handle request từ client, giao tiếp với native automation tool để thực thi những command mà ta cần.

Appium server expose ra API theo chuẩn JSON Wire Protocol (WebDriver Protocol). Tuỳ vào target là iOS hay Android, nó sẽ có cách hoạt động riêng để phù hợp với nền tảng đó.

##### 3.2.1. Appium meets iOS

Quay trở lại đoạn log ở phần 3.1, nó đã ít nhiều gợi ý cho ta cách hoạt động của Appium

```js
[HTTP] --> POST /wd/hub/session/b891507e-4d84-4e62-a5b2-e9110c529c9e/element/6F000000-0000-0000-E00E-000000000000/value
[debug] [WD Proxy] Proxying [POST /element/6F000000-0000-0000-E00E-000000000000/value] to [POST http://127.0.0.1:8100/session/01BFCDD1-27D7-4904-A95A-C75086994546/element/6F000000-0000-0000-E00E-000000000000/value]
```

Có thể dễ thấy Appium server đơn giản chỉ proxy request của ta tới 1 server khác chạy ở port 8100 `http://127.0.0.1:8100`.

> Oát dờ phước? Thằng nào đang chạy ở port 8100 vậy?

Đó là [WebDriverAgent server](https://github.com/facebookarchive/WebDriverAgent), ban đầu được phát triển bởi ông lớn **Facebook**, appium đã fork về thêm mắm thêm muối gì đó vào. 

WDA giúp giao tiếp với XCUITest để có thể điều khiển device/simulator iOS từ xa. Bản thân nó cũng đã support sẵn Webdriver Protocol, vậy nên chắc hẳn dev Appium đã nghĩ như sau

> Tội gì mà phải code lại, có sẵn hàng ngon rồi thì dùng luôn thôi =))

WDA làm gì với device thì mình xin skip, vì cũng ko biết =)) Các bạn có thể tự mình tìm hiểu sâu hơn nếu có hứng thú với nó.

##### 3.2.2. Appium meets Android

Với Android, ta có ít gợi ý hơn

```js
2020-12-31T02:12:23.289Z INFO webdriver: [POST] http://localhost:4723/wd/hub/session/7fc4b801-deae-49dc-947d-292d67ba5467/element
2020-12-31T02:12:23.414Z INFO webdriver: RESULT {
  'element-6066-11e4-a52e-4f735466cecf': 'bb82f194-16d1-4ba0-a520-33f47e117211',
  ELEMENT: 'bb82f194-16d1-4ba0-a520-33f47e117211'
}
```

Không thấy proxy gì đó phải không nào? Đúng vậy, vì nó có proxy đâu :v

Ở version mới nhất, Appium sử dụng [appium-android-driver](https://github.com/appium/appium-android-driver) để giao tiếp với UIAutomator2. Vậy giao tiếp thế nào?

Mỗi khi bắt đầu chạy test, Appium sẽ cài app **Appium Settings** trên device của ta, thằng này sẽ mở port [4724](https://github.com/appium/appium-android-driver/blob/19b949383e9e1300edd25982e33bb76689a001d2/lib/driver.js#L17) trên device của ta và expose ra một vài API hệ thống. Appium server *abc* với app đã cài trên (qua HTTP), và nó sẽ *xyz* với UIAutomator2 để thực hiện các command.

![](https://images.viblo.asia/0b1ef505-609d-4412-b9d6-65508df7358d.jpg)

# 4. Kết luận

Là một dev, chúng ta không được chủ quan, lệ thuộc vào bên tester, mà hãy tự mình kiểm thử trước khi chuyển qua cho họ. Test chạy cơm là một công việc nhàm chán, vậy thì tại sao chúng ta không làm cho nó thú vị hơn bằng cách automate nó. Tuy sẽ có lúc cần một số thủ thuật, hay là phải dùng nhiều command khá lằng nhằng ( như cái datepicker chẳng hạn =)) ), nhưng một khi chạy được nhất định nó sẽ đem lại cho các bạn một cảm giác phê như con tê tê =))

Code e2e của bài viết chỉ là những đoạn code tạm bợ, các bạn muốn go pro có thể tham khảo [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate) của webdriverio về cách chia module, cũng như setup project. Nếu có thời gian mình sẽ viết thêm về việc refactor đống code tạm bợ trên để go pro =)) Giờ thì xin tạm biệt các bạn.