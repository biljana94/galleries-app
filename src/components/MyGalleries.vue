<template>
    <div>
        <h3>My Galleries</h3>

        <div
        v-if="galleries.length"
        v-for="gallery in galleries"
        :key="gallery.id">
            <p>{{gallery.title}}</p>
            <p>{{gallery.description}}</p>
            <p>Created at: {{gallery.created_at}}</p>
            <img v-if="gallery.images[0]" :src="gallery.images[0].url">
        </div>

        <button v-if="next_page_url" @click="loadMore">Load More</button>

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
        }
    }
}
</script>

<style>

</style>
