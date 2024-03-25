<template>
  <td class="cart-item__media" role="cell" headers="CartDrawer-ColumnProductImage">
    <a :href="lineItem.url" class="cart-item__link" tabindex="-1" aria-hidden="true"> </a>
    <img
        class="cart-item__image"
        :src="lineItem.image"
        :alt="lineItem.image.alt"
        loading="lazy"
        width="150"
        :height="(150 / lineItem.image.aspect_ratio).toFixed()"
    >
  </td>

  <td class="cart-item__details" role="cell" headers="CartDrawer-ColumnProduct">

    <a :href="lineItem.url" class="cart-item__name h4 break">
      {{ lineItem.title }}
    </a>

    <div v-if="lineItem.original_price !== lineItem.final_price"
         class="cart-item__discounted-prices">
      <s class="cart-item__old-price product-option">
        ${{ (Number(lineItem.original_price) / 100).toFixed(2) }}
      </s>
      <strong class="cart-item__final-price product-option">
        ${{ (Number(lineItem.final_price) / 100).toFixed(2) }}
      </strong>
    </div>
    <div v-else class="product-option">
      ${{ (Number(lineItem.original_price) / 100).toFixed(2) }}
    </div>

    <dl v-if="!lineItem.product_has_only_default_variant">
      <div v-for="option in lineItem.options_with_values" class="product-option">
        <dt>{{ option.name }}: </dt>
        <dd>{{ option.value }} </dd>
        <br>
      </div>
    </dl>

  </td>

  <td class="cart-item__totals right" role="cell" headers="CartDrawer-ColumnTotal">
    <div class="cart-item__price-wrapper">
      <div v-if="lineItem.original_line_price !== lineItem.final_line_price"
           class="cart-item__discounted-prices">
        <s class="cart-item__old-price price price--end">
          ${{ (Number(lineItem.original_price) / 100).toFixed(2) }}
        </s>
        <span class="price price--end">
          ${{ (Number(lineItem.final_price) / 100).toFixed(2) }}
        </span>
      </div>

      <span v-else class="price price--end">
        ${{ (Number(lineItem.original_price) / 100).toFixed(2) }}
      </span>
    </div>
  </td>

  <td class="cart-item__quantity {% if has_qty_rules or has_vol_pricing %} cart-item__quantity--info{% endif %}"
      role="cell"
      headers="CartDrawer-ColumnQuantity"
  >
      <div class="cart-item__quantity-wrapper quantity-popover-wrapper">
        <div class="quantity-popover-container{% if has_qty_rules or has_vol_pricing %} quantity-popover-container--hover{% endif %}">
          <div class="quantity cart-quantity">
            <button class="quantity__button no-js-hidden" name="minus" type="button">
              -
            </button>
            <input
                class="quantity__input"
                type="number"
                name="updates[]"
                :value="lineItem.quantity"
                :min="lineItem.quantity_rule.min"
                :max="lineItem.quantity_rule.max ? lineItem.quantity_rule.max : ''"
                :step="lineItem.quantity_rule.increment"
                :aria-label="lineItem.title"
                :data-key="lineItem.key"
            >
            <button class="quantity__button no-js-hidden" name="plus" type="button">
              +
            </button>
          </div>
        </div>

        <div :data-key="lineItem.key">
          <button
              type="button"
              class="button button--tertiary cart-remove-button"
              :aria-label="lineItem.key.title">
            Remove
          </button>
        </div>
      </div>
  </td>
</template>

<script setup>

defineProps({
      lineItem: {
        type: Object,
        default: () => {
        },
      }
    }
)

</script>