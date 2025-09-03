# ADB
adb shell input text "RR"

# react-native
npx react-native run-android --active-arch-only
npx react-native run-android --mode=debug
npx react-native run-android --mode=release
npx react-native run-android --active-arch-only --mode=release

# android
cd android && ./gradlew assembleRelease
cd android && ./gradlew assembleDebug
cd android && ./gradlew bundleRelease
cd android && ./gradlew clean


# git
git clean --force && git reset --hard

# expo
npx expo run:android
NODE_ENV=development npx expo run:android --variant release
npx expo-doctor
npx expo prebuild --clean

rm -rf $TMPDIR/react-* && npm cache clean --force && rm -rf android/.gradle android/.idea android/app/build android/build && rm -rf node_modules


npm install expo@^53.0.22 && npx expo install --fix
