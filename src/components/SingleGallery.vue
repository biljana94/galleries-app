<template>
    <div>
        <h2>{{ gallery.title }}</h2>
        <p>{{gallery.description}}</p>
        <p v-if="gallery.user">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
        <div v-for="image in gallery.images" :key="image.id">
            <img :src="image.url">
        </div>
        <p>{{gallery.created_at}}</p>

        <!--ovo treba da bude lista komentara-->
        <div
            v-if="comments.length"
            v-for="comment in comments"
            :key="comment.id"
        >
            <p>{{comment.user.first_name}} {{comment.user.last_name}}</p>
            <p>Comment: {{comment.content}}</p>
            <p>{{comment.created_at}}</p>
            <button @click="removeComment(comment.id)">Delete</button>
        </div>

        <add-comment
            v-if="user"
            :comments="comments"
            @submitComment="submitComment"
        ></add-comment>

    </div>
</template>

<script>
import galleriesService from './../services/galleries-service.js';
import commentsService from '../services/comments-service.js';
import { mapGetters } from 'vuex';
import AddComment from './partials/AddComment.vue';

export default {
    name: 'SingleGallery',

    components: {
        AddComment
    },

    data() {
        return {
            gallery: {},
            comments: []
        }
    },

    beforeRouteEnter(to, form, next) {
        galleriesService.get(to.params.id)
            .then(response => {
                next(vm => {
                    // console.log(response)
                    vm.gallery = response;
                    vm.comments = response.comments;
                })
            })
    },

    computed: {
        ...mapGetters({
            user: 'getUser'
        }),

        // currentUserId() {
        //     let id = Number(localStorage.getItem('id'));
        // }
    },

    methods: {
        submitComment(content) {
            //`galleries/${id}/comments` - ovo nam je ruta koju gadjamo, vec smo ulogovan user,
            //zato nam treba this.gallery.id da back-u kazemo kojoj galeriji dajemo komentar
            commentsService.addComment(this.gallery.id, content)
                .then(comment => {
                    this.comments = this.comments.concat(comment);
                })
        },

        removeComment(id) {
            if(this.user.id) {
                commentsService.removeComment(this.id)
                    .then(() => {
                        this.comments.slice(this.id, 1);
                    })
            }
        }
    }
}
</script>

<style>

</style>
