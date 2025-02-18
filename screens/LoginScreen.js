import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation, KeyboardAvoidingView, ScrollView } from 'react-native'
import * as firebase from 'firebase'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {
        const { email, password } = this.state

        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        // LayoutAnimation.easeInEaseOut();
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset = {50}
                    // behavior={Platform.OS === "ios" ? "padding" : null}
                    behavior="padding" enabled>
                    <StatusBar barStyle="light-content"></StatusBar>

                    <Image
                        source={require('../assets/loginTop.png')}
                        style={{ height: 200, width: 270, marginTop: 50, alignSelf: "center" }}
                    ></Image>

                    <Image
                        source={require("../assets/loginBottom.png")}
                        style={{ position: "absolute", height: 180, width: 420, top: 130 }}
                    ></Image>
                    {/* 
                <Text style={styles.greeting}>
                    {`ALWAYS PRODUCTIVE!`}
                </Text> */}

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                            ></TextInput>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                            ></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={styles.signIn}>Sign in </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}>
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            New to this App?
                    </Text>

                        <Text
                            style={{ alignSelf: "center", fontWeight: "500", color: "#E9446A" }}
                            onPress={() => this.props.navigation.navigate("Register")}
                        >Sign Up </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </ScrollView>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        marginTop: 40
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 35,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    signIn: { color: "#FFF", fontWeight: "500" }
})