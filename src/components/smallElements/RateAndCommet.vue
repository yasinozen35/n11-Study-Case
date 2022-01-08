<template>
  <div class="row mx-0">
    <div class="col-12 p-0 m-0">
      <div class="w-100 d-flex justify-content-center d-lg-block mt-2 mb-2">
        <div class="float-start me-1">
          <i
            class="fas fa-star rating"
            :class="{ 'rating-active': setRating(item) }"
            @click="rating.selected = item"
            @mouseover="rating.current = item"
            @mouseout="rating.current = 0"
            :key="item"
            v-for="item in 5"
          ></i>
        </div>
        <p v-show="rating.selected != 0" class="float-start me-2">
          {{ `- ${rating.selected}` }}
        </p>
        <p class="comment-text">0 Yorum</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RateAndCommet',
  data () {
    return {
      rating: {
        current: 0,
        selected: 0
      }
    }
  },
  methods: {
    setRating (item) {
      return this.rating.selected >= this.rating.current
        ? item <=
            (this.rating.selected !== 0
              ? this.rating.selected
              : this.rating.current)
        : item <= this.rating.current
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rating:hover,
.rating-active {
  cursor: pointer;
  color: rgb(255, 181, 22) !important;
}
.comment-text {
  color: blue;
  cursor: pointer;
  font-weight: 300;
  margin: 0px;
  padding: 0px;
}
</style>
