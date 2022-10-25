<template>
  <section class="bg-orange-100 mt-36">
    <div class="lg:py-24 md:py-16 sm:py-12 py-8 pt-0 container mx-auto px-5 flex items-center justify-center">
        <div>
            <div v-for="(info, idx) in dataInfo"
                :key="idx"
                class="flex gap-5 items-start mt-10 sm:mt-14"
            >
                <img 
                    :src="info.src" 
                    :alt="info.title"
                    class="hidden sm:block w-24"
                >
                <div>
                    <p class="text-3xl font-bold text-orange-700">{{ info.title }}</p>
                    <p class="text-xl">{{ info.description }}</p>
                </div>
            </div>
        </div>
        
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            dataInfo: [
                {
                    title: "Проверенные клинеры",
                    src: require(`../img/verified.svg`),
                    description: "Все сотрудники проходят специальное обучение, имеют опыт работы от 3 лет"
                },
                {
                    title: "Безопасные моющие средства",
                    src: require(`../img/protection.svg`),
                    description: "Работаем с использованием безопасных гипоаллергенных средств компании «Era Cleanetica ECO»"
                },
                {
                    title: "Профессиональное оборудование",
                    src: require(`../img/medal.svg`),
                    description: "Используем в работе оборудование, которое позволяет производить бережную и эффективную уборку"
                },
                {
                    title: "Гарантия качества",
                    src: require(`../img/maintenance.svg`),
                    description: "Гарантия качественной уборки и сохранности имущества – оплата после уборки"
                },
                {
                    title: "Приезжаем в любое время",
                    src: require(`../img/24-hours.svg`),
                    description: "Работаем круглосуточно без выходных"
                }
            ]
        }
    }
}
</script>

<style>

</style>