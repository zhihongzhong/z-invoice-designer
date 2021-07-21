

export default {
  encode: function(obj) {
    return JSON.stringify(obj);
  },
  decode: function(stringifyed) {
    return JSON.parse(stringifyed);
  }
}