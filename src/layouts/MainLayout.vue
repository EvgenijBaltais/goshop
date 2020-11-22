<template>
        <div class = "wrapper">

            <div :class = "['site-header']">
                <TopHeaderBlock />
                <TopHeaderLogoBlock />
                <MainNavigation />
            </div>

            <router-view/>
        </div>

        <Footer />
</template>

<script>

import TopHeaderBlock from '../components/TopHeaderBlock.vue'
import TopHeaderLogoBlock from '../components/TopHeaderLogoBlock.vue'
import MainNavigation from '../components/MainNavigation.vue'
import Footer from '../components/Footer.vue'

export default {

    name: "Mainlayout",
    data(){
        return {
            fixedHeader: 0
        }
    },
    components: {
        TopHeaderBlock, TopHeaderLogoBlock, MainNavigation, Footer
    },
    methods: {

        makeNavbarFixedAgain(){

            let navBar = document.querySelector('.site-header')

            console.log(pageYOffset + ' pageYOffset')
            console.log(document.querySelector('.site-header').offsetHeight + ' navBar.offsetHeight')

            //console.log(this.fixedHeader)

            if (pageYOffset > document.querySelector('.site-header').offsetHeight && this.fixedHeader == 0) {

                console.log('1')

                navBar.classList.add('site-header-fixed')
                this.fixedHeader = 1
                return false
            }
            else if (pageYOffset <= document.querySelector('.site-header').offsetHeight && this.fixedHeader == 1) {
                console.log('2')
                navBar.classList.remove('site-header-fixed')
                return false
            }
        }
    },
    created(){
        //window.addEventListener('scroll', this.makeNavbarFixedAgain)
    }
}
</script>

<style>
.site-header-fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    padding: 0 calc((100% - 1110px) / 2);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    z-index: 5;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.1);
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