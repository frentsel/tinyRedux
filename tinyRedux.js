const Store = function(state = [], actions = {}) {

  let subscribers = [];

  this.getState = () => state;

  this.subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return {
      unsubscribe: () => {
        subscribers = subscribers.filter((_subscriber) => _subscriber.toString() !== subscriber.toString());
      }
    };
  };

  this.dispatch = (action, payload = {}) => {
    state = actions[action](state, payload);
    subscribers.forEach((subsriber) => subsriber(state));
  };
};
