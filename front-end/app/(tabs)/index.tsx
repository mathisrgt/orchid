import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootProvider from "@/providers";
import { Web3Modal } from "@web3modal/wagmi-react-native";
import Authentification from '@/components/Authentification';
import BankConnection from '@/components/BankConnection';
import WebViewScreen from '@/components/WebViewScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <RootProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Authentification" component={Authentification} />
          <Stack.Screen name="BankConnection" component={BankConnection} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Web3Modal />
    </RootProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
