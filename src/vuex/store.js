import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state () {
        return {
        catalogItems: [],
        cart: [],
        categories: []
        }
    },
    mutations: {

        SET_ITEMS_TO_STATE: (state, catalogItems) => {
            state.catalogItems = catalogItems
        }
    },
    actions: {

        get_catalog({commit}) {
            console.log('вызов экшна')
            return axios('http://localhost:3000/catalogItems', {
                method: 'GET'
            }).then((catalogItems) => {
                console.log('вызов мутации')
                commit('SET_ITEMS_TO_STATE', catalogItems.data)
                return catalogItems
            }).catch(e => {
                console.log(e)
                return e
            })
        }
    },

    getters: {

    }

})

export default store