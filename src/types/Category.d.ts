interface ICategory {
    _id?: number;
    name: string;
    description: string;
    icon: string;
}

interface ICategoryForm extends ICategory {
    icon: FileList;
}

export type { ICategory, ICategoryForm };