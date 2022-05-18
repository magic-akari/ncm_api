export interface LikedUser {
  locationInfo: unknown;
  liveInfo: unknown;
  anonym: number;
  commonIdentity: unknown;
  userId: number;
  avatarDetail: unknown;
  userType: number;
  avatarUrl: string;
  vipRights: unknown;
  nickname: string;
  authStatus: number;
  expertTags: unknown;
  experts: unknown;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  remarkName: unknown;
}

export interface CommentInfoLikeListAPI {
  data: {
    more: boolean;
    info: {
      latestLikedUsers: LikedUser[];
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
    };
  };
  code: number;
}
