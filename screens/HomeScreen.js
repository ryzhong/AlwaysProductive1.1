import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, SectionList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

import Fire from '../Fire'

const screen = Dimensions.get('window')

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        tasks: []
    }

    unsubscribe = Fire.shared.firestore.collection('users').doc(Fire.shared.uid).collection('date').doc(Fire.shared.timestamp).collection('tasks')
        .onSnapshot((doc) => {
            this.updateTasks();
        })


    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.updateTasks();

        this.setState({ email, displayName });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }


    updateTasks() {
        Fire.shared.getTasks()
            .then(tasks => { this.setState({ tasks }) })
            .catch(error => {
                alert(error)
            })
    }


    renderTasks = task => {
        let color = "ios-checkmark-circle-outline";
        if (task[1]) {
            color = 'ios-checkmark-circle'
        }
        return (
            <View style={styles.feedItem}>
                <Ionicons name="ios-aperture" size={24} color="#DDFB16" />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.task}>{task[0]}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => Fire.shared.toggleCompleted(task[2], task[1])}>
                    <Ionicons style={{ marginLeft: 10 }} name={color} size={28} color="#50FF03" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Fire.shared.deleteTask(task[2])}>
                    <Ionicons style={{ marginLeft: 25 }} name="ios-close-circle-outline" size={28} color="#F10707" />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        if(this.state.tasks.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Challenges You Accepted </Text>
                    </View>
    
                    <View>
                        <TouchableOpacity style={styles.noTasksText} onPress={ ()=> this.props.navigation.navigate('Add')}>
                            <Text style={{fontSize: 20, textAlign: "center"}}>Please add a new challenge by touching the + tab or here</Text>
                        </TouchableOpacity>
                    </View>
    
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Challenges You Accepted </Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={this.state.tasks}
                    renderItem={({ item }) => this.renderTasks(item)}
                    keyExtractor={(item, index) => item}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    task: {
        textTransform: "capitalize",
        marginTop: 3,
        marginLeft: 12,
        fontSize: 14,
        color: "#838899"
    },
    noTasksText: {
        top: screen.height/4, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#FFF",
        marginHorizontal: 30,
        borderRadius: 5,
        padding: 8,
        
    }

})