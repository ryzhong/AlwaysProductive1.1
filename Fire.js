import FirebaseKeys from "./config"
import firebase from 'firebase'

class Fire {
    constructor() {
        !firebase.apps.length ? firebase.initializeApp(FirebaseKeys) : firebase.app();
    }

    addTask = async ({ text }) => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp).collection('tasks')
            docRef
                // .get()
                // .then((snapshot) => {
                //     let data = {}
                //     snapshot.forEach((doc) => {
                //         data.push(doc.data());
                //     })
                //     alert(data)
                //     return data
                // })
                // .then(data => {
                //     if (data.length === 0) {
                //         return {};
                //     }
                //     return data
                // })
                // .then(tasks => {
                //     tasks[text] = { challenge: text, completed: false }
                //     return tasks;
                // // })
                // .then(tasks => {
                // docRef
                .add(
                    { challenge: text, completed: false }
                )
                // .then( (docRef) => 
                //     docRef.get()
                //     .then((data) => {
                //         data.data()["id"] = docRef.id;
                //         return data;
                //     })
                // )
                // .then(doc => alert(doc))
                // })
                .then( (ref) => {
                    docRef.doc(ref.id).update({
                        id: ref.id
                    })
                    console.log(docRef)
                    return docRef
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
            let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp).collection('tasks');
            docRef.get()
                // .then(data => {
                //     if (data.data() === undefined) {
                //         return [];
                //     }
                //     return data.data().tasks
                // })
                .then((snapshot) => {
                    let data = [];
                    snapshot.forEach((doc) => {
                        data.push([doc.data().challenge, doc.data().completed, doc.data().id]);
                        // return doc.data();
                    })
                    return data;
                })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                })

        })
    }

    toggleCompleted = async (docID, complete) => {
        let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp).collection('tasks').doc(docID);
        // console.log(docRef.get())
        // return new Promise((res, rej) => {
           return docRef.update({
                completed: !complete
            })

        // })
    }

    deleteTask = async (docID) => {
        let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp).collection('tasks').doc(docID);
        docRef.delete()
        .catch(error => console.log(error))
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
        var dateStr = month + "_" + date + "_" + year;
        return dateStr;
    }
}

Fire.shared = new Fire();
export default Fire;