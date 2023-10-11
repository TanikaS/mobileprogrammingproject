import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'app.db' });

export const createNewTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS new_recipes ' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'title TEXT NOT NULL, ' +
        'description TEXT, ' +
        'category TEXT, ' +
        'cookTime INTEGER, ' +
        'ingredients TEXT, ' +
        'instructions TEXT, ' +
        'imageUri TEXT);',
      [],
      () => {
        console.log('New table "new_recipes" created successfully.');
      },
      (error) => {
        console.error('Error creating table "new_recipes":', error);
      }
    );
  });
};
export const addRecipe = (recipeData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO new_recipes (title, description, category, cookTime, ingredients, instructions, imageUri) ' +
          'VALUES (?, ?, ?, ?, ?, ?, ?);',
        [
          recipeData.title,
          recipeData.description,
          recipeData.category,
          recipeData.cookTime,
          recipeData.ingredients,
          recipeData.instructions,
          recipeData.imageUri,
        ],
        (_, results) => {
          const { insertId } = results;
          resolve(insertId);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
  }

  export const fetchRecipeById = (recipeId) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM new_recipes WHERE id = ?;',
          [recipeId],
          (_, results) => {
            if (results.rows.length > 0) {
              const recipe = results.rows.item(0);
              resolve(recipe);
            } else {
              resolve(null);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };


export const updateRecipe = (id, recipeData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE new_recipes ' +
          'SET title = ?, description = ?, category = ?, cookTime = ?, ingredients = ?, instructions = ?, imageUri = ? ' +
          'WHERE id = ?;',
        [
          recipeData.title,
          recipeData.description,
          recipeData.category,
          recipeData.cookTime,
          recipeData.ingredients,
          recipeData.instructions,
          recipeData.imageUri,
          id,
        ],
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM new_recipes WHERE id = ?;',
        [id],
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

export const fetchAllRecipes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM new_recipes;',
        [],
        (_, results) => {
          const records = [];
          for (let i = 0; i < results.rows.length; i++) {
            records.push(results.rows.item(i));
          }
          resolve(records);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};
