export interface Tag {
  tagId: number;
  tagName: string;
  enName: string;
  level: number;
  childrenTags: Tag | null;
  picUrl: string;
  colorDeep: string;
  colorShallow: string;
  link: string;
  showText: string;
}

export interface TagList {
  data: Tag[];
  code: number;
}
