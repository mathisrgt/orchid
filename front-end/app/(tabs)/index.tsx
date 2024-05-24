import { StyleSheet, View } from 'react-native';
import RootProvider from "@/providers";
import { Web3Modal } from "@web3modal/wagmi-react-native";
import Authentification from '@/components/Authentification';

export default function AuthentificationPage() {
  return (
    <RootProvider>
      <View style={styles.container}>
        <Authentification />
      </View>
      <Web3Modal />
    </RootProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupe tout l'espace disponible car il est tout seule (Sinon prend juste la place de son contenu)
    backgroundColor: 'white',
  },
});
