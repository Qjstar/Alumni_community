import imageCodeVue from './imageCode.vue';
import ListCardVue from './ListCard.vue';
import TabBarVue from './TabBar.vue';
import TopBarVue from './TopBar.vue';
import type { App } from 'vue';
const allGlobalComponent: any = { imageCodeVue, ListCardVue, TabBarVue, TopBarVue };

export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
  },
};
