export declare class EventHandler {
    private eventDatas;
    on(name: string, callBack: EventCallBackType): void;
    once(name: string, callBack: EventCallBackType): void;
    off(name: string, callBack?: (item: EventDataItem) => boolean): void;
    trigger(name: string, param?: any): false | undefined;
    clearEvenListening(): void;
}
export declare type EventCallBackType = ((e: EventCallParam, param?: any) => Boolean | undefined) | Function;
export interface EventDataItem {
    isOnce: boolean;
    callBack: EventCallBackType;
}
export interface EventCallParam {
    target: EventHandler;
    stopPropagation: Function;
    time: number;
}
