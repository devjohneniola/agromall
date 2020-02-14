export const numberValue = cnt => {
  cnt = Number(cnt);
  if (!isNaN(cnt)) return cnt;
  return 0;
};
