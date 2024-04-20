import {View, Text, StyleSheet, Pressable, Modal, Image} from 'react-native';
import React, {useState} from 'react';

export default function ProjectPage({route, navigation}) {
    const {title, description, tasks, pageName} = route.params;
    const name = pageName === 'goGreen' ? 'Go Green' : 'Touch Grass';
    
    const [modalVisible, setModalVisible] = useState(false);

    const styles = pageName === 'goGreen' ? goGreen : touchGrass;

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType='slide'>
                <Text style={styles.alert}>Congrats on finishing your task!</Text>
                <View>
                    <Image source={require('../assets/task_plant.jpg')} style={styles.image} />
                </View>
                <Pressable onPress={() => setModalVisible(false)}>
                    <View style={styles.modalButton}>
                        <Text style={styles.subtitle}>Continue to Next Task</Text>
                    </View>
                </Pressable>
            </Modal>
            <Text style={styles.title}>Project: {title} </Text>
            <Text style={styles.subtitle}>{description} </Text>
            <View>
                {tasks.map((task) => {
                    return (
                        <Pressable onPress={() => setModalVisible(true)} key={task.id} style={styles.taskContainer}>
                            <Text style={styles.task}>{task}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}

const goGreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfaeb',
        alignItems: 'center',
        justifyContent: 'top',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#679436',
        paddingBottom: 20,
        paddingTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: '#679436',
        paddingBottom: 20,
    },
    taskContainer: {
        backgroundColor: '#ecfaeb',
        width: 300,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#679436',
    },
    modalButton: {
        backgroundColor: '#ecfaeb',
        borderRadius: 10,
        paddingTop:15,
        borderWidth: 2,
        marginTop: 50,
        marginLeft:50,
        marginRight:50,
        borderColor: '#679436',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#679436',
        padding: 10,
    },
    image: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        width: 350,
        height: 350,
        borderRadius: 10,
    },
});

const touchGrass = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebf2fa',
        alignItems: 'center',
        justifyContent: 'top',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#427aa1',
        paddingBottom: 20,
        paddingTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: '#427aa1',
        paddingBottom: 20,
    },
    taskContainer: {
        backgroundColor: '#ebf2fa',
        width: 300,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#427aa1',
    },
    modalButton: {
        backgroundColor: '#ebf2fa',
        borderRadius: 10,
        paddingTop:15,
        borderWidth: 2,
        marginTop: 50,
        marginLeft:50,
        marginRight:50,
        borderColor: '#427aa1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#427aa1',
        padding: 10,
    },
    image: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        width: 350,
        height: 350,
        borderRadius: 10,
    },
});