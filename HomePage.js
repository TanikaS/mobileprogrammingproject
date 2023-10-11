import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('./bg_img2.jpg')} 
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Cookbook App</Text>
        <Text style={styles.subtitle}>Search and add tasty recipes</Text>
        <TouchableOpacity

          style={styles.button}
          onPress={() => navigation.navigate('RecipeSearchPage')} 
        >
          <Text style={styles.buttonText}>Find recipes</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddRecipePage')} >
          <Text style={styles.buttonText}>Add recipes</Text>
        </TouchableOpacity>



        {/* <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('LoginPage')} >
          <Text style={styles.buttonText}>Sign In</Text>
             </TouchableOpacity>
               */}

      </ImageBackground>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#79AC78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  signInButton: {
    backgroundColor: '#FF5733', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
  },
});

export default HomePage;
