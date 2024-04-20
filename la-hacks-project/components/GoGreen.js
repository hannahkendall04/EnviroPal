import {StyleSheet, Text, View, Pressable} from 'react-native';
import Project from './Project.js';
import React, {useState, useEffect} from 'react';

const {GoogleGenerativeAI} = require('@google/generative-ai');
const API_KEY = 'AIzaSyCHKmY0gedI_RMoL4Si90iPosuDWc4BuXU';
const genAI = new GoogleGenerativeAI(API_KEY);

async function getProjectTitle() {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
  
    const prompt = "Give me a name for an individual project that anyone can do to better the environment. DO NOT INCLUDE BACK TICKS IN YOUR RESPONSE";

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
  
    const prompt = `Give me a one sentence description for an individual project that anyone can do to better the environment called ${title}. DO NOT INCLUDE BACK TICKS IN YOUR RESPONSE`;

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

export default function GoGreen({navigation}) {
    
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
        const project = await createProject();
        if (project) {
            setProject(project);
            setLoading(false);
        }
        else {
            setError(true);
        }
    };
        fetchProject();
    }, []);

    const description = "Select a project to get started!";

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.title}>Loading...</Text>
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
            <Text style={styles.title}>Go Green</Text>
            <Text style={styles.subtitle}>{description}</Text>
            <View>
                        <Pressable style={styles.projectContainer} 
                            onPress ={() => navigation.navigate("Project Page", 
                                {title: project.title, 
                                description: project.description,
                                pageName: "goGreen"})}>
                            <Project title={project.title} description={project.description} />
                        </Pressable>
            </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
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
    projectContainer:{
        width: 350,
        backgroundColor: '#679436',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    loadingContainer:{
        flex: 1,
        margin: 20,
    }
});