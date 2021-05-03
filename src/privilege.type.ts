export interface Privilege {
  id: number;
  fee: number;
  payed: number;
  realPayed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  pc: unknown;
  toast: boolean;
  flag: number;
  paidBigBang: boolean;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  freeTrialPrivilege: { resConsumable: boolean; userConsumable: boolean };
  chargeInfoList: ChargeInfo[];
}

export interface ChargeInfo {
  rate: number;
  chargeUrl: unknown;
  chargeMessage: unknown;
  chargeType: number;
}
