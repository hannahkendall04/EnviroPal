import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import Project from './Project.js';
import React, {useState, useEffect} from 'react';
import config from '../config/MediaKeySession.json';

const {GoogleGenerativeAI} = require('@google/generative-ai');
const API_KEY = config.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

async function getProjectTitle() {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
  
    const prompt = "Give me a name for an individual project that anyone can do to get outside and enjoy nature. Make it unique and creative! DO NOT INCLUDE BACK TICKS IN YOUR RESPONSE";

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

async function getProjectDescription({title}) {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
  
    const prompt = `Give me a one sentence description for an individual project that anyone can do to get outside and enjoy nature ${title}. DO NOT INCLUDE BACK TICKS IN YOUR RESPONSE`;

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

async function createProject() {
    try{
        const title = await getProjectTitle();
        const description =  await getProjectDescription({title});
        return {title, description};
    }
    catch (e) {
        console.log("Error: ", e);
    }
}

export default function TouchGrass({navigation}) {
    
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [variable, setVariable] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
        const p = await createProject();
        const p2 = await createProject();
        const p3 = await createProject();
        if (p && p2 && p3) {
            setProjects([p, p2, p3]);
            setLoading(false);

        }
        else {
            setError(true);
        }
    };
        fetchProject();
    },  [ ,variable]);

    const description = "Select a project to get started!";

    if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.title}>Loading...</Text>
                    <Text style={styles.subtitle}>Self care projects to help you <Text style={{fontWeight: 'bold'}}>Touch Grass</Text> and reconnect with nature!</Text>
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
            <Text style={styles.title}>Touch Grass</Text>
            <Text style={styles.subtitle}>{description}</Text>
            <ScrollView>
                {projects.map((project) => {
                    return(
                        <Pressable style={styles.projectContainer} 
                            onPress ={() => navigation.navigate("Project Page", 
                                {title: project.title, 
                                description: project.description,
                                pageName: "touchGrass"})}>
                            <Project title={project.title} description={project.description} />
                        </Pressable>
                );})}
            </ScrollView>
            <Pressable style={styles.resetProjects} onPress={() => {
                setProjects([]);
                setLoading(true);
                setVariable(!variable);
            }}>
                <Text style={styles.resetProjectsText}>Reset Projects</Text>
            </Pressable>
        </View>
    );
    }
}

const styles = StyleSheet.create({
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
        paddingBottom: 10,
        paddingTop: 30,
    },
    subtitle: {
        fontSize: 16,
        color: '#427aa1',
        paddingBottom: 20,
    },
    projectContainer:{
        width: 350,
        backgroundColor: '#427aa1',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    loadingContainer:{
        flex: 1,
        backgroundColor: '#ebf2fa',
        paddingLeft:50,
        paddingRight:50,
    },
    resetProjects: {
        marginBottom: 10,
        backgroundColor: '#427aa1',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    resetProjectsText: {
        color: '#ebf2fa',
        fontSize: 16,
        fontWeight: 'bold',
    }
});