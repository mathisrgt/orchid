import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env';
import * as Linking from 'expo-linking';
import Colors from '@/constants/Colors';

const BankConnection = () => {
  const navigation = useNavigation();

  const handleAddBankAccount = () => {
    const authUrl = `https://${API_URL}-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    navigation.navigate('WebViewScreen', { url: authUrl });
  };

  useEffect(() => {
    const handleDeepLink = async (event) => {
      let { url } = event;
      if (url) {
        const code = Linking.parse(url).queryParams.code;
        if (code) {
          const data = {
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          };

          console.log('Code:', code);
          console.log('Client ID:', data.client_id);
          console.log('Secret:', data.client_secret);

          fetch(`${API_URL}/2.0/auth/token/access`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              console.log('Access Token:', data.access_token);
              AsyncStorage.setItem('accessToken', data.access_token);
            })
            .catch((error) => {
              console.error('Error:', error);
              Alert.alert('Error', 'Failed to get access token');
            });
        }
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleAddBankAccount}>
          <Text style={styles.buttonText}>Add your bank history</Text>
        </TouchableOpacity>
        <Image source={require('@/assets/images/orchid_logo.png')} style={styles.image} />
        <Text style={styles.disclaimer}>
          We will not share your identity or banking information with Monoprix. Transaction data will be displayed and stored only on your device.
        </Text>
      </View>
    </View>
  );
};

export default BankConnection;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '7%',
    height: '7%',
    aspectRatio: 1, // square image
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: '10%',
    marginVertical: '3%',
    color: Colors.light.tintColorGray_600,
  },
  button: {
    backgroundColor: '#FB9492',
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
