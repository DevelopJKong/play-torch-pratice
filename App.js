import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { torch } from 'react-native-pytorch-core';

export default function App() {
  const [tensor, _setTensor] = useState(torch.rand([2, 3]));
  return (
    <View style={styles.container}>
      <Text>{`Random tensor of shape ${tensor.shape} with data ${tensor.data()}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
