const FlyioWX = require("flyio/dist/npm/wx.js");
const flyio = new FlyioWX();
import { IRequest, RequestConfig, RequestState } from "@ynet/miniprogram-core";
/**
 * 默认请求触发器管理
 * @class RequestByAjax 默认请求触发器类
 */
export class RequestByFlyio implements IRequest {
    /**
     * 默认触发器发送请求
     * @param {RequestConfig} config 请求配置参数
     * @param {Function} callBack 回调函数
     * @return {*}
     */
    public send(config: RequestConfig<any, any>, callBack: (state: RequestState, content?: any) => void): Function {
        let promiseHandler: Promise<any>;

        promiseHandler = flyio.post(config.url, config.data, config);

        let canceled = false;

        promiseHandler
            .then(function (response: any) {
                if (canceled) {
                    callBack("canceled");
                    return;
                }

                callBack("connect", response.data);
            })
            .catch(function (error: any) {
                if (canceled) {
                    callBack("canceled");
                    return;
                }

                if (error.response) {
                    // 发送请求后，服务端返回的响应码不是 2xx
                    callBack("error", "服务请求失败");
                } else if (error.request) {
                    if (error.request.readyState == 4 && error.request.status == 0) {
                        callBack("timeout");
                    } else {
                        callBack("error");
                    }
                } else {
                    callBack("error");
                }
            });
        return function () {
            canceled = true;
        };
    }
}
