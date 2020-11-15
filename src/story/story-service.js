import IPA from 'instagram-private-api';
const { StoriesInsightsFeed} = IPA;
export class StoryService{
    constructor({instagramClient}){
        this.ic = instagramClient;
    }
    async getStoryList() {
        // return user feed story not user own story
        return new Promise((resolve, reject) => {
            this.ic.instagram.feed.reelsTray().request().then((stories)=>{
                resolve(stories);
            })
            
        });
    }

}