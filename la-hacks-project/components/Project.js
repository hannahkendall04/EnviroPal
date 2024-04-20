import {View, Text, StyleSheet} from 'react-native';

export default function Project({title, description, id, navigation}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Project Name: {title}</Text>
            <Text style={styles.subtitle}>Description: {description} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#427aa1'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ebf2fa'
    },
    subtitle : {
        fontSize: 16,
        color: '#ebf2fa'
    }
})