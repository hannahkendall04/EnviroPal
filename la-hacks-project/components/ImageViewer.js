import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ source }) {
    return (
        <Image source={source} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 18,
    }
});