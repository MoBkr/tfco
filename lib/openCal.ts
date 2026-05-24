const CAL_LINK = "هندسة-الذكاء-الاصطناعي-wivd5a/جلسة-استشارية";
const CAL_NS   = "جلسة-استشارية";

export function openCal(e?: React.MouseEvent | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
  e?.preventDefault();
  const cal = (window as any).Cal;
  if (cal?.ns?.[CAL_NS]) {
    cal.ns[CAL_NS]("modal", { calLink: CAL_LINK });
  } else {
    window.open(`https://app.cal.com/${CAL_LINK}`, "_blank");
  }
}
