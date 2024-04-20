import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Button from './components/Button.js';
import Header from './components/Header.js';
import ImageViewer from './components/ImageViewer.js';

//const HomeImage = require('./assets/Tea_plant.png');
export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Button label="Button!"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#679436',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
