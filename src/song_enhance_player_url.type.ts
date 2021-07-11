interface DownloadSong {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  fee: number;
  uf: unknown;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: unknown;
  level: unknown;
  encodeType: unknown;
  freeTrialPrivilege: unknown;
  freeTimeTrialPrivilege: unknown;
  urlSource: number;
}

export interface SongeEnhancePlayerUrl {
  data: DownloadSong[];
  code: number;
}
