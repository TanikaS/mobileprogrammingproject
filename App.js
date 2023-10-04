import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomePage from './HomePage';
import RecipeSearchPage from './RecipeSearchPage';
import AddRecipePage from './AddRecipePage';
import LoginPage from './LoginPage';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="RecipeSearchPage" component={RecipeSearchPage} />
        <Stack.Screen name="AddRecipePage" component={AddRecipePage} />
        <Stack.Screen name="Sign in" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
