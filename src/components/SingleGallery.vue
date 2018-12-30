<template>
    <div>
        <div class="single-gallery">
            <h1 class="title">{{ gallery.title }}</h1>
            <hr>
            <small>Author: </small>
            <router-link class="" v-if="gallery.user" :to="{ name: 'author-galleries', params: { id: gallery.user.id } }">
                {{ gallery.user.first_name }} {{ gallery.user.last_name }}
            </router-link>
            <p><small>Created at: {{gallery.created_at}}</small></p>
            <p><small>Description: </small>{{gallery.description}}</p>
            <!-- <div v-for="image in gallery.images" :key="image.id">
                <img :src="image.url">
            </div> -->

            <div>
                <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    controls
                    indicators
                    background="#ababab"
                    :interval="4000"
                    img-width="1024"
                    img-height="480"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                >

                    <!-- Slides with img slot -->
                    <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
                    <div v-for="image in gallery.images" :key="image.id">
                        <a :href="image.url" target="_blank">
                            <b-carousel-slide>
                                <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                                    :src="image.url" alt="image slot">
                            </b-carousel-slide>
                        </a>
                    </div>

                </b-carousel>
            </div>

            <!-- <div class="delete-gallery">
                <button 
                    class="btn btn-outline-danger"
                    @click="deleteGallery(gallery.id)"
                >
                    Delete Gallery
                </button>
            </div> -->

            <div class="comments-content">
                <h4>Comments</h4>
                <ul class="list-group list-group-flush">
                    <li 
                        class="list-group-item"
                        v-if="comments.length"
                        v-for="(comment, index) in comments"
                        :key="comment.id"
                    >
                        <div>
                        <p>Username: {{comment.user.first_name}} {{comment.user.last_name}}</p>
                        <p>{{comment.content}}</p>
                        <small>Created at: {{comment.created_at}}</small>
                        <br>
                        </div>
                        <button 
                            v-if="comment.user_id == currentUserId" 
                            class="btn btn-outline-danger" 
                            @click="removeComment(comment.id, index)"
                        >
                            Delete
                        </button>
                        
                    </li>
                    <!-- <li class="list-group-item">Dapibus ac facilisis in</li> -->
                </ul>
            </div>

            <!-- <div
                v-if="comments.length"
                v-for="comment in comments"
                :key="comment.id"
            >
                <p>{{comment.user.first_name}} {{comment.user.last_name}}</p>
                <p>Comment: {{comment.content}}</p>
                <p>{{comment.created_at}}</p>
            </div> -->

            <add-comment
                class="col-md-8"
                v-if="user"
                :comments="comments"
                @submitComment="submitComment"
            ></add-comment>
        </div>

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
            comments: [],
            slide: 0,
            sliding: null,
            userId: null,
            gallery_id: null //gallery id
        }
    },

    beforeRouteEnter(to, form, next) {
        galleriesService.get(to.params.id)
            .then(response => {
                next(vm => {
                    // console.log(response)
                    vm.gallery = response;
                    vm.comments = response.comments;
                    vm.userId = response.user_id;
                    // console.log(response.id)
                    vm.gallery_id = response.id;
                })
            })
    },

    computed: {
        ...mapGetters({
            user: 'getUser'
        }),

        currentUserId() {
            let id = Number(localStorage.getItem('id'));
            // console.log(Number(localStorage.getItem("id")))
            // console.log(id)
            return id ? id : 0;
        }
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

        removeComment(id, index) {
            commentsService.removeComment(id)
                .then(() => {
                    // console.log(index)
                    // console.log(this.comments)
                    this.comments.splice(index, 1);
                })
        },

        onSlideStart (slide) {
            this.sliding = true
        },

        onSlideEnd (slide) {
            this.sliding = false
        },

        // deleteGallery() {
            
        //     if(this.userId == this.currentUserId) {
        //         galleriesService.deleteG(this.$route.params.id)
        //             .then(() => {
        //                 this.$router.push({ name: 'my-galleries' });
        //             })
        //     }
        // }
    }
}
</script>

<style>
/* .single-gallery {
    margin: 0 auto;
    display: block;
    
} */
 .single-gallery {
     padding-top: 2rem; 
     text-align: center;
     margin-bottom: 8rem;
     color: #343a40;
 }

 .single-gallery .title {
     padding-bottom: 0.5rem;
     color: #cc33ff;
 }

 .single-gallery .comments-content {
     padding-top: 3rem;
 }

 /* .single-gallery .delete-gallery {
     margin-top: 1rem;
 } */


</style>
