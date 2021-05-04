interface AL {
  id: number;
  name: string;
  picUrl: string;
  tns: unknown[];
  pic: number;
}

interface AR {
  id: number;
  name: string;
  tns: unknown[];
  alias: unknown[];
}

interface Bitrate {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface Track {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: AR[];
  alia: string[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: unknown;
  cf: string;
  al: AL;
  dt: number;
  h: Bitrate;
  m: Bitrate;
  l: Bitrate;
  a: unknown;
  cd: string;
  no: number;
  rtUrl: unknown;
  ftype: number;
  rtUrls: unknown[];
  djId: number;
  copyright: number;
  "s_id": number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: unknown;
  single: number;
  noCopyrightRcmd: unknown;
  mst: number;
  cp: number;
  mv: number;
  rtype: number;
  rurl: unknown;
  publishTime: number;
}

export interface TrackId {
  id: number;
  v: number;
  t: number;
  at: number;
  rcmdReason: string;
}
