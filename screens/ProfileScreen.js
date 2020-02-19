import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'
import Fire from '../Fire'

export default class ProfileScreen extends React.Component {
    state = {
        user: {
            name: null,
            email: null,
            avatar: null
        }
    }

    componentDidMount() {
        Fire.shared.getUserInfo()
            .then(user => {
                this.setState({ user })
            })
    }

    signOutUser = () => {
        firebase.auth().signOut();
    }
    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity style={styles.back} onPress={ () => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32}></Ionicons>
                </TouchableOpacity>

                <View style={{ position: "absolute", top: 120, alignItems: "center", width: "100%" }}>
                    <Text>Profile Screen</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={() => console.log(this.state.user.avatar)}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                        <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.info}>
                        <Text style={styles.moreInfo}>Name: {this.state.user.name}</Text>
                        <Text style={styles.moreInfo}>Email: {this.state.user.email}</Text>
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
        marginTop: 40,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    title: {
        marginBottom: 20
    },
    info: {
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    moreInfo: {
        marginTop: 15
    }
})