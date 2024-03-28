<template>
  <div class="drawer__footer">
    <div class="totals" style="padding-bottom: 20px">
      <h2 class="totals__total">Total: </h2>
      <p class="totals__total-value">${{ (Number(cartTotal) / 100).toFixed(2) }}</p>
    </div>
    <div class="cart__ctas">
      <button v-if="!cartIsEmpty"
          type="submit"
          id="CartDrawer-Checkout"
          class="cart__checkout-button button"
          name="checkout"
          form="CartDrawer-Form">
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cartTotal: {
    type: String
  },
  cartIsEmpty: {
    type: Boolean,
  }
});
</script>
