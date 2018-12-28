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
            <!--pomocu slotova menjamo errore u zavisnosti koji je, kreni od prvog errora, pa ako je dobar baci sledeci error-->
            <!-- <form-error v-if="errors.email">
                {{ errors.email[0] }}
            </form-error> -->
        </div>

        <div class="form-group">
            <label>Password</label>
            <input 
                type="password" 
                class="form-control" 
                placeholder="Enter password" 
                v-model="password"
            >
            <!-- <form-error v-if="errors.password">
                {{ errors.password[0] }}
            </form-error> -->
        </div>
        
        <button class="btn btn-dark" type="submit">Log in</button>
    </form>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormError from './../partials/FormError.vue';

export default {
    name: 'Login',

    components: {
        FormError
    },

    data() {
        return {
            email: '',
            password: '',
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
    },

    // computed: {
    //     ...mapGetters({
    //         errors: 'getErrors'
    //     }),
    // }
}
</script>

<style>

</style>
