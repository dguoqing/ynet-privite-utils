import Vue from "vue";
import { RouterMount } from "uni-simple-router";
import { BaseRouter, RouterOption } from "./router";
import { IService, RequestConfig, Requester, RequesterError } from "../requester";
import { Local } from "../storage/local";
import { Session } from "../storage/session";
import { BaseVue } from "./base-vue";
export class Application {
    /**
     *  会话缓存
     */
    public sessionStorage: Session;
    /**
     * 持久化缓存
     */
    public localStorage: Local;
    /**
     * 请求管理
     */
    public requester: Requester;

    /**
     * 路由管理
     */
    public router: BaseRouter;

    /**
     * Vue视图管理
     */
    public baseVue: BaseVue;

    constructor(public param: AppParams) {
        this.sessionStorage = new Session(param.sessionStorageName || "YNET_APP_SESSION");
        this.localStorage = new Local(param.localStorageName || "YNET_APP_LOCAL");
        this.requester = new Requester();
        this.baseVue = new BaseVue();
        this.router = new BaseRouter(param.routerOption || {}, this.baseVue);

        return this;
    }

    public start(): Application {
        let self = this;

        this.baseVue.Vue.prototype.$app = this;

        this.baseVue.mixins({
            methods: {
                request(url: string, config: RequestConfig<any, any>): Promise<any | RequesterError> {
                    return self.requester.request(url, config);
                },
                service<I, O>(
                    service: { new (): IService<I, O> },
                    option: RequestConfig<I, O>
                ): Promise<O | RequesterError> {
                    return self.requester.service(service, option);
                }
            }
        });

        this.router.routerHandler.beforeEach((from, to, next) => {
            this.requester.cancelRequests(false);
            next();
        });
        
        return this;
    }

    public routerMount(app: Vue) {
        RouterMount(app, this.router.routerHandler, this.param.el);
    }
}

export type AppParams = {
    el: string;
    sessionStorageName?: string;
    localStorageName?: string;
    routerOption?: RouterOption;
};