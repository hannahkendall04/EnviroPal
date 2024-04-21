import {View, Text, StyleSheet, Pressable, Modal, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

const {GoogleGenerativeAI} = require('@google/generative-ai');
// const API_KEY = 'AIzaSyCHKmY0gedI_RMoL4Si90iPosuDWc4BuXU';
const API_KEY = 'AIzaSyDrl-C4F0U_goNGQY9wPQObXKFLyPkUd70';
const genAI = new GoogleGenerativeAI(API_KEY);

async function getProjectLongDescription({title, description}) {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
  
    const prompt = `Give me a longer description for an individual project that anyone can do to better the environment called ${title}. The short description is: ${description}. DO NOT INCLUDE BACK TICKS IN YOUR RESPONSE`;

    try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();

}
    catch (e) {
    console.log("Error: ", e);
    }

}
async function getProjectTasks({title, longDescription}) {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
  
    const prompt = `Give me no more than 8 project SPECIFIC tasks for an individual project that anyone can do to better the environment called ${title}. The tasks should be "bite size" and goal-oriented. The long description is: ${longDescription}. DO NOT INCLUDE BACK TICKS IN YOUR RESPONSE. DO NOT INCLUDE ASTERISKS IN YOUR RESPONSE`;

    try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();

}
    catch (e) {
    console.log("Error: ", e);
    }
}

async function createProject({title, description}) {
    try{
        const longDescription = await getProjectLongDescription({title, description});
        const tasks =  await getProjectTasks({title, longDescription});
        return {longDescription, tasks};
    }
    catch (e) {
        console.log("Error: ", e);
    }
}

export default function ProjectPage({route, navigation}) {
    const {title, description, pageName} = route.params;

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchProject = async () => {
        const project = await createProject({title, description});
        if (project) {
            setProject(project);
            setLoading(false);
            setTasks(project.tasks.split('\n'));
        }
        else {
            setError(true);
        }
    };
        fetchProject();
    }, []);

    const styles = pageName === 'goGreen' ? goGreen : touchGrass;
    
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
                <Text style={styles.loadingSubText}>Steps to make your project: <Text style={{fontWeight: 'bold'}}>{title}</Text>, the best it can be!</Text>
            </View>
        )
    }
    else if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: Unable to load projects</Text>
            </View>
        )
    }
    else {
    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType='slide'>
                <Text style={styles.alert}>Congrats on finishing your task!</Text>
                <View>
                    <Image source={require('../assets/task_plant.jpg')} style={styles.image} />
                </View>
                <Pressable onPress={() => {
                    setModalVisible(false);
                    const updatedTasks = tasks.filter(t => t !== task);
                    setProject({...project, tasks: updatedTasks.join('\n')});
                    setTasks(updatedTasks);
                    }}>
                    <View style={styles.modalButton}>
                        <Text style={styles.subtitle}>Continue to Next Task</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => setModalVisible(false)}>
                    <View style={styles.modalButtonRed}>
                        <Text style={styles.subtitleRed}>Not done yet?</Text> 
                        <Text style={styles.subtitleRed}> Continue Working!</Text>
                    </View>
                </Pressable>
            </Modal>
            <Text style={styles.title}>{title} </Text>
            <Text style={styles.subtitle}>{description} </Text>
            <ScrollView>
                { tasks.length > 0 ?
                <View>
                {tasks.map((task) => {
                    return (
                        <Pressable onPress={() => {setModalVisible(true); setTask(task)}} key={task.id} style={styles.taskContainer}>
                            <Text style={styles.task}>{task}</Text>
                        </Pressable>
                    )})}
                    </View>
                :  <View>
                        <Image source={require('../assets/task_plant.jpg')} style={styles.image} />
                        <Text style={styles.finalTitle}>Congratulations! </Text>
                        <Text style={styles.finalSubtitle}>You have completed the project: <Text style={{fontWeight: 'bold'}}>{title}</Text> </Text>
                    </View>
    }
            </ScrollView>
        </View>
    )
}
}


const goGreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecfaeb',
        alignItems: 'center',
        justifyContent: 'top',
    },
    loadingContainer:{
        flex: 1,
        backgroundColor: '#ecfaeb'
    },
    finalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#679436',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 20,
        marginBottom: 5,
    },
    finalSubtitle: {
        fontSize: 16,
        color: '#679436',
        marginLeft: 50,
        marginRight: 50,
    },
    loadingText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#679436',
        paddingBottom: 20,
        paddingTop: 50,
        paddingLeft: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#679436',
        paddingTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#679436',
        padding: 20,
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
    task: {
        fontSize: 14,
        color: '#679436',
    },
    modalButton: {
        backgroundColor: '#ecfaeb',
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 50,
        marginLeft:50,
        marginRight:50,
        borderColor: '#679436',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonRed: {
        backgroundColor: '#faebeb',
        borderRadius: 10,
        paddingTop:7,
        borderWidth: 2,
        marginTop: 30,
        marginLeft:75,
        marginRight:75,
        borderColor: '#a14242',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtitleRed: {
        fontSize: 16,
        color: '#a14242',
        paddingBottom: 5,
    },
    alert: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#679436',
        padding: 10,
        paddingTop: 30,
        marginLeft: 40,
    },
    image: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        width: 350,
        height: 350,
        borderRadius: 10,
    },
    loadingSubText: {
        fontSize: 16,
        color: '#679436',
        paddingLeft: 20,
    },
});

const touchGrass = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebf2fa',
        alignItems: 'center',
        justifyContent: 'top',
    },
    loadingContainer:{
        flex: 1,
        backgroundColor: '#ebf2fa',
    },
    loadingText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#427aa1',
        paddingBottom: 20,
        paddingTop: 50,
        marginLeft: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#427aa1',
        paddingTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#427aa1',
        padding: 20,
    },
    finalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#427aa1',
        marginLeft: 100,
        marginRight: 100,
        marginTop: 20,
        marginBottom: 5,
    },
    finalSubtitle: {
        fontSize: 16,
        color: '#427aa1',
        marginLeft: 50,
        marginRight: 50,
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
    task: {
        fontSize: 14,
        color: '#427aa1',
    },
    modalButton: {
        backgroundColor: '#ebf2fa',
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 50,
        marginLeft:50,
        marginRight:50,
        borderColor: '#427aa1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonRed: {
        backgroundColor: '#faebeb',
        borderRadius: 10,
        paddingTop:7,
        borderWidth: 2,
        marginTop: 30,
        marginLeft:75,
        marginRight:75,
        borderColor: '#a14242',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtitleRed: {
        fontSize: 16,
        color: '#a14242',
        paddingBottom: 5,
    },
    alert: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#427aa1',
        padding: 10,
        marginLeft: 40,
    },
    image: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        width: 350,
        height: 350,
        borderRadius: 10,
    },
    loadingSubText: {
        fontSize: 16,
        color: '#427aa1',
        paddingLeft: 20,
    },
});