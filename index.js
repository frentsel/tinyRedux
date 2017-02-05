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
        state = handlers[type](state, item || {});
        handler(state);
    };
    return this;
};

var data = [
    'Apple',
    'Banana',
    'Orange'
];

var store = new Store(data, {
    GET_ALL: function (state) {
        return state;
    },
    ADD: function (state, item) {
        state.push(item);
        return state;
    },
    DELETE: function (state, item) {
        var index = state.indexOf(item);
        state.splice(index, 1);
        return state;
    },
    UPDATE: function (state, obj) {
        var index = state.indexOf(obj.key);
        state[index] = obj.val;
        return state;
    }
});

var manager = {
    add: function () {
        store.dispatch('ADD', $('#add').val());
    },
    delete: function (id) {
        store.dispatch('DELETE', id);
    },
    update: function (key) {
        store.dispatch('UPDATE', {key: key, val: $('#add').val()});
    },
    list: function (data) {

        var tpl = $('#tpl').html();
        $('#list').html('');
        data.map(function (el) {
            $('#list').append(tpl.split('{el}').join(el));
        });
    }
};

store.subscribe(manager.list);

store.dispatch('GET_ALL');