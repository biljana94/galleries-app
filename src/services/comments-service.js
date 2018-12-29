import http from './http-service.js';

class CommentsService {
    //id - parametar za gallery.id, content - text komentara
    addComment(id, content) {
        return http.post(`galleries/${id}/comments`, { content })
            .then(({ data }) => data)
    }

    //brisanje komentara
    removeComment(id) {
        return http.delete(`comments/${id}`);
    }
}

const commentsService = new CommentsService();
export default commentsService;
