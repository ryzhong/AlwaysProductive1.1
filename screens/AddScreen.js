import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
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
        favs: ["Make Bed","Eat Breakfast"]
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

    renderFavs = (favItem) => {
        console.log(favItem)
        return (
            <View style={styles.favFeedItem}>
                <Ionicons name="md-heart" size={20} color="#FF0000"></Ionicons>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View>

                    <Text style={styles.favText}>{favItem}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{position: "absolute", top: 10, left: 10}}onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <Text style={{justifyContent: "center", fontSize: 20}}>Add New Challenges Today</Text>
                </View>


                <View style={styles.inputContainer}>
                    <Image source={require("../assets/ryanShoo.jpg")} style={styles.avatar}></Image>
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
                    <TouchableOpacity onPress={() => this.handleAddFav()}>
                        <Text style={styles.buttonText}>
                        <Ionicons name="md-heart" size={18} color="#FF0000"></Ionicons>   Add to Favorites
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleAddTask()}>
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
                        renderItem={({item}) => this.renderFavs(item)}
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
        marginTop: 3,
        marginLeft: 12,
        fontSize: 14,
        color: "#838899"
    }
})