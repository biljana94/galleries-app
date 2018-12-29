<template>
<div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        
        <router-link class="navbar-brand" :to="{ name: 'galleries' }">All Galleries</router-link>
        <router-link v-if="!user" class="navbar-brand" :to="{ name: 'register' }">Register</router-link>
        <router-link v-if="!user" class="navbar-brand" :to="{ name: 'login' }">Log in</router-link>
        <router-link v-if="user" class="navbar-brand" :to="{ name: 'create' }">Create Gallery</router-link>
        <router-link v-if="user" class="navbar-brand" :to="{ name: 'my-galleries' }">My Galleries</router-link>
        <a class="navbar-brand" @click="onClickLogout" v-if="user">Log out</a>
        
    </nav>

    

</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import galleriesService from './../../services/galleries-service.js';

export default {
    name: 'NavBar',

    methods: {
        ...mapActions(['logout']),

        onClickLogout() {
            this.logout();
        },
    },

    computed: {
        ...mapGetters({
            user: 'getUser'
        }),
    },

    // methods: {}
}
</script>

<style>
.navbar a {
    color: white !important;
}

.navbar .navbar-brand:hover {
    color: #cc33ff !important;
}

.navbar .navbar-brand {
    cursor: default;
}

</style>
