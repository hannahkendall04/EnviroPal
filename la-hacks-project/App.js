import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './components/HomePage.js';
import ProjectHome from './components/ProjectHome.js';
import ProjectPage from './components/ProjectPage.js';
const Stack = createStackNavigator();

export default function App({project}) {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name=" " component={HomePage} 
            options={{
              headerStyle: {
              backgroundColor: '#679436',
            }, 
              headerTintColor: '#fff' }} />
          <Stack.Screen name="Project Home" component={ProjectHome}
            options={{
              headerStyle: {
                backgroundColor: '#427aa1',
              }, headerTintColor: '#fff'}} />
          <Stack.Screen name="Project Page" component={ProjectPage} 
            options={{
              headerStyle: {
                backgroundColor: '#427aa1',
              }, headerTintColor: '#fff'}}/>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#679436',
    justifyContent: 'center',
  },  
});