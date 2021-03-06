declare const _default: {
    create: () => Promise<{
        data: any;
    }>;
    delete: () => Promise<{
        data: any;
    }>;
    deleteMany: () => Promise<{
        data: any[];
    }>;
    getList: () => Promise<{
        data: any[];
        total: number;
    }>;
    getMany: () => Promise<{
        data: any[];
    }>;
    getManyReference: () => Promise<{
        data: any[];
        total: number;
    }>;
    getOne: () => Promise<{
        data: any;
    }>;
    update: () => Promise<{
        data: any;
    }>;
    updateMany: () => Promise<{
        data: any[];
    }>;
};
export default _default;
