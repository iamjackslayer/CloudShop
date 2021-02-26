module.exports = (userId, token) => {
  return {
    _id: userId,
    name: 'Admin',
    email: 'admin@cloudshop.com',
    isAdmin: true,
    token
  }
}
