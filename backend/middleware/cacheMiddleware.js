import { clearHash } from '../config/mongoose-redis.js'
export const clearCache = async (req, res, next) => {
  await next()
  clearHash(req.user)
}
