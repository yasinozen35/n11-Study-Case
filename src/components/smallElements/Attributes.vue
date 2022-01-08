<template>
  <div>
    <div
      class="row mx-0 mt-2 ps-lg-3"
      :key="index"
      v-for="(data, index) in selectableAttributes"
    >
      <div class="col-2 p-0">
        <div class="d-flex justify-content-between align-items-center h-100">
          <p class="m-0">{{ data.name }}</p>
          <p class="m-0">:</p>
        </div>
      </div>
      <div class="col-10 attributes">
        <button
          @click="setAttributeData(value, index)"
          class="float-start me-1"
          :key="valueIndex"
          v-for="(value, valueIndex) in data.values"
          :class="{
            activeColor: value === attribute.selectColor,
            activeSize: value === attribute.selectSize
          }"
          :disabled="index == 1 && attribute.sizes.includes(value) == false"
        >
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RateAndCommet',
  data () {
    return {
    }
  },
  methods: {
    setAttributeData (value, index) {
      this.$emit('setAttributeData', {value, index})
    }
  },
  props: {
    selectableAttributes: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    attribute: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.attributes button {
  height: 40px;
  width: 130px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 2px;
  background-color: white;
  margin-bottom:0
}
.attributes button:hover,
.attributes button.activeColor,
.attributes button.activeSize {
  border: 3px solid rgb(148, 139, 139);
}
</style>
