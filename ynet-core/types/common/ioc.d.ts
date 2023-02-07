declare type Constructor<T = any> = new (...args: any[]) => T;
export declare class IContainer {
    private static bindTags;
    static bind<T>(tag: symbol | string): {
        to: (bindTarget: Constructor<T>) => void;
    };
    static get<T>(tag: symbol | string): T;
}
export {};
