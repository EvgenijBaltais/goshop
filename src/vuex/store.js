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
            favorite: [],
            search: []
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
        ADD_ITEMS_TO_CART: (state, arr) => {
            state.cart = arr
            localStorage.setItem('cart', JSON.stringify(arr))
        },
        CHANGE_CART: (state, arr) => {
            state.cart = arr
            localStorage.setItem('cart', JSON.stringify(arr))
        },
        REMOVE_FROM_CART: (state, arr) => {
            state.cart = arr
            localStorage.setItem('cart', JSON.stringify(arr))
        },
        CHANGE_FAVORITE: (state, arr) => {
            state.favorite = arr
            localStorage.setItem('favorite', JSON.stringify(arr))
        },
        CHANGE_SEARCH_DATA: (state, arr) => {
            state.search = arr
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
                cart[keyExists].amount += data.amount
            }

            // Если нету, то найти в хранилище товаров, добавить свойство amount - количество и добавить в корзину

            else {
                // Найти в массиве товаров заказанный товар
                let item = ''
                for (let key in state.products.data) {
                    if (state.products.data[key].id == data.id) {
                        item = state.products.data[key]
                        item.amount = data.amount
                    }
                }
                cart.push(item)
            }
            this.commit('ADD_ITEMS_TO_CART', cart)
        },
        changeCart({state}, data){
            let cart = state.cart

            for (let i = 0; i < state.cart.length; i++) {
                if (cart[i].id == data.id) {

                    if (data.value == 'minus') {
                        cart[i].amount > 1 ? cart[i].amount-- : ''
                    }
                    else if (data.value == 'plus') {
                        cart[i].amount < 100 ? cart[i].amount++ : ''
                    }
                }
            }
            this.commit('CHANGE_CART', cart)
        },
        removeFromCart({state}, data){

            let cart = state.cart,
                newCart = cart

            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id == data.id) {
                    newCart.splice(i, 1)
                }
            }
            this.commit('REMOVE_FROM_CART', newCart)
        },
        changeSearchData({state}, data) {
            state
            this.commit('CHANGE_SEARCH_DATA', data.items)
        },
        changeFavorite({state}, data) {

            console.log('CHANGE_FAVORITE')

            let favorite = state.favorite,
                productExists = 0,
                arr = []

            //  Проверить, есть ли уже этот элемент в избранном

            for (let i = 0; i < favorite.length; i++) {

                if (data.product.id == favorite[i].id) {
                    productExists++
                    continue
                }
                else {
                    arr.push(favorite[i])
                }
            }

            if (!productExists) arr.push(data.product)

           this.commit('CHANGE_FAVORITE', arr)
        }
    },
    getters: {
        getCart: state => {
           return state.cart
        }
    }
})

// Хранение данных в localstorage

// Данные корзины заказов

if (localStorage.getItem('cart')) {
    JSON.parse(localStorage.getItem('cart')).length > 0 ? store.state.cart = JSON.parse(localStorage.getItem('cart')) : ''
}

// Избранное

if (localStorage.getItem('favorite')) {
    JSON.parse(localStorage.getItem('favorite')).length > 0 ? store.state.favorite = JSON.parse(localStorage.getItem('favorite')) : ''
}
export default store