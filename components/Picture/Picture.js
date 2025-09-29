import React, { useState, useEffect } from "react";
import { View, Button, Image, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    imageScroll: {
        marginTop: 10,
        paddingRight: 10,
    },
    imageThumbnail: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 8,
    },
});


export default function Picture({ date }) {
    console.log("date prop:", date); // Adicione esta linha
    const [images, setImages] = useState([]);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async() => {
        try {
            const stored = await AsyncStorage.getItem(`report-${date}`);
            if (stored) {
                const parsed = JSON.parse(stored);
                setImages(Array.isArray(parsed) ? parsed : []);
            }
        } catch (e) {
            console.log("Erro ao carregar imagens", e);
        }
    };

    const saveImages = async(newImages) => {
        try {
            await AsyncStorage.setItem(`report-${date}`, JSON.stringify(newImages));
        } catch (e) {
            console.log("Erro ao salvar imagens", e);
        }
    };

    const pickImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            const newImages = [
                ...images,
                ...result.assets.map((a) => a.uri),
            ];
            setImages(newImages);
            saveImages(newImages);
        }
    };
    return (
        <View style={styles.container}>
            <Button title="Adicionar imagens" onPress={pickImage} />
            <ScrollView
                horizontal
                style={styles.imageScroll}
                showsHorizontalScrollIndicator={false}
            >
                {images.map((uri, index) => (
                    <Image
                        key={index}
                        source={{ uri }}
                        style={styles.imageThumbnail}
                    />
                ))}
            </ScrollView>
        </View>
    );
}