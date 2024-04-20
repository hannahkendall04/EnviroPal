import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

//import Button from './Button.js';

export default function HomePage({navigation}) { 
  return(
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>BeGreen</Text>
      </View>
      <Button title="Button!"
        onPress={
          () => navigation.navigate('Project')
        }/>
      <StatusBar style="auto" />
    </View>
  )
}

// function Button({ label }) {
//   return (
//     <View style={styles.buttonContainer}>
//       <Pressable style={styles.button}>
//         <Text style={styles.buttonLabel}>{label}</Text>
//       </Pressable>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#679436',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      backgroundColor: '#ebf2fa', 
      padding: 10, 
      width: 300, 
      borderRadius: 10, 
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 50,
  }
});
