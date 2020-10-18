<template>
    <div>
        <div class = "wrapper">
            <TopHeaderBlock />
            <TopHeaderBlockFixed />
            <TopHeaderLogoBlock />
            <MainNavigation />

            <router-view/>
        </div>

        <Footer />
    </div>
</template>

<script>

import TopHeaderBlock from '../components/TopHeaderBlock.vue'
import TopHeaderBlockFixed from '../components/TopHeaderBlockFixed.vue'
import TopHeaderLogoBlock from '../components/TopHeaderLogoBlock.vue'
import MainNavigation from '../components/MainNavigation.vue'
import Footer from '../components/Footer.vue'

export default {

    name: "Mainlayout",
    data(){
        return {}
    },
    components: {
        TopHeaderBlock, TopHeaderBlockFixed, TopHeaderLogoBlock, MainNavigation, Footer
    }
}
</script>