import Vue from 'vue';
import { auth } from "../plugins/firebase";

export const state = () => ({
    user: null
})

export const mutations = {
    setUser (state, payload) {
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
                    resolve()
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