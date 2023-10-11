import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, ImageBackground} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'; 
import { fetchAllRecipes } from './routes/recipeRoutes';
import RecipeDetail from './RecipeDetail';

const RecipeSearchPage = ({ route }) => {
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    lactoseFree: false,
    noMilk: false,
    noEgg: false,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const navigation = useNavigation();

  
  useEffect(() => {
    fetchAllRecipes()
      .then((recipes) => {
        setAllRecipes(recipes);
        setSearchResults(recipes);
      })
      .catch((error) => {
        console.error('Error fetching recipes: ', error);
      });
  }, []);

  // Finds recipe with keywords
  const handleSearch = () => {
    console.log("search:", searchText)
    const filteredRecipes = allRecipes.filter((recipe) => {
      console.log("title:", recipe.title);
      const titleMatch = recipe.title.toLowerCase().includes(searchText.toLowerCase());
  
      const categoryMatch =
        (!selectedFilters.vegetarian || (recipe.category === 'Vegetarian')) &&
        (!selectedFilters.vegan || (recipe.category === 'Vegan')) &&
        (!selectedFilters.glutenFree || (recipe.category === 'Gluten Free')) &&
        (!selectedFilters.lactoseFree || (recipe.category === 'Lactose Free')) &&
        (!selectedFilters.noMilk || (recipe.category === 'No Milk')) &&
        (!selectedFilters.noEgg || (recipe.category === 'No Egg'));
  
      return titleMatch && categoryMatch;
    });
  
    setSearchResults(filteredRecipes);
  };
  

  
  return (
    <ImageBackground
    source={require('./bg_img2.jpg')}
    style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          placeholderTextColor="#999"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={styles.buttonText}>Filters</Text>
      </TouchableOpacity>

      {searchResults.length > 0 ? (
       <FlatList
         data={searchResults}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.recipeItem}
             onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
           >
             <Text style={styles.recipeName}>{item.title}</Text>
             <Text style={styles.recipeDescription}>{item.description}</Text>
             <Text>
                  <Text style={styles.recipeCookTime}>Cook Time:</Text> {item.cookTime}
            </Text>
           </TouchableOpacity>
         )}
       />
      ) : (
        <Text style={styles.error}> No recipes found.</Text>
      )}


<Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >

        
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedFilters.vegetarian && styles.selectedFilterItem,
              ]}
              onPress={() =>
                setSelectedFilters({
                  ...selectedFilters,
                  vegetarian: !selectedFilters.vegetarian,
                })
              }
            >
              <Text style={styles.filterText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedFilters.vegan && styles.selectedFilterItem,
              ]}
              onPress={() =>
                setSelectedFilters({
                  ...selectedFilters,
                  vegan: !selectedFilters.vegan,
                })
              }
            >
              <Text style={styles.filterText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedFilters.glutenFree && styles.selectedFilterItem,
              ]}
              onPress={() =>
                setSelectedFilters({
                  ...selectedFilters,
                  glutenFree: !selectedFilters.glutenFree,
                })
              }
            >
              <Text style={styles.filterText}>Gluten Free</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedFilters.lactoseFree && styles.selectedFilterItem,
              ]}
              onPress={() =>
                setSelectedFilters({
                  ...selectedFilters,
                  lactoseFree: !selectedFilters.lactoseFree,
                })
              }
            >
              <Text style={styles.filterText}>Lactose Free</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedFilters.noMilk && styles.selectedFilterItem,
              ]}
              onPress={() =>
                setSelectedFilters({
                  ...selectedFilters,
                  noMilk: !selectedFilters.noMilk,
                })
              }
            >
              <Text style={styles.filterText}>No Milk</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[
                styles.filterItem,
                selectedFilters.noEgg && styles.selectedFilterItem,
              ]}
              onPress={() =>
                setSelectedFilters({
                  ...selectedFilters,
                  noEgg: !selectedFilters.noEgg,
                })
              }
            >
              <Text style={styles.filterText}>No Egg</Text>
            </TouchableOpacity>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setFilterModalVisible(false);
                  handleSearch();
                }}
              >
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'black',
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f2f2f2',
  },
  filterButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  modalButton2: {
    backgroundColor: '#ff5733',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  recipeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  recipeCookTime: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedFilterItem: {
    backgroundColor: '#79AC78',
    padding: 10,
    borderRadius: 10,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
  },
  applyFilterButton: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});

export default RecipeSearchPage;
