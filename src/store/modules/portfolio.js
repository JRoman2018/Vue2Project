const state = {
  funds: 10000,
  stocks: [],
};
const getters = {
  stockPortfolio(state, getters) {
    return state.stocks.map((stock) => {
      const record = getters['stocks'].find(
        (element) => element.id == stock.id
      );
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price,
      };
    });
  },
  funds(state) {
    return state.funds;
  },
};

const mutations = {
  buyStock(state, payload) {
    const record = state.stocks.find(
      (element) => element.id === payload.stockId
    );
    if (record) {
      record.quantity += payload.quantity;
    } else {
      state.stocks.push({ id: payload.stockId, quantity: payload.quantity });
    }
    state.funds -= payload.stockPrice * payload.quantity;
  },
  sellStock(state, payload) {
    const record = state.stocks.find(
      (element) => element.id === payload.stockId
    );
    if (record.quantity > payload.quantity) {
      record.quantity -= payload.quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += payload.stockPrice * payload.quantity;
  },
  setPortfolio(state, payload) {
    state.funds = payload.funds;
    state.stocks = payload.stockPortfolio ? payload.stockPortfolio : [];
  },
};

const actions = {
  sellStock({ commit }, payload) {
    commit('sellStock', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
