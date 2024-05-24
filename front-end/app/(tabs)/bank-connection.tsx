import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';

const BankConnection = () => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add your bank history</Text>
        </TouchableOpacity>
        <Image source={require('@/assets/images/orchid_logo.png')} style={styles.image} />
        <Text style={styles.disclaimer}>
          We will not share your identity or banking information with Monoprix.
          Transaction data will be displayed and stored only on your device.
        </Text>
      </View>
    </View>
  );
}
export default BankConnection;

const styles = StyleSheet.create({ // On crée un objet qui contient les styles
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
      backgroundColor: '#FB9492', // This should be the color that matches the button in your image.
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
  