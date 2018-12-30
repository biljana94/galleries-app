import http from './http-service.js';

class GalleriesService {
    getAll(page = 1) {
        return http.get('galleries', { params: { page } })
            .then(({ data }) => data)
    }

    get(id) {
        return http.get(`galleries/${id}`)
            .then(({ data }) => data)
    }

    create({ title, description, images }) {
        return http.post('galleries', {
            title,
            description,
            images
        });
            // .then(({ data }) => data)
    }

    //page=1 je za paginaciju, id za usera cije su galerije
    getUserGalleries(id, page = 1) {
        // console.log(id)
        return http.get('galleries', { params: { id, page } })
            .then(({ data }) => data)
    }

    getAuthorGalleries(id, page = 1) {
        // console.log(id)
        return http.get(`authors/${id}`, { params: { page } })
            .then(({ data }) => data)
    }

    // deleteG(id) {
    //     return http.delete(`galleries/${id}`);
    // }
}

const galleriesService = new GalleriesService();
export default galleriesService;
