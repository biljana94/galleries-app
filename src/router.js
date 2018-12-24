import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/auth/Login.vue';
import AllGalleries from './components/AllGalleries.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/all-galleries' },
    { path: '/all-galleries', component: AllGalleries, name: 'all-galleries', meta: { auth: true } },
    { path: '/login', component: Login, name: 'login', meta: { guest: true } },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;

//globalni guard
router.beforeEach((to, from, next) => {
    const isAuth = !!localStorage.getItem('token'); //pretvaramo token u boolean tip

    //ako je korisnik autentifikovan
    if(isAuth && to.meta.guest) {
        return next({ name: 'all-galleries' });
    }

    //ako korisnik nije autentifikovan
    if(!isAuth && to.meta.auth) {
        return next({ name: 'login' });
    }

    return next();
});
