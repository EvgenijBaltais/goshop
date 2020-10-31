<template>
  <div>

      <DeliveryInfoStripe />
      <SlideSection />
      <SectionCarousel />
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
  }
}
</script>
