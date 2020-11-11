export class PostService{
    constructor({instagramClient}){
        this.ic = instagramClient;
    }
    async getPostList() {
        return new Promise((resolve, reject) => {
            const userFeed = this.ic.instagram.feed.user(this.ic.user.pk);
            userFeed.items().then((myPostsFirstPage) => {
               resolve(myPostsFirstPage);
            });
        });
    }
}