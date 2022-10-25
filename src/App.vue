<template>
  <HeaderBanner @go-to-order="scrollToComponent('order')" @go-to-sale="scrollToComponent('sale')"/>
  <RoomMenu/>
  <ListInfo/>
  <TypeOfCleaning @go-to-order="scrollToComponent('order')"/>
  <HowWorking/>
  <ReviewsSection/>
  <div ref="sale">
    <ContactForm/>
  </div>
  <div ref="order">
    <ConstructorOrder/>
  </div>
  <FooterComponent/>
</template>

<script>
import HeaderBanner from './components/HeaderBanner.vue'
import RoomMenu from './components/RoomMenu.vue'
import ListInfo from './components/ListInfo.vue'
import TypeOfCleaning from './components/TypeOfCleaning.vue'
import HowWorking from './components/HowWorking.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import ContactForm from './components/ContactForm.vue'
import ConstructorOrder from './components/ConstructorOrder.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderBanner,
    RoomMenu,
    ListInfo,
    TypeOfCleaning,
    HowWorking,
    ReviewsSection,
    ContactForm,
    ConstructorOrder,
    FooterComponent
  },

  methods: {
    scrollToComponent(refName) {
      let element = this.$refs[refName];
      let top = element.offsetTop - 30;

      window.scrollTo({top:top, behavior: 'smooth'});
    }
  }
}
</script>

<style>
</style>
