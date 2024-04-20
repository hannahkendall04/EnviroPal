import {StyleSheet, Text, View, Button} from 'react-native';

export default function ProjectPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BeGreen</Text>
            <Text style={styles.subtitle}>Your one stop shop for all things green!</Text>
            <Button title="Get Started" onPress={() => alert('You pressed a button.')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#427aa1',
        alignItems: 'center',
        justifyContent: 'top',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ebf2fa',
        paddingBottom: 20,
        paddingTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: '#ebf2fa',
    },
});