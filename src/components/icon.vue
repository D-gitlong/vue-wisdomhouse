<template>
  <svg :class="iconStyle" class="comIcon normal" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      iconStyle: String
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style scoped>
.comIcon{
  fill: #bfcbd9;
  overflow: hidden;
}
.small{
  width: .5em;
  height: .5em;
}
.normal{
  width: 1em;
  height: 1em;
}
.iconx{
  width: 1.5em;
  height: 1.5em;
}
.icon2x{
  width: 2em;
  height: 2em;
}
.icon3x{
  width: 2em;
  height: 2em;
}
.big{
  width: 5em;
  height: 5em;
}
</style>