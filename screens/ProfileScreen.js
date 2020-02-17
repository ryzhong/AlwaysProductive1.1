import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'

export default class ProfileScreen extends React.Component {
    state = {
        user: {
            name: null,
            email: null,
            avatar: null
        }
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }
    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity style={styles.back}>
                    <Ionicons name="ios-arrow-round-back" size={32}></Ionicons>
                </TouchableOpacity>

                <View style={{ position: "absolute", top: 180, alignItems: "center", width: "100%" }}>
                    <TouchableOpacity style={styles.avatarPlaceholder}>
                        <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 6, marginleft: 2 }}></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <Text>Profile Screen</Text>
                        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back: {
        position: "absolute",
        top: 48,
        left: 25,
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})