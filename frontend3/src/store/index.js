import { createStore } from "vuex";
import { auth } from "./auth.module";
import {friend} from "./friend.module";

const store = createStore({
  modules: {
    auth,
    friend,
  },
});

export default store;