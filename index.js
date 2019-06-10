'use strict';

const initialState = 0;
const store = new Store(initialState, {
  GET_ALL: (state) => state,
  INCREMENT: (state, payload) => state + 1,
  DECREMENT: (state, payload) => state - 1,
  CHANGE: (state, payload) => 1 * payload
});

const set = (id) => document.getElementById(id);

const increment = () => store.dispatch('INCREMENT');
const decrement = () => store.dispatch('DECREMENT');
const change = (number) => store.dispatch('CHANGE', number);

const subscribers = {
  a: store.subscribe((state) => set('a').innerText = state),
  b: store.subscribe((state) => set('b').innerText = state),
  c: store.subscribe((state) => set('c').innerText = state),
  d: store.subscribe((state) => set('d').innerText = state),
  input: store.subscribe((state) => set('input').value = state),
}

const toggle = (el) => {
  el.parentElement.classList.toggle('active');
}

const subscribe = (key, el) => {
  subscribers[key] = store.subscribe((state) => set(key).innerText = state);
  toggle(el);
};
const unsubscribe = (key, el) => {
  subscribers[key].unsubscribe();
  toggle(el);
};

store.dispatch('GET_ALL');