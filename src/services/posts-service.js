import axios from "axios";

class Post {
    constructor() {
        this.post = axios.create({
        baseURL: "http://localhost:4000",
        withCredentials: true
        });
    }

    getAllPosts(){
        return this.post.get("/posts/").then( (response) => response.data);
    }
    getUserPosts(){
        return this.post.get("posts/user/posts").then( (response) => response.data);
    }

    getOnePost(postId){
        return this.post.get(`/posts/${postId}`).then( (response) => response.data);
    }

    createPost(post) {
        const { author, theme, city, country, textContent, makeThisHappend, userImage } = post;
        return this.post
          .post("/posts/create", { author, theme, city, country, textContent, makeThisHappend, userImage})
          .then(({ data }) => data);
    }

    updatePost(post, postId) {
    const { author, theme, city,country, textContent, makeThisHappend } = post;

    return this.post
        .put(`/${postId}/edit`, { author, theme, city,country, textContent, makeThisHappend})
        .then(({ data }) => data);
    }

    deletePost(post) {
        return this.post
          .delete('/posts/delete', post)
          .then(({data}) => data);
    }

    //COMMENTS ROUTES

    getAllComments(postId){
        return this.post
        .get(`/posts/${postId}/comments`).then( (response) => response.data);
    }

    createComment(postId, textContent) {
        console.log(textContent)  
        return this.post
          .post(`/posts/${postId}/create`, {textContent})
          .then(({ data }) => data);
    }

    updateComment(postId, comment, commentId) {
        const { textContent } = comment;
        return this.post
          .put(`/posts/${postId}/${commentId}/edit`, { textContent })
          .then(({ data }) => data);
    }

    deleteComment(comment, commentId) {
        return this.post
          .put(`/posts/comment/${commentId}/delete`)
          .then(({ data }) => data);
    }

}

const postService = new Post();

export default postService;