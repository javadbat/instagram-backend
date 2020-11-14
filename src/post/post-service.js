import IPA from 'instagram-private-api';
const { IgApiClient, MediaCommentsFeed  } = IPA;
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

    async getMediaInfo(postId){
        return new Promise((resolve, reject) => {
            this.ic.instagram.media.info(postId).then((mediaInfo)=>{
                resolve(mediaInfo);
            }).catch((err)=>{
                console.error(err);
            })
        });
    }

    async getLikers(postId){
        return new Promise((resolve, reject) => {
            this.ic.instagram.media.likers(postId).then((likers)=>{
                resolve(likers);
            }).catch((err)=>{
                console.error(err);
            })
        });
    }
    async getComments(postId){
        return new Promise((resolve, reject) => {
            this.ic.instagram.feed.mediaComments(postId).items().then((comments)=>{
                resolve(comments);
            }).catch((err)=>{
                console.error(err);
            })
        });
    }
}