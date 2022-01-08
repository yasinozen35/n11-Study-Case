<template>
  <div class="row mx-0 mt-3">
    <div class="col-2 p-0">
      <div class="d-flex justify-content-between align-items-center">
        <p class="m-0">Toplam</p>
        <p class="m-0">:</p>
      </div>
    </div>
    <div class="col-10">
      <h3 class="m-0">{{ `${formatNumber(price.total)}` }}</h3>
    </div>
    <div class="offset-lg-2 col-12 col-lg-10 text-muted mt-3">
      <i class="fa fa-truck"></i> Kargo ücreti:
      <span class="text-primary">Alıcı Öder</span>
    </div>
    <div class="offset-lg-2 col-6 col-lg-4 v-h-center my-3">
      <button
        :disabled="basketButtonStatus"
        @click="addBasket()"
        class="btn btn-warning w-100 text-white text-uppercase addBasket"
      >
        Sepete Ekle
      </button>
    </div>
    <div class="col-6 d-flex align-items-center my-3">
      <p class="text-primary m-0 p-0">Ödeme Seçenekleri</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalAndBasket',
  data () {
    return {
    }
  },
  methods: {
    addBasket () {
      this.$emit('addBasket')
    },
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
    price: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    basketButtonStatus: {
      type: Boolean,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addBasket {
  height: 60px;
}
</style>
