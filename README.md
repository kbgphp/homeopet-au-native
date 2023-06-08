npx react-native-asset => custom fonts 
========================
npx react-native start
========================
react native vectors icon
1.add react-native.config.file
2.Android - setup app/build gradle only 
ios- 
-$ npx pod-install ios 
-add manually font family in info.plist
========================

======================
const { width: windowWidth } = Dimensions.get('window');
===========================
Firebase ios setup
add these in pod file
  pod 'Firebase', :modular_headers => true
  pod 'FirebaseCoreInternal', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true
=============================
 WARN  Usage of "messaging().registerDeviceForRemoteMessages()" is not required. You only need to register if auto-registration is disabled in your 'firebase.json' configuration file via the 'messaging_ios_auto_register_for_remote_messages' property.
 WARN  [Error: [messaging/unregistered] You must be registered for remote messages before calling getToken, see messaging().registerDeviceForRemoteMessages().]
 ============================
 server key - AAAACWWwUxo:APA91bF2RIOEBGWU-IVsgvkMLBUNH6AVKH7Ij5DorcWHMOX8e0bAZFh_2tnfoGdV1x7_zJI-Ej5Grs5ZspPvch17iqqn_w7JbkBIaitCKC0L2AgYYHfCrph1DWu1D_FpMilmDIzquqyZ

 iphone 7 - ram -
 cQO07z7uVkWXvfkih93eo8:APA91bEGnmGAcV3Cjy4tx8V7rSClB1aEOmJku2Bw44xn7R65N11CqRrkeXCXPXeEFIm_LclCAGpIv9oQ3-NkZfcoAzbN700wZNRQ7BLF3pmcndXbfEEdk4D4ekrxjGJrCuFuuf3TfJ8f

 icon - https://cdn.shopify.com/s/files/1/0507/2365/1778/files/logo_web_600x.png?v=1614294542