import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Vtour from "@/components/Vtour";
import CosV5 from "@/components/CosV5";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "CosV5",
      component: CosV5
    },
    {
      path: "/vr",
      name: "Vtour",
      component: Vtour
    },
  ]
});
