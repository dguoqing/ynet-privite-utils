import { Router, totalNextRoute, navtoRule, navRoute } from "uni-simple-router";
import { BaseVue } from "./base-vue";
export declare class BaseRouter {
    option: RouterOption;
    routerHandler: Router;
    constructor(option: RouterOption, baseVue: BaseVue);
    push(option: totalNextRoute | navRoute | string): Promise<void>;
    replace(option: totalNextRoute | navRoute | string): void;
    replaceAll(option: totalNextRoute | navRoute | string): void;
    switchTab(option: totalNextRoute | navRoute | string): void;
    back(): void;
}
export declare type RouterOption = {
    onBefore?: (to: navtoRule, from: navtoRule, next: (rule?: navtoRule | false) => void) => void;
    onAfter?: (to: navtoRule, from: navtoRule) => void;
};
