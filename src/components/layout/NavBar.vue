<template>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        
        <router-link class="navbar-brand" :to="{ name: 'all-galleries' }">All Galleries</router-link>
        <router-link v-if="!user" class="navbar-brand" :to="{ name: 'register' }">Register</router-link>
        <router-link v-if="!user" class="navbar-brand" :to="{ name: 'login' }">Log in</router-link>
        <a class="navbar-brand" @click="onClickLogout" v-if="user">Log out</a>
        
    </nav>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    }
}
</script>

<style>
.navbar a {
    color: white !important;
}

.navbar .navbar-brand router-link:hover {
    color: #cc33ff;
}
</style>
