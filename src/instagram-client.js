import IPA from 'instagram-private-api';
import { credential } from './constant/credential.js';
const { IgApiClient  } = IPA;
export class InstagramClient {
    constructor() {
        this.instagram = new IgApiClient();
        this.instagram.state.generateDevice('init-seed-string');
        this.user = null;
    }
    init(){
        return new Promise((resolve, reject) => {
            const userPromise = this.login();
            Promise.all([userPromise]).then(([user])=>{
                this.user = user
                resolve();
            });
            userPromise.catch((err)=>{
                console.error(err);
            })
        })
        
    }
    login(){
        return new Promise((resolve, reject) => {
            this.instagram.simulate.preLoginFlow().then((val) => {
                this.instagram.account.login(credential.userName, credential.password).then((loggedinUser) => {
                    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
                    this.user = loggedinUser;
                    process.nextTick(async () => await this.instagram.simulate.postLoginFlow());
                    resolve(this.user);
                }).catch(err => {
                    //on login failed
                    reject(err);
                    console.error(err);
                })
            }).catch((err)=>{
                console.error(err);
            });
        })
        
    }
}