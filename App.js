// Import dependencies
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "react-native-pytorch-core";
import { initialWindowMetrics, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
// 1. Import classify image function
import classifyImage from "./components/ImageClassifier";

// App function to render a camera and a text
export default function App() {
  // Safe area insets to compensate for notches and bottom bars
  const insets = useSafeAreaInsets();

  // Function to handle images whenever the user presses the capture button
  async function handleImage(image) {
    // 2. Call the classify image function with the camera image
    const result = await classifyImage(image);
    // 3. Log the result from classify image to the console
    console.log(result);
    // Release the image from memory
    image.release();
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View  style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
      }}>
        {/* Render camera and make it parent filling */}
        <Camera
          style={[StyleSheet.absoluteFill, { bottom: insets.bottom }]}
          // Add handle image callback on the camera component
          onCapture={handleImage}
        />
        {/* Label container with custom render style and a text */}
        <View style={styles.labelContainer}>
          <Text>Label will go here</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

// Custom render style for label container
const styles = StyleSheet.create({
  labelContainer: {
    padding: 20,
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
