import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, StatusBar, Keyboard } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export default class GoalsScreen extends React.Component {
    state = {
        text: "",
        goals: [],
        completed: [],
        avatar: "../assets/ryanShoo.jpg",
        goalsDisplayed: true
    }

    unsubscribe = Fire.shared.firestore.collection('users')
        .onSnapshot((doc) => {
            this.update();
        })

    componentDidMount() {
        Fire.shared.getUserInfo()
            .then(user => {
                this.setState({ avatar: user.avatar, goals: user.goals, completed: user.completed })
            })
            .catch(error => {
                alert(error)
            })
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    update() {
        Fire.shared.getUserInfo()
            .then(user => { this.setState({ goals: user.goals, completed: user.completed }) })
            .catch(error => {
                alert(error)
            })
    }

    handleAddGoal = (goals, text) => {
        console.log(this.state.goals, text)
        Fire.shared.addGoal(goals, text)
            .then(ref => {
                this.setState({ text: "" });

                Keyboard.dismiss();
            })
            .catch(error => {
                alert(error)
            })
    }


    handleCompleteGoal = (goals, completed, goal) => {
        Fire.shared.updateCompleted(goals, completed, goal)
            .catch(error => {
                alert(error)
            })
    }

    renderGoals = (goalItem) => {
        return (
            <View style={styles.goalFeedItem}>
                <SimpleLineIcons name="target" size={20} color="#F10707"></SimpleLineIcons>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.goalText}>{goalItem}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => Fire.shared.updateCompleted(this.state.goals, this.state.completed, goalItem)}>
                    <Ionicons style={{ marginLeft: 10 }} name="ios-checkmark-circle-outline" size={28} color="#50FF03" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Fire.shared.deleteGoal(this.state.goals, goalItem)}>
                    <Ionicons style={{ marginLeft: 25 }} name="ios-close-circle-outline" size={28} color="#F10707" />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let pic = this.state.avatar ? { uri: this.state.avatar } : require("../assets/ryanShoo.jpg");
        let displayGoal = this.state.goalsDisplayed ? 1 : 0;
        let displayCompleted = this.state.goalsDisplayed ? 0 : 1;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#FFF"></Ionicons>
                    </TouchableOpacity>
                    <Text style={{ justifyContent: "center", fontSize: 20 }}>Goals</Text>
                </View>


                <View style={styles.inputContainer}>
                    <Image source={pic} style={styles.avatar}></Image>
                    <TextInput
                        // autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Add a Goal"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.handleAddGoal(this.state.goals, this.state.text)}>
                        <Text style={styles.buttonText}>
                            <SimpleLineIcons name="target" size={18}></SimpleLineIcons>   Add Goal
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.goalTitle}>
                    {/* <Text style={{fontSize: 25}}>Favorites</Text> */}
                    <TouchableOpacity>
                        <SimpleLineIcons
                            style={
                                {
                                    marginLeft: 40,
                                    marginRight: 40,
                                    borderBottomWidth: displayGoal
                                }
                            }
                            name="target"
                            size={40}>
                        </SimpleLineIcons>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            style={
                                {
                                    marginLeft: 40,
                                    marginRight: 40,
                                    borderBottomWidth: displayCompleted
                                }
                            }
                            name="md-trophy"
                            size={40}
                            color="#E4F51D">
                        </Ionicons>
                    </TouchableOpacity>

                </View>
                <View>
                    <FlatList
                        style={styles.goalFeed}
                        data={this.state.goals}
                        renderItem={({ item }) => this.renderGoals(item)}
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
        justifyContent: "center",
        // paddingHorizontal: 50,
    },
    buttonText: {
        fontSize: 16,
        backgroundColor: "#CECECE",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    goalTitle: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    goalTitleText: {
        marginLeft: 40,
        marginRight: 40,
        borderBottomWidth: 1
    },
    goalFeed: {
        marginTop: 20,
        marginHorizontal: 16
    },
    goalFeedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
        // justifyContent: "space-between"
    },
    goalText: {
        textTransform: "capitalize",
        marginTop: 3,
        marginLeft: 12,
        fontSize: 14,
        color: "#838899"
    }
})