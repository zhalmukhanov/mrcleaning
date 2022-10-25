<template>
  <section class="bg-orange-400 mt-20 md:py-28 py-16 ">
    <div class="container mx-auto px-5 flex items-center justify-center flex-col text-center">
        <p class="md:text-4xl sm:text-3xl text-2xl  font-bold ">При заказе генеральной уборки</p>
        <p class="md:text-2xl sm:text-xl text-base font-medium">химчистка мягкой мебели со скидкой 25%</p>
        <div class="lg:w-3/12 md:w-5/12 sm:w-8/12 w-11/12 mt-16 ">
            <input type="text" pattern="\d*" v-model="phone" placeholder="Ваш номер" class="text-center w-full block px-4 py-2  text-gray-800 shadow-2xl bg-white rounded-xl sm:text-md focus:ring-blue-500 focus:border-orange-500">    
            <p v-if="!validVals" class="text-red-600 text-sm mt-3">Некорректные данные</p>
            <button @click="send" class="w-full bg-cyan-500 mt-5 py-2 rounded-xl text-white hover:bg-cyan-600">Заказать уборку</button>
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
            <div v-if="popupMode === 'ok'" class="text-center">
                <p class="text-xl font-bold text-orange-500">Ваш заявка принят!</p>
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
export default {
  data() {
    return {
      phone: '+7 ',
      popupMode: "defuald",
      openPopup: false,
      validVals: true
    }
  },
  methods:{
    open() {
        this.openPopup = true
    },

    close() {
        this.openPopup = false
        this.phone = '+7 '
    },

    async send() {
        if( this.phone.length === 18 ){
            const message = this.createMessage()
            const res = await sendMessage(message)

            this.open()
            if(res === "OK") {
                this.popupMode = "ok"
                this.defaultVal()
            }
            else if(res === "ERROR") this.popupMode = 'error'
        }
        else this.validVals = false
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

            msg += `Номер телефона: <b>${ phone }</b>\n`
            msg += "\n"
            
            msg += `Скидка: <b>25%</b>\n`;
            msg += "\n"
            msg += `Время заявки: <b>${ dformat }</b>`;
            
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