<template>
  <div v-for="(lineItem, i) in cart.items" :key="lineItem.id + '-' + i"
       class="drawer__contents js-contents">
    <div class="drawer__cart-items-wrapper">
      <LineItem :lineItem="lineItem" :qty="lineItem.quantity"/>
    </div>
  </div>
</template>

<script setup>

import LineItem from "@/js/vue/components/LineItem.vue";

defineProps({
  cart: {
    type: Object,
    default: () => {},
  }
});

</script>