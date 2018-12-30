<template>
    <div>
        <div class="all-galleries">
            <div
                class="card text-center col-sm-5"
                v-if="galleries.length"
                v-for="gallery in galleries" 
                :key="gallery.id"
            >
                <div class="card-body">
                    
                    <router-link class="card-title" :to="{ name: 'gallery', params: { id: gallery.id } }">
                        <h4>{{ gallery.title }}</h4>
                    </router-link>
                    
                    <img class="card-img" v-if="gallery.images[0]" :src="gallery.images[0].url">
                    <small>Author: </small><br>
                    <router-link class="card-text author-name" v-if="gallery.user" :to="{ name: 'author-galleries', params: { id: gallery.user.id } }">
                        {{ gallery.user.first_name }} {{ gallery.user.last_name }}
                    </router-link>
                    <p class="card-text"><small>Created at: {{ gallery.created_at }}</small></p>
                </div>
            </div>
        </div>
        <div class="button center">
            <button class="btn btn-outline-dark" v-if="next_page_url" @click="loadMore">Load More...</button>
        </div>
    </div>
</template>

<script>
import galleriesService from './../services/galleries-service.js';

export default {
    name: 'AllGalleries',

    data() {
        return {
            galleries: [],
            page: 1,
            next_page_url: '',
            // term: '',
        }
    },

    created() {
        galleriesService.getAll()
            .then(response => {
                // console.log(response.galleries)
                this.galleries = response.data;
                this.next_page_url = response.next_page_url;
                // console.log(this.galleries)
            })
    },

    methods: {
        loadMore() {
            this.page++;
            galleriesService.getAll(this.page)
                .then(response => {
                    this.galleries = this.galleries.concat(response.data);
                    this.next_page_url = response.next_page_url;
                    // console.log(response.data);
                })
        },

    }
}
</script>

<style>
.all-galleries {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.all-galleries .card {
    border: 1px solid #343a40;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    /* height: 470px; */
    /* padding-bottom: 1rem;  */
}

.all-galleries .card .card-body .card-title, .card-text {
    color: #343a40;
}

.all-galleries .card .card-body .card-title, .author-name {
    text-decoration: underline;
}

.all-galleries .card .card-body img {
    margin: 0.7rem 0;
}

.all-galleries .card .card-body .card-text {
    font-size: 1.2rem;
}

.button {
    margin: 0 auto 4rem auto;
    text-align: center;
}
</style>
