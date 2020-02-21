import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export default class AddScreen extends React.Component {
    state = {
        text: "",
        fav: null
    }

    handleAddTask = () => {
        // alert('handling')
        Fire.shared.addTask({ text: this.state.text.trim() })
            .then(ref => {
                this.setState({ text: "" });
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                alert(error)
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{position: "absolute", top: 10, left: 10}}onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <Text style={{justifyContent: "center"}}>Add New Challenges For Today!</Text>
                </View>


                <View style={styles.inputContainer}>
                    <Image source={require("../assets/ryanShoo.jpg")} style={styles.avatar}></Image>
                    <TextInput
                        // autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Add a task for challenge"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.handleAddTask()}>
                        <Text style={styles.buttonText}>
                        <Ionicons name="md-heart" size={24} color="#FF0000"></Ionicons>   Add to Favorites
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAddTask()}>
                        <Text style={styles.buttonText}>
                        <Ionicons name="md-checkmark" size={24} color="#77FF05"></Ionicons>   Add Task 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Testing</Text>
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
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        top: 20,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 25,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 50,
    },
    buttonText: {
        backgroundColor: "#CECECE",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
})