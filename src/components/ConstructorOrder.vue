<template>
  <section class="container mx-auto px-5 mt-20">
    <p class="md:text-4xl sm:text-3xl text-2xl font-bold text-orange-600 text-center">
        Офармление заказа уборки
    </p>
    <div class="w-full flex items-start mt-10 gap-10 lg:flex-row flex-col">
        <div class="xl:w-9/12 lg:w-8/12 w-full">
            <div class="w-full">
                <p class="text-2xl font-bold">Вы выбрали</p>
                <div class="md:w-1/2 w-full mt-3 flex md:gap-5 gap-3">
                    <div class="w-1/2 border-2 border-orange-400 rounded-xl text-center px-5 py-1 cursor-pointer hover:bg-orange-400"
                         :class="{'bg-orange-400': !house}"
                         @click="isHouse(false)"
                    >
                        <p class="text-xl">Квартира</p>
                    </div>
                    <div class="w-1/2 border-2 border-orange-400 rounded-xl text-center px-5 py-1 cursor-pointer hover:bg-orange-400"
                         :class="{'bg-orange-400': house}"
                         @click="isHouse(true)"
                    >
                        <p class="text-xl">Дом</p>
                    </div>
                </div>

                <div class="md:w-1/2 w-full md:mt-5 mt-3 flex md:gap-5 gap-3">
                    <div class="w-1/2 border-2 border-orange-400 rounded-xl text-center px-3 flex items-center justify-between">
                        <p class="w-1/12 text-3xl text-left cursor-pointer hover:text-orange-400" @click="removeRoom()">-</p>
                        <p class="w-9/12 text-xl">{{ room }} комната</p>
                        <p class="w-1/12 text-3xl text-right cursor-pointer hover:text-orange-400" @click="addRoom()">+</p>
                    </div>
                    <div class="w-1/2 border-2 border-orange-400 rounded-xl text-center px-3 flex items-center justify-between">
                        <p class="w-1/12 text-3xl text-left cursor-pointer hover:text-orange-400 " @click="removeBathroom()">-</p>
                        <p class="w-9/12 text-xl">{{ bathroom }} санузел</p>
                        <p class="w-1/12 text-3xl text-right cursor-pointer hover:text-orange-400" @click="addBathroom()">+</p>
                    </div>
                </div>

            </div>
            <div>
                <RoomSize 
                    v-for="i in room" 
                    :key="i" 
                    :room="i + ' комната'" 
                    @add-size="addRoomSize"
                    @remove-size="removeRoomSize"
                />
                <RoomSize 
                    v-for="i in bathroom" 
                    :key="i" 
                    :room="i + ' санузел'" 
                    @add-size="addBathroomSize"
                    @remove-size="removeBathroomSize"
                />
            </div>
            <div class="w-full mt-10">
                <p class="text-2xl font-bold">Тип уборки</p>
                <div class="w-full mt-3 flex md:gap-5 gap-3 md:flex-row flex-col">
                    <div class="md:w-4/12 w-full border-2 border-orange-400 rounded-xl text-center px-5 py-2 cursor-pointer hover:bg-orange-400 flex items-center justify-center"
                         v-for="(type, idx) in types"
                         :key="idx"
                         @click="changeType(idx)"
                         :class="{'bg-orange-400': selectedType === idx}"
                    >
                        <p class="text-xl leading-5">{{ type }}</p>
                    </div>
                </div>
                
            </div>

            <div class="w-full mt-10">
                <p class="text-2xl font-bold">Частота уборки</p>
                <div class="w-full mt-3 flex md:gap-5 gap-3 md:flex-nowrap flex-wrap justify-center">
                    <div class="md:w-3/12 w-6/8 border-2 border-orange-400 rounded-xl text-center px-5 py-2 cursor-pointer hover:bg-orange-400 flex items-center justify-center flex-col"
                         v-for="(f, idx) in frequency"
                         :key="idx"
                         @click="changeFrequency(idx)"
                         :class="{'bg-orange-400': selectedFrequency === idx}"
                    >
                        <p class="text-xl leading-5">{{ f.title }}</p>
                        <p class="text-gray-600 leading-5">(скидка {{ f.sale }}%)</p>
                    </div>
                </div>
                
            </div>

            <div class="w-full mt-16">
                <p class="text-2xl font-bold">Дополнительные услуги</p>
                <div class="w-full mt-3 flex md:gap-5 gap-3 flex-wrap justify-center">
                    <div class="2xl:w-1/8 xl:w-2/8 lg:w-3/8 md:w-4/8 sm:w-5/8 w-6/8 flex justify-between items-center text-center flex-col"
                         v-for="(s, idx) in services"
                         :key="idx"
                         
                    >
                        <div class="w-full border-2 border-orange-400 rounded-xl p-5"
                             :class="{'bg-orange-400': s.count > 0}"
                        >
                            <img :src="s.img" :alt="s.title" class="w-full">
                        </div>
                        <p class="text-xl font-bold leading-5 mt-3">{{ s.title }}</p>
                        <p class="leading-5">({{ s.wt }})</p>
                        <div class="mt-3 sm:w-5/12 w-7/12 border-2 border-orange-400 rounded-xl text-center px-3 flex items-center justify-between">
                            <p class="text-3xl text-left cursor-pointer hover:text-orange-400 " @click="removeServiceCount(idx)">-</p>
                            <p class="text-xl">{{ s.count }}</p>
                            <p class="text-3xl text-right cursor-pointer hover:text-orange-400" @click="addServiceCount(idx)">+</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="xl:w-3/12 lg:w-4/12 w-full border-2 border-orange-400 rounded-2xl px-7 pt-5 pb-8">
            <p class="text-center text-2xl text-cyan-600 font-bold">Ваш заказ</p>
            <div class="text-xl">
                <div class="">
                    <p>{{ house ? 'Дом' : 'Квартира' }}</p>
                    <p v-if="totalRoomSize || totalBathroomSize">{{ totalRoomSize + totalBathroomSize }} Кв м2</p>
                    <p>{{ room }} комнаты</p>
                    
                    <p v-if="bathroom">{{ bathroom }} санузел</p>
                    <p>{{ types[selectedType] }}</p>
                    <p>{{ frequency[selectedFrequency].title }}</p>
                </div>
                <div class="border-b-2 border-gray-300 w-full my-5"></div>
                <div class="mt-5" v-if="services[0].count || services[1].count || services[2].count || services[3].count || services[4].count || services[5].count || services[6].count || services[7].count">
                    <p class="font-bold">Доп. опции:</p>
                    <p v-if="services[0].count">{{ services[0].title }} - {{ services[0].count }}</p>
                    <p v-if="services[1].count">{{ services[1].title }} - {{ services[1].count }}</p>
                    <p v-if="services[2].count">{{ services[2].title }} - {{ services[2].count }}</p>
                    <p v-if="services[3].count">{{ services[3].title }} - {{ services[3].count }}</p>
                    <p v-if="services[4].count">{{ services[4].title }} - {{ services[4].count }}</p>
                    <p v-if="services[5].count">{{ services[5].title }} - {{ services[5].count }}</p>
                    <p v-if="services[6].count">{{ services[6].title }} - {{ services[6].count }}</p>
                    <p v-if="services[7].count">{{ services[7].title }} - {{ services[7].count }}</p>
                    <div class="border-b-2 border-gray-300 w-full my-5"></div>
                </div>
            </div>
            
            <div>
                <p class="text-cyan-600 text-2xl font-bold">К оплате : <span class="text-gray-400 text-xl line-through font-medium mx-1"> {{ price }} </span> {{ totalPrice }}тг.</p>
                <p class="text-green-700 text-lg">Ваша скидка ({{ frequency[this.selectedFrequency].sale }}%):  {{ price - totalPrice }}тг.</p>
                

                <p v-if="errorRoomSize" class="text-red-600 mt-5 text-center">Добавьте кв. м2 комнаты</p>
                <button @click="open()"  class="w-full mt-5  bg-cyan-500 text-2xl text-white rounded-xl py-2  shadow-xl hover:bg-cyan-600 hover:shadow-2xl">Заказать уборку</button>
            
            </div>
            
        </div>
    </div>
  </section>


  <section 
    class="min-h-screen min-w-screen z-50 top-0 right-0 left-0 popup"
    @click.self="close()"
    :class="{'fixed' : openPopup,
             'hidden' : !openPopup }"
  >
    <div class="bg-white  opacity-100 2xl:w-3/12 xl:w-3/12 xl:mt-52 md:mt-24 lg:w-4/12 md:w-5/12 w-screen h-screen md:overflow-y-auto md:pb-7  overflow-y-scroll md:h-auto mt-0 mx-auto my-auto px-10 pt-5 pb-36 rounded-xl">
        <div class="flex justify-between items-start">
            <p class="text-2xl text-orange-600 font-bold">Заказать уборку</p>
            <svg class="w-6 cursor-pointer" 
                 @click="close()"                
                 viewBox="0 0 16 16" 
                 xmlns="http://www.w3.org/2000/svg" 
                 fill="currentColor">
                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
        </div>
        <div class="mt-10">
            <div v-if="popupMode === 'defuald'">
                <input type="text" v-model="name" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-orange-400 rounded-xl transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:border-2 focus:outline-none" placeholder="Имя">
                <input type="text" pattern="\d*" v-model="phone" class="mt-3 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-orange-400 rounded-xl transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:border-2 focus:outline-none" placeholder="Телефон">
                <p v-if="!validVals" class="text-red-600 text-sm mt-3">Некорректные данные</p>
                <button @click="order()" class="bg-orange-400 w-full rounded-xl py-1.5 text-white font-bold mt-8 hover:bg-orange-500 text-xl">
                    <p v-if="!sending">Заказать</p> 
                    <div v-else-if="sending">
                        <svg role="status" class="inline mr-3 w-6 h-6 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Отправка...
                    </div>
                    </button>
                
            </div>
            <div v-else-if="popupMode === 'ok'" class="text-center">
                <p class="text-xl font-bold text-orange-500">Ваш заказ принят!</p>
                <p>В ближайшее время мы свяжемся с вами.</p>
                <button @click="close()" class="bg-orange-400 w-full rounded-xl py-1.5 text-white font-bold mt-8 hover:bg-orange-500 text-xl"> Закрыть</button>
            </div>
            <div v-else-if="popupMode === 'error'" class="text-center">
                <p class="text-xl font-bold text-orange-500">Ошибка!</p>
                <p>Что то произошло не так.</p>
                <p>Повторите попытку позже.</p>
                <button @click="close()" class="bg-orange-400 w-full rounded-xl py-1.5 text-white font-bold mt-8 hover:bg-orange-500 text-xl"> Закрыть</button>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import sendMessage from '../api/sendMessage.js'
import RoomSize from './RoomSize.vue';
export default {
    components: {
        RoomSize
    },
    data() {
        return {
            popupMode: "defuald",
            openPopup: false,
            name: '',
            phone: '+7 ',
            types: ["Влажная поддерживающая", "Люкс", "После ремонта"],
            frequency: [
                {
                    title: "Один раз",
                    sale: 5
                },
                {
                    title: "Раз в месяц",
                    sale: 10
                },
                {
                    title: "Каждые две недели",
                    sale: 15
                },
                {
                    title: "Каждую неделю",
                    sale: 20
                }
            ],
            services: [
                {
                    title: "Помыть окна",
                    wt: "1шт.",
                    img: require(`../img/window.svg`),
                    count: 0
                },

                {
                    title: "Помыть витражи",
                    wt: "1шт.",
                    img: require(`../img/stained-glass-window.svg`),
                    count: 0
                },
                
                {
                    title: "Помыть холодильник",
                    wt: "внутри",
                    img: require(`../img/fridge.svg`),
                    count: 0
                },
                
                {
                    title: "Почистить печь",
                    wt: "внутри",
                    img: require(`../img/oven-pngrepo-com.svg`),
                    count: 0
                },
                
                {
                    title: "Кухонный гарнитур",
                    wt: "внутри",
                    img: require(`../img/outline.svg`),
                    count: 0
                },
                
                {
                    title: "Убрать шкаф",
                    wt: "внутри",
                    img: require(`../img/7077078.svg`),
                    count: 0
                },
                
                {
                    title: "Помыть люстру",
                    wt: "1шт.",
                    img: require(`../img/chandelier.svg`),
                    count: 0
                },
                
                {
                    title: "Чистка микроволновки",
                    wt: "внутри",
                    img: require(`../img/microwave-oven.svg`),
                    count: 0
                }
            ],
            house: false,
            room: 1,
            totalRoomSize: 0,
            countAddingRoomSize: 0,
            bathroom: 0,
            totalBathroomSize: 0,
            selectedType: 0,
            selectedFrequency: 0,
            price: 0,
            totalPrice: 0,
            errorRoomSize: false,
            validVals: true.valueOf,
            sending: false
        }
    },

    methods: {
        isHouse(val) {
            this.house = val;
            this.calculatePrice()
        },

        addRoom() {
            this.room++
            this.calculatePrice()
        },
        addRoomSize(size) {
            this.totalRoomSize += +size
            this.countAddingRoomSize++
            this.errorRoomSize = false
            this.calculatePrice()
        },
        removeRoomSize(size) {
            this.totalRoomSize -= +size 
            this.countAddingRoomSize--
            this.calculatePrice()
        },
        removeRoom() {
            if(this.room > 1) {
                this.room--
            }
            this.calculatePrice()
        },

        addBathroom() {
            this.bathroom++
            this.calculatePrice()
        },

        addBathroomSize(size) {
            this.totalBathroomSize += +size
            this.countAddingRoomSize++
            this.errorRoomSize = false
            this.calculatePrice()
        },
        removeBathroomSize(size) {
            this.totalBathroomSize -= +size 
            this.countAddingRoomSize--
            this.calculatePrice()

        },

        removeBathroom() {
            if(this.bathroom > 0) {
                this.bathroom--
            }
            this.calculatePrice()
        },

        changeType(type) {
            this.selectedType = type
            this.calculatePrice()
        },

        changeFrequency(frequency) {
            this.selectedFrequency = frequency
            this.calculatePrice()
        },

        addServiceCount(id) {
            this.services[id].count++
            this.calculatePrice()
        },

        removeServiceCount(id) {
            if(this.services[id].count > 0) {
                this.services[id].count--
            }
            this.calculatePrice()
        },

        open() {
            this.checkRoomSizeError()
            if(!this.errorRoomSize) this.openPopup = true
        },

        checkRoomSizeError() {
            if (this.room + this.bathroom === this.countAddingRoomSize) {
                this.errorRoomSize = false
            }
            else this.errorRoomSize = true

        },

        close() {
            this.openPopup = false
            this.popupMode = "defuald"
            this.name = ''
            this.phone = '+7 '
            this.price = 5000
            this.totalPrice = 4750
        },

        async order() {
            if( this.name !== '' && this.phone.length === 18){
                const message = this.createMessage()
                this.sending = true
                const res = await sendMessage(message)
                this.validVals = true
                this.sending = false
                 
                if(res === "OK") {
                    this.popupMode = "ok"
                    // this.sending = false
                    this.defaultVal()
                }
                else if(res === "ERROR") this.popupMode = 'error'
            }
            else this.validVals = false
        },

        defaultVal() {
            this.house = false
            this.room = 1
            this.bathroom =  0
            this.selectedType = 0
            this.selectedFrequency = 0

            for (let index = 0; index < this.services.length; index++) {
                this.services[index].count = 0
            }
        },

        calculatePrice() {
            this.price = 0
            this.totalPrice = 0
            if(this.selectedType === 0){
                this.price = this.price + (this.totalRoomSize * 400)
                this.price = this.price + (this.totalBathroomSize * 400)
                // this.price = 3000
                // if(!this.house) {
                //     this.price = this.price + (this.room * 2000)
                //     this.price = this.price + (this.bathroom * 2000)
                // }
                // else{
                //     this.price = this.price + (this.room * 3000)
                //     this.price = this.price + (this.bathroom * 3000)
                // }
            }
            
            else if(this.selectedType === 1){
                this.price = this.price + (this.totalRoomSize * 450)
                this.price = this.price + (this.totalBathroomSize * 450)
                // if(!this.house) {
                //     this.price = 7000
                //     this.price = this.price + (this.room * 2000)
                //     this.price = this.price + (this.bathroom * 2000)
                // }
                // else{
                //     this.price = 9000
                //     this.price = this.price + (this.room * 3000)
                //     this.price = this.price + (this.bathroom * 3000)
                // }
            }

            else if(this.selectedType === 2){
                this.price = this.price + (this.totalRoomSize * 500)
                this.price = this.price + (this.totalBathroomSize * 500)
                // if(!this.house) {
                //     this.price = 8000
                //     this.price = this.price + (this.room * 4000)
                //     this.price = this.price + (this.bathroom * 3000)
                // }
                // else{
                //     this.price = 9000
                //     this.price = this.price + (this.room * 6000)
                //     this.price = this.price + (this.bathroom * 5000)
                // }
            }

            this.price = this.price + (this.services[0].count * 1500)
            this.price = this.price + (this.services[1].count * 5000)
            this.price = this.price + (this.services[2].count * 1500)
            this.price = this.price + (this.services[3].count * 1200)
            this.price = this.price + (this.services[4].count * 2000)
            this.price = this.price + (this.services[5].count * 800)
            this.price = this.price + (this.services[6].count * 500)
            this.price = this.price + (this.services[7].count * 800)


            this.totalPrice = this.price - (this.price * (this.frequency[this.selectedFrequency].sale / 100))
        },

        createMessage() {
            let msg = ""
            let phone = "+7" + this.phone.slice(3, 8) + this.phone.slice(9, 19)
            let d = new Date();
            let dformat =  [d.getDate(),
                            d.getMonth()+1,
                            d.getFullYear()].join('.')+' '+
                            [d.getHours(),
                            d.getMinutes(),
                            d.getSeconds()].join(':');

            msg += `Имя клиента: <b>${ this.name }</b>\n`
            msg += `Номер телефона: <b>${ phone }</b>\n`
            msg += "\n"
            msg += `<b>-------- Заказ --------</b>\n\n`
            msg += `<b>${ this.house ? "Дом" : "Квартира" }</b>\n`
            msg += `Площадь уборки: <b>${ this.totalRoomSize + this.totalBathroomSize }кВ. м2</b>\n`
            msg += `Кол. комнаты: <b>${ this.room }</b>\n`
            msg += `Кол. санузел: <b>${ this.bathroom }</b>\n`
            msg += `Тип уборки: <b>${ this.types[this.selectedType] }</b>\n`
            msg += `Частота уборки: <b>${ this.frequency[this.selectedFrequency].title }</b>\n\n`
            if(this.services[0].count || this.services[1].count || this.services[2].count || this.services[3].count || this.services[4].count || this.services[5].count || this.services[6].count || this.services[7].count) {
                msg += `Доп. опции:\n`
                msg += this.services[0].count ? `<b>${this.services[0].title} - ${this.services[0].count}</b>\n` : ""
                msg += this.services[1].count ? `<b>${this.services[1].title} - ${this.services[1].count}</b>\n` : ""
                msg += this.services[2].count ? `<b>${this.services[2].title} - ${this.services[2].count}</b>\n` : ""
                msg += this.services[3].count ? `<b>${this.services[3].title} - ${this.services[3].count}</b>\n` : ""
                msg += this.services[4].count ? `<b>${this.services[4].title} - ${this.services[4].count}</b>\n` : ""
                msg += this.services[5].count ? `<b>${this.services[5].title} - ${this.services[5].count}</b>\n` : ""
                msg += this.services[6].count ? `<b>${this.services[6].title} - ${this.services[6].count}</b>\n` : ""
                msg += this.services[7].count ? `<b>${this.services[7].title} - ${this.services[7].count}</b>\n` : ""
                msg += "\n"
            }
            msg += `<b>------------------------</b>\n`
            msg += `Цена без скидки: <b>${ this.price }тг</b>\n`;
            msg += `Цена co скидкой: <b>${ this.totalPrice }тг</b>\n`;
            msg += `Скидка: <b>${ this.frequency[this.selectedFrequency].sale }%</b>\n`;
            msg += "\n"
            msg += `Время заказа: <b>${ dformat }</b>`;
            
            return msg
        }
    },

    watch: {
        phone() {
            const regex = new RegExp('[0-9]');
            const l = this.phone.length
            if(!regex.test(this.phone[l-1])){
                this.phone = this.phone.slice(0, l-1)
            }
            
            if(this.phone === '') this.phone = '+7 '
            if(this.phone.slice(0, 1) !== '+') this.phone = '+7 '
            if(this.phone.slice(0, 2) !== '+7') this.phone = '+7 '
            if(this.phone.slice(0, 3) !== '+7 ') this.phone = '+7 '

            if(this.phone[3] !== '(' && this.phone.length === 4) this.phone = this.phone.slice(0, 3) + "(" + this.phone.slice(3, 4)
            if(this.phone[7] !== ')' && this.phone.length === 8) this.phone = this.phone.slice(0, 7) + ")" + this.phone.slice(7, 8)
            if(this.phone[8] !== ' ' && this.phone.length === 9) this.phone = this.phone.slice(0, 8) + " " + this.phone.slice(8, 9)
            if(this.phone[12] !== '-' && this.phone.length === 13) this.phone = this.phone.slice(0, 12) + "-" + this.phone.slice(12, 13)
            if(this.phone[15] !== '-' && this.phone.length === 16) this.phone = this.phone.slice(0, 15) + "-" + this.phone.slice(15, 16)
            if(this.phone.length === 19) this.phone = this.phone.slice(0, 18)
        }
    }

}
</script>

<style scoped>
.popup {
    background-color: rgba(15, 23, 42, 0.61);
    backdrop-filter: blur(4px);
}
</style>