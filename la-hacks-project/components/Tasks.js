import {View, Text, StyleSheet} from 'react-native';

export default function Tasks({tasks}) {
    if (tasks.length === 0) {
        return (
            <View>
                <Text style={styles.title}>No tasks available</Text>
            </View>
        )
    }
    else {
        {tasks.map((task) => {
            if (tasks.length != 0) {
            return (
                <Pressable onPress={() => {setModalVisible(true); setTask(task)}} key={task.id} style={styles.taskContainer}>
                    <Text style={styles.task}>{task}</Text>
                </Pressable>)}})}
}}