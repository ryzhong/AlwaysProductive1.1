import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

export default class AlarmScreen extends React.Component {
    state = {
        time: {
            hr: 0,
            min: 0,
            sec: 0
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Alarm Screen</Text>
                <View style={styles.setTimer}>
                    {/* <Text>HERE</Text> */}
                    <TextInput style={styles.timeInput}></TextInput>
                    <Text style={styles.colons}>:</Text>
                    <TextInput style={styles.timeInput}></TextInput>
                    <Text style={styles.colons}>:</Text>
                    <TextInput style={styles.timeInput}></TextInput>
                </View>
                <View style={styles.timerLabel}>
                    {/* <Text>HERE</Text> */}
                    <Text style={{marginLeft: 78}}>H</Text>
                    
                    <Text style={{marginLeft: 78}}>M</Text>
                    
                    <Text style={{marginLeft: 78}}>S</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        top: 250,
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
        right: 40
    },
    timeInput: {
        height: 60,
        width: 56,
        borderColor: "#000000",
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 45,
        textAlign: "right"
    },
    colons: {
        fontSize: 40
    }
})