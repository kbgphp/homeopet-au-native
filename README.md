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