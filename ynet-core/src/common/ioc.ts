type Constructor<T = any> = new (...args: any[]) => T;

export class IContainer {
    private static bindTags: Map<symbol | string, Constructor> = new Map();

    public static bind<T>(tag: symbol | string) {
        return {
            to: (bindTarget: Constructor<T>) => {
                if (this.bindTags.has(tag)) {
                    throw new Error("该接口已注入实现类，请无重复注入,请检查，接口ID：" + tag.toString());
                }
                this.bindTags.set(tag, bindTarget);
            }
        };
    }

    public static get<T>(tag: symbol | string): T {
        let target = this.bindTags.get(tag);

        if (target === undefined) {
            throw new Error("未找到实现类，缺失实现，请检查，接口ID：" + tag.toString());
        }

        return new target();
    }
}
