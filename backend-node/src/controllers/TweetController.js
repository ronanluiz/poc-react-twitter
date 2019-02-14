const Tweet = require('../models/Tweet');

module.exports = {
    async index(req, res) {
        // recupera os tweets ordenados em ordem decrescente
        const tweets = await Tweet.find({}).sort('-criadoEm');

        return res.json(tweets);
    },

    async store(req, res) {
        const tweet = await Tweet.create(req.body);

        // cria um evento para informar uma modificação
        req.io.emit('tweetCriado', tweet);

        return res.json(tweet);
    },

    async updateLike(req, res) {
        const tweet = await Tweet.findById(req.params.id);

        tweet.set({ likes: tweet.likes + 1});
    
        // cria um evento para informar uma modificação
        req.io.emit('likeAtualizado', tweet);

        await tweet.save();

        return res.json(tweet);
    }
};