"use strict";

var Store = function(initialState, _handlers){
    var handlers = {},
        state = initialState,
        handler,
        key;
    for(key in _handlers){
        handlers[key] = _handlers[key].bind(this);
    }
    this.getState = function () {
        return state;
    };
    this.subscribe = function (_handler) {
        handler = _handler;
    };
    this.dispatch = function (type, item) {
        state = handlers[type](state, item);
        handler(state);
    };
    return this;
};

var store = new Store([1,2,3,4], {
    ADD: function (state, item) {
        state.push(item);
        return state;
    },
    DELETE: function (state, item) {
        var index = state.indexOf(item);
        state.splice(index, 1);
        return state;
    }
});

console.info('getState: ', store.getState());

store.subscribe(function (data) {
    console.info('Data: ', data);
});

store.dispatch('ADD', 6);
store.dispatch('DELETE', 1);
store.dispatch('DELETE', 2);
store.dispatch('DELETE', 3);