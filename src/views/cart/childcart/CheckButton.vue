<template>
    <div>
      <div class="icon-selector" :class="{'selector-active': isCheck}">
        <img src="@/assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: true
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    /* cursor: pointer; */
  }

  .selector-active {
    background-color: #f33333;
    border-color: #f33333;
  }
</style>
