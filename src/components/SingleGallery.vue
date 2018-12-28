<template>
    <div>
        <h2>{{ gallery.title }}</h2>
        <p>{{gallery.description}}</p>
        <p v-if="gallery.user">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
        <div v-for="image in gallery.images" :key="image.id">
            <img :src="image.url">
        </div>
        <p>{{gallery.created_at}}</p>

    </div>
</template>

<script>
import galleriesService from './../services/galleries-service.js';

export default {
    name: 'SingleGallery',

    data() {
        return {
            gallery: {}
        }
    },

    beforeRouteEnter(to, form, next) {
        galleriesService.get(to.params.id)
            .then(response => {
                next(vm => {
                    // console.log(response)
                    vm.gallery = response;
                })
            })
    },
}
</script>

<style>

</style>
