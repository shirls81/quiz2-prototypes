'use strict';

var assert = require('assert');
var bcrypt = require('bcrypt');

var users = [];

function User(username, password) {
  var userExists = User.find(username);

  assert(!userExists, 'Username is already in use.');

  this.username = username;
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  users.push(this);
};

User.prototype.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
};

User.find = function(username){
    var foundUser = users.find(function(user){
      return user.username === username;
    });
return foundUser || null;

};

User.authenticate = function(username, password){
  var user = User.find(username);

  if (!user) { return false;}
  var validPassword = user.authenticate(password);

  if (!validPassword) {return false;}
  return user;
}

module.exports = User;
