<template>
  <section class=" bg-gray-700 mt-24">
    <div class="container mx-auto px-5 sm:py-24 py-16 flex flex-col text-white items-center">
        <div class="w-full flex justify-center sm:gap-24 sm:flex-row flex-col gap-8 text-center">
            <div v-for="(link, idx) in footerData"
                 :key="idx"
            >
                <p class="text-xl font-bold">{{ link.name }}</p>
                <a :href="link.href" target="_blank" class="text-cyan-500 hover:text-cyan-600 ">{{ link.text }}</a>
            </div>
        </div>

        <div class="flex gap-5 mt-10">
            <a v-for="(link, idx) in socialLinks" :key="idx" :href="link.link">
                <img :src="link.icon" class="w-8">
            </a>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            footerData: [
                {
                    name: "Email",
                    text: "kanafina.ara@mail.ru",
                    href: "#"
                },
                {
                    name: "Телефон",
                    text: "+7 (707) 303-33-22",
                    href: "tel:+77073033322"
                }
            ],
            socialLinks: [
                {
                    link: "https://wa.me/77770418810",
                    icon: require(`../img/whatsapp.png`)
                },
                {
                    link: "https://www.instagram.com/mr.cleaning_02/",
                    icon: require(`../img/instagram.png`)
                }
            ]
        }
    }
}
</script>

<style>

</style>