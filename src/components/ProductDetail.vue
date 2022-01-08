<template>
  <div class="row mx-0">
    <div class="col-12 col-lg-6 mt-5">
      <ProductImages :images="images" />
    </div>
    <div class="col-12 col-lg-6 mt-5">
      <div class="w-100 text-center text-lg-start">
        <h1>{{ productTitle }}</h1>
        <RateAndCommet />
        <MaxAndMinPrice :baremList="baremList" :price="price" />
        <Attributes
          :attribute="attribute"
          :selectableAttributes="selectableAttributes"
          @setAttributeData="setAttributeData($event)"
        />
        <Barem :baremList="baremList" :quantity="quantity" @quantityValue="setQuantity($event)" />
        <TotalAndBasket :basketButtonStatus="basketButtonStatus" :price="price" @addBasket="addBasket" />
      </div>
    </div>
  </div>
</template>

<script>
import productData from '../assets/data'
import ProductImages from './ProductImages.vue'
import RateAndCommet from './smallElements/RateAndCommet.vue'
import Attributes from './smallElements/Attributes.vue'
import MaxAndMinPrice from './smallElements/MaxAndMinPrice.vue'
import Barem from './smallElements/Barem.vue'
import TotalAndBasket from './smallElements/TotalAndBasket.vue'
export default {
  name: 'ProductDetail',
  data () {
    return {
      productTitle: productData.productTitle,
      selectableAttributes: productData.selectableAttributes,
      baremList: productData.baremList,
      productVariants: productData.productVariants,
      images: [],
      products: [],
      selectedProduct: {},
      attribute: {
        sizes: [],
        colors: [],
        selectColor: '',
        selectSize: ''
      },
      quantity: 0
    }
  },
  components: {
    ProductImages,
    RateAndCommet,
    Attributes,
    MaxAndMinPrice,
    Barem,
    TotalAndBasket
  },
  computed: {
    basketButtonStatus () {
      return !(
        this.quantity >= 120 && Object.keys(this.selectedProduct).length > 0
      )
    },
    selectedBarem () {
      return (
        this.baremList.find(
          value =>
            this.quantity >= Number(value.minimumQuantity) &&
            this.quantity <= Number(value.maximumQuantity)
        ) || { price: 0 }
      )
    },
    price () {
      let price = {
        min: 0,
        max: 0,
        total: 0
      }
      price.min = this.selectedBarem.price
      price.max = price.min + price.min * 0.3
      price.total = this.quantity * this.selectedBarem.price
      return price
    }
  },
  methods: {
    addBasket () {
      const data = {
        productId: Number(this.selectedProduct.id),
        selectedBarem: this.selectedBarem,
        quantity: this.quantity
      }
      console.log(data)
    },
    setQuantity (value) {
      this.quantity = value
    },
    setProducts () {
      this.products = this.productVariants.filter(product => {
        return this.attribute.selectColor !== ''
          ? product.attributes.find(
            attribute => attribute.value === this.attribute.selectColor
          )
          : product.attributes.find(
            attribute => attribute.value === this.attribute.selectSize
          )
      })
    },
    setImages () {
      if (
        this.attribute.selectColor !== '' &&
        this.attribute.selectColor !== undefined
      ) {
        let product = this.products.find(product => {
          let attributesArray = product.attributes.map(
            attribute => attribute.value
          )
          return attributesArray.includes(this.attribute.selectSize) &&
            attributesArray.includes(this.attribute.selectColor)
            ? product.images
            : undefined
        })
        product !== undefined
          ? (this.images = product.images)
          : (this.images = [])
        this.selectedProduct = product
      } else {
        let images = []
        this.productVariants.map(product =>
          product.images.forEach(image => images.push(image))
        )
        images = this.uniqueItems(images)
        this.images = images
      }
    },
    setAttributeData (data) {
      const { value, index } = data
      index === 0 ? this.setSelectColor(value) : this.setSelectSize(value)
    },
    setColors () {
      const colors = this.productVariants
        .map(product => {
          return product.attributes.map(attribute =>
            attribute.name === 'Renk' ? attribute.value : undefined
          )
        })
        .map(product => product[1])
      this.attribute.colors = this.uniqueItems(colors)
    },
    setSelectColor (value) {
      this.attribute.selectColor =
        value === undefined
          ? ''
          : this.attribute.selectColor === value
            ? this.clearData()
            : value
      this.setProducts()
      this.setSizes()
      this.setSelectSize(this.attribute.sizes[0])
    },
    setSelectSize (value) {
      this.attribute.selectSize = value === undefined ? '' : value
      this.setProducts()
      this.setSizes()
      this.setImages()
    },
    clearData () {
      this.attribute.selectColor = ''
      this.attribute.selectSize = ''
      this.selectedProduct = {}
      this.setColors()
      this.setProducts()
      this.setSizes()
      this.setImages()
    },
    setSizes () {
      const sizes = this.products
        .filter(product => {
          return product.attributes.filter(
            attribute => attribute.value === this.attribute.selectColor
          )
        })
        .map(product =>
          product.attributes.map(attribute =>
            attribute.name === 'Beden' ? attribute.value : undefined
          )
        )
        .map(product => product[0])
      this.attribute.sizes = this.uniqueItems(sizes)
    },
    uniqueItems (array) {
      return [...new Set(array)]
    },
    randomNumber (max) {
      return Math.floor(Math.random() * max)
    }
  },
  created () {
    this.setColors()
    // this.attribute.selectColor = this.attribute.colors[this.randomNumber(2)] Rastgele renk seçimi için
    this.setProducts()
    this.setSizes()
    this.setImages()
    // this.setSelectSize(this.attribute.sizes[0]) Rastgele renk seçildikten sonra ilk beden seçimi buradan yapılır.
    this.quantity = this.baremList[0].minimumQuantity
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-h-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
h5 label {
  font-weight: 400;
}
label {
  font-size: 14px;
  color: #ccc;
}
</style>
