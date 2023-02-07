import Vue from "vue";
import { BaseRouter, RouterOption } from "./router";
import { Requester } from "../requester";
import { Local } from "../storage/local";
import { Session } from "../storage/session";
import { BaseVue } from "./base-vue";
export declare class Application {
    param: AppParams;
    /**
     *  会话缓存
     */
    sessionStorage: Session;
    /**
     * 持久化缓存
     */
    localStorage: Local;
    /**
     * 请求管理
     */
    requester: Requester;
    /**
     * 路由管理
     */
    router: BaseRouter;
    /**
     * Vue视图管理
     */
    baseVue: BaseVue;
    constructor(param: AppParams);
    start(): Application;
    routerMount(app: Vue): void;
}
export declare type AppParams = {
    el: string;
    sessionStorageName?: string;
    localStorageName?: string;
    routerOption?: RouterOption;
};
