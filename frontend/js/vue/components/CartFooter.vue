<template>
  <div class="drawer__footer">
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
  cartIsEmpty: {
    type: Boolean,
  }
});
</script>
