const { createClient } = require("redis");

const redisClient = createClient({
    password: 'l3sTo7LfdJdkWHuZISYoBTU44qSNRhel',
    socket: {
        host: 'redis-15423.c330.asia-south1-1.gce.redns.redis-cloud.com',
        port: 15423
    }
});

(async () => {
    await redisClient.connect()
})()

redisClient.on('connect', () => {
    console.log("Redis client connected!")
})

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

//helper function for redis 
async function getOrSetCache(key, ex, cb) {
    return new Promise(async (resolve, reject) => {
        redisClient.get(key)
        .then(
            async (data) => {
                if (data != null) {
                    return resolve(JSON.parse(data)); //convert to json
                }
                cb()
                .then(async (freshData)=>{
                    await redisClient.setEx(key, ex, JSON.stringify(freshData)); //convert to string
                    resolve(freshData);
                })
                .catch((err)=>{
                    reject(err);
                })
            }
        )
        .catch((err) => {
            reject(err);
        }) 
    })
};


module.exports = {
    getOrSetCache: getOrSetCache,
    redisClient: redisClient
}