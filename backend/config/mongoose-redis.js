import mongoose from 'mongoose'
import connectRedis from './redis.js'

const redisClient = connectRedis()

const exec = mongoose.Query.prototype.exec

RegExp.prototype.toJSON = function () {
  return this.toString()
}

mongoose.Query.cache = function (options = {}) {
  this.useCache = true
  this.hashKey = JSON.stringify(options.key || '')
  return this // for chaining of Query instance
}

// Override the exec method
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments)
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name
  })

  const cacheValue = await redisClient.hgetAsync(this.hashKey, key)

  // If key exists in redis
  if (cacheValue) {
    console.log(`Cached`)
    const doc = JSON.parse(cacheValue)
    return Array.isArray(doc)
      ? doc.map(d => new mongoose.model(d))
      : new mongoose.model(doc)
  }
  // Key does not exists in redis -> proceed to cache it
  const res = exec.apply(this, arguments)

  await redisClient.hsetAsync(this.hashKey, key, JSON.stringify(res), 'EX', 15)
  console.log(`hsetAsync ${this.hashKey} ${key}`)
  return res
}

export const clearHash = hashKey => {
  redisClient.del(JSON.stringify(hashKey))
}
