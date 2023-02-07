import { createRouter, Router, totalNextRoute, navtoRule, navRoute } from "uni-simple-router";
import { BaseVue } from "./base-vue";

export class BaseRouter {
    public routerHandler: Router;

    constructor(public option: RouterOption, baseVue: BaseVue) {
        this.option = this.option || {};
        this.routerHandler = createRouter({
            platform: <any>(process.env.VUE_APP_PLATFORM || "h5"),
            routes: [...ynet_process_routers],
            routerBeforeEach: ((to, from, next) => {
                if (this.option.onBefore) {
                    this.option.onBefore(to, from, next);
                } else {
                    next();
                }
            }),
            routerAfterEach: (to, from)=> {
                this.option.onAfter?.(to, from);
            }
        });

        baseVue.use(this.routerHandler);
    }   

    public async push(option: totalNextRoute | navRoute | string) {
        return this.routerHandler.push(option);
    }

    public replace(option: totalNextRoute | navRoute | string) {
        return this.routerHandler.replace(option);
    }
    // 等同于reLaunch
    public replaceAll(option: totalNextRoute | navRoute | string) {
        return this.routerHandler.replaceAll(option);
    }

    public switchTab(option: totalNextRoute | navRoute | string) {
        return this.routerHandler.pushTab(option);
    }

    public back() {
        this.routerHandler.back(1);
    }
}

export type RouterOption = {
    onBefore?: (to: navtoRule, from: navtoRule, next: (rule?: navtoRule | false) => void) => void;
    onAfter?: (to: navtoRule, from: navtoRule) => void;
};

declare const ynet_process_routers: any;
