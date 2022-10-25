<template>
  <section class="bg mt-28">
    <div class="container mx-auto px-5 flex flex-col items-center justify-center lg:py-32 md:py-28 py-20">
        <p class="md:text-4xl sm:text-3xl text-2xl font-bold text-white text-center">
            Как мы работаем
        </p>
        <div class="flex w-full justify-between items-center md:mt-16 mt-10 md:flex-row flex-col md:gap-0 gap-5">
            
            <div v-for="(step, idx) in steps" 
                :key="idx"
                class="md:w-3/12 w-full flex items-center gap-5 md:flex-row flex-col"
            >
                <div class="md:w-10/12 w-full flex flex-col items-center text-white text-center">
                    <p class="lg:text-2xl text-xl font-bold">{{ step.title }}</p>
                    <p class="mt-1 lg:text-base text-sm">{{ step.description }}</p>
                </div>
                <svg class="md:w-2/12 w-10 fill-white md:mr-5 md:rotate-0 rotate-90" v-if="idx !== 3" viewBox="0 0 30.729 30.729" style="enable-background:new 0 0 30.729 30.729;">
                    <g>
                        <path d="M24.813,15.366L10.185,29.997c-0.487,0.487-1.128,0.731-1.768,0.731c-0.641,0-1.279-0.244-1.769-0.731
                            c-0.977-0.978-0.977-2.561,0-3.536l11.095-11.096L6.649,4.268c-0.976-0.977-0.976-2.56,0-3.536c0.977-0.977,2.56-0.976,3.536,0
                            L24.813,15.366z"/>
                    </g>
                </svg>

            </div>
        </div>
    </div>
  </section>


</template>

<script>
export default {
    data() {
        return {
            steps: [
                {
                    title: "Заявка",
                    description: ""
                },
                {
                    title: "Расчет",
                    description: "Мы предоставляем вам смету по стоимости уборки"
                },
                {
                    title: "Уборка",
                    description: ""
                },
                {
                    title: "Оплата",
                    description: "Оплата после осмотра убранного помещения"
                }
            ]
        }
    }
}
</script>

<style scoped>
.bg {
  background-image: url('../img/howWorkingBg.jpg');
  background-size: cover;
  
  background-position: 50% 75%;
}

@media (min-width: 768px){
    .bg {
      background-attachment: fixed; 
    }
  }
</style>