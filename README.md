[![Build Status](https://travis-ci.org/Johnsonojo/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/Johnsonojo/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/Johnsonojo/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/Johnsonojo/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0dff9f9c223093a97031/maintainability)](https://codeclimate.com/github/Johnsonojo/Fast-Food-Fast/maintainability)


Fast-Food-Fast is a food delivery service app for a restaurant.

# 
* *See Pivotal Tracker Project Management Board*:
https://www.pivotaltracker.com/n/projects/2196360
* *Fast-Food-Fast UI templates hosted on github pages*:
https://johnsonojo.github.io/Fast-Food-Fast/

* *Fast-Food-Fast Application hosted on heroku*:
https://fast-food-fast-2018.herokuapp.com/
## Table of Content
* [Features](#features)
* [Background](#background)
* [Installation](#installation)
* [Tests](#tests)
* [Endpoints](#endpoints)
* [Authors](#authors)
* [Acknowledgement](#acknowledgement)

## Features
Here are the list of features Fast-Food-Fast offers:

1. Users can create an account and login
2. Users can order for food on Fast-Food-Fast application
3. Admin can add, edit or delete the fast-food items
4. Admin and users can see a list of fast-food items
5. Admin user can See a list of orders
6. Admin can accept and decline orders
7. Admin can mark orders as completed
6. Admin and users can see a history of ordered food

## Background

We will build this application with the following technologies:

* [ECMAScript 6](https://en.wikipedia.org/wiki/ECMAScript)
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://en.wikipedia.org/wiki/Express.js)

## Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

* Install [NodeJs](https://nodejs.org/en/download/) and [PostgreSQL](https://www.postgresql.org/download/) on your computer.
* Clone the git repository using `git clone
  https://github.com/Johnsonojo/Fast-Food-Fast.git`
* Set up your environment variables in a `.env` file. Follow the pattern in the
  `/server/config/config.js` file.
* Create your development and test databases and add their credentials to the
  `.env` file.
* Run `npm install` on the command line to install all dependencies.
* Run `npm run db:setup` to setup and seed data into your database.
* Run `npm run start:dev` to start the server.
* Navigate to [localhost:8000/api/v1](localhost:8000/api/v1) in your browser to access the application.
* Open postman and verify all shortlisted endpoints.


## Tests

* Type `npm test` to RUN tests on the command-line.

## Endpoints
<table>
<tr><th>Http verbs</th><th>Endpoints</th><th>Functionality</th></tr>
<tr><td>POST</td><td>http:localhost:8000/api/v1/auth/signup</td><td> Register a user</td></tr>
<tr><td>POST</td><td>http:localhost:8000/api/v1/auth/login</td><td> Login a user</td></tr>
<tr><td>POST</td><td>http:localhost:8000/api/v1/orders</td><td> Users can place an order for a food</td></tr>
<tr><td>GET</td><td>http:localhost:8000/api/v1/users/:userId/orders</td><td> Get the order history for a
particular user</td></tr>
<tr><td>GET</td><td>http:localhost:8000/api/v1/orders</td><td> Admin can get all orders</td></tr>
<tr><td>GET</td><td>http:localhost:8000/api/v1/orders/:orderId</td><td>Admin can get a specific order</td></tr>
<tr><td>PUT</td><td> http:localhost:8000/api/v1/orders/:orderId </td><td> Admin can update the status of an order</td></tr>
<tr><td>GET</td><td>http:localhost:8000/api/v1/menu </td><td> Users and admin can get available menu</td></tr>
<tr><td>POST</td><td>http:localhost:8000/api/v1/menu </td><td> Admin can post a menu</td></tr>
</table>

## Authors

Johnson Ojo