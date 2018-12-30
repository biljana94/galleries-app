<template>
    <div>
        <h3>Create New Gallery</h3>

        <form class="col-md-8" @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Title</label>
                <input
                    class="form-control"
                    v-model="gallery.title"
                    type="text" 
                    placeholder="Title"
                    minlength="2"
                    maxlength="255"
                    required
                >
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea
                    class="form-control"
                    v-model="gallery.description"
                    type="text"  
                    placeholder="Description"
                    maxlength="1000"
                    rows="10"
                >
                </textarea>
            </div>

            <div class="form-group" v-for="(num, index) in count" :key="index">
                <label>Image URL</label>
                <input
                    class="form-control"
                    v-model="gallery.images[index].url"
                    type="url"
                    placeholder="Image URL"
                    maxlength="255"
                    required
                >

                <button
                    class="btn btn-danger btn-sm button-delete"
                    type="button"
                    @click="deleteInput(index)"
                    :disabled="count == 1"
                >
                    Delete
                </button>
            </div>

            <button
                class="btn btn-secondary btn-sm button-input"
                type="button"
                @click="addInput"
            >
                Add Url
            </button>

            <div class="row justify-content-md-center">  
                <button type="submit" class="btn btn-outline-dark">Create</button>
                <router-link class="btn btn-outline-danger" :to="{ name: 'my-galleries' }">Cancel</router-link>
            </div>
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
                    this.gallery = {};
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
h3 {
    text-align: center;
    margin-top: 5rem;
}

form {
    margin: 0 auto;
}

form .button-input {
    display: block;
    margin: 0 auto;
}

form .button-delete {
    display: block;
    margin: 0.5rem auto 0 auto;
}

form .row {
    margin-top: 1.5rem;
}

form .row .btn {
    margin: 0 0.5rem;
}
</style>
