import FirebaseKeys from "./config"
import firebase from 'firebase'

class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys)
    }

    addTask = async ({text}) => {
        return new Promise((res, rej) => {
            this.firestore.collection("tasks").add({
                text,
                uid: this.uid
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
        
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }
}

Fire.shared = new Fire();
export default Fire;