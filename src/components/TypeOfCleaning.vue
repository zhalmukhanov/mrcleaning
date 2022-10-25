<template>
  <section class="container mx-auto px-5 mt-24">
    <p class="md:text-5xl sm:text-4xl text-3xl font-bold text-orange-600 text-center">
        Виды уборки
    </p>
    <div class="flex items-center justify-center mb:mt-16 sm:mt-12 mt-10 flex-col">
        <div class="flex justify-center gap-10 lg:flex-nowrap flex-wrap ">
            <div 
                v-for="(info,idx) in dataTypes"
                :key="idx"
                class="lg:w-3/12 sm:w-5/12 w-full border border-orange-600 box-shodow rounded-xl flex flex-col items-center p-5 py-10 shadow-xl  text-center"
            >
                <p class="text-2xl font-bold ">{{ info.title }}</p>
                <p class="text-xl mt-10">{{ info.description }}</p>
                <button class="text-sm underline text-orange-600 mt-10"
                        @click="openDetailInfo(info)"
                >Что входит в стоимость</button>
                <p class="text-xl mt-5 font-bold">Цена от {{ info.price }} тг/м2</p>
                
            </div>
        </div>

        <button @click="$emit('goToOrder')" class="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 text-2xl font-bold rounded-md mt-16">Заказать</button>
    </div>
  </section>

  <section 
    class="min-h-screen min-w-screen z-50 top-0 right-0 left-0 popup"
    @click.self="closeDetailInfo()"
    :class="{'fixed' : detailShow,
             'hidden' : !detailShow }"
  >
    <div class="bg-white  opacity-100 2xl:w-4/12 xl:w-5/12 xl:mt-52 md:mt-24 lg:w-7/12 md:w-9/12 w-screen h-screen md:overflow-y-auto md:pb-7  overflow-y-scroll md:h-auto mt-0 mx-auto my-auto px-10 pt-5 pb-36 rounded-xl">
        <div class="flex justify-between items-start">
            <p class="text-2xl text-orange-600 font-bold">{{ detailInfo.title }}</p>
            <svg class="w-8 cursor-pointer" 
                 @click="closeDetailInfo()"                
                 viewBox="0 0 16 16" 
                 xmlns="http://www.w3.org/2000/svg" 
                 fill="currentColor">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
        </div>
        <div class="mt-5">
            <p
                v-for="(i, idx) in detailInfo.detail"
                :key="idx"
            >
                - {{ i }}
            </p>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            detailShow: false,
            detailInfo: {},
            dataTypes: [
                {
                    title: "Влажная поддерживающая",
                    description: "Еженедельная уборка для поддержания частоты",
                    detail: ["Протираем доступные повехности", "Очищаем заркала и стеклянные поверхности", "Заправляем кровати, меняем постельное белье (по желанию клиента)", "Делаем влажную и сухую протирку техники", "Чистим и дезинфицируем сантехнику", "Моем посуду и раковину", "Моем ванну и душевую кабину", "Моем полы и плинтуса", "Пылесосим ковры и коврики"],
                    price: 400
                },
                {
                    title: "Люкс",
                    description: "Тщательная уборка всех поверхностей и труднодоступных мест с использованием необходимой химии и инвентаря",
                    detail: ["Протираем все доступные внешние поверхности", "Отодвигаем мебель и протираем под ней", "Протираем мебель снаружи и внутри","Чистим зеркала и стеклянные поверхности", "Пылесосим мягкую мебель", "Моем осветительные приборы (торшеры, бра, напольные люстры)", "Обеспыливаем стены и радиаторы", "Моем плинтуса и пол", "Убираем пыль с бытовых приборов и предметов интерьера", "Складываем одежду", "Застилаем кровать и меняем постельном белье (по желанию клиента)", "Моем дверные блоки( дверь, наличники, замки)", "Моем ванную, душевую кабину, раковину", "Чистим кафель на полу и стенах", "Чистим и дезинфицируем сантехнику", "Моем труднодоступные места", "Моем и чистим снаружи и внутри кухонную технику", "Моем и обезжириваем фартук, столешницу", "Моем раковину, посуду в ней, смеситель"],
                    price: 450
                },
                {
                    title: "После ремонта",
                    description: "Уборка и полное обеспыливание после ремонта любого масштаба. Вынос строительной пыли и материалов.",
                    detail: ["Очистка стен от мелкодисперсной пыли", "Обеспыливание стен, потолка, мебели и фурнитуры", "Сухая и влажная уборка всех поверхностей, внешних фасадов, бытовой техники, мебели", "Протираем корпусную мебель снаружи и внутри (если они пустые)", "Удаление следов цемента, шпаклевки, затирки, бетона и различных растворов", "Очистка поверхностей от мелких строительных отходов и мусора", "Мытье плинтусов и пола от различных загрязнений", "Удаляем пыль и загрязнения с радиаторов и подоконников", "Протираем все осветительные приборы, бра, люстры, торшеры", "Чистим стеклянные и зеркальные поверхности", "Протираем и обеспыливаем двери, проемы, фурнитуру, розетки, выключатели", "Моем столешницу, вытяжку, кухонный фартук", "Удаляем грязь и строительный мусор из трудно доступных мест", "Моем сантехнику, душевую кабину, ванную", "Протираем плитку", "Пылесосим, влажная уборка плинтусов и пола"],
                    price: 500
                }
            ]
        }
    },
    methods: {
        openDetailInfo(val) {
            this.detailInfo = val;
            this.detailShow = true;
        },
        closeDetailInfo() {
            this.detailShow = false;
        }
    }

}
</script>

<style scoped>
.popup {
    background-color: rgba(15, 23, 42, 0.537);
    backdrop-filter: blur(4px);
}
</style>