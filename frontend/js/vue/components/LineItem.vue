<template>
  <div>
    <div style="width: 120px; height: 120px; position: relative;">
      <img :src="lineItem.image"
           :alt="lineItem.title"
           style="position: absolute; top: 0; left: 0; object-fit: contain; object-position: center; width: 100%; height: 100%;"
           loading="lazy" />
    </div>
    <div>{{ lineItem.title }}</div>
    <div>{{ lineItem.quantity }}</div>
  </div>
</template>

<script setup>
defineProps({
      lineItem: {
        type: Object,
        default: () => {},
      }
    }
)

</script>