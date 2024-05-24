import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function Transactions() {
    return (
        <View style={styles.section}>
            <Text>Transactions</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
    },
});
