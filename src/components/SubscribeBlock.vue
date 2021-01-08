<template>
    <div class="subscribe-block">

        <h2 class = "subscribe-block__title">Присоединяйтесь к нам!</h2>
        <p class = "subscribe-block__text">Подписывайтесь на наши новости и спецпредложения!</p>

        <div class = "subscribe-form-block">
            <form action="#" class = "subscribe-form" name = "subscribe-form">
                <input type="text" placeholder="Имя" class = "subscribe-form__name">
                <input type="text" placeholder="Почта" class = "subscribe-form__email">
                <button class = "subscribe-form__btn" @click.prevent = "subscribe_user">Подписываюсь!</button>
            </form>
        </div>
        <p class = "subscribe-block__dopinfo">Мы не рассылаем спам и не передаем личные данные третьим лицам.</p>
    </div>
</template>

<script>

import axios from 'axios'

export default {

    name: 'SubscribeBlock',
    data(){
        return {
            sendingForm: 0
        }
    },
    methods: {
        subscribe_user(){

            if (this.sendingForm != 0) return false

            if (!document.querySelector('.subscribe-form__email').value
                || document.querySelector('.subscribe-form__email').value.indexOf('@') == -1) {
                document.querySelector('.subscribe-form__email').style.border= '1px solid red'
                return false
            }

            this.sendingForm = 1

            let clientData = {}

            // Имя
            document.querySelector('.subscribe-form__name').value ?
            clientData.name = document.querySelector('.subscribe-form__name').value : ''

            // Email
            clientData.email = document.querySelector('.subscribe-form__email').value

            // Клиент
            document.body.getAttribute('client_id') ?
            clientData.client = document.body.getAttribute('client_id') : ''

            let ev = event.target

            axios.interceptors.request.use((req) => {
                    ev.innerText = "Отправка..."
                    return req
                }
            )

            axios.interceptors.response.use((res) => {
                    return res
                }
            )

            axios
            .get('//localhost:3000/subscribe', {
                params: {
                    clientData: clientData
                }
            }).then(response => {
                response.data == 'Success' ? ev.innerText = "Вы подписаны!" : ev.innerText = "Ошибка!"
                response.data == 'Email exists' ? ev.innerText = "Email уже есть" : ''
            })
        }
    },
    mounted(){

            document.querySelector('.subscribe-form__email').addEventListener('keyup', function(){
                event.target.style.border = '1px solid #CED0D2'
            })
            document.querySelector('.subscribe-form__email').addEventListener('focus', function(){
                event.target.style.border = '1px solid #CED0D2'
            })

    }
}

</script>

<style>

.subscribe-block {
    background: #F6F6F6;
    padding: 30px 0;
    text-align: center;
}

.subscribe-form {
    margin: 0 auto;
    width: 750px;
    display: flex;
    padding-bottom: 15px;
    justify-content: space-between;
}

.subscribe-form__name {
    display: block;
    width: 270px;
    height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    border: 1px solid #CED0D2;
    outline: 0!important;
    border-radius: 3px;
    color: #A4A1A7;
}

.subscribe-form__name[placeholder]          {color: #A4A1A7;}
.subscribe-form__name::-moz-placeholder     {color: #A4A1A7;} 
.subscribe-form__name:-moz-placeholder      {color: #A4A1A7;} 
.subscribe-form__name:-ms-input-placeholder {color: #A4A1A7;} 

.subscribe-form__email {
    display: block;
    width: 270px;
    height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    border: 1px solid #CED0D2;
    outline: 0!important;
    border-radius: 3px;
    color: #A4A1A7;
}

.subscribe-form__email[placeholder]          {color: #A4A1A7;}
.subscribe-form__email::-moz-placeholder     {color: #A4A1A7;} 
.subscribe-form__email:-moz-placeholder      {color: #A4A1A7;} 
.subscribe-form__email:-ms-input-placeholder {color: #A4A1A7;} 

.subscribe-form__btn {
    display: block;
    transition: background-color .3s;
    width: 180px;
    height: 40px;
    border: 0!important;
    outline: 0!important;
    box-sizing: border-box;
    background: #AFD7BB;
    color: #292B2C;
    border-radius: 3px;
    cursor: pointer;
}

.subscribe-form__btn:hover {
    transition: background-color .3s;
    background: #BCE4C8;
}

.subscribe-block__title {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    padding-left: 40px;
    padding-bottom: 10px;
    background-image: url('../assets/icons/black-envelope.svg');
    background-repeat: no-repeat;
    background-position: 0% 2px;
    background-size: 30px;
}

.subscribe-block__text {
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    padding-bottom: 15px;
}

.subscribe-block__dopinfo {
    text-align: center;
    font-size: 16px;
    line-height: 20px;
}


</style>