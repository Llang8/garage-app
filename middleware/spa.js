export default function({store, redirect, route, spa}) {
    const paths = ['/mapview']
    console.log('ROUTE: ' + route.path);
    if (paths.includes(route.path)) {
        console.log('AT ROUTE');
        // Will trigger the "traditional SPA mode"
        spa = true;
    }
    // Don't forget to call next in all cases!
    // Otherwise, your app will be stuck forever :|
    /* next() */
}