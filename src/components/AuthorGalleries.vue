<template>
    <div>
        <div class="author-galleries">
            <div class="card text-center col-sm-10 author-card"
                v-if="galleries.length"
                v-for="gallery in galleries"
                :key="gallery.id"
            >
                <div class="card-body">
                    <router-link class="card-title" :to="{ name: 'gallery', params: { id: gallery.id } }">
                        <h4 class="title">{{ gallery.title }}</h4>
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
.author-galleries {
    margin: 5rem auto 1rem auto;
    display: block;
}

.author-galleries .author-card {
    border: 1px solid #343a40;
    border-radius: 0.5rem;
    margin: 2.5rem 0;
}

.author-galleries .author-card .card-body .card-title .title {
    color: #343a40;
}

.button {
    margin: 0 auto 4rem auto !important;
    text-align: center;
}
</style>
