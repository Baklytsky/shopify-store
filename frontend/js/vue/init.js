import { createApp } from "vue/dist/vue.esm-bundler.js";
import { createPinia } from "pinia";

const pinia = createPinia();
const isDesignMode = window.Shopify.designMode || window.Shopify.inspectMode;
import components from "./components/index.js";

const renderVueApps = (eventTarget = "[data-vue-root]") => {
  const vueRoots = document.querySelectorAll(eventTarget);
  vueRoots.forEach((root) => {
    const app = createApp();
    const componentName = root.dataset.vueRoot;
    const component = components[componentName];

    app.component(componentName, component);
    app.use(pinia);
    app.mount(root);
    if (isDesignMode) {
      const appSectionLoad = (event) => {
        const parentSectionId = `#shopify-section-${event.detail.sectionId}`;
        if (root.closest(parentSectionId) !== null) {
          app.unmount();
          document.removeEventListener("shopify:section:load", appSectionLoad);
        }
      };
      document.addEventListener("shopify:section:load", appSectionLoad);
    }
  });
};

window.addEventListener("load", () => {
  renderVueApps();
});

/**
 * Customizer Refresh Apps Code
 */

if (isDesignMode) {
  window.renderVueApps = renderVueApps;
  const refreshVue = (event) => {
    if (event?.detail?.sectionId) {
      renderVueApps(
          `#shopify-section-${event.detail.sectionId} [data-vue-root]`,
          isDesignMode
      );
    }
  };

  const onShopifySectionChange = () => {
    refreshVue();
  };

  document.addEventListener("shopify:section:load", () => {
    onShopifySectionChange();
  });

  document.addEventListener("shopify:section:reorder", () => {
    onShopifySectionChange();
  });
}