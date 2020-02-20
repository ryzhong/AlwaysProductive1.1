import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, statusBar, StatusBar, Dimensions } from 'react-native'

const screen = Dimensions.get('window')

export default class AlarmScreen extends React.Component {
    state = {
        remainingSecs: null,
        mins: null,
        secs: null,
        started: false
    }

    onChanged(time, num) {
        console.log(time, num)
        num = num.replace(/[^0-9]/g, '')
        if (time === "min") {
            this.setState({ min: num })
        }
        if (time === "sec") {
            this.setState({ sec: num })
        }
    }

    getTimeLeft(time) {
        const mins = Math.floor(time / 60);
        const secs = time - (mins * 60);
        return { mins, secs }
    }

    setRemainingSecs(remainingSecs) {
        this.setState({ remainingSecs })
    }

    toggle() {
        this.setState({ started: !this.state.started })
    }

    reset() {
        this.setState({ min: 0 })
    }

    startTimer() {
        let interval = null;
        if (this.state.started) {
            interval = setInterval(() => {
                this.setRemainingSecs(this.state.remainingSecs + 1)
            }, 1000)
        } else if (this.state.started && this.remainingSecs !== 0) {
            clearInterval(interval)
        }
    }

    render() {
        let { mins, secs } = this.getTimeLeft(this.state.remainingSecs);


        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.setTimer}>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={(num) => this.onChanged("min", num)}
                        value={mins}
                    >
                    </TextInput>
                    <Text style={styles.colons}>:</Text>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={(num) => this.onChanged("sec", num)}
                        value={secs}
                    >
                    </TextInput>
                </View>
                <View style={styles.timerLabel}>
                    <Text style={{ marginLeft: 77 }}>M</Text>

                    <Text style={{ marginLeft: 77 }}>S</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.toggle()}>
                            {this.state.started ? "Pause" : "Start"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
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
        top: 80,
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
        // flexDirection: "row"
    },
    button: {
        marginTop: 50,
        // marginLeft: 30,
        // marginRight: 30,
        width: screen.width / 2,
        height: screen.height / 4,
        borderWidth: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9446A",
        borderRadius: screen.width / 2,
        marginHorizontal: 30,
    },
    buttonText: {
        fontSize: 45
    }
})