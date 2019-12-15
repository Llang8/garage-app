import { auth, db } from "../plugins/firebase";
import axios from 'axios';
import Cookie from 'js-cookie';

export const usersActions = {

    async signInWithEmail({ commit }, account) {
        try {
            // Login the user
            await auth.signInWithEmailAndPassword(account.email, account.password);
        
            // Get JWT from Firebase
            const token = await auth.currentUser.getIdToken();
            const { email, uid, displayName } = auth.currentUser;
        
            // Set JWT to the cookie
            Cookie.set("access_token", token);
        
            // Set the user locally
            commit("setUser", { email, uid, displayName });
        } catch (error) {
            throw error;
        }
    },
    signUpWithEmail({context}, payload) {
        return new Promise ((resolve, reject) => {
            auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    if (payload.username) {
                    
                        let user = auth.currentUser;
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
                    Cookie.remove('access_token');
                    resolve();
                }).catch((e) => {
                    reject(e.code + ': ' + e.message);
                })
        })       
    },
    sendPasswordReset({commit, context}, payload) {
        return new Promise ((resolve, reject) => {
            auth.sendPasswordResetEmail(payload.email)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    },
}

export const usersGetters = {
    userLocationArray: state => {
        if (state.position) {
            return [state.position.latitude, state.position.longitude];
        } else {
            return null;
        }
    },
}

export const usersMutations = {
    setUser (state, account) {
        state.user = account;
    },
    setUserPosition (state, position) {
        state.position = position.position;
    },
}