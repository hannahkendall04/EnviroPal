import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import ImageViewer from './ImageViewer.js';

export default function HomePage({navigation}) { 
  return(
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>BeGreen</Text>
      </View>
      <ImageViewer source={require('../assets/home_icon.png')} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress = {() => navigation.navigate("Project Home")}>
          <Text style={styles.buttonLabel}>Get Started!</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#679436',
    alignItems: 'center',
    justifyContent: 'top',
  },
  title: {
      backgroundColor: '#ebf2fa', 
      padding: 10, 
      width: 300, 
      borderRadius: 10, 
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
      marginBottom: 40,
  },
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginTop: 30,
  },
  button: {
    borderRadius: 10,
    width: '40%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ebf2fa',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
