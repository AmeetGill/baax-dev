let keys = null;
if(process.env.NODE_ENV==='production'){
  keys = require('./prod');
}
else {
  keys = require('./dev');
}

module.exports = keys;

// hey this ust to coomit
