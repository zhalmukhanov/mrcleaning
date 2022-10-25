<template>
    <div v-if="mode === 'change'" class="mt-5 flex gap-2 items-center">
      <p>{{ room }}</p>
      <input type="number" pattern="\d*" v-model="size" class="form-control block w-20 text center px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-orange-400 rounded-xl transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:border-2 focus:outline-none" placeholder="кв м2">
      <p>кв. м2</p>
      <button @click="save()" class="bg-orange-500 py-1 px-2 rounded-lg ml-2 hover:bg-orange-600">Добавить</button>
    </div>

    <div v-else-if="mode === 'save'" class="mt-5 flex gap-2 items-center">
      <p>{{ room }} <span class="font-bold">{{ size }}</span> кв. м2</p>
      <button @click="change()" class="ml-2 text-orange-400 border-b-2 border-orange-400 hover:text-orange-600 hover:border-orange-600">Изменить</button>
    </div>
</template>

<script>
export default {
  props: {
    room: {
      type: String,
      required: true
    }
  },
  emits: {
    "addSize": value => typeof value === "number",
    "removeSize": value => typeof value === "number",
  },
  data() {
    return {
      mode: "change",
      size: ''
    }
  },
  methods: {
    save() {
      if(this.size && this.size !== '0'){
        this.mode = "save"
        this.$emit('addSize', this.size)
      }
    },
    change() {
      this.mode = "change"
      this.$emit('removeSize', this.size)
    }
  }
}
</script>

<style>

</style>