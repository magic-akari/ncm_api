export interface CommentsAPI {
  isMusician: boolean;
  userId: number;
  topComments: Comment[];
  moreHot: boolean;
  hotComments: Comment[];
  commentBanner: unknown;
  code: number;
  comments: Comment[];
  total: number;
  more: boolean;
}

interface SimpleUser {
  userId: number;
  avatarUrl: string;
  followed: boolean;
  mutual: boolean;
  remarkName: unknown;
  nickname: string;
  authStatus: number;
  expertTags: unknown;
  experts: unknown;
}

export interface Comment {
  user: SimpleUser;
  beReplied: beRepliedComment[];
  showFloorComment: unknown;
  status: number;
  commentId: number;
  content: string;
  contentResource: unknown;
  time: 1655034032993;
  timeStr: string;
  needDisplayTime: true;
  likedCount: number;
  expressionUrl: unknown;
  commentLocationType: number;
  parentCommentId: number;
  decoration: unknown;
  repliedMark: unknown;
  grade: unknown;
  liked: boolean;
}

interface beRepliedComment {
  user: SimpleUser;
  beRepliedCommentId: number;
  content: string;
  status: number;
  expressionUrl: unknown;
}
