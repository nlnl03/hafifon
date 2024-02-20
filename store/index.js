import { createStore } from "vuex";

export default createStore({
  state: {
    sharePointUrl:
      process.env.NODE_ENV == "production"
        ? "https://portal.army.idf/sites/hafifon383/_api/web/Lists/"
        : "http://localhost:3000/",

    isSharePointUrl: process.env.NODE_ENV == "production",
    mahlaka: null
  },
  mutations: {
    setSelectedMahlaka(state, item){
      state.mahlaka = item;
      localStorage.setItem("mahlaka", item)
    }
  },
  actions:{
    selectItem({commit},item){
      commit('setSelectedMahlaka', item)
    }
  },
  getters:{
    selectedItem(state){
        return state.mahlaka
    }
  }
});
