<template>
  <div>

      <DeliveryInfoStripe />
      <SlideSection />
  </div>
</template>

<script>
// @ is an alias to /src

import DeliveryInfoStripe from '../components/DeliveryInfoStripe'
import SlideSection from '../components/SlideSection'

export default {
  name: 'Home',
  components: {
    DeliveryInfoStripe, SlideSection
  }
}
</script>
