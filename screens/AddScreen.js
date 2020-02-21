import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, StatusBar, Keyboard } from 'react-native'
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
        favs: [],
        avatar: "../assets/ryanShoo.jpg",
    }

    componentDidMount() {
        Fire.shared.getUserInfo()
            .then(user => {
                this.setState({ avatar: user.avatar, favs: user.favs })
            })
            .catch(error => {
                alert(error)
            })
    }

    handleAddTask = (task) => {
        // alert('handling')
        Fire.shared.addTask({ text: task.trim() })
            .then(ref => {
                this.setState({ text: "" });
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                alert(error)
            })
    }

    handleAddFav = (favs, text) => {
        Fire.shared.addFav(favs, text)
            .then(ref => {
                this.setState({ text: "" });

                Keyboard.dismiss();
            })
            .catch(error => {
                alert(error)
            })
    }

    handleAddFavToTask = (favItem) => {
        this.handleAddTask(favItem)
    }

    renderFavs = (favItem) => {
        return (
            <TouchableOpacity style={styles.favFeedItem} onPress={() => this.handleAddFavToTask(favItem)}>
                <Ionicons name="md-heart" size={20} color="#FF0000"></Ionicons>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>

                        <Text style={styles.favText}>{favItem}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let pic = this.state.avatar ? { uri: this.state.avatar } : require("../assets/ryanShoo.jpg");
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} olor="#FFF"></Ionicons>
                    </TouchableOpacity>
                    <Text style={{ justifyContent: "center", fontSize: 20 }}>Add New Challenges Today</Text>
                </View>


                <View style={styles.inputContainer}>
                    <Image source={pic} style={styles.avatar}></Image>
                    <TextInput
                        // autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Add a task"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.handleAddFav(this.state.favs, this.state.text)}>
                        <Text style={styles.buttonText}>
                            <Ionicons name="md-heart" size={18} color="#FF0000"></Ionicons>   Add to Favorites
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAddTask(this.state.text)}>
                        <Text style={styles.buttonText}>
                            <Ionicons name="md-checkmark" size={18} color="#77FF05"></Ionicons>   Add Task
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.favoriteTitle}>
                    {/* <Text style={{fontSize: 25}}>Favorites</Text> */}
                    <Ionicons name="md-heart" size={30} color="#FF0000"></Ionicons>

                </View>
                <View>
                    <FlatList
                        style={styles.favFeed}
                        data={this.state.favs}
                        renderItem={({ item }) => this.renderFavs(item)}
                        keyExtractor={(item, index) => item}
                        showsVerticalScrollIndicator={false}
                    />
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
    back: {
        position: "absolute",
        top: 10,
        left: 20,
        height: 32,
        width: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
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
        fontSize: 16,
        backgroundColor: "#CECECE",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    favoriteTitle: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    favFeed: {
        marginHorizontal: 40
    },
    favFeedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    favText: {
        textTransform: "capitalize",
        marginTop: 3,
        marginLeft: 12,
        fontSize: 14,
        color: "#838899"
    }
})