import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
      await AsyncStorage.setItem('userId', JSON.stringify(data.userId));
      router.replace('/home');
    } catch (error:any) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };

  return (
    <ImageBackground source={require('../assets/images/background.png')} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.icon}></Image>
      <Text nativeID="labelUsername" style={styles.lable}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Text nativeID="labelPassword" style={styles.lable}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    height: 155,
    width: 100,
    marginBottom:100
  },
  lable: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '75%',
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  button: {
    width: '75%',
    height: 50,
    backgroundColor: '#E51369',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
