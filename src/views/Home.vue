<template>
  <div>

      <DeliveryInfoStripe />
      <SlideSection />
      <SectionCarousel 
        v-for = 'item in items'
        :key = 'item.id'
        :items = "item"
      />

      <SubscribeBlock />

  </div>
</template>

<script>
// @ is an alias to /src

import DeliveryInfoStripe from '../components/DeliveryInfoStripe'
import SlideSection from '../components/SlideSection'
import SectionCarousel from '../components/SectionCarousel'
import SubscribeBlock from '../components/SubscribeBlock'

export default {
  name: 'Home',
  components: {
    DeliveryInfoStripe, SlideSection, SectionCarousel, SubscribeBlock
  },
  computed: {
    items(){
      return {'1':1, '2':2, '3':3, '4':4}
    }
  }
}
</script>
