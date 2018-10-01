var Store = function(initialState = [], _actions = {}) {

  const actions = {};
  const subscribers = [];
  let state = initialState.slice(0);

  for (const key in _actions) {
    actions[key] = _actions[key].bind(this);
  }

  this.getState = () => state.slice(0);

  this.subscribe = (subsriber) => subscribers.push(subsriber);

  this.dispatch = (type, item) => {
    state = actions[type](state, item || {});
    subscribers.forEach((subsriber) => subsriber(state.slice(0)));
  };

  return this;
};