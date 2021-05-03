interface LbsResult {
  upload: string[];
}

export const lbs = async (): Promise<LbsResult> => {
  const r = await fetch(
    "http://wanproxy.127.net/lbs?version=1.0&bucketname=ymusic",
  );
  return r.json();
};

let ip: Promise<string[]>;

export const uploadIP = async () => {
  if (!ip) {
    ip = lbs().then((r) => r.upload);
  }

  const result = await ip;
  return result[Math.floor(Math.random() * result.length)];
};
