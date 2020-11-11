import { PostController } from "./post-controller.js";
import { PostService } from "./post-service.js";

export class PostModule{
    constructor({instagramClient}){
        this.service = new PostService({instagramClient});
        this.controller = new PostController({service:this.service});
    }
    get route(){
        return{
            router:this.controller.router,
            prefix:'/post'
        }
         
    }
}