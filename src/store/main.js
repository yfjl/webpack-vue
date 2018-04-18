const cheetah = {
    state: {
        router:{
            currentPageName:'首页'
        }

    },
    mutations: {
        'SHOW'(state, data) {

            state.show = data
        },
    },
    actions: {
       
        dbase({commit,state,dispatch}, datas) {

            
        }
    },
    getters: {
        currentPageName(state) {
            return state.router.currentPageName
        },
        

    }
}

export default cheetah
