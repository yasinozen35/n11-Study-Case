<template>
  <div class="row mx-0">
    <div class="col-12 p-0 m-0">
      <h4>
        {{ `${formatNumber(price.min)} - ${formatNumber(price.max)}` }}
        <label>/ Adet</label>
      </h4>
      <label
        >{{ baremList[0].minimumQuantity }} Adet (Minimum Sipariş
        Adedi)</label
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaxAndMinPrice',
  data () {
    return {
    }
  },
  methods: {
    formatNumber (num) {
      return (
        num
          .toFixed(2)
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' TL'
      )
    }
  },
  props: {
    baremList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    price: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
