<template>
    <div>
        <form class="col-md-6" @submit.prevent="onSubmitRegister">
            <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            <div class="form-group">
                <label>First Name</label>
                <input
                    class="form-control" 
                    type="text" 
                    placeholder="First name" 
                    v-model="user.first_name"
                    required
                >
            </div>

            <div class="form-group">
                <label>Last Name</label>
                <input 
                    class="form-control" 
                    type="text" 
                    placeholder="Last name" 
                    v-model="user.last_name"
                    required
                >
            </div>

            <div class="form-group">
                <label>Email</label>
                <input 
                    class="form-control" 
                    type="email" 
                    placeholder="Email" 
                    v-model="user.email"
                    required
                >
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input 
                    class="form-control" 
                    type="password" 
                    placeholder="Password"
                    pattern="(?=.*\d).{8,}"
                    v-model="user.password"
                    required
                >
            </div>

            <div class="form-group">
                <label>Password Confirmation</label>
                <input 
                    class="form-control" 
                    type="password" 
                    placeholder="Confirm password" 
                    minlength="8"
                    v-model="user.password_confirmation"
                    required
                >
            </div>

            <div class="form-group">
                <div class="form-check">
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        value="" 
                        v-model="user.conditions"
                        required
                    >
                    <label 
                        class="form-check-label"
                    >
                        Agree to terms and conditions
                    </label>
                    <!-- <div class="invalid-feedback">
                        You must agree before submitting.
                    </div> -->
                </div>
            </div>

            <button type="submit" class="btn btn-outline-dark">Register</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Register',

    data() {
        return {
            user: {}
        }
    },

    methods: {
        ...mapActions(['register']),

        onSubmitRegister() {
            // console.log(this.user)
            this.register(this.user);
        }
    }
}
</script>

<style>
form {
    margin: 0 auto;
}

form h1 {
    padding-top: 2rem;
}
</style>
