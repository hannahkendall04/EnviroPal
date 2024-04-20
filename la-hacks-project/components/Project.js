import {View, Text, StyleSheet} from 'react-native';

export default function Project({ project}) {

    return (
        <View style={StyleSheet.container}>
            <Text>Project Name: {project.title}</Text>
            <Text>Description: {project.description} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#427aa1'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ebf2fa'
    }
})