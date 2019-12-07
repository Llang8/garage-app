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
        sortBy: 'Distance',
        categories: []
    },
    position: null,
    bookmarks: [],
    sales: []
})

export const mutations = {
    setUser (state, account) {
        state.user = account;
    },
    setUserPosition (state, position) {
        state.position = position.position;
    },
    setSales (state, payload) {
        state.sales = payload;
    },
    addSale (state,payload) {
        state.sales = [payload, ...state.sales];
    },
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
    }
}

export const getters = {
    userLocationArray: state => {
        return [state.position.longitude, state.position.latitude];
    },
    sortBy: state => {
        return state.filterSettings.sortBy;
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
    getSales({commit, context, getters}, payload) {
        return new Promise ((resolve, reject) => {
            db.collection('sales').get().then((snapshot) => {
                let data = []
                let results = []
                snapshot.docs.forEach((doc, index) => {
                    let docData = doc.data()
                    data.push({id: doc.id, ...docData})

                    if (index >= snapshot.docs.length - 1) {
                        let userLoc = new google.maps.LatLng(getters.userLocationArray[1], getters.userLocationArray[0])
                        let access_token = 'AIzaSyD10tBIEsk0pFf1sn5igJmdyIuWTdMro8s';
                        let saleLocs = data.map((sale) => {
                            return new google.maps.LatLng(sale.geopoint[0], sale.geopoint[1]);
                        })
                        /* axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLoc.join(',')}&destinations=${saleLocs.join(';')}&key=${access_token}`)
                         */let service = new google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                              origins: [userLoc],
                              destinations: [...saleLocs],
                              travelMode: 'DRIVING',
                              unitSystem: google.maps.UnitSystem.IMPERIAL,
                            }, (res) => {
                                console.log(res);
                                res.rows[0].elements.forEach((dest, index) => {  
                                    
                                    results.push({
                                        distance: {
                                            text: dest.distance.text,
                                            value: dest.distance.value
                                        },
                                        ...data[index]
                                    })
                                })

                                results = results.sort((a, b) => {
                                    
                                    console.log(getters.sortBy);
                                    if(getters.sortBy === 'Distance') {
                                        if(a.distance.value > b.distance.value) {
                                            return 1;
                                        } else if (a.distance.value < b.distance.value) {
                                            return -1;
                                        } else {
                                            return 0;
                                        }
                                    } else if (getters.sortBy === 'Day: Soonest to Furthest') {
                                        return new Date(b.dates[0].date) - new Date(a.dates[0].date);
                                    } else if (getters.sortBy === 'Day: Furthest to Soonest') {
                                        return new Date(a.dates[0].date) - new Date(b.dates[0].date);
                                    }
                                })
                                console.log('TEST OVER')
                                commit('setSales', results);
                                resolve();
                            });
                        commit('setSales', data);
                        resolve();
                    }
                })
            })

            
        });
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
    }
}