Clock — Android app
-------------------

A thin WebView wrapper around the web clock. On every build, `index.html`,
`clock.css`, `clock.png`, `src/` and `fonts/` are copied from the repo root
into the APK's assets, so web changes are picked up automatically.

Requirements
------------

- JDK 17+
- Android SDK with platform 36 (`compileSdk = 36`); point Gradle at it via
  `ANDROID_HOME` or a `local.properties` file with `sdk.dir=...`
- `adb` on your `PATH` for installing
- Device/emulator running Android 8.0+ (`minSdk = 26`)

Build
-----

```shell
cd android
./gradlew assembleDebug
```

Output: `app/build/outputs/apk/debug/app-debug.apk`

Install & run
-------------

With a device or emulator connected:

```shell
./gradlew installDebug
adb shell am start -n pl.arimseventh.clock/.MainActivity
```

Or install an already-built APK:

```shell
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

WSL note
--------

Under WSL2 the Linux `adb` usually can't see USB-connected phones. Either:

- use wireless debugging: `adb pair <ip>:<port>`, then `adb connect <ip>:<port>`, or
- copy the APK to Windows and install it with Windows' `adb.exe`.
