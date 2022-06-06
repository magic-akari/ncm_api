import type { Track } from "./track.type.ts";
import type { Privilege } from "./privilege.type.ts";

export interface HepaiRecommendAPI {
  code: number;
  message: string;
  data: {
    status: boolean;
    banner: Banner;
    recommendReasons: RecommendReason[];
    recommendSongs: RecommendSong[];
  };
}

interface Banner {
  tips: string;
  descriptionUrl: string;
  displayImgUrl: string;
  displayTitle: string;
  displaySubTitle: string;
  highlightTitle: string[];
  highlightSubTitle: string[];
  myself: User;
  recommendUser: User;
  hepaiRecommendText: string;
  highlightRecommendText: [string, string, string];
  relationDescription: unknown;
}

interface User {
  nickName: string;
  avatarImgUrl: string;
}

interface RecommendReason {
  songId: number;

  reason: string;
}

interface RecommendSong extends Track {
  privilege: Privilege;
}
