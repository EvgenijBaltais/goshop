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
        ADD_ITEMS_TO_CART: (state, arr) => {
            state.cart = arr
            //console.log(state.cart)
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
        addToCart({state}, data){

            let cart = state.cart,
                keyExists = -1

            // Ппроверить, есть ли уже элемент в корзине, если да то определить позицию и сохранить в переменную keyExists

            for (let i = 0; i < cart.length; i++) {
                if (data.id == cart[i].id) {
                    keyExists = i
                }
            }

            // Если уже есть то прибавить количество просто

            if (keyExists >= 0) {
                cart[keyExists].amount += 1
            }

            // Если нету, то найти в хранилище товаров,добавить свойство amount - количество и добавить в корзину

            else {
                // Найти в массиве товаров заказанный товар
                let item = ''
                for (let key in state.products.data) {
                    if (state.products.data[key].id == data.id) {
                        item = state.products.data[key]
                        item.amount = 1
                    }
                }
                cart.push(item)
            }

            this.commit('ADD_ITEMS_TO_CART', cart)
        },
        //removeFromCart({commit}){

        //}
    },

    getters: {
        getCart: state => {

           //for (let i = 0; i < state.cart.length; i++) {
                // Если уже есть такая позиция (id) то прибавляется количество, в противном случае добавляется позиция
           //     readyCard[state.cart[i].id] ? '' : readyCard[state.cart[i].id] = state.cart[i]
            //    readyCard[state.cart[i].id].amount ? readyCard[state.cart[i].id].amount += 1 : readyCard[state.cart[i].id].amount = 1

               //readyCard[state.cart[i].id].amount = 1
            //    console.log(readyCard[state.cart[i].id])
           //}
           return state.cart
        }
    }

})

export default store