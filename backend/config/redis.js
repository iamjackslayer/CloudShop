import bluebird from 'bluebird'
import redis from 'redis'
bluebird.promisifyAll(redis)

export default () => {
  const client = redis.createClient() // redis//:127.0.0.1:6379
  return client
}
