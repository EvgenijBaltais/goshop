import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state () {
        return {
            products: [],
            cart: [],
            categories: [],
            productsByCategories: [],
            flowers: [],
            colors: [],
            occasions: [],
            bestsellers: []
        }
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products
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
        },
        SET_OCCASIONS: (state, items) => {
            state.occasions = items
        },
        SET_BESTSELLERS: (state, items) => {
            state.bestsellers = items
        },
        ADD_ITEMS_TO_CART: (state, item) => {
            state.cart.push(item)
            console.log(state.cart)
        }
    },
    actions: {
        get_catalog({commit}) {
            return axios('//localhost:3000/products', {
                method: 'GET'
            }).then(products => {
                commit('SET_PRODUCTS_TO_STATE', products)
                return products
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
        },
        get_all_occasions() {
            return axios('//localhost:3000/get_occasions', {
                methods: 'GET'
            }).then(items => {
                this.commit('SET_OCCASIONS', items.data)
            })
        },
        get_all_bestsellers(){
            return axios('//localhost:3000/get_all_bestsellers', {
                method: 'GET'
            }).then(items => {
                this.commit('SET_BESTSELLERS', items.data)
            })
        },
        addToCart({state}, id){
            

            let item = ''
            for (let key in state.products.data) {
                if (state.products.data[key].id == id.id) item = state.products.data[key]
            }

            this.commit('ADD_ITEMS_TO_CART', item)
        },
        //removeFromCart({commit}){

        //}
    },

    getters: {
        getCart: state => {
           let cart = state.cart
           console.log(cart)
           return cart.length
        }
    }

})

export default store