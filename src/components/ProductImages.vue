<template>
  <div class="hello">
    <div class="row mx-0">
      <div class="col-12 full-image">
        <img
          class="img-fluid mx-auto d-block"
          alt="full-product-image"
          :src="selectImage"
        />
      </div>
      <div class="col-12">
        <div class="row mx-0 h-100">
          <div class="col-1 d-flex align-items-center h-100">
            <i @click="previousImage()" class="fa fa-chevron-left" />
          </div>
          <div class="col-10 mx-auto">
            <div class="thumbnail-slide text-center">
              <div
                class="thumbnail"
                :key="index"
                v-for="(image, index) in images"
              >
                <img
                  @click="setSelectImage(image)"
                  class="img-thumbnail p-0"
                  alt="thumbnail-product-image"
                  :src="image"
                  :class="{ active: selectImage == image }"
                />
              </div>
            </div>
          </div>
          <div class="col-1 d-flex align-items-center h-100">
            <i @click="nextImage()" class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductImages',
  data () {
    return {
      selectImage: ''
    }
  },
  methods: {
    setSelectImage (image) {
      this.selectImage = image
    },
    nextImage () {
      const maxIndex = this.images.length - 1
      const currentIndex = this.images.indexOf(this.selectImage)
      const nextIndex = currentIndex + 1
      // eslint-disable-next-line no-unused-expressions
      nextIndex <= maxIndex
        ? this.setSelectImage(this.images[nextIndex])
        : this.setSelectImage(this.images[0])
    },
    previousImage () {
      const maxIndex = this.images.length - 1
      const currentIndex = this.images.indexOf(this.selectImage)
      const previousIndex = currentIndex - 1
      // eslint-disable-next-line no-unused-expressions
      previousIndex >= 0
        ? this.setSelectImage(this.images[previousIndex])
        : this.setSelectImage(this.images[maxIndex])
    }
  },
  props: {
    images: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  mounted () {
    const scrollContainer = document.querySelector('.thumbnail-slide')
    scrollContainer.addEventListener('wheel', evt => {
      evt.preventDefault()
      scrollContainer.scrollLeft += evt.deltaY
    })
  },
  created () {
    this.setSelectImage(this.images[0])
  },
  watch: {
    images () {
      this.setSelectImage(this.images[0])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-image {
  max-height: 500px;
}

.thumbnail-slide {
  min-width: 95%;
  height: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.thumbnail {
  width: 100px;
  padding: 12px;
  display: inline-block;
  height: 100px;
}
.thumbnail img {
  cursor: pointer;
}
.thumbnail img:hover,
.thumbnail img.active {
  border: 3px solid #96999d;
}
i {
  font-size: 26px;
  cursor: pointer;
}
</style>
