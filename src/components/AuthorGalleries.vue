<template>
    <div>
        <div
            v-if="galleries.length"
            v-for="gallery in galleries"
            :key="gallery.id"
        >
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
export default {
    name: 'AuthorGalleries',

    data() {
        return {
            galleries: [],
            page: 1,
            next_page_url: ''
        }
    },

    beforeRouteEnter(to, from, next) {
        galleriesService.getAuthorGalleries(Number(to.params.id)) //u ruti imam id autora i odatle izvlacim id, kastujem user.id
            .then(response => {
                // console.log(response)
                next(vm => {
                    vm.galleries = response.galleries;
                    vm.next_page_url = response.next_page_url;
                })
            })
    },

    methods: {
        loadMore() {
            this.page++;
            galleriesService.getAuthorGalleries(Number(to.params.id), this.page)
                .then(response => {
                    this.galleries = this.galleries.concat(response.galleries)
                    this.next_page_url = response.next_page_url;
                })
        }
    }
}
</script>

<style>

</style>
