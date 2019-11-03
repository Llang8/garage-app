import Vue from 'vue';
import { auth, db } from "../plugins/firebase";
import Cookie from 'js-cookie';
import JWTDecode from 'jwt-decode';
import cookieparser from 'cookieparser';
import axios from 'axios';

export const state = () => ({
    user: null,
    filterSettings: {
        location: 'Chicago, Illinois',
        distance: 50,
        sortBy: 'distance',
        categories: []
    },
    sales: []
})

export const mutations = {
    setUser (state, account) {
        console.log(account);
        state.user = account;
    },
    setSales (state, payload) {
        state.sales = payload;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (process.server && process.static) return;
        if (!req.headers.cookie) return;
    
        const parsed = cookieparser.parse(req.headers.cookie);
        const accessTokenCookie = parsed.access_token;
    
        if (!accessTokenCookie) return;
    
        const decoded = JWTDecode(accessTokenCookie);
    
        if (decoded) {
          commit("setUser", {
            uid: decoded.user_id,
            email: decoded.email,
            displayName: decoded.displayName
          });
        }
    },
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
    getSales({commit, context}, payload) {
        return new Promise ((resolve, reject) => {
            db.collection('sales').limit(10).get().then((snapshot) => {
                let data = []
                console.log(snapshot);
                snapshot.docs.forEach((doc) => {

                    data.push({id: doc.id, ...doc.data()})
                })
                commit('setSales', data);
                resolve();
            })

            
        });
    }
}