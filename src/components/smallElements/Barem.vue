<template>
  <div class="row mx-0 mt-3 barem ps-lg-3">
    <div class="col-2 p-0 mt-3">
      <div
        class="d-flex justify-content-between align-items-center h-100"
      >
        <p class="m-0">Toptan Fiyat <br />(Adet)</p>
        <p class="m-0">:</p>
      </div>
    </div>
    <div class="col-10 mt-3">
      <ul class="m-0 p-0 list-unstyled">
        <li
          class="float-start me-1"
          :key="index"
          v-for="(value, index) in baremList"
          :class="{
            selectedBarem:
              quantityValue >= Number(value.minimumQuantity) &&
              quantityValue <= Number(value.maximumQuantity)
          }"
        >
          {{ `${value.minimumQuantity} - ${value.maximumQuantity}` }}
          <br />
          {{ `${value.price} TL` }}
        </li>
      </ul>
    </div>
    <div class="col-2 p-0 my-3">
      <div
        class="d-flex justify-content-between align-items-center h-100"
      >
        <p class="m-0">Adet</p>
        <p class="m-0">:</p>
      </div>
    </div>
    <div
      class="col-10 d-flex justify-content-start align-items-center my-3"
    >
      <input class="me-2" type="text" v-model="quantityValue" />
      <label class="me-2">Adet</label>
      <span class="text-danger" v-show="quantityValue < 120"
        >* Minimum sipariş adedi
        {{ baremList[0].minimumQuantity }} olmalıdır!</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Barem',
  data () {
    return {
      quantityValue: 0
    }
  },
  created () {
    this.quantityValue = this.quantity
  },
  props: {
    baremList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    quantity: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 0
    }
  },
  watch: {
    quantityValue () {
      this.$emit('quantityValue', Number(this.quantityValue))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.barem {
  background-color: #f5f5f5;
}
.barem li {
  padding: 5px;
  padding-right: 35px;
  border-right: 1px solid #ddd;
}
.barem li:last-child {
  border: unset;
}
.selectedBarem {
  background-color: #ffedb9;
}
input {
  border: 1px solid #ddd;
  text-align: center;
  width: 80px;
  height: 40px;
}
</style>
