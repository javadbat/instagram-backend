import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PostModule } from './src/post/post-module.js';
import { InstagramClient } from './src/instagram-client.js';
import { StoryModule } from './src/story/story-module.js';
class InstagramServer{
    constructor(port){
        this.app = new express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.modules = {};
        this.registerRoutes();
        this.instagramClient = new InstagramClient();
        const icProm = this.instagramClient.init();
        Promise.all([icProm]).then(()=>{
            this.registerModule("postModule", PostModule);
            this.registerModule("storyModule", StoryModule);
            this.app.listen(port,()=>{
                console.log(`mock service Rest running on http://localhost:${port}/`);
            });
        })
        icProm.catch((err)=>{
            console.error('instagram client initiate fail');
        });
        
    }
    registerModule(moduleName, module){
        this.modules[moduleName] = new module({instagramClient:this.instagramClient});
        const moduleRoute = this.modules[moduleName].route;
        if(moduleRoute){
            this.app.use(moduleRoute.prefix,moduleRoute.router);
        }
    }

    registerRoutes(){
        this.app.get('/',(request,response)=>{
            response.send('instagram API service');
        });
       
    }
}
export {InstagramServer};