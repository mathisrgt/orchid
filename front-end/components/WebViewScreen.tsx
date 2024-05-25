import React from 'react';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { API_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '@env';

type RootStackParamList = {
  WebViewScreen: { url: string };
};

type WebViewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WebViewScreen'>;
type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebViewScreen'>;

type Props = {
  navigation: WebViewScreenNavigationProp;
  route: WebViewScreenRouteProp;
};

const WebViewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={(event) => {
        if (event.url.startsWith(REDIRECT_URI)) {
          navigation.goBack();
        }
      }}
    />
  );
};

export default WebViewScreen;
