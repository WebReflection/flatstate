# flatstate

[![Build Status](https://travis-ci.org/WebReflection/flatstate.svg?branch=master)](https://travis-ci.org/WebReflection/flatstate) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/flatstate/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/flatstate?branch=master) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate)

A simple prototypal inheritance based state,
inspired by [this blog post](https://www.webreflection.co.uk/blog/2016/12/23/javascript-proto-state).

The `flatstate` function pollutes a generic class adding a `setState` method.

Such method could also be borrowed at runtime.

```js
class MyEl extends HTMLElement {
  setState(state) {
    flatstate.setState.call(this, state);
    this.render(state);
  }
  render(state) {
    this.textContent = state.name;
  }
}
const el = new MyEl();
el.setState({name: 'test', clicks: 0});
el.addEventListener('click', () => {
  this.setState({
    clicks: this.state.clicks + 1
  });
});

// or alternatively
const Class = flatstate(class {
  // prototype will have a setState method
});
```