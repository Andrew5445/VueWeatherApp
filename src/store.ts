import Vuex from 'vuex';
import Vue from 'vue';
import weatherSearch from '@/weather.search.store'
import { createDirectStore } from "direct-vuex";

Vue.use(Vuex)

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  modules: {
    weatherSearch,
  },
});

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions.
export { rootActionContext, moduleActionContext };

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}