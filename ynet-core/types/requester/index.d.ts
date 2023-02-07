import { EventHandler } from "../common/event";
/** 请求终止状态码 */
export declare const BREAKCODE = "BREAK";
/** 请求配置注入标记 */
export declare const REQUESTERCONFIGINJECTTAGNAME = "YNET_REQUESTER_CONFIG";
export declare class Requester extends EventHandler {
    private storage;
    private requestList;
    config: RequesterConfig;
    constructor();
    /**
     *  取消所有请求的回调函数,目前有两种情况:
     *      1.主动调用
     *      2.页面跳转时, 只取消settings.keepWhenRouting=false
     * @param {Boolean} forceCancelAll 是否全部取消
     * @return {void}
     */
    cancelRequests(forceCancelAll: boolean): void;
    /**
     * Service服务请求方法
     * @param {{ new (): IService<I, O> }} service 请求配置类
     * @param {I} reqData 传入参数
     * @param {ViewBase} view 视图组件
     * @returns {Promise<O>} 延迟对象
     */
    service<I, O>(service: {
        new (): IService<I, O>;
    }, option: RequestConfig<I, O>): Promise<O | RequesterError>;
    /**
     *  发送request 请求
     * @param {String} url 请求地址
     * @param {RequestConfig} option 请求配置参数
     * @return {void}
     */
    request(url: string, option: RequestConfig<any, any>): Promise<any | RequesterError>;
    /**
     * 获取渠道传过来的请求触发器
     * @param {RequestConfig} option 请求配置参数
     * @return {IRequest}
     */
    private getHandler;
    private callBackError;
    private callBackSuccess;
    /**
     * 请求完成时候调用
     * @param {string} status 请求状态
     * @param {*} content 响应内容
     * @param {function} resolve 请求成功回调
     * @param {function} reject 请求失败回调
     * @param {RequestConfig} option 请求参数
     * @return {void}
     */
    private onRequestComplete;
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
export declare abstract class RequesterConfig {
    /** 自定义状态信息 */
    statusMessage: Record<string, string>;
    /** 自定义请求数据转换方法 */
    transformReqData(data: any, config: RequestConfig<any, any>): Promise<any>;
    /** 自定义响应数据转换方法 */
    transformRspData(data: any, config: RequestConfig<any, any>): any;
    /** 自定义获取请求触发器 */
    abstract getRequestHandler(config: RequestConfig<any, any>): IRequest;
    /** 自定义默认错误处理方法 */
    defaultErrorFunc(err: RequesterError): void;
    /** 请求结果分析 */
    analyResult(content: any, success: (data: any) => void, error: (err: RequesterError, extendData: {
        [key: string]: any;
    }) => void, option?: RequestConfig<any, any>): void;
}
export declare type RequestConfig<I, O> = {
    [key: string]: any;
    /**请求路径 */
    url: string;
    /**请求类型 */
    method?: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";
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
export declare type RequestQueueItem = {
    cancel: Function;
    config: RequestConfig<any, any>;
};
/**
 * 规范请求报错信息
 */
export declare type RequesterError = {
    [key: string]: any;
    code: string;
    message?: string;
};
/**
 * 枚举类型 请求状态
 */
export declare type RequestState = "connect" | "canceled" | string;
/**
 * Service接口类
 */
export declare abstract class IService<I, O> {
    abstract url: string;
    transfromReq(data: I): any;
    transformRsp(data: any): O;
}
