<template>
  <section class="container mx-auto px-5 flex flex-col items-center md:mt-32 sm:mt-24 mt-16 w-full">
    <p class="md:text-5xl sm:text-4xl text-3xl font-bold text-orange-600 text-center">
        Из чего складывается уборка
    </p>

    <div class="w-full flex flex-col items-center md:mt-16 sm:mt-14 mt-10">
        <div class="lg:w-5/12 md:w-8/12 sm:w-9/12 w-full flex items-center justify-between lx:text-3xl  lg:text-2xl  mb:text-2xl sm:text-xl text-base">
            <button v-for="(item, idx) in roomInfoData" :key="idx" @click="select(item)"
                    class="sm:px-3 px-2 py-1 border-b-4"
                    :class="{'border-b-4 border-orange-600 font-medium': item.title == selectRoom.title}"
            >
            {{ item.title }}
        </button>
        </div>

        <div class="w-full flex lg:items-start lg:flex-row flex-col items-center mb:mt-10 sm:mt-8 mt-5">
            <img :src="selectRoom.src" 
                 class="rounded-xl xl:w-7/12 lg:w-6/12 w-11/12">
            <div class="xl:w-5/12 lg:w-6/12 sm:pt-0 pt-5">
                <div 
                    v-for="(i, idx) in selectRoom.info" 
                    :key="idx"
                    class="flex gap-3 md:ml-10 items-start"
                >
                    <svg class="xl:w-10 lg:w-9 w-8 lg:mt-2" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;">
                        <g>
                            <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
                                c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
                                c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
                                c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
                                C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
                                c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"/>
                        </g>
                    </svg>
                    <div class="w-11/12">
                        <p class="xl:text-3xl lg:text-3xl sm:text-2xl text-xl">{{ i }}</p>
                    </div>
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
            roomInfoData: [
                {
                    title: "Каридор",
                    src: require(`../img/corridor.jpg`),
                    info: ['Протираем светильники и фасады шкафов, входную дверь', 'Очищаем от загрязнений стеклянные поверхности, полки и зеркала', 'Вытираем от пыли все доступные поверхности', 'Моем пол и плинтуса', 'Пылесосим ковры и коврики']
                },
                {
                    title: "Кухня",
                    src: require(`../img/kitchen.jpg`),
                    info: ['Делаем влажную уборку фасадов шкафов', 'Моем холодильник и вытяжку', 'Чистим столешницу и фартук', 'Моем посуду и раковину', 'Моем пол и плинтуса', 'Выносим мусор']
                },
                {
                    title: "Ванная",
                    src: require(`../img/bathroom.jpg`),
                    info: ['Моем кафельную плитку', 'Делаем влажную уборку всех доступных поверхностей', 'Моем стеклянные поверхности и зеркала', 'Чистим и дезинфицируем сантехнику (смесители, раковины, унитазы, биде)', 'Моем ванну и душевую кабину', 'Моем пол и плинтуса', 'Выносим мусор']
                },
                {
                    title: "Комната",
                    src: require(`../img/badroom.jpg`),
                    info: ['Очищаем ручки межкомнатных дверей, розетки, провода и выключатели', 'Очищаем от загрязнений стеклянные поверхности, полки и зеркала', 'Вытираем от пыли все доступные поверхности и детали интерьера', 'Делаем влажную и сухую протирку оргтехники', 'Аккуратно складываем вещи на места хранения', 'Протираем подоконники', 'Меняем постельное белье и заправляем кровати', 'Пылесосим ковры', 'Моем пол и плинтуса', 'Выносим мусор']
                }
            ],
            selectRoom: {
                title: "Каридор",
                src: require(`../img/corridor.jpg`),
                info: ['Протираем светильники и фасады шкафов, входную дверь', 'Очищаем от загрязнений стеклянные поверхности, полки и зеркала', 'Вытираем от пыли все доступные поверхности', 'Моем пол и плинтуса', 'Пылесосим ковры и коврики']
            }
        }
    },
    methods: {
        select(val) {
            this.selectRoom = val;
        }
    }
    
}
</script>

<style>

</style>