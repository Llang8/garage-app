import Vue from 'vue';
import { auth } from "../plugins/firebase";

export const state = () => ({
    user: null,
    filterSettings: {
        location: 'Chicago, Illinois',
        distance: 50,
        sortBy: 'distance',
        categories: []
    }
})

export const mutations = {
    setUser (state, payload) {
        console.log(payload);
        state.user = payload;
    }
}

export const actions = {
    signInWithEmail({context}, payload) {
        return new Promise ((resolve, reject) => {
            auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e.code + ': ' + e.message);
                })
        })
    },
    signUpWithEmail({context}, payload) {
        return new Promise ((resolve, reject) => {
            auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    if (payload.username) {
                        let user = firebase.auth().currentUser;
                        user.sendEmailVerification();
                        user.updateProfile({
                            displayName: payload.username
                        }).then(() => {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                    /* resolve(); */
                }).catch((e) => {
                    reject(e.code + ': ' + e.message);
                })
        })
    },
    signOut({context}, payload) {
        return new Promise ((resolve, reject) => {
            auth.signOut()
                .then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e.code + ': ' + e.message);
                })
        })       
    }
}