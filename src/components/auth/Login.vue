<template>
    

    <form class="form-signin" @submit.prevent="onSubmitForm">
        <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>

        <label class="sr-only">Email address</label>
        <input type="text" class="form-control" placeholder="Email address" autofocus="" v-model="email">

        <label class="sr-only">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password">

        <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
    </form>




</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        ...mapActions(['login']),

        onSubmitForm() {
            this.login({
                email: this.email,
                password: this.password
            })
        },
    }
}
</script>

<style>

</style>
