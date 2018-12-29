<template>
    
    <div class="comment-form">
        <h5>Add Comment</h5>
        <div class="form-group">
            <textarea 
                class="form-control"
                v-model="content"
                @keydown.enter.prevent="onSubmitAddComment"
                maxlength="1000"
                required        
            ></textarea>
        </div>
            <!-- <div v-if="errors.body">
                <form-error>{{ errors.body[0]}}</form-error>
        </div> -->
    </div>

</template>

<script>
import commentsService from './../../services/comments-service.js';

export default {
    name: 'AddComment',

    //kroz props smo poslali iz roditelj komponente(singleGallery.vue) niz komentara u koji smo da ubacujemo nas komentar
    // props: {
    //     comments: {
    //         type: Array
    //     }
    // },

    data() {
        return {
            content: '',
        }
    },

    methods: {
        onSubmitAddComment() {
            console.log(this.content)
            if(this.content) {
                this.$emit('submitComment', this.content);
                this.content = ''; //ispraznili smo textareu
            }
        },

    }
}
</script>

<style>

</style>
