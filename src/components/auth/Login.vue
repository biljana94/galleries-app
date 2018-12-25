<template>
    

    <form @submit.prevent="onSubmitForm">
        <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>

        <div class="form-group">
            <label>Email</label>
            <input 
                type="text" 
                class="form-control" 
                placeholder="Enter email" 
                autofocus="" 
                v-model="email"
            >
        </div>

        <div class="form-group">
            <label>Password</label>
            <input 
                type="password" 
                class="form-control" 
                placeholder="Enter password" 
                v-model="password"
            >
        </div>
        
        <button class="btn btn-dark" type="submit">Log in</button>
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
