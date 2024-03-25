<template v-if="cartReady">
  <div v-if="cartHasItems" :class="[
      'drawer',
      {
        'animate active': cartOpen,
      }]">
    <div id="CartDrawer" class="cart-drawer">
      <div id="CartDrawer-Overlay" class="cart-drawer__overlay" @click="toggleCart()"></div>
      <div class="drawer__inner gradient color-scheme-1">
        <CartHeader :toggleCart="toggleCart"/>

        <div class="">
          <LineItems :cart="cart"/>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="cartIsEmpty" class="">
    Cart Empty
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import LineItems from "@/js/vue/components/LineItems.vue";
import CartHeader from "@/js/vue/components/CartHeader.vue";

const cart = ref({});
const cartOpen = ref(false);
const cartReady = computed(() => Object.keys(cart).length > 0);
const cartHasItems = computed(() => {
  return cart.value.items && cart.value.items.length > 0;
});
const cartIsEmpty = computed(() => {
  return cart.value.items?.length === 0 && cart.value.item_count === 0;
});
const headerToggle = document.querySelectorAll("[data-toggle-cart]");
const load = () => {
  return new Promise((resolve, reject) => {
    fetch('/cart.js')
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
          cart.value = data;
        })
        .catch((error) => {
          reject(error)
        });
  });
}

const toggleCart = () => {
  cartOpen.value = !cartOpen.value;
  document.body.classList.toggle('overflow-hidden', cartOpen.value)
};

onMounted(() => {
  load();
  window.addEventListener("toggleCart", toggleCart);
  window.addEventListener("updateCart", () => {
    load().then(() => toggleCart());
  });
  headerToggle.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
  }))
});
</script>