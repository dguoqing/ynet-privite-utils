import { Application, RequestConfig, IService, RequesterError } from "@ynet/miniprogram-core";
declare module "vue/types/vue" {
    interface Vue {
        /**
         * @ynet/miniprogram-core Application
         */
        $app: Application;
        /**
         * 发起请求
         * @param url 请求Url
         * @param config 请求配置
         */
        request(url: string, config: RequestConfig<any, any>): Promise<any | RequesterError>;
        /**
         * 调用服务
         * @param service 服务方法
         * @param option 服务配置
         */
        service<I, O>(service: { new (): IService<I, O> }, option: RequestConfig<I, O>): Promise<O | RequesterError>;
    }
}
