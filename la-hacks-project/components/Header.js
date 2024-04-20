import { StyleSheet, Text, View } from 'react-native';

export default function Header() { 
  return(
    <View style={styles.title}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>BeGreen</Text>
      </View>
  )
}

const styles = StyleSheet.create({
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