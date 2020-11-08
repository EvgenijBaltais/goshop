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
        },
        SET_MORE_ITEMS_TO_STATE: (state, items) => {
            for (let i = 0; i < items.length; i++) {
                state.catalogItems.push(items[i])
            }
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
        },

        getMoreCatalogItems({commit}, value) {
            console.log('добавление товаров в каталог '  + value)

            return axios('http://localhost:3000/getMoreCatalogItems', {
                method: 'GET', params: {
                    'from': value,
                    'limit': 10
                }
            }).then((catalogItems) => {
                console.log('вызов мутации')
                commit('SET_MORE_ITEMS_TO_STATE', catalogItems.data)
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