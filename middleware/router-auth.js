const protectedRoutes = [
    '/',
    '/mapview',
    '/filter',
    '/settings',
    '/createsale'
]

export default function ({store, redirect, route}) {
    if(store.state.user != null && (route.name == 'login' || route.name == 'register')) {
        return redirect('/');
    } else if (store.state.user == null && isProtectedRoute(route)) {
        return redirect('/login');
    }
}

const isProtectedRoute = (route) => {
    if (protectedRoutes.includes(route.path)) {
        return true;
    }
}