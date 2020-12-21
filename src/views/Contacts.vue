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
            <button class = "c-send">Отправить!</button>
        </form>

    </div>
    <div class = "map-block"></div>
    
</div>
</template>

<script>

export default {

    name: "Contacts",
    data() {
        return {}
    },
    components: {
        
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
    font-size: 16px;
    line-height: 24px;
    padding: 10px;
    width: 100%;
    max-width: 350px; 
    resize: vertical;
    box-sizing: border-box;
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
}

input[type="text"]::-webkit-input-placeholder {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
input[type="text"]::-moz-placeholder          {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
input[type="text"]:-moz-placeholder           {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
input[type="text"]:-ms-input-placeholder      {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
input[type="text"][placeholder]               {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}

.c-text::-webkit-input-placeholder {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text::-moz-placeholder          {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text:-moz-placeholder           {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text:-ms-input-placeholder      {font-size: 16px;line-height: 24px;font-family: 'Neucha', cursive;}
.c-text[placeholder]               {font-size: 16px;line-height: 24px; font-family: 'Neucha', cursive;}
</style>