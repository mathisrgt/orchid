import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function Points() {
    return (
        <View style={styles.section}>
            <Text>Points</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
    },
});
