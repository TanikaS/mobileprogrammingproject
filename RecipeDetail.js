import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Button, Image, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { updateRecipe, deleteRecipe } from './routes/recipeRoutes';
import { useNavigation } from '@react-navigation/native';

function RecipeDetail({ route }) {
  const { recipe, imageUri } = route.params;
  const navigation = useNavigation();
  const [editMode, setEditMode] = useState(true);

  const handleUpdateRecipe = (recipeId) => {
    navigation.navigate('EditRecipe', { recipe });
  };

  const handleDeleteRecipe = (recipeId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteRecipe(recipeId)
              .then(() => {
                console.log(`Recipe ${recipeId} deleted`);
                navigation.navigate('Home');
              })
              .catch((error) => {
                console.error('Error deleting recipe:', error);
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

 
  return (
    <ImageBackground
      source={require('./bg_img2.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.recipeImage} />}
        
        <Text style={styles.title}>{recipe.title}</Text>

        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.recipeDetails}>{recipe.description}</Text>

        <Text style={styles.subtitle}>Category</Text>
        <Text style={styles.recipeDetails}>{recipe.category}</Text>

        <Text style={styles.subtitle}>Cook Time</Text>
        <Text style={styles.recipeDetails}>{recipe.cookTime}</Text>

        <Text style={styles.subtitle}>Ingredients</Text>
        <Text style={styles.recipeDetails}>{recipe.ingredients}</Text>

        <Text style={styles.subtitle}>Instructions</Text>
        <Text style={styles.recipeDetails}>{recipe.instructions}</Text>

        {editMode && (
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleUpdateRecipe(recipe.id)}
          >
            <Text style={styles.buttonText}>Update Recipe</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteRecipe(recipe.id)}
        >
          <Text style={styles.buttonText}>Delete Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    backgroundColor: '#f2f2f2',
    color: 'black',
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8, 
    padding: 10,
  },
  recipeDetails: {
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8, 
    padding: 10,
  },
  updateButton: {
    backgroundColor: '#79AC78',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default RecipeDetail;
