<template>
    <nav class="navbar-dark fixed-top bg-dark">
        <div class="navbar navbar-expand-md container">
            <router-link class="navbar-brand" :to="{ name: 'galleries' }">
                <img
                    src="https://lh3.googleusercontent.com/8xS5foQRMN6VPxmxWe-BalwSKfCWZGz6cQQPIsRu44F_XBlU9br5APAHaUxq4vpifw=s180"
                    width="30"
                    height="30"
                >    
                All Galleries
            </router-link>
            <router-link v-if="!user" class="navbar-brand" :to="{ name: 'register' }">Register</router-link>
            <router-link v-if="!user" class="navbar-brand" :to="{ name: 'login' }">Log in</router-link>
            <router-link v-if="user" class="navbar-brand" :to="{ name: 'create' }">Create Gallery</router-link>
            <router-link v-if="user" class="navbar-brand" :to="{ name: 'my-galleries' }">My Galleries</router-link>
            <a class="navbar-brand" @click="onClickLogout" v-if="user">Log out</a>
        </div>
    </nav>

    

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
    font-size: 24px;
}

.navbar .navbar-brand {
    cursor: default;
}

.navbar .navbar-brand img {
    border-radius: 50%;
}

</style>
