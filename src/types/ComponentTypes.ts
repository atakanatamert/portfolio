export interface IProject {
    name: string;
    description: string;
    stack: string[];
    project_url: string;
}

export interface IProjectGroup {
    title: string;
    projects: IProject[];
}

export interface IPostMeta {
    slug: string;
    title: string;
    date: string;
    summary: string;
}

export interface IPost extends IPostMeta {
    html: string;
}
