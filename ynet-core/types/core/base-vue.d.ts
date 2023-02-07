import Vue, { VueConstructor } from "vue";
export declare class BaseVue {
    Vue: VueConstructor<Vue>;
    constructor();
    mainVue?: any;
    mixins(v: any): void;
    use(item: any, option?: any): void;
}
