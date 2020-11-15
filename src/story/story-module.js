import { StoryController } from "./story-controller.js";
import { StoryService } from "./story-service.js";

export class StoryModule{
    constructor({instagramClient}){
        this.service = new StoryService({instagramClient});
        this.controller = new StoryController({service:this.service});
    }
    get route(){
        return{
            router:this.controller.router,
            prefix:'/story'
        }
         
    }
}