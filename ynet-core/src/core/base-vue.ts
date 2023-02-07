import Vue, { VueConstructor } from "vue";

export class BaseVue {
    public Vue: VueConstructor<Vue> = Vue;

    constructor() {
        this.Vue.config.productionTip = false;
    }

    public mainVue?: any;

    public mixins(v: any) {
        this.Vue.mixin(v);
    }

    public use(item: any, option?: any) {
        this.Vue.use(item, option);
    }  
}
