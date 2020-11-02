<template>
  <div>

      <DeliveryInfoStripe />
      <SlideSection />
      <SectionCarousel 
        v-for = 'item in items'
        v-bind:key = 'item.id'
        v-bind:items = "item"
      />

      {{items}}
  </div>
</template>

<script>
// @ is an alias to /src

import DeliveryInfoStripe from '../components/DeliveryInfoStripe'
import SlideSection from '../components/SlideSection'
import SectionCarousel from '../components/SectionCarousel'

export default {
  name: 'Home',
  components: {
    DeliveryInfoStripe, SlideSection, SectionCarousel
  },
  computed: {
    items(){
      return {'1':1, '2':2, '3':3, '4':4}
    }
  }
}
</script>
