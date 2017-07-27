var flatstate = (function (O) {'use strict';
  var
    assign =
      O.assign ||
      function assign(t, s) {
        for (var k in (s || {})) t[k] = s[k];
        return t;
      },
    setPrototypeOf =
      O.setPrototypeOf ||
      function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      }
  ;
  function flatstate(Class) {
    return this instanceof flatstate ?
      assign(this, Class) :
      ((Class.prototype.setState = flatstate.setState),
        Class);
  }
  flatstate.setState = function setState(state) {
    this.state = setPrototypeOf(
      new flatstate(state),
      this.state || flatstate.prototype
    );
  };
  flatstate.prototype.toJSON = function toJSON() {
    var out = {}, k;
    for (k in this) out[k] = this[k];
    return out;
  };
  return flatstate;
}(Object));

try { module.exports = flatstate; } catch(o_O) {}