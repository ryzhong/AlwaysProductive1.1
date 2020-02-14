import FirebaseKeys from "./config"
import firebase from 'firebase'

class Fire {
    constructor() {
        !firebase.apps.length ? firebase.initializeApp(FirebaseKeys) : firebase.app();
    }

    addTask = async ({ text }) => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp)
            docRef.get()
                .then(data => {
                    if (data.data() === undefined) {
                        return [];
                    }
                    return data.data().tasks
                })
                .then(tasks => {
                    tasks.push({challenge: text, completed: true});
                    return tasks;
                })
                .then(tasks => {
                    docRef
                        .set({
                            tasks
                        })
                })

                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                })
        })

    }

    getTasks = async () => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp);
            docRef.get()
                .then(data => {
                    if (data.data() === undefined) {
                        return [];
                    }
                    return data.data().tasks
                })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                })

        })
    }

    toggleCompleted() {
        let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp);
        return docRef.update({
            
        })
    }

    get firestore() {
            return firebase.firestore()
        }

    get uid() {
            return(firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth() + 1
        var year = d.getFullYear();
        var dateStr = month + "_" + date + "_" + year;
        return dateStr;
    }
}

Fire.shared = new Fire();
export default Fire;