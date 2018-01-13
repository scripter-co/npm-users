# npm user manager

[![Travis](https://img.shields.io/travis/scripter-co/npm-users.svg)](https://travis-ci.org/scripter-co/npm-users) [![Codecov](https://img.shields.io/codecov/c/github/scripter-co/npm-users.svg)](https://codecov.io/gh/scripter-co/npm-users) [![npm](https://img.shields.io/npm/v/npm-users.svg)](https://www.npmjs.com/package/npm-users)

## About

`npm-users` is a package that allows you to have multiple npm users on the same machine. When you install the package, you will be able to run `npm-users add <alias>` which will log you into npm and create an alias for your `.npmrc` file. Each time you add a new user, another alias is added. You can then easily switch between users by simply running `npm-users list` and `npm use <alias>`.

This package was born out of the frustrations of having to log in to personal / work accounts.

## Installation

```javascript
npm i npm-users -g
```

## Use

```bash
Usage: npm-users [options]


Options:

  a, add <alias>     Add user
  r, remove <alias>  Remove user
  u, use <alias>     Use user
  l, list            List users
  w, whoami          Current logged in user
  -h, --help         output usage information
```
