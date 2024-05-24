import { StyleSheet, View, Text, Image } from 'react-native';
import { Web3Modal } from "@web3modal/wagmi-react-native";
import CreateAccount from '@/components/Authentification/AccountButton';
import Colors from '@/constants/Colors';

export default function Authentification() {
    return (
        <View style={styles.container}>
            <View style={styles.section1}>
                <Image source={require('@/assets/images/orchid_logo.png')} style={styles.image} />
            </View>
            <View style={styles.section2}>
                <Text style={styles.title}>Welcome to Orchid</Text>
                <Text style={styles.subtext}>
                    Easiest way to manage your fidelity points and get rewarded.
                </Text>
                <CreateAccount />
            </View>
            <Web3Modal />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section1: {
        flex: 1, // Occupe tout l'espace disponible à l'exception de l'espace pris par les éléments non flexibles
        alignItems: 'center',
        justifyContent: 'center',
    },
    section2: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: '10%',
        justifyContent: 'flex-end',
    },
    image: {
        width: '50%',
        height: '50%',
        aspectRatio: 1, // square image
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 12,
        textAlign: 'center',
        marginVertical: '3%',
        marginBottom: '10%',
        color: Colors.light.tintColorGray_600,
    },
});
