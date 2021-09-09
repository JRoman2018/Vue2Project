import stocks from '../../data/stocks';

const state = {
  stocks: [],
};
const getters = {
  stocks(state) {
    return state.stocks;
  },
};

const mutations = {
  setStocks(state, payload) {
    state.stocks = payload;
  },
  rndStocks(state) {
    state.stocks.forEach((stock) => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  },
};

const actions = {
  buyStock({ commit }, payload) {
    commit('buyStock', payload);
  },
  initStocks({ commit }) {
    commit('setStocks', stocks);
  },
  randomizeStocks({ commit }) {
    commit('rndStocks');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
