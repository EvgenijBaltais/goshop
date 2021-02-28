<template>
	<footer class = "footer">
        <div class = "footer-w">
            <div class="footer-item">
                <p class = "footer-title">Разделы сайта:</p>
                <ul class = "footer-menu">
                    <li class = "footer-menu-item" v-for = "item in categories" :key = "item.id">
                        <router-link :to = "{path: `/catalog/${item.url_name}/`}"
                        :class = "['footer-menu__link']"
                        :data-category = item.id>{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="footer-item"></div>
            <div class="footer-item">
                <p class = "footer-title">Свяжитесь с нами удобным для Вас способом:</p>
                <div class="footer-messengers">
                    <span class = "footer-contacts-span">Мы в мессенджерах:</span>
                        <div class = "footer-messengers-container">
                        <a href="" class = "footer-social-link">
                            <img :src="require('../assets/icons/social/whatsapp.svg')" alt="" class = "footer-social">
                        </a>
                        <a href="" class = "footer-social-link">
                            <img :src="require('../assets/icons/social/viber.svg')" alt="" class = "footer-social">
                        </a>
                        <a href="" class = "footer-social-link">
                            <img :src="require('../assets/icons/social/telegram.svg')" alt="" class = "footer-social">
                        </a>
                    </div>
                </div>
                <div class="footer-contacts">
                    <p class = "footer-phone">
                        <span class = "footer-contacts-span">Звоните нам:</span>
                        <a href="tel:+77777777777" class = "footer-phone__link">+7 (777) 777-77-77</a>
                    </p>
                    <p class = "footer-email">
                        <span class = "footer-contacts-span">Наш email:</span>
                        <a href="mailto:mail@mail.ru" class = "footer-email__link">mail@mail.ru</a>
                    </p>
                </div>
            </div>
        </div>
	</footer>
</template>

<script>

export default {

    data(){
        return {}
    },
    computed: {
        categories(){
            return this.$store.state.categories
        }
    }
}

</script>

<style scoped>
    .footer {
        background: #576167;
    }
    .footer-w {
        width: 100%;
        max-width: 1110px;
        min-height: 200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .footer-item {
        width: 33.33333%;
        padding: 40px 20px;
        box-sizing: border-box;
    }

    .footer-menu {
        list-style-type: none;
    }
    .footer-title {
        color: #fff!important;
        font-size: 18px;
        line-height: 24px;
        padding-bottom: 10px;
        font-weight: bold;
    }
    .footer-menu__link {
        display: inline-block;
        color: #fff!important;
        font-size: 18px;
        line-height: 24px;
        padding-bottom: 5px;
    }

    .footer-phone__link {
        display: block;
        font-size: 22px;
        line-height: 26px;
        color: #fff!important;
        letter-spacing: 1px;
    }

    .footer-email__link {
        display: block;
        font-size: 22px;
        line-height: 26px;
        color: #fff!important;
        letter-spacing: 1px;
    }
    .footer-contacts-span {
        color: #fff;
        font-size: 18px;
        line-height: 24px;
    }
    .footer-phone {
        padding: 10px 0;
    }
    .footer-email {
        padding: 10px 0;
    }
    .footer-messengers {
        padding: 10px 0;
    }
    .footer-messengers-container {
        display: flex;
        justify-content: flex-start;
        padding-top: 10px;
    }
    .footer-social {
        display: block;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
</style>