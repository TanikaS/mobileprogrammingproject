import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, TextInput, Pressable, StyleSheet, ScrollView, Modal, } from 'react-native';
import ImagePicker from 'react-native-image-picker';


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
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

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
      }
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false); 
};

  const handleSaveRecipe = () => {
    if (!recipeTitle || !selectedCategory || !cookTime || !ingredients || !instructions) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }
  
    const newRecipe = {
      image: recipeImage,
      title: recipeTitle,
      description: recipeDescription,
      category: selectedCategory,
      cookTime: cookTime,
      ingredients: ingredients,
      instructions: instructions,
    };
  

    fetch('http://35.228.84.185:6000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => {
        if (response.status === 201) {
          navigation.goBack(); 
        } else {

          Alert.alert('Error', 'Failed to save the recipe.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while saving the recipe.');
      });


    
    navigation.goBack();
  };


  
  return (
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
            selectedCategory === category && styles.selectedModalCategoryItem,
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
                onPress:() => handleSaveRecipe(),
              },
            ],
            { cancelable: false }
          );
        }}
      >
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },

  textInputLabel: {
    marginRight: 10, 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'black',
    marginBottom: 5,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
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
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
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
