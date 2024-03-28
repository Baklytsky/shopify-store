import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from "axios";

export const useCartStore = defineStore("cart", () => {
  const cart = ref({});

  const load = async () => {
    return new Promise((resolve, reject) => {
      axios.all([
        axios.get("/cart.js"),
        axios.get("/cart?section_id=cart-drawer-vue")
      ])
          .then(axios.spread((cartObj, cartSection) => {
            resolve(cartObj.data);
            resolve(cartSection.data);

            const settings = new DOMParser()
                .parseFromString(cartSection.data, 'text/html')
                .querySelector('[data-settings]');
            const settingsJSON = JSON.parse(settings.textContent)

            cart.value = cartObj.data;
            cart.settings = settingsJSON;
          }));
    });
  };

  const updateItem = ({ id, quantity, properties } = {}) => {
    return new Promise((resolve, reject) => {
      axios.post("/cart/change.js", { id, quantity, properties })
          .then((response) => {
            resolve(response.data);
            cart.value = response.data;
          })
          .catch((err) => {
            console.log(err);
            reject(new Error("Unable to update your cart."));
          });
    });
  };

  const addItem = ({ id, quantity, properties } = {}) => {
    return new Promise((resolve, reject) => {
      axios.post("/cart/add.js", {
            id,
            quantity,
            properties,
          })
          .then(() => {
            axios.all([
              axios.get("/cart.js"),
              axios.get("/cart?section_id=cart-drawer-vue")
            ])
                .then(axios.spread((cartObj, cartSection) => {
                  resolve(cartObj.data);
                  resolve(cartSection.data);

                  const settings = new DOMParser()
                      .parseFromString(cartSection.data, 'text/html')
                      .querySelector('[data-settings]');
                  const settingsJSON = JSON.parse(settings.textContent)

                  cart.value = cartObj.data;
                  cart.settings = settingsJSON;
                }));
          })
          .catch((err) => {
            console.log(err);
            reject(new Error("Unable to add the item to your cart."));
          });
    });
  };

  const addItems = (items) => {
    return new Promise((resolve, reject) => {
      let formData = {
        items: items,
      };
      axios.post("/cart/add.js", formData)
          .then(() => {
            axios.all([
              axios.get("/cart.js"),
              axios.get("/cart?section_id=cart-drawer-vue")
            ])
                .then(axios.spread((cartObj, cartSection) => {
                  resolve(cartObj.data);
                  resolve(cartSection.data);

                  const settings = new DOMParser()
                      .parseFromString(cartSection.data, 'text/html')
                      .querySelector('[data-settings]');
                  const settingsJSON = JSON.parse(settings.textContent)

                  cart.value = cartObj.data;
                  cart.settings = settingsJSON;
                  window.dispatchEvent(new Event("toggleCart"));
                }));
          })
          .catch((err) => {
            console.log(err);
            reject(new Error("Unable to add the item to your cart."));
          });
    });
  };

  onMounted(async () => {
    await load();
  });

  return { load, cart, addItem, addItems, updateItem };
});
