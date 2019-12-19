export declare const yamlPaths: (dir: string) => Promise<string[]>;
export declare const pathToNs: (path: string, relativeDir: string) => string[];
export declare const wrapNs: (data: object, ns?: string[]) => object;
export declare const convertTree: (dir: string) => Promise<object>;
