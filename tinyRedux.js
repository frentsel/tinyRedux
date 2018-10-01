var Store = function(initialState = [], _actions = {}) {

  console.log('initialState: ', initialState);
  console.log('_actions: ', _actions);

  const actions = {};
  const handlers = [];
  let state = initialState.slice(0);

  for (const key in _actions) {
    actions[key] = _actions[key].bind(this);
  }

  this.getState = () => state.slice(0);

  this.subscribe = (subsriber) => handlers.push(subsriber);

  this.dispatch = (type, item) => {
    state = actions[type](state, item || {});
    handlers.forEach((subsriber) => subsriber(state.slice(0)));
  };

  return this;
};