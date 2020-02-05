import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text>Home Screen</Text>
            </View>

        )
    }
}

//testing merge

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})