import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default class AlarmScreen extends React.Component {
    state = {
        time: {
            hr: null,
            min: null,
            sec: null
        }
    }

    onChanged(time, num) {
        console.log(time, num)
        num = num.replace(/[^0-9]/g, '')
        if(time === "hr") {
            this.setState({hr: num.replace(/[^0-9]/g, '')})
        }
        if(time === "min") {
            this.setState({min: num.replace(/[^0-9]/g, '')})
        }
        if(time === "sec") {
            this.setState({sec: num.replace(/[^0-9]/g, '')})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Alarm Screen</Text>
                <View style={styles.setTimer}>
                    {/* <Text>HERE</Text> */}
                    <TextInput
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength = {2}
                        onChangeText = {(num)=> this.onChanged("hr", num)}
                        value={this.state.time.hr}
                    >
                        {this.state.time.hr}
                    </TextInput>
                    <Text style={styles.colons}>:</Text>
                    <TextInput 
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength = {2}
                        onChangeText = {(num)=> this.onChanged("min", num)}
                        value={this.state.time.min}
                    >
                        {this.state.time.hr}
                    </TextInput>
                    <Text style={styles.colons}>:</Text>
                    <TextInput 
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength = {2}
                        onChangeText = {(num)=> this.onChanged("sec", num)}
                        value={this.state.time.sec}
                    >
                        {this.state.time.hr}
                    </TextInput>
                </View>
                <View style={styles.timerLabel}>
                    <Text style={{ marginLeft: 77 }}>H</Text>

                    <Text style={{ marginLeft: 77 }}>M</Text>

                    <Text style={{ marginLeft: 77 }}>S</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}>
                        <Text>
                            Start
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text>
                            Pause
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text>
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: 200,
        flex: 1,
        alignItems: "center",
        // justifyContent: "center"
    },
    setTimer: {
        flexDirection: "row",
        marginTop: 40
    },
    timerLabel: {
        flexDirection: "row",
        marginTop: 1,
        right: 39
    },
    timeInput: {
        height: 60,
        width: 60,
        borderColor: "#000000",
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 45,
        textAlign: "right",
        padding: 3
    },
    colons: {
        fontSize: 40
    },
    buttons: {
        flexDirection: "row"
    },
    button: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        width: 50,
        height: 30,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9446A",
        borderRadius: 4,
        marginHorizontal: 30,
    }
})