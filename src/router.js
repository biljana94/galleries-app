import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/auth/Login.vue';
import AllGalleries from './components/AllGalleries.vue';
import Register from './components/auth/Register.vue';
import SingleGallery from './components/SingleGallery.vue';
import CreateGallery from './components/CreateGallery.vue';
import MyGalleries from './components/MyGalleries.vue';
import AuthorGalleries from './components/AuthorGalleries.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/galleries' },
    { path: '/galleries', component: AllGalleries, name: 'galleries' },
    { path: '/galleries/:id', component: SingleGallery, name: 'gallery' },
    { path: '/login', component: Login, name: 'login', meta: { guest: true } },
    { path: '/register', component: Register, name: 'register', meta: { guest: true } },
    { path: '/create', component: CreateGallery, name: 'create', meta: { auth: true } },
    { path: '/my-galleries', component: MyGalleries, name: 'my-galleries', meta: { auth: true } },
    { path: '/authors/:id', component: AuthorGalleries, name: 'author-galleries' },
];
//Route::delete('/comments/{id}', 'CommentsController@destroy');

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
        return next({ name: 'galleries' });
    }

    //ako korisnik nije autentifikovan
    if(!isAuth && to.meta.auth) {
        return next({ name: 'login' });
    }

    return next();
});
