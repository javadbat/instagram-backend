import express from 'express';
export class PostController {
    constructor({service}) {
        this.router = express.Router();
        this.router.get('/list', this.getPostList.bind(this));
        this.router.get('/get-media-info', this.getMediaInfo.bind(this));
        this.router.get('/get-media-likes', this.getMediaLikes.bind(this));
        this.router.get('/get-media-comments', this.getMediaComments.bind(this));
        this.service = service;
    }
    async getPostList(req, res) {
        const result = await this.service.getPostList();
            res.status(200).send(result);

    }
    async getMediaInfo(req, res){
        const result = await this.service.getMediaInfo('2437838131344295650_39321231737');
        res.status(200).send(result);
    }
    async getMediaLikes(req, res){
        const result = await this.service.getLikers('2437838131344295650_39321231737');
        res.status(200).send(result);
    }
    async getMediaComments(req, res){
        const result = await this.service.getComments('2437838131344295650_39321231737');
        res.status(200).send(result);
    }
}