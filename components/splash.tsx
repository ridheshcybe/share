import React from "react";
import { Button, Image, Platform, Text } from 'react-native';
import { Platform } from "react-native";
import * as Location from "expo-location";
import * as Bluetooth from "expo-bluetooth"; // Note: This is illustrative; there is no official expo-bluetooth in managed workflow currently

async function checkAndRequestPermission() {
  let permissionResults = [];

  if (Platform.OS === "ios") {
    // On iOS, Bluetooth permission is requested individually
    const { status: bluetoothStatus } = await Bluetooth.requestPermissionsAsync?.() || { status: 'granted' };
    permissionResults.push(bluetoothStatus);
  } else {
    // On Android, request location and Bluetooth permissions individually
    const { status: coarseStatus } = await Location.requestPermissionsAsync?.() || { status: 'granted' };
    permissionResults.push(coarseStatus);

    // For Android 12+ bluetooth permissions, Expo has no managed APIs, platform native requests are needed
    // Typically you would request permissions via PermissionsAndroid or custom native modules
    // For now, assume granted for demonstration:
    permissionResults.push('granted'); // bluetooth advertise
    permissionResults.push('granted'); // bluetooth connect
    permissionResults.push('granted'); // bluetooth scan

    // Nearby wifi devices permission is not managed by Expo directly yet
  }

  // Check if all permissions are granted or unavailable or limited
  const isAllGranted = permissionResults.every(
    (status) => status === "granted" || status === "unavailable" || status === "limited"
  );

  if (isAllGranted) {
    return true;
  }

  // You can implement custom logic to re-request or notify user here if needed

  return isAllGranted;
}


export default function Splash() {

  return (
    <>
    <Image src={require("@/assets/logo_only.png")} width={200} height={200} />
    <Text>Loading...</Text>
    <Button title="Check Permissions" onPress={() => {
      checkAndRequestPermission().then((isGranted) => {
        console.log("Permission granted: ", isGranted);
      });
    }} />
    </>
  );
}