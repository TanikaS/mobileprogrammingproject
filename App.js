import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import RecipeSearchPage from './RecipeSearchPage';
import AddRecipePage from './AddRecipePage';
import LoginPage from './LoginPage';
import RecipeDetail from './RecipeDetail';
import EditRecipe from './EditRecipe';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="RecipeSearchPage" component={RecipeSearchPage} />
        <Stack.Screen name="AddRecipePage" component={AddRecipePage} />
       {/*<Stack.Screen name="LoginPage" component={LoginPage} /> */}
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="EditRecipe" component={EditRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;