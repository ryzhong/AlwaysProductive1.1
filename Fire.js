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
                .then( data => 
                    data.data().tasks
                )
                .then(tasks => {
                    tasks.push(text);
                    return tasks;
                })
                .then( tasks => {
                    docRef
                    .set({
                        tasks,
                        uid: this.uid,
                        date: this.timestamp
                    })
                    .then(ref => {
                        res(ref)
                    })
                    .catch(error => {
                        rej(error)
                    })
                })
        })

    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        var d = new Date();
        var date = d.getDate();
        var month = d.getMonth() + 1
        var year = d.getFullYear();
        var dateStr = month + "." + date + "." + year;
        return dateStr;
    }
}

Fire.shared = new Fire();
export default Fire;