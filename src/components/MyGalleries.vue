<template>
    <div>
        <div class="my-galleries">
            <h2>My Galleries</h2>
            <div
                class="card text-center col-sm-10 my-card"
                v-if="galleries.length"
                v-for="gallery in galleries"
                :key="gallery.id"
            >
                <div class="card-body">
                    <router-link class="card-title" :to="{ name: 'gallery', params: { id: gallery.id } }">
                        <h4 class="my-title">{{ gallery.title }}</h4>
                    </router-link>
                    <img class="card-img" v-if="gallery.images[0]" :src="gallery.images[0].url">
                    <p class="card-text"><small>Description: </small>{{gallery.description}}</p>
                    <p class="card-text"><small>Created at: {{gallery.created_at}}</small></p>
                    
                </div>
            </div>
            <div class="button">
                <button class="btn btn-outline-dark" v-if="next_page_url" @click="loadMore">Load More</button>
            </div>
        </div>
    </div>
</template>

<script>
import galleriesService from './../services/galleries-service.js';
import { mapGetters } from 'vuex'; //dovlacimo usera da bi mogli da prosledimo njegov id u funkciju kako bi se vratile njegove galerije

export default {
    name: 'MyGalleries',

    data() {
        return {
            galleries: [],
            page: 1,
            next_page_url: ''
        }
    },

    computed: {
        ...mapGetters({
            user: 'getUser'
        })
    },

    created() {
        // console.log(this.user.id)
        galleriesService.getUserGalleries(this.user.id, this.page)
            .then(response => {
                this.galleries = response.data;
                this.next_page_url = response.next_page_url;
            })
    },

    methods: {
        loadMore() {
            this.page++;
            galleriesService.getUserGalleries(this.user.id, this.page)
                .then(response => {
                    this.galleries = this.galleries.concat(response.data);
                    this.next_page_url = response.next_page_url;
                })
        },
    }
}
</script>

<style>
.my-galleries {
    margin: 5rem 0 1rem 0;
    text-align: center;
    display: block;
}

.my-galleries .my-card {
    border: 1px solid #343a40;
    border-radius: 0.5rem;
    margin: 2.5rem auto;
}

.my-galleries .my-card .card-body .card-title .my-title {
    color: #343a40;
    /* text-decoration: none; */
}
</style>
