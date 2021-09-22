export interface FriendThroughTrainAPI {
  modelList: Model[];
  versionCode: string;
  logInfo: unknown;
  title: unknown;
}

export interface Model {
  modelType: number;
  modelName: string;
  helpText: string;
  logInfo: unknown;
  elements: Element[];
}

interface Element {
  id: string;
  elementType: number;
  title: string;
  titleIconUrl: unknown;
  subTitle: string;
  orpheus: string;
  coverUrl: ImageRecord;
  coverBlur: boolean;
  coverText: string;
  dynamicUrl: ImageRecord;
  rightBottomUrl: unknown;
  queryStatus: boolean;
  queryParam: string;
  newEvent: boolean;
  needLogin: true;
  logInfo: unknown;
  bubble: unknown;
  layerDirect: unknown;
  activeCount: unknown;
}

type ImageRecord = Record<"blackIconUrl" | "whiteIconUrl", string>;
