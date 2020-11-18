<template>
    <div>
        <div class = "wrapper">

            <div :class = "['site-header', 'site-header-fixed']">
                <TopHeaderBlock />
                <TopHeaderLogoBlock />
                <MainNavigation />
            </div>

            <router-view/>
        </div>

        <Footer />
    </div>
</template>

<script>

import TopHeaderBlock from '../components/TopHeaderBlock.vue'
import TopHeaderLogoBlock from '../components/TopHeaderLogoBlock.vue'
import MainNavigation from '../components/MainNavigation.vue'
import Footer from '../components/Footer.vue'

export default {

    name: "Mainlayout",
    data(){
        return {}
    },
    components: {
        TopHeaderBlock, TopHeaderLogoBlock, MainNavigation, Footer
    },
    methods: {

        makeNavbarFixedAgain(){

            //let navBar = document.querySelector('.site-header')

            /*return false

            if (pageYOffset > navBar.offsetHeight) {
                
                if (navBar.classList.contains('site-header-fixed')) return false
                navBar.classList.add('site-header-fixed')
            }
            else {
                if (navBar.classList.contains('site-header-fixed')) navBar.classList.remove('site-header-fixed')
                return false
            }*/

        }
    },
    created(){
        window.addEventListener('scroll', this.makeNavbarFixedAgain)
    }
}
</script>

<style>
.site-header-fixed {
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    z-index: 5;
}
.site-header-fixed .logo-block__search {
    display: none;
}
.site-header-fixed .logo-block {
    order: 1;
    width: 20%;
}
.site-header-fixed .logo-title {
    font-size: 30px;
    line-height: 40px;
}
.site-header-fixed .logo-block__main-logo {
    width: 100%;
}
.site-header-fixed .top-stripe {
    flex-wrap: wrap;
    order: 3;
    width: 20%;
}
.site-header-fixed .logo-title {
    text-align: left;
}
.site-header-fixed .logo-title-text {
    text-align: left;
}
.site-header-fixed .main-phone__number {
    font-size: 24px;
    line-height: 24px;
}
.site-header-fixed .logo-block__top-info {
    display: none;
}
.site-header-fixed .main-navigation {
    width: 60%;
    margin-bottom: 0;
    order: 2;
    border-top: 0;
    border-bottom: 0;
}
.site-header-fixed .logo-block {
    padding: 10px 0;
}

.site-header-fixed .main-basket {
    width: 100%;
    order: 2;
    padding-right: 0;
    margin-right: 0;
    border-right: 0;
    text-align: right;
}

.site-header-fixed .main-phone {
    width: 100%;
    order: 1;
    padding-bottom: 10px;
    text-align: right;
}

</style>