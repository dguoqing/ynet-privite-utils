import { IRequest, RequestConfig, RequestState } from "@ynet/miniprogram-core";
export declare class RequestByMock implements IRequest {
    static mocklist: Record<string, Function>;
    send(config: RequestConfig<any, any>, callBack: (state: RequestState, content?: any) => void): Promise<any>;
    getData(path: string): Function | undefined;
}
