<template>
  <form action="/cart" id="CartDrawer-Form"
      class="cart__contents cart-drawer__form"
      method="post">
    <div class="drawer__contents js-contents">
      <div class="drawer__cart-items-wrapper">
        <table class="cart-items" role="table">
          <thead role="rowgroup">
          <tr role="row">
            <th
                id="CartDrawer-ColumnProduct"
                class="caption-with-letter-spacing"
                scope="col"
                role="columnheader" style="padding-bottom: 10px">
              Product
            </th>
            <th
                id="CartDrawer-ColumnTotal"
                class="right caption-with-letter-spacing"
                scope="col"
                role="columnheader" style="padding-bottom: 10px">
              Total
            </th>
          </tr>
          </thead>
          <tbody role="rowgroup">
            <tr v-for="(lineItem, i) in cart.items" :key="lineItem.id + '-' + i"
                :id="'CartDrawer-Item-' + i"
                class="cart-item"
                role="row">
              <LineItem :lineItem="lineItem" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
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