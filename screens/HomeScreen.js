import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SectionList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

var tasks = [
    "cook" , "clean", "gym"
]

export default class HomeScreen extends React.Component {
    // state = {
    //     email: "",
    //     displayName: ""
    // }

    // componentDidMount() {
    //     const {email, displayName} = firebase.auth().currentUser;

    //     this.setState( {email, displayName});
    // }

    // signOutUser = () => {
    //     firebase.auth().signOut();
    // }

    renderTasks = task => {
        return (
            <View style={styles.feedItem}>
                <Ionicons name="ios-aperture" size={24} color="#DDFB16" />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.task}>{task}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons style={{marginLeft: 10}} name="ios-checkmark-circle-outline" size={28} color="#50FF03" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons style={{marginLeft: 25}} name="ios-close-circle-outline" size={28} color="#F10707" />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Challenges You Accepted </Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={tasks} 
                    renderItem={({item}) => this.renderTasks(item)} 
                    keyExtractor={(item, index) => index} 
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
    }

})