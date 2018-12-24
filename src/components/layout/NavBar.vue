<template>

    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <!-- <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        <a class="nav-item nav-link" href="#">Features</a>
        <a class="nav-item nav-link" href="#">Pricing</a>
        <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> -->
        <router-link v-if="!user" class="navbar-brand" :to="{ name: 'login' }">
            Log in
        </router-link>
        <router-link class="navbar-brand" :to="{ name: 'all-galleries' }">
            All Galleries
        </router-link>
        <a class="navbar-brand" @click="onClickLogout" v-if="user">
            Log out
        </a>
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
</style>
