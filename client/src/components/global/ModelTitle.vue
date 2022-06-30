<template>
    <!--Title-->
    <div class="flex items-center justify-between pb-3">
    <p class="text-2xl font-bold">
        <slot></slot>
    </p>
    <div class="z-50 cursor-pointer modal-close" @click="close()">
        <svg
        class="text-black fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        >
        <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
        />
        </svg>
    </div>
    </div>
</template>

<script>
export default {
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>