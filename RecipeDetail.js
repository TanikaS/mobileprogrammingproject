import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

function RecipeDetail({route}) {
  /* 2. Get the param */
  const {recipe: item} = route.params;
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imageStyle}
        source={require('./pesto.jpg')}>
        <Text style={styles.title}>{JSON.stringify(item.name)}</Text>
      </ImageBackground>
      <Text style={styles.subtitle}>Ingredients</Text>
      <Text style={styles.recipeDetails}>
        {JSON.stringify(item.ingredients)}
      </Text>
      <Text style={styles.subtitle}>Directions</Text>
      <Text style={styles.recipeDetails}>
        {JSON.stringify(item.directions)}
      </Text>
      <Text style={styles.subtitle}>Nutritional Values</Text>
      <Text style={styles.recipeDetails}>{JSON.stringify(item.nutrition)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    margin: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 50,
  },
  subtitle: {
    marginVertical: 20,
    fontSize: 30,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },
  recipeDetails: {
    fontSize: 18,
  },
  imageStyle: {
    height: 300,
    marginVertical: 20,
  },
});
export default RecipeDetail;
