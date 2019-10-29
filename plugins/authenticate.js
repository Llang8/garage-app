import { auth } from './firebase';

export default context => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if(user) {
                context.store.commit('setUser', JSON.parse(JSON.stringify(user)));
                return resolve();
            }
            return resolve();
        })
    })
}