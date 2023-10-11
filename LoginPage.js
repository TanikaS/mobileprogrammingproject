import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import bcrypt from 'bcryptjs';


const db = openDatabase({ name: 'app.db' });
const saltRounds = 10; 

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');




  const handleRegister = async () => {
    if (typeof password !== 'string' || password.trim() === '') {
      setError('Invalid password.');
      return;
    }
    if (!validateEmail(email) || password !== confirmPassword) {
      setError('Invalid email or passwords do not match.');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await insertUserIntoDatabase(email, hashedPassword);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      setError('Registration failed.');
    }
  };

  const handleLogin = async () => {
    const userRecord = await getUserRecordFromDatabase(email);
    if (!userRecord) {
      setError('Login failed.');
      return;
    }
    const passwordMatch = await bcrypt.compare(password, userRecord.hashedPassword);

    if (passwordMatch) {
      navigation.navigate('Home');
    } else {
      setError('Login failed.');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const insertUserIntoDatabase = (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (email, password) VALUES (?, ?);',
          [email, hashedPassword],
          (_, results) => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };


  const getUserRecordFromDatabase = (email) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ?;',
          [email],
          (_, results) => {
            if (results.rows.length > 0) {
              const userRecord = results.rows.item(0);
              resolve(userRecord);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#ff5733',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginPage;
