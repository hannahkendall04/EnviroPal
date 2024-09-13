import {View, Text, StyleSheet} from 'react-native';

export default function Project({title, description}) {

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{description} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
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