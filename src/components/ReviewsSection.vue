<template>
    <div class="mt-16 container mx-auto px-5">
        <p class="md:text-4xl sm:text-3xl text-2xl font-bold text-orange-600 text-center mb-10">
            Отзывы
        </p>
        <div>
            <swiper
                :slidesPerView="x"
                :spaceBetween="30"
                :pagination="{
                    clickable: true,
                }"
                :modules="modules"
                class="mySwiper mt-26"
            >
                <swiper-slide 
                    v-for="(item, idx) in reviewsData"
                    :key="idx"
                    class="pb-7"
                >
                    <div class="border-orange-500 border-2 rounded-lg px-7 py-5 h-full">
                        <p class="text-xl font-bold text-orange-600">{{ item.name }}</p>
                        <p class="mt-2">{{ item.review }}</p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
  
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { computed, onMounted, onUnmounted, ref,watch } from "vue"


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const reviewsData = [
        {
            name: "Айболат",
            review: "Усердный постоянный персонал. Организация работы четкая, к пожеланиям относятся очень внимательно, реагируют быстро. Офис быстро реагирует на запросы. Профессионально и доброжелательно. Очень комфортно работать с компанией. Рекомендую."
        },
        {
            name: "Айнура",
            review: "Хорошая компания в своём сегменте. Достойное обслуживание каждого клиента.Обратившись в данную компанию, будьте уверены что всё пройдёт на высшем уровне."
        },
        {
            name: "Арсен",
            review: "Буквально недавно заказал уборку квартиры, которую сдавал. Прежние жильцы так угваздали мне ее, но девочки из из клининга вернули ей жизнь. Пропал весь запах посторонний и стало не стыдно показывать квартиру новым жильцам. Спасибо!"
        }
    ]



    const x = ref(3)

    function useBreakpoints() {
        let windowWidth = ref(window.innerWidth)

        const onWidthChange = () => windowWidth.value = window.innerWidth
        onMounted(() => window.addEventListener('resize', onWidthChange))
        onUnmounted(() => window.removeEventListener('resize', onWidthChange))

        const width = computed(() => windowWidth.value)
        if(windowWidth.value >= 1024) x.value = 3
        else if(windowWidth.value< 1024 &&  width.value > 600) x.value = 2
        else x.value = 1
        return  width 
    }
    const width = ref(useBreakpoints())

    onMounted(() => useBreakpoints())

    watch(width, () => {
        if(width.value >= 1024) x.value = 3
        else if(width.value< 1024 &&  width.value > 600) x.value = 2
        else x.value = 1
    });

    return {
      modules: [Pagination],
      reviewsData,
      width,
      x
    };
  },
};
</script>


<style>
.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: -5px;
    left: 0;
    width: 100%;
}
.swiper-pagination-bullet-active {
    background: rgb(234 88 12);
}
.swiper {
  width: auto;
}
.swiper-slide {
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}


</style>