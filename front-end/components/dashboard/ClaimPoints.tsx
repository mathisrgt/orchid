import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function ClaimPoints() {
    return (
        <View style={styles.section}>
            <Text>ClaimPoints</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
    },
});
