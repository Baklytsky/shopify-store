<template v-if="cartReady">
  <div :class="[
      'drawer animate',
      {
        'active': cartOpen,
      }]">
    <div v-if="cartHasItems" id="CartDrawer" class="cart-drawer">
      <div id="CartDrawer-Overlay" class="cart-drawer__overlay" @click="toggleCart()"></div>
      <div class="drawer__inner gradient color-scheme-1">
        <CartHeader :toggleCart="toggleCart"/>
        <LineItems :cart="cart"/>
        <CartFooter :cartIsEmpty="cartIsEmpty" :cartTotal="cart.total_price"/>
      </div>
    </div>
    <div v-else-if="cartIsEmpty" class="">
      <div id="CartDrawer-Overlay" class="cart-drawer__overlay" @click="toggleCart()"></div>
      <div class="drawer__inner gradient color-scheme-1">
        <CartEmpty :toggleCart="toggleCart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/js/vue/Stores/cartStore.js";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import LineItems from "@/js/vue/components/LineItems.vue";
import CartHeader from "@/js/vue/components/CartHeader.vue";
import CartFooter from "@/js/vue/components/CartFooter.vue";
import CartEmpty from "@/js/vue/components/CartEmpty.vue";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const cartOpen = ref(false);
const cartReady = computed(() => Object.keys(cart).length > 0);
const cartHasItems = computed(() => {
  return cart.value.items && cart.value.items.length > 0;
});
const cartIsEmpty = computed(() => {
  return cart.value.items?.length === 0 && cart.value.item_count === 0;
});
const headerToggle = document.querySelectorAll("[data-toggle-cart]");

const toggleCart = () => {
  cartOpen.value = !cartOpen.value;
  document.body.classList.toggle('overflow-hidden', cartOpen.value)
};

const openCart = () => {
  cartOpen.value = true;
  document.body.classList.toggle('overflow-hidden', cartOpen.value)
};

const updateCartBubbles = () => {
  document.querySelectorAll('.cart-count-bubble').forEach(bubble => {
    bubble.querySelectorAll('span').forEach(i => i.innerHTML = cart.value.item_count)
  })
}

onMounted(() => {
  window.addEventListener("toggleCart", toggleCart);
  window.addEventListener("updateCart", () => {
    cartStore.load().then(() => {
          openCart();
          updateCartBubbles();
        }
    );
  });
  headerToggle.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
  }))
});
</script>