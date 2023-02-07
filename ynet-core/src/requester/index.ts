import { EventHandler } from "../common/event";
import { Session } from "../storage/session";
import { Log } from "../common/log";
import { IContainer } from "../common/ioc";
import { arrayUtils } from "../common/utils";
// 会话缓存模块中
const SESSIONSTORAGETAG: string = "__YNETREQUESTERSESSIONSTORAGE__";
// 日志标记
const LOGTAG: string = "请求管理";
/** 请求终止状态码 */
export const BREAKCODE = "BREAK";
/** 请求配置注入标记 */
export const REQUESTERCONFIGINJECTTAGNAME = "YNET_REQUESTER_CONFIG";

export class Requester extends EventHandler {
    private storage: Session;

    private requestList: Array<RequestQueueItem> = [];

    public config: RequesterConfig = IContainer.get(REQUESTERCONFIGINJECTTAGNAME);

    constructor() {
        super();

        this.storage = new Session(SESSIONSTORAGETAG);
    }

    /**
     *  取消所有请求的回调函数,目前有两种情况:
     *      1.主动调用
     *      2.页面跳转时, 只取消settings.keepWhenRouting=false
     * @param {Boolean} forceCancelAll 是否全部取消
     * @return {void}
     */
    public cancelRequests(forceCancelAll: boolean) {
        let count = 0;
        for (var i = 0; i < this.requestList.length; i++) {
            var process = this.requestList[i];
            if (process && (forceCancelAll || !process.config.keepWhenRouting)) {
                if (typeof process.cancel == "function") {
                    process.cancel();
                    count++;
                }
            }
        }

        if (count) {
            Log.warn(LOGTAG, "执行请求终止操作，共终止了" + count + "条未完成请求");
        }
    }

    /**
     * Service服务请求方法
     * @param {{ new (): IService<I, O> }} service 请求配置类
     * @param {I} reqData 传入参数
     * @param {ViewBase} view 视图组件
     * @returns {Promise<O>} 延迟对象
     */
    service<I, O>(service: { new (): IService<I, O> }, option: RequestConfig<I, O>): Promise<O | RequesterError> {
        let serviceItem = new service();

        return this.request(serviceItem.url, option);
    }

    /**
     *  发送request 请求
     * @param {String} url 请求地址
     * @param {RequestConfig} option 请求配置参数
     * @return {void}
     */
    async request(url: string, option: RequestConfig<any, any>): Promise<any | RequesterError> {
        option.method = option.method || "post";
        option.url = url;
        option.loading = option.loading ?? true;

        // 添加触发事件 trigger 为继承父类EventHandler的方法 --- 请求开始前触发
        if (this.trigger("before", option) === false) {
            return new Promise((resolve: Function, reject: Function) => {
                this.callBackError(option, reject, {
                    code: BREAKCODE
                });
            });
        }
        // 获取请求触发器
        let handler = this.getHandler(option);

        // request 方法最终返回一个promise 对象,方便数据链式处理
        return new Promise(async (resolve: Function, reject: Function) => {
            // 请求以前判断缓存管理中是否存在缓存标识,如果存在,则从缓存中读取,如果不存在,则发送请求
            let cacheData = this.storage.get(`${option.url}|${option.cacheId}`); // 目的是确保唯一性

            if (cacheData) {
                Log.info(LOGTAG, `来自缓存：${option.url}|${option.cacheId}`);

                this.callBackError(option, resolve, cacheData);

                this.trigger("after", option);
                return;
            }

            // 转换请求数据
            option.data = (await this.config.transformReqData(option.data, option)) || option.data;

            let process: RequestQueueItem = {
                config: option,
                cancel: handler.send(option, async (state: RequestState, content: any) => {
                    //请求完毕后，清除列队
                    this.requestList = arrayUtils.without(this.requestList, process);

                    this.onRequestComplete(state, content, resolve, reject, option);

                    //触发事件
                    this.trigger("after", option);
                })
            };

            this.requestList.push(process);
        });
    }

    /**
     * 获取渠道传过来的请求触发器
     * @param {RequestConfig} option 请求配置参数
     * @return {IRequest}
     */
    private getHandler(option: RequestConfig<any, any>): IRequest {
        return this.config.getRequestHandler(option);
    }

    private callBackError(option: RequestConfig<any, any>, reject: Function, error: RequesterError) {
        if (option.error === undefined || option.error(error) !== false) {
            this.config.defaultErrorFunc(error);
        }
        reject(error);

        this.trigger("error", { error, option });
    }

    private callBackSuccess(option: RequestConfig<any, any>, resolve: Function, data: any) {
        option.success && option.success(data);

        resolve(data);
    }

    /**
     * 请求完成时候调用
     * @param {string} status 请求状态
     * @param {*} content 响应内容
     * @param {function} resolve 请求成功回调
     * @param {function} reject 请求失败回调
     * @param {RequestConfig} option 请求参数
     * @return {void}
     */
    private onRequestComplete(
        status: RequestState,
        content: any,
        resolve: Function,
        reject: Function,
        option: RequestConfig<any, any>
    ) {
        if (status === "canceled") {
            Log.info(LOGTAG, `请求：${option.url},请求被取消。`);

            this.callBackError(option, reject, { code: status });
            return;
        }

        if (status != "connect") {
            this.callBackError(option, reject, { code: status, message: content });
            return;
        }
        content = this.config.transformRspData(content, option);

        this.config.analyResult(
            content,
            (data: any) => {
                let rspData: any = data;

                this.callBackSuccess(option, resolve, rspData);

                if (option.enableCache) {
                    this.storage.set(`${option.url}|${option.cacheId}`, rspData, option.cacheTimer);
                }
            },
            (error: RequesterError) => {
                this.callBackError(option, reject, error);
            },
            option
        );
    }
}

/**
 * 规范底层处理类，所有触发器必须继承于接口类IRequest
 */
export interface IRequest {
    /**
     * send 发起请求的执行入口
     * 返回取消操作方法，供父组件进行取消操作
     */
    send(config: RequestConfig<any, any>, callBack: (state: RequestState, content?: any) => void): Function | any;
}

/**
 * 规范初始化配置参数类型
 */
export abstract class RequesterConfig {
    /** 自定义状态信息 */
    public statusMessage: Record<string, string> = {};

    /** 自定义请求数据转换方法 */
    public async transformReqData(data: any, config: RequestConfig<any, any>): Promise<any> {
        return data;
    }

    /** 自定义响应数据转换方法 */
    public transformRspData(data: any, config: RequestConfig<any, any>): any {
        return data;
    }

    /** 自定义获取请求触发器 */
    public abstract getRequestHandler(config: RequestConfig<any, any>): IRequest;

    /** 自定义默认错误处理方法 */
    public defaultErrorFunc(err: RequesterError): void {
        alert(err.message);
    }

    /** 请求结果分析 */
    public analyResult(
        content: any,
        success: (data: any) => void,
        error: (err: RequesterError, extendData: { [key: string]: any }) => void,
        option?: RequestConfig<any, any>
    ) {
        success(content);
    }
}

export type RequestConfig<I, O> = {
    [key: string]: any;
    /**请求路径 */
    url: string;
    /**请求类型 */
    method?:
        | "get"
        | "GET"
        | "delete"
        | "DELETE"
        | "head"
        | "HEAD"
        | "options"
        | "OPTIONS"
        | "post"
        | "POST"
        | "put"
        | "PUT"
        | "patch"
        | "PATCH"
        | "purge"
        | "PURGE"
        | "link"
        | "LINK"
        | "unlink"
        | "UNLINK";
    /**请求配置参数 */
    data: I;
    /** 文件（文件上传相关） */
    file: any;
    /** 文件名称（文件上传相关） */
    fileName: string;
    /**是否记录缓存 */
    enableCache?: boolean;
    /**缓存标识 */
    cacheId?: string;
    /**缓存时间（单位：毫秒） */
    cacheTimer?: number;
    /**httpHeader Http头*/
    headers?: Record<string, any>;
    /**路由跳转时保持请求 */
    keepWhenRouting?: boolean;
    /** 成功请求 */
    success?: (rspData: O) => void;
    /** 请求失败 */
    error?: (error: RequesterError) => Boolean | any;
    /**是否显示loading */
    loading?: boolean;
};

/**
 * 规范请求队列类型
 */
export type RequestQueueItem = {
    cancel: Function;
    config: RequestConfig<any, any>;
};

/**
 * 规范请求报错信息
 */
export type RequesterError = {
    [key: string]: any;
    code: string;
    message?: string;
};

/**
 * 枚举类型 请求状态
 */
export type RequestState = "connect" | "canceled" | string;

/**
 * Service接口类
 */
export abstract class IService<I, O> {
    public abstract url: string;
    public transfromReq(data: I): any {
        return data;
    }
    public transformRsp(data: any): O {
        return <O>data;
    }
}
