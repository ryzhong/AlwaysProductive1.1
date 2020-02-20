import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, statusBar, StatusBar, Dimensions, Keyboard } from 'react-native'

const screen = Dimensions.get('window')

export default class AlarmScreen extends React.Component {
    state = {
        remainingSecs: null,
        mins: null,
        secs: null,
        started: false,
        interval: null
    }

    onChanged(time, num) {
        console.log(time, num)
        num = num.replace(/[^0-9]/g, '')
        if (time === "min") {
            this.setState({ ...this.state, mins: num })
        }
        if (time === "sec") {
            this.setState({  ...this.state, secs: num })
        }
    }

    formatNum(num) {
        return `0${num}`.slice(-2);
    }

    getTimeLeft(time) {
        console.log(time)
        if(time === null) {
            return {mins: '00', secs: '00'};
        }
        const mins = Math.floor(time / 60);
        console.log(mins)
        const secs = time - (mins * 60);
        console.log(this.formatNum(mins), this.formatNum(secs))
        return { mins: this.formatNum(mins), secs: this.formatNum(secs)}
    }

    setRemainingSecs() {
        let remainingSecs = (Number(this.state.mins) * 60) + Number(this.state.secs)
        this.setState({  ...this.state, remainingSecs })
        Keyboard.dismiss();
    }

    updateRemainingSecs(time) {
        if(time === 0) {
            clearInterval(this.state.interval)
        }
        this.setState({  ...this.state, remainingSecs: time })
    }

    toggle() {
        this.setState({ started: !this.state.started }, () => {
            this.startTimer()
        })
    }

    reset() {
        this.setRemainingSecs();
    }

    startTimer() {
        // let interval = null;
        let interval;
        if (this.state.started) {
            interval = setInterval(() => {
                this.updateRemainingSecs(this.state.remainingSecs - 1)
            }, 1000)
            this.setState({interval})
        } else if (!this.state.started || this.state.remainingSecs === 0) {
            console.log('im suppose to stop', interval)

            clearInterval(this.state.interval)
        }
        return () => clearInterval(interval)
    }

    render() {
        let { mins, secs } = this.getTimeLeft(this.state.remainingSecs);
        console.log('rendering', mins, secs)
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.setTimer}>
                    <TextInput
                        style={styles.asktimeInput}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={(num) => this.onChanged("min", num)}
                        value={this.state.mins}
                    >
                    </TextInput>
                    <Text style={{fontSize: 20}}>mins</Text>
                    <TextInput
                        style={styles.asktimeInput}
                        keyboardType='numeric'
                        maxLength={2}
                        onChangeText={(num) => this.onChanged("sec", num)}
                        value={this.state.secs}
                    >
                    </TextInput>
                    <Text style={{fontSize: 20}}>secs</Text>
                    <TouchableOpacity onPress={() => this.setRemainingSecs() }>
                        <Text style={styles.setButton}>Set Timer</Text>
                    </TouchableOpacity>
                    {/* <Text>{mins}:{secs}</Text> */}
                </View>
                <View style={styles.setTimer}>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength={3}
                        // onChangeText={(num) => this.onChanged("min", num)}
                        value={mins}
                    >
                    </TextInput>
                    <Text style={styles.colons}>:</Text>
                    <TextInput
                        style={styles.timeInput}
                        keyboardType='numeric'
                        maxLength={2}
                        // onChangeText={(num) => this.onChanged("sec", num)}
                        value={secs}
                    >
                    </TextInput>
                    {/* <Text>{mins}:{secs}</Text> */}
                </View>
                <View style={styles.timerLabel}>
                    <Text style={styles.timerText}>M</Text>

                    <Text style={styles.timerText}>S</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.toggle()}>
                            {this.state.started ? "Pause" : "Start"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.reset()}>
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
        top: 40,
        flex: 1,
        alignItems: "center"
    },
    setTimer: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: screen.width / 4,
        marginRight: screen.width / 4,
    },
    timerLabel: {
        flexDirection: "row",
        marginTop: 1,
        justifyContent: "space-between"
    },
    timerText: {
        marginLeft: screen.width / 6,
        marginRight: screen.width / 6
    },
    asktimeInput: {
        height: 30,
        width: 40,
        borderWidth: 1,
        borderColor: "#000000",
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        textAlign: "right",
        padding: 3,
    },
    timeInput: {
        // height: 100,
        // width: 100,
        // borderWidth: 1,
        borderColor: "#000000",
        marginLeft: 10,
        marginRight: 10,
        fontSize: 100,
        textAlign: "right",
        padding: 3,
    },
    colons: {
        fontSize: 100
    },
    buttons: {
        // flexDirection: "row"
    },
    button: {
        marginTop: 20,
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
    },
    setButton: {
        width: screen.width / 4,
        // height: screen.height / 10,
        backgroundColor: "#E9446A",
        borderWidth: 3,
        fontSize: 20, 
        marginLeft: 30,
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center"
    }
})