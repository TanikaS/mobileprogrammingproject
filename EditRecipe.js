import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { updateRecipe } from './routes/recipeRoutes';

const categoryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Lactose Free',
  'No Milk',
  'No Egg',
];

function EditRecipe({ route, navigation }) {
  const { recipe } = route.params;

  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    cookTime: recipe.cookTime.toString(),
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    imageUri: recipe.imageUri,
  });

  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const openCategoryModal = () => {
    setCategoryModalVisible(true);
  };

  const handleCategorySelect = (category) => {
    setEditedRecipe({ ...editedRecipe, category });
    setCategoryModalVisible(false);
  };

  const handleSave = () => {
    updateRecipe(recipe.id, editedRecipe)
      .then(() => {
        console.log(`Recipe ${recipe.id} updated`);
        navigation.navigate('Home', { recipe: { ...recipe, ...editedRecipe } });
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
      });
  };

  return (
    <ImageBackground
    source={require('./bg_img2.jpg')}
    style={styles.backgroundImage}
  >
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Edit Recipe</Text>

      <Text style={styles.inputTitle}>Title:</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Title"
        value={editedRecipe.title}
        onChangeText={(text) => setEditedRecipe({ ...editedRecipe, title: text })}
      />
      <Text style={styles.inputTitle}>Description:</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Description"
        value={editedRecipe.description}
        onChangeText={(text) => setEditedRecipe({ ...editedRecipe, description: text })}
      />



      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Category:</Text>
        <View style={styles.categoryInputContainer}>
          <TextInput
            style={styles.categoryInput}
            placeholder="Category"
            value={editedRecipe.category}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={openCategoryModal}>
            <Text style={styles.buttonText}>Select Category</Text>
          </TouchableOpacity>

        </View>
      </View>





      <Text style={styles.inputTitle}>Cook Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cook Time"
        value={editedRecipe.cookTime}
        onChangeText={(text) => setEditedRecipe({ ...editedRecipe, cookTime: text })}
      />
      <Text style={styles.inputTitle}>Ingredients:</Text>
      <TextInput
        style={styles.largeInput}
        multiline
        placeholder="Ingredients"
        value={editedRecipe.ingredients}
        onChangeText={(text) => setEditedRecipe({ ...editedRecipe, ingredients: text })}
      />
      <Text style={styles.inputTitle}>Instructions:</Text>
      <TextInput
        style={styles.largeInput}
        multiline
        placeholder="Instructions"
        value={editedRecipe.instructions}
        onChangeText={(text) => setEditedRecipe({ ...editedRecipe, instructions: text })}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
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
                editedRecipe.category === category && styles.selectedModalCategoryItem,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.modalCategoryText}>{category}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    marginBottom: 14,
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
  inputTitle: {
   fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      backgroundColor: 'rgba(242, 242, 242, 0.6)',
      borderTopLeftRadius: 8, 
      borderTopRightRadius: 8, 
      paddingLeft: 7,
  },
  largeInput: {
    height: 120,
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
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
  
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
  modalCategoryItem: {
    padding: 16,
  },
  selectedModalCategoryItem: {
    backgroundColor: '#79AC78',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCategoryText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  categoryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8, 
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});


export default EditRecipe;
