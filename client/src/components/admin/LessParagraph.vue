<template>
  <span>{{ finalText }}</span>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 25,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
      finalText: "",
    };
  },
  mounted() {
    if (this.text.length > this.num) {
      this.finalText = this.text.slice(0, this.num) + " . . .";
    } else {
      this.finalText = this.text;
    }
  },
};
</script>

<style lang="scss" scoped></style>
