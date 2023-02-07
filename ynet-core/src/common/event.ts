import { arrayUtils } from "./utils";

export class EventHandler {
    private eventDatas: { [key: string]: Array<EventDataItem> } = {};

    public on(name: string, callBack: EventCallBackType): void {
        this.eventDatas[name] = this.eventDatas[name] || [];

        this.eventDatas[name].push({
            isOnce: false,
            callBack: callBack
        });
    }

    public once(name: string, callBack: EventCallBackType) {
        this.eventDatas[name] = this.eventDatas[name] || [];

        this.eventDatas[name].push({
            isOnce: true,
            callBack: callBack
        });
    }

    public off(name: string, callBack?: (item: EventDataItem) => boolean) {
        if (callBack) {
            this.eventDatas[name].some((item) => {
                if (item.callBack === callBack) {
                    this.eventDatas[name] = arrayUtils.without(this.eventDatas[name], item);
                }
            });
        } else {
            delete this.eventDatas[name];
        }
    }

    public trigger(name: string, param?: any) {
        let delegats = this.eventDatas[name];

        if (delegats) {
            let i: number = 0,
                time: number = 0,
                isBreak: boolean = false;

            while (delegats[i]) {
                let item = delegats[i];

                let result = (<Function>item.callBack).call(
                    this,
                    {
                        target: this,
                        stopPropagation: function () {
                            isBreak = true;
                        },
                        time: time
                    },
                    param
                );

                if (item.isOnce) {
                    delegats = arrayUtils.without(delegats, item);
                } else {
                    i++;
                }
                if (result === false || isBreak) return false;
            }
        }
    }

    public clearEvenListening() {
        this.eventDatas = {};
    }
}

export type EventCallBackType = ((e: EventCallParam, param?: any) => Boolean | undefined) | Function;

export interface EventDataItem {
    isOnce: boolean;
    callBack: EventCallBackType;
}

export interface EventCallParam {
    target: EventHandler;
    stopPropagation: Function;
    time: number;
}
