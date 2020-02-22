import FirebaseKeys from "./config"
import firebase from 'firebase'


class Fire {
    constructor() {
        !firebase.apps.length ? firebase.initializeApp(FirebaseKeys) : firebase.app();
    }

    uploadPhotoAsync = async (uri, fileName) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let uploadTask = firebase
                .storage()
                .ref('images/' + fileName)
                .put(file)

            uploadTask.on(
                'state_changed',
                (snapshot) => { },
                error => {
                    rej(error);
                },
                async () => {
                    const url = await uploadTask.snapshot.ref.getDownloadURL();
                    res(url);
                }
            )

        })
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
                .then((ref) => {
                    docRef.doc(ref.id).update({
                        id: ref.id
                    })
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

    deleteTask = async (docID) => {
        let docRef = this.firestore.collection('users').doc(this.uid).collection('date').doc(this.timestamp).collection('tasks').doc(docID);
        docRef.delete()
            .catch(error => console.log(error))
    }

    addFav = async (favs, task) => {
        favs.push(task);
        let uniqueFavs = [...new Set(favs)]
        this.updateFav(uniqueFavs)
    }

    deleteFav = async (favs, task) => {
        let filteredFavs = favs.filter(ele => ele !== task)
        this.updateFav(filteredFavs)
    }

    updateFav = async (favs) => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid)
            docRef
                .update({ favs })
                .then(ref => res(ref))
                .catch(err => rej(err))
        })
    }

    addGoal = async (goals, task) => {
        goals.push(task);
        let uniqueGoals = [...new Set(goals)]
        this.updateGoal(uniqueGoals)
    }

    deleteGoal = async (goals, task) => {
        let filteredGoals = goals.filter(ele => ele !== task)
        this.updateGoal(filteredGoals)
    }

    updateGoal = async (goals) => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid)
            docRef
                .update({ goals })
                .then(ref => res(ref))
                .catch(err => rej(err))
        })
    }

    deleteCompleted = async (completed, goal) => {
        let filteredCompleted = completed.filter(ele => ele !== goal)
        this.updateCompleted(null, filteredCompleted)
    }

    updateCompleted = async (goals, completed, goal) => {
        return new Promise((res, rej) => {
            if(goal) {
                this.deleteGoal(goals, goal)
                completed.push(goal);
            }
            let uniqueCompleted = [...new Set(completed)]
            console.log('completed', uniqueCompleted)
            let docRef = this.firestore.collection('users').doc(this.uid)
            docRef
                .update({completed: uniqueCompleted})
                .then(ref => res(ref))
                .catch(err => rej(err))
        })
    }

    getFavs = async () => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid)
            docRef
                .get()
                .then(data => {
                    data.data().favs
                })
                .then(favs => res(favs))
                .catch(err => rej(err))
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

    createUser = async user => {
        let remoteUri = null
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                avatar: null,
                favs: [],
                goals: [],
                completed: []
            })

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`)

                db.set({ avatar: remoteUri }, { merge: true })
            }
        } catch (error) {
            alert("Error: ", error)
        }
    }

    getUserInfo = async () => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid)
            docRef.get()
                .then(data => data.data())
                .then(info => {
                    return { name: info.name, email: info.email, avatar: info.avatar, favs: info.favs, goals: info.goals, completed: info.completed }
                })
                .then(info => {
                    res(info)
                })
                .catch(error => rej(error))
        })
    }

    updateUserInfo = async (info) => {
        return new Promise((res, rej) => {
            let docRef = this.firestore.collection('users').doc(this.uid)
            docRef.update({
                name: info.name,
                email: info.email,
                avatar: info.avatar
            })
                .then(ref => {
                    res(ref)
                })
                .catch(err => {
                    rej(err)
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
        var dateStr = month + "_" + date + "_" + year;
        return dateStr;
    }
}

Fire.shared = new Fire();
export default Fire;