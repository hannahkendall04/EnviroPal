import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './components/HomePage.js';
import TouchGrass from './components/TouchGrass.js';
import ProjectPage from './components/ProjectPage.js';
import GoGreen from './components/GoGreen.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const getBackgroundColor = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Touch Grass';
    switch (routeName) {
      case 'Touch Grass':
        return '#427aa1';
      case 'Go Green':
        return '#679436';
    }
  }
  const GoGreenTab = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false, 
        tabBarIconStyle: {display: 'none'},
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: '#ebf2fa',
        tabBarLabelStyle: {fontSize: 20, fontWeight: 'bold'}}}>
        <Tab.Screen name="Touch Grass" component={TouchGrass} 
          options={{tabBarActiveBackgroundColor: '#427aa1',
          tabBarInactiveBackgroundColor: '#427aa1'}}/>
        <Tab.Screen name="Go Green" component={GoGreen}
          options={{tabBarActiveBackgroundColor: '#679436',
          tabBarInactiveBackgroundColor: '#679436'}}/>
      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home Page" component={HomePage} 
            options={{headerShown: false}} />
          <Stack.Screen name="Project Home" component={GoGreenTab}
            options={({route}) => ({
              headerStyle: {
                backgroundColor: getBackgroundColor(route),
              }, headerTintColor: '#fff'})} />
          <Stack.Screen name="Project Page" component={ProjectPage} />
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