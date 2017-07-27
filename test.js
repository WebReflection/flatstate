const tressa = require('tressa');

let flatstate = require('./index.js');
let FlatState = flatstate(class {});

tressa.title('flatstate');

class A extends FlatState {}

let s = new A;
s.setState({a: 1});
s.setState({b: 2});
s.setState({a: 3});

tressa.assert(
  JSON.stringify(s) === '{"state":{"a":3,"b":2}}',
  'state stringified'
);

s = new A;
s.setState(null);
tressa.assert(
  JSON.stringify(s) === '{"state":{}}',
  'even null state works'
);

delete require.cache[require.resolve('./index.js')];

delete Object.assign;
delete Object.setPrototypeOf;

flatstate = require('./index.js');
class B extends flatstate(class {}) {}

s = new B;
s.setState({a: 1});
s.setState({b: 2});
s.setState({a: 3});

tressa.assert(
  JSON.stringify(s) === '{"state":{"a":3,"b":2}}',
  'state stringified (with shim)'
);

s = new B;
s.setState(null);
tressa.assert(
  JSON.stringify(s) === '{"state":{}}',
  'even null state works (with shim)'
);