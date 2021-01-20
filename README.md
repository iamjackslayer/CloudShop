# CloudShop - e-Commerce Platform

## View live site
http://cloudshop-dev.ap-southeast-1.elasticbeanstalk.com


## Features

- Product reviews and ratings
- Carousel to display top products
- Product pagination
- Product search by keywords
- Shopping cart
- User profile with orders
- Admin product management
- Admin user management
- Admin order details management
- 4-step checkout process (login, shipping, payment method, submit order)
- Paypal integration for payment
- Database seeder (products and users)

## Usage

### ES modules in Node

Make sure to have Node v14.6+ or add the "--experimental-modules" flag when running the server.js

## Env variables

```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb uri
JWT_SECRET = 'anything'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# To run frontend (port 3000) and backend (port 5000)
npm run dev

# To run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build (for deployment to heroku, no need to build frontend as there is heroku postbuild script that builds on the heroku instance)
npm run build
```

### Seed database

To add sample users and products

```
# To import data
npm run data:import

# To remove data
npm run data:destroy
```

```
Sample User Logins (refer to backend/data/users.js)
admin@cloushop.com (Admin)
123456

jos@cloudshop.com (User)
123456

laurel@cloudshop.com (User)
123456
```

## View live site
http://cloudshop-dev.ap-southeast-1.elasticbeanstalk.com
