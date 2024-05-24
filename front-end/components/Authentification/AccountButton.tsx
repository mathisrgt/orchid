import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function AccountButton() {
    return (
        <View style={styles.section}>
            <Link href="/bank-connection" asChild>
                <TouchableOpacity style={styles.buttonCreate}>
                    <Text style={styles.textAccount}>Create new account</Text>
                </TouchableOpacity>
            </Link>
            <Link href="/dashboard" asChild>
                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.textAccount}>Login</Text>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.buttonRecover}>
                <Text style={styles.textRecover}>Recover your account</Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
        width: '100%', // Assurez-vous que le conteneur des boutons s'étend également sur toute la largeur.
        justifyContent: 'flex-end',
        marginBottom: '5%',
    },
    buttonCreate: {
        backgroundColor: '#FB9492',
        borderRadius: 20,
        paddingVertical: 13,
        paddingHorizontal: 20,
        marginBottom: 3,
        alignItems: 'center',
    },
    buttonLogin: {
        backgroundColor: '#F1B479',
        borderRadius: 20,
        paddingVertical: 13,
        paddingHorizontal: 20,
        marginBottom: 3,
        alignItems: 'center',
    },
    buttonRecover: {
        paddingVertical: 13,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    textAccount: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
    textRecover: {
        color: Colors.light.tintColorGray_600,
        fontSize: 12,
        fontWeight: '600',
    },
});
