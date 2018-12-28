<template>
    <div>

        <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->


        <div
        v-if="galleries.length"
        v-for="gallery in galleries" 
        :key="gallery.id"
        >
            <router-link :to="{ name: 'gallery', params: { id: gallery.id } }">{{gallery.title}}</router-link>
            <p>Description: {{gallery.description}}</p>
            <!--router link ide ovde-->
            <p v-if="gallery.user">Author: {{gallery.user.first_name}} {{gallery.user.last_name}}</p>
            <p>Created at: {{gallery.created_at}}</p>
                
            <img v-if="gallery.images[0]" :src="gallery.images[0].url">
        </div>

        <button v-if="next_page_url" @click="loadMore">Load More</button>
        
    </div>
</template>

<script>
// import SingleGallery from './SingleGallery.vue';
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

</style>
