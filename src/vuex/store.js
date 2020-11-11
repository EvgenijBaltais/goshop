import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state () {
        return {
            catalogItems: [],
            cart: [],
            categories: [],
            productsByCategories: []
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
        },
        SET_CATEGORIES: (state, items) => {
            for (let i = 0; i < items.length; i++) {
                state.categories.push(items[i])
            }
        },
        SET_PRODUCTS_BY_CATEGORIES: (state, products) => {
            state.productsByCategories.push(products)
        }
    },
    actions: {
        get_catalog({commit}) {
            return axios('//localhost:3000/catalogItems', {
                method: 'GET'
            }).then((catalogItems) => {
                commit('SET_ITEMS_TO_STATE', catalogItems.data)
                return catalogItems
            }).catch(e => {
                console.log(e)
                return e
            })
        },

        getMoreCatalogItems({commit}, value) {

            return axios('//localhost:3000/getMoreCatalogItems', {
                method: 'GET', params: {
                    'from': value,
                    'limit': 10
                }
            }).then((catalogItems) => {
                commit('SET_MORE_ITEMS_TO_STATE', catalogItems.data)
                return catalogItems
            }).catch(e => {
                console.log(e)
                return e
            })
        },

        get_categories_data({commit}) {

            return axios('//localhost:3000/getCategories', {
                method: 'GET'
            }).then(items => {

                commit('SET_CATEGORIES', items.data)

                if (items.data.length == 0) return false

                for (let i = 0; i < items.data.length; i++) {
                    return axios('//localhost:3000/getAllProductsByCategories', {
                        method: 'GET',
                        params: {
                            'category': items.data[i].id
                        }
                    }).then(products => {
                        commit('SET_PRODUCTS_BY_CATEGORIES', products.data)
                    })
                }
            })
        }
    },

    getters: {

    }

})

export default store