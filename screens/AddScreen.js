import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

export default class AddScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: "700" }}>Add Task </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require("../assets/ryanShoo.jpg")} style={styles.avatar}></Image>
                    <TextInput 
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex : 1 }}
                        placeholder="Add a task for today"
                    ></TextInput>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        top: 20,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    }
})