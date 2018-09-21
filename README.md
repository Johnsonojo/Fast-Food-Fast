[![Build Status](https://travis-ci.org/Johnsonojo/Fast-Food-Fast.svg?branch=develop)](https://travis-ci.org/Johnsonojo/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/Johnsonojo/Fast-Food-Fast/badge.svg?branch=develop)](https://coveralls.io/github/Johnsonojo/Fast-Food-Fast?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0dff9f9c223093a97031/maintainability)](https://codeclimate.com/github/Johnsonojo/Fast-Food-Fast/maintainability)


Fast-Food-Fast is a food delivery service app for a restaurant.

# 
* *See Pivotal Tracker Project Management Board*:
https://www.pivotaltracker.com/n/projects/2196360
* *Fast-Food-Fast Application hosted on github pages*:
https://johnsonojo.github.io/Fast-Food-Fast/

## Table of Content
* [Features](#features)
* [Background](#background)
* [Installation](#installation)
* [Tests](#tests)
* [Endpoints](#endpoints)

## Features
Here are the list of features Fast-Food-Fast offers:

1. Users can create an account and login
2. Users can order for food on Fast-Food-Fast application
3. Admin can add, edit or delete the fast-food items
4. Admin can see a list of fast-food items
5. Admin user can See a list of orders
6. Admin can accept and decline orders
7. Admin can mark orders as completed
6. Users can see a history of ordered food

## Background

We will build this application with the following technologies:

* [ECMAScript 6](https://en.wikipedia.org/wiki/ECMAScript)
* [NodeJS](https://nodejs.org/en/)
* [ExressJS](https://en.wikipedia.org/wiki/Express.js)

## Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

* Install NodeJs on your computer. See guide [here](https://nodejs.org/en).
* Clone the git repository:
`git clone https://github.com/Johnsonojo/Fast-Food-Fast.git 
* Navigate into cloned repository and RUN `npm  install` on your command-line.
* Type `npm start:dev` `npm start` to run the application.
* Open postman and verify all shortlisted endpoints.

## Tests

* Type `npm test` to RUN tests on your command-line.

## Endpoints

<table>
<tr><th>*http verbs*</th><th>*Short-listed endpoints*</th><th> *Functionality* </th></tr>
<tr><td>GET</td><td>/orders</td><td> Gets all orders</td></tr>
<tr><td>GET</td><td>/orders/:orderId</td><td>Gets an order by id</td></tr>
<tr><td>POST</td><td>/orders </td><td> Adds a new order</td></tr>
<tr><td>PUT</td><td> /orders/:orderId </td><td> Updates the status of an order</td></tr>
</table>
