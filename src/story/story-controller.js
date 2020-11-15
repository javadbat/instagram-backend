import express from 'express'
export class StoryController {
    constructor({service}) {
        this.router = express.Router();
        this.router.get('/list', this.getPostList.bind(this));
        this.service = service;
    }
    async getPostList(req, res) {
        const result = await this.service.getStoryList();
            res.status(200).send(result);

    }
}