import {StyleSheet, Text, View, Pressable} from 'react-native';
import Project from './Project.js';

export default function ProjectHome({navigation}) {
    const description = "Select a project to get started!";
    const projects = [
        {
          title: "Project 1",
          description: "This is the first project",
          tasks: ["Task 1", "Task 2", "Task 3"]
        },
        {
          title: "Project 2",
          description: "This is the second project",
          tasks: ["Task 1", "Task 2", "Task 3"]
        },
        {
          title: "Project 3",
          description: "This is the third project",
          tasks: ["Task 1", "Task 2", "Task 3"]
        }
      ]
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BeGreen</Text>
            <Text style={styles.subtitle}>{description}</Text>
            <View>
                {projects.map((project) => {
                    return (
                        <Pressable key={project.id} style={styles.projectContainer} 
                            onPress ={() => navigation.navigate("Project Page", 
                                {title: project.title, 
                                description: project.description,
                                tasks: project.tasks})}>
                            <Project title={project.title} description={project.description} />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
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
        paddingBottom: 20,
        paddingTop: 50,
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
    }
});