import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './components/HomePage.js';
import TouchGrass from './components/TouchGrass.js';
import ProjectPage from './components/ProjectPage.js';
import GoGreen from './components/GoGreen.js';
import Profile from './components/Profile.js';

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

  const setBackColor = (pageName) => {
    switch (pageName) {
      case 'touchGrass':
        return '#427aa1';
      case 'goGreen':
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
          options={{tabBarStyle: {backgroundColor: '#427aa1'},
          tabBarActiveBackgroundColor: '#427aa1',
          tabBarInactiveBackgroundColor: '#427aa1'}}/>
        <Tab.Screen name="Go Green" component={GoGreen}
          options={{tabBarStyle: {backgroundColor: '#679436'},
          tabBarActiveBackgroundColor: '#679436',
          tabBarInactiveBackgroundColor: '#679436'}}/>
      </Tab.Navigator>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={HomePage} 
            options={{headerShown: false}} />
            <Stack.Screen name="Profile" component={Profile} options={
            {headerStyle: {backgroundColor: '#427aa1'}, headerTintColor: '#fff'}}/>
          <Stack.Screen name="Home" component={GoGreenTab}
            options={({route, navigation}) => ({
              headerStyle: {
                backgroundColor: getBackgroundColor(route),
              }, headerTintColor: '#fff', headerRight: () => (
                <Pressable onPress={() => {navigation.navigate("Profile")}}>
                  <Text style={{color: '#fff', marginRight: 25, fontSize: 16, fontWeight: 'bold'}}>Profile</Text>
                </Pressable>
              )})}/>
          <Stack.Screen name="Project Page" component={ProjectPage} options={({route}) => ({
              headerStyle: {
                backgroundColor: setBackColor(route.params.pageName),
              }, headerTintColor: '#fff'})}/>
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