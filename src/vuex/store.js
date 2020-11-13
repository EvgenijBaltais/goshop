import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state () {
        return {
            catalogItems: [],
            cart: [],
            categories: [],
            productsByCategories: [],
            flowers: [],
            colors: []
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
        },
        SET_FLOWERS: (state, items) => {
            state.flowers = items
        },
        SET_COLORS: (state, items) => {
            state.colors = items
        }
    },
    actions: {
        get_catalog({commit}) {
            return axios('//localhost:3000/catalog_items', {
                method: 'GET'
            }).then((catalogItems) => {
                commit('SET_ITEMS_TO_STATE', catalogItems.data)
                return catalogItems
            }).catch(e => {
                console.log(e)
                return e
            })
        },
        get_more_catalog_items({commit}, value) {

            return axios('//localhost:3000/get_more_catalog_items', {
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
            return axios('//localhost:3000/get_categories', {
                method: 'GET'
            }).then(items => {

                commit('SET_CATEGORIES', items.data)

                if (items.data.length == 0) return false

                for (let i = 0; i < items.data.length; i++) {
                    return axios('//localhost:3000/get_all_products_by_categories', {
                        method: 'GET',
                        params: {
                            'category': items.data[i].id
                        }
                    }).then(products => {
                        commit('SET_PRODUCTS_BY_CATEGORIES', products.data)
                    })
                }
            })
        },
        get_flowers_types() {
            return axios('//localhost:3000/get_flowers_types', {
                methods: 'GET'
            }).then(items => {
                this.commit('SET_FLOWERS', items.data)
            })
        },
        get_all_colors() {
            return axios('//localhost:3000/get_all_colors', {
                methods: 'GET'
            }).then(items => {
                this.commit('SET_COLORS', items.data)
            })
        }
    },

    getters: {

    }

})

export default store