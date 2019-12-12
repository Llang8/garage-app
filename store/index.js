import Vue from 'vue';
import { auth, db } from "../plugins/firebase";
import Cookie from 'js-cookie';
import JWTDecode from 'jwt-decode';
import cookieparser from 'cookieparser';
import axios from 'axios';
import { salesMutations, salesActions, salesGetters } from './sales';
import { usersMutations, usersActions, usersGetters } from './users';

export const state = () => ({
    user: null,
    filterSettings: {
        location: 'Chicago, Illinois',
        distance: 50,
        sortBy: 'Distance',
        categories: []
    },
    position: null,
    bookmarks: [],
    sales: []
})

export const mutations = {
    setBookmarks (state, payload) {
        state.bookmarks = payload;
    },
    addBookmark (state, payload) {
        let ids = state.bookmarks.map((bookmark) => {
            return bookmark.id;
        })
        if (!ids.includes(payload.id)) {
            state.bookmarks = [payload, ...state.bookmarks];
        }
    },
    removeBookmark (state, payload) {
        let i = state.bookmarks.map(bookmark => bookmark.bookmarkId).indexOf(payload.id);
        state.bookmarks.splice(i, 1);
    },
    setFilterSettings(state, payload) {
        state.filterSettings = payload;
    },
    ...salesMutations,
    ...usersMutations
}

export const getters = {
    sortBy: state => {
        return state.filterSettings.sortBy;
    },
    categories: state => {
        let categoryNames = state.filterSettings.categories.map(category => {
            return category.name;
        })
        return categoryNames;
    },
    ...salesGetters,
    ...usersGetters
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
    addBookmark({commit, context}, payload) {
        return new Promise ((resolve, reject) => {
            db.collection('user_bookmarks').add({
                uid: payload.uid,
                saleId: payload.saleId
            }).then((res) => {
                db.collection('sales').doc(payload.saleId).get()
                .then((snapshot) => {
                    if(snapshot.exists) {
                        commit('addBookmark', { id: snapshot.id, bookmarkId: res.id, ...snapshot.data() });
                    }
                    resolve(res);
                }).catch(e => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            })
        })
    },
    getBookmarks({commit, context}, payload) {
        return new Promise ((resolve, reject) => {
            db.collection('user_bookmarks').where('uid', "==", payload.uid).get()
            .then((snapshot) => {
                let sales = [];
                snapshot.forEach((doc) => {
                    sales.push({ id: doc.id, ...doc.data()});
                    db.collection('sales').doc(doc.data().saleId).get()
                        .then((snapshot) => {
                            if(snapshot.exists) {
                                commit('addBookmark', { id: snapshot.id, bookmarkId: doc.id, ...snapshot.data() });
                            }
                        }).catch(e => {
                            console.error(e);
                        });
                })
                resolve();
            })
            .catch(e => {
                reject(e);
            });
        })
    },
    removeBookmark({commit, context}, payload) {
        return new Promise ((resolve, reject) => {
            db.collection('user_bookmarks').doc(payload.id).delete()
            .then((res) => {
                commit('removeBookmark', { id: payload.id });
                resolve(res);
            }).catch((e) => {
                reject(e);
            })
        })
    },
    getPlaceSuggestions({commit, context}, payload) {
        return new Promise ((resolve, reject) => {
            let apiKey = 'AIzaSyD10tBIEsk0pFf1sn5igJmdyIuWTdMro8s';
            let input = encodeURI(payload.cityInput + ' ' + payload.stateInput);
            axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&sessionToken=${this.sessionToken}`)
                .then((res) => {
                    console.log(res);
                    resolve(res.predictions);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    ...salesActions,
    ...usersActions
}