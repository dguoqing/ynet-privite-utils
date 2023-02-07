import { IRequest, RequestConfig, RequestState, Log } from "@ynet/miniprogram-core";

export class RequestByMock implements IRequest {
    static mocklist: Record<string, Function> = {};

    public async send(
        config: RequestConfig<any, any>,
        callBack: (state: RequestState, content?: any) => void
    ): Promise<any> {
        let mock = this.getData(config.url);

        if (mock) {
            let rspData = mock(config);
            callBack("connect", rspData);
        } else {
            callBack("error");
            Log.error("接口挡板", `${config.url}不存在`);
        }
        return function () {
            //Mock 为同步数据，无延迟，无需模拟cancel
        };
    }
    public getData(path: string): Function | undefined {
        return RequestByMock.mocklist[path];
    }
}
