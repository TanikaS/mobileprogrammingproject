import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput, Pressable, StyleSheet, ScrollView, Modal, ImageBackground, } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { addRecipe } from './routes/recipeRoutes';
import { createNewTable } from './routes/recipeRoutes';

const categoryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Lactose Free',
  'No Milk',
  'No Egg',
];

const AddRecipePage = ({ navigation }) => {
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeImageUri, setRecipeImageUri] = useState(null);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    createNewTable();
  }, []);

  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setRecipeImage(source);
        setRecipeImageUri(response.uri);
      }
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
  };

  const handleSaveRecipe = () => {
    if (!recipeTitle || !selectedCategory || !cookTime || !ingredients || !instructions) {
      Alert.alert('Validation Error', 'Fill in all required fields.');
      return;
    }

    const newRecipe = {
      imageUri: recipeImageUri,
      title: recipeTitle,
      description: recipeDescription,
      category: selectedCategory,
      cookTime: cookTime,
      ingredients,
      instructions,
    };

    addRecipe(newRecipe)
      .then((insertId) => {
        console.log('Recipe saved successfully.');
        navigation.popToTop('RecipeSearchPage', {
          recipe: {
            id: insertId,
            ...newRecipe,
          },
          imageUri: recipeImageUri,
        });
      })
      .catch((error) => {
        console.error('Error saving recipe:', error);
        Alert.alert('Error', 'Failed to save the recipe.');
      });
  };

  return (
    <ImageBackground
      source={require('./bg_img2.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImagePicker}
          >
            {recipeImage ? (
              <Image source={recipeImage} style={styles.recipeImage} />
            ) : (
              <Text>Select Recipe Image</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.textInputLabel}>Recipe title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={recipeTitle}
          onChangeText={setRecipeTitle}
        />

        <Text style={styles.textInputLabel}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={recipeDescription}
          onChangeText={setRecipeDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.textInputLabel}>Select category:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text>{selectedCategory || 'Category'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCategoryModalVisible}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {categoryOptions.map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.modalCategoryItem,
                  selectedCategory === category &&
                  styles.selectedModalCategoryItem,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.modalCategoryText}>{category}</Text>
              </Pressable>
            ))}
          </View>
        </Modal>
        <Text style={styles.textInputLabel}>Cook time:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cook time"
          value={cookTime}
          onChangeText={(text) => setCookTime(text)}
        />
        <Text style={styles.textInputLabel}>Ingredients:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingredients"
          multiline
          numberOfLines={4}
          value={ingredients}
          onChangeText={(text) => setIngredients(text)}
        />
        <Text style={styles.textInputLabel}>Instructions:</Text>
        <TextInput
          style={styles.input}
          placeholder="Instructions"
          multiline
          numberOfLines={8}
          value={instructions}
          onChangeText={(text) => setInstructions(text)}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            Alert.alert(
              'Save Recipe',
              'Are you sure you want to save this recipe?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Save',
                  onPress: () => handleSaveRecipe(),
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.buttonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f2f2f2',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  textInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'rgba(242, 242, 242, 0.6)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 7,
  },

  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  saveButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  categoryButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedModalCategoryItem: {
    backgroundColor: '#79AC78',
    padding: 10,
    borderRadius: 25,
  },
  modalCategoryText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AddRecipePage;
