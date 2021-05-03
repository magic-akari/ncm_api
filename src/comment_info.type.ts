export interface CommentInfo {
  latestLikedUsers: unknown;
  liked: boolean;
  comments: unknown;
  resourceType: number;
  resourceId: number;
  commentUpgraded: boolean;
  musicianSaidCount: number;
  likedCount: number;
  shareCount: number;
  commentCount: number;
  threadId: string;
}

export interface CommentInfoAPI {
  data: CommentInfo[];
}
