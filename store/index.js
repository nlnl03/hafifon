import { createStore } from "vuex";
const exams = JSON.parse(localStorage.getItem("checkedExamData")) || []
export default createStore({
  state: {
    sharePointUrl:
      process.env.NODE_ENV == "production"
        ? "https://portal.army.idf/sites/hafifon383/_api/web/Lists/"
        : "http://localhost:3000/",

    isSharePointUrl: process.env.NODE_ENV == "production",
    mahlaka: null,
    exams,
    examNames:JSON.parse(localStorage.getItem("examsNames"))
  },
  mutations: {
    setSelectedMahlaka(state, item){
      state.mahlaka = item;
      localStorage.setItem("mahlaka", item)
    },
    setExams(state, exams){
      state.exams = exams
      localStorage.setItem("checkedExamData", JSON.stringify(exams))
    },
    loadExams(state){
      const exams = JSON.parse(localStorage.getItem("checkedExamData"))
      if(exams){
        console.log("local: ",exams)
        state.exams = exams
      }
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
    },

    getExamByName:(state)=>(name)=>{
       return state.exams.find(exam=>exam.Title===name)
    }
 
  }
});
