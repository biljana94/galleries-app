<template>
    <div>
        <h3>Create New Gallery</h3>

        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Title</label>
                <input 
                    v-model="gallery.title"
                    type="text" 
                    class="form-control" 
                    placeholder="Title"
                    minlength="2"
                    maxlength="255"
                    required
                >
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea 
                    v-model="gallery.description"
                    type="text" 
                    class="form-control" 
                    placeholder="Description"
                    maxlength="1000"
                >
                </textarea>
            </div>

            <div class="form-group" v-for="(num, index) in count" :key="index">
                <label>Image URL</label>
                <input
                    v-model="gallery.images[index].url"
                    type="url"
                    class="form-control"
                    placeholder="Image URL"
                    required
                >

                <button 
                    type="button"
                    class="btn btn-dark btn-sm"
                    @click="deleteInput(index)"
                    :disabled="count == 1"
                >
                    Delete
                </button>
            </div>

            <button
                type="button"
                class="btn btn-dark btn-sm"
                @click="addInput"
            >
                Add Url
            </button>
                
            <button type="submit" class="btn btn-dark">Create</button>
            <router-link class="btn btn-dark" :to="{ name: 'my-galleries' }">Cancel</router-link>

        </form>
    </div>    
</template>

<script>
import galleriesService from './../services/galleries-service.js';

export default {
    name: 'CreateGallery',

    data() {
        return {
            count: 1,
            gallery: {
                title: '',
                description: '',
                images: [{ url: '', order: 1 }],

            }
        }
    },

    methods: {
        onSubmit() {
            galleriesService.create(this.gallery)
                .then(() => {
                    this.$router.push({ name: 'my-galleries' });
                })
        },

        addInput() {
            this.count++;
            this.gallery.images.push({ url: '', order: this.count });
        },

        deleteInput(index) {
            if(this.count > 1) {
                this.count--;
                this.gallery.images.splice(index, 1);
            }
        }
    }
}
</script>

<style>

</style>
