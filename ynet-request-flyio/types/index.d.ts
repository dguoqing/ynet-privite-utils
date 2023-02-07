import { IRequest, RequestConfig, RequestState } from "@ynet/miniprogram-core";
/**
 * 默认请求触发器管理
 * @class RequestByAjax 默认请求触发器类
 */
export declare class RequestByFlyio implements IRequest {
    /**
     * 默认触发器发送请求
     * @param {RequestConfig} config 请求配置参数
     * @param {Function} callBack 回调函数
     * @return {*}
     */
    send(config: RequestConfig<any, any>, callBack: (state: RequestState, content?: any) => void): Function;
}
