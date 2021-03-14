<template>
<div class = "contacts-wrap">
    <div class = "contacts-data">
        <h2 class = "if-write-title">Связь с нами</h2>
        <p class = "if-write-text">Если Вы хотите сделать заказ или у Вас есть какие-то вопросы, пишите нам!</p>
        <form action="" name = "c-form" class = "c-form">
            <input type="text" name = "name" class = "c-name" id = "c-name" placeholder="Ваше имя">
            <input type="text" name = "phone" class = "c-phone" id = "c-phone" placeholder="Ваш телефон">
            <input type="text" name = "email" class = "c-email" id = "c-email" placeholder="Ваш email">
            <textarea name = "textarea" class = "c-text" id = "c-text" placeholder="Текст сообщения"></textarea>
            <button class = "c-send" @click.prevent = "sendForm">Отправить!</button>
        </form>
    </div>
    <div class = "map-block">
        <img :src="require('../assets/pics/shop.jpg')" alt="" class = "shop-image">
    </div>
</div>
</template>

<script>
import Inputmask from 'inputmask'
import axios from 'axios'

export default {

    name: "Contacts",
    data() {
        return {
            sendingForm: 0
        }
    },
    components: {
        
    },
    methods: {
        sendForm(){

            if (this.sendingForm != 0) return false

            if (!document.querySelector('.c-phone').inputmask.isComplete()) {
                document.querySelector('.c-phone').style.border = '1px solid red'
                return false
            }

            this.sendingForm = 1

            let clientData = {}

            // Телефон
            clientData.phone = document.querySelector('.c-phone').value

            // Имя
            document.querySelector('.c-name').value ?
            clientData.name = document.querySelector('.c-name').value : ''

            // Email
            document.querySelector('.c-email').value
            && document.querySelector('.c-email').value.indexOf('@') != -1
            ? clientData.email = document.querySelector('.c-email').value : ''

            // Дополнительная инфа
            document.querySelector('.c-text').value
            ? clientData.additional = document.querySelector('.c-text').value : ''

            // Клиент
            document.body.getAttribute('client_id') ?
            clientData.client = document.body.getAttribute('client_id') : ''

            // Номер формы
            clientData.form_id = 3

            let ev = event.target

            axios.interceptors.request.use((req) => {
                    ev.innerText = "Отправляем..."
                    return req
                }
            )

            axios.interceptors.response.use((res) => {
                    return res
                }
            )

            axios
            .post('//localhost:3001/send_order', {
                params: {
                    'clientData': clientData
                }
            }).then(response => {

                response.data == "Нет телефона" ? ev.innerText = "Не введен телефон!" : ev.innerText = "Успех!"

                setTimeout(() => {
                    ev.innerText = "Отправить заказ!"
                    this.sendingForm = 0
                }, 2000)
            })
        }
    },
    mounted(){

        // Маска телефона
        
        let im = new Inputmask("+7 (999) 999-99-99")
            im.mask(document.getElementById("c-phone"))

        document.getElementById("c-phone").addEventListener('keyup', function(){
            event.target.style.border = '1px solid #CED0D2'
        })
        document.getElementById("c-phone").addEventListener('focus', function(){
            event.target.style.border = '1px solid #CED0D2'
        })
    }
}
</script>

<style>

.contacts-wrap {
    display: flex;
}

.contacts-data {
    display: block;
    width: 47.5%;
}

.map-block {
    display: block;
    width: 47.5%;
}

.if-write-title {
    text-align: left;
    padding: 0 0 10px 0;
}

.c-form {
    margin: 20px 0;
}

.c-name {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #CED0D2;
    border-radius: 3px;
    outline: 0!important;
    font-size: 16px;
    line-height: 24px;
    padding: 10px;
    width: 100%;
    max-width: 350px;
    box-sizing: border-box;
}
.c-phone {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #CED0D2;
    border-radius: 3px;
    outline: 0!important;
    font-size: 16px;
    line-height: 24px;
    padding: 10px;
    width: 100%;
    max-width: 350px;
    box-sizing: border-box;
}
.c-email {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #CED0D2;
    border-radius: 3px;
    outline: 0!important;
    font-size: 16px;
    line-height: 24px;
    padding: 10px;
    width: 100%;
    max-width: 350px;
    box-sizing: border-box;
}
.c-text {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #CED0D2;
    border-radius: 3px;
    outline: 0!important;
    font-size: 18px;
    line-height: 24px;
    padding: 10px;
    width: 100%;
    max-width: 350px; 
    resize: vertical;
    box-sizing: border-box;
    height: 200px;
    color:#757575;
    letter-spacing: 1px;
}
.c-send {
    display: block;
    width: 100%;
    max-width: 350px;
    border-radius: 3px;
    padding: 10px 0;
    background: #AFD7BB;
    color: #292B2C;
    font-size: 16px;
    line-height: 24px;
    border: 0!important;
    outline: 0!important;
    cursor: pointer;
    letter-spacing: 1px;
    font-weight: bold;
}

.if-write-text {
    font-size: 18px;
    line-height: 24px;
}

input[type="text"]::-webkit-input-placeholder {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;color:#757575;letter-spacing: 1px;}
input[type="text"]::-moz-placeholder          {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;color:#757575;letter-spacing: 1px;}
input[type="text"]:-moz-placeholder           {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;color:#757575;letter-spacing: 1px;}
input[type="text"]:-ms-input-placeholder      {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;color:#757575;letter-spacing: 1px;}
input[type="text"][placeholder]               {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;color:#757575;letter-spacing: 1px;}
input[type="text"] {
    color:#757575;
    font-size: 18px;
    letter-spacing: 1px;
}

.c-text::-webkit-input-placeholder {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text::-moz-placeholder          {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text:-moz-placeholder           {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text:-ms-input-placeholder      {font-size: 18px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text[placeholder]               {font-size: 18px;line-height: 24px; font-family: 'Neucha', cursive;}

.shop-image {
    width: 100%;
    display: block;
    margin: 20px auto;
}

</style>