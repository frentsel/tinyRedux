"use strict";

var data = [
  'Apple',
  'Banana',
  'Orange'
];

var store = new Store(data, {
  GET_ALL: function(state) {
    return state;
  },
  ADD: function(state, item) {
    state.push(item);
    return state;
  },
  DELETE: function(state, item) {
    var index = state.indexOf(item);
    state.splice(index, 1);
    return state;
  },
  UPDATE: function(state, obj) {
    var index = state.indexOf(obj.key);
    state[index] = obj.val;
    return state;
  }
});

var getEl = (id) => document.getElementById(id);

var manager = {
  add: function() {
    store.dispatch('ADD', getEl('add').value);
  },
  delete: function(id) {
    store.dispatch('DELETE', id);
  },
  update: function(key) {
    store.dispatch('UPDATE', {
      key,
      val: getEl('add').value
    });
  },
  list: function(data) {

    var tpl = getEl('tpl').innerHTML;
    getEl('list').innerHTML = '';
    data.map(function(el) {
      getEl('list').innerHTML += tpl.split('{el}').join(el);
    });
  }
};

store.subscribe(manager.list);
store.subscribe(console.log);

store.dispatch('GET_ALL');