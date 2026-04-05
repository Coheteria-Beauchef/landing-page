export function buildFlightPath(width: number, height: number, impactX: number, impactY: number) {
  const startX = width + 40;
  const startY = height * 0.15;

  const topCtrl1X = width * 0.6;
  const topCtrl1Y = height * 0.05;
  const topCtrl2X = width * 0.2;
  const topCtrl2Y = height * 0.05;

  const leftMidX = width * 0.05;
  const leftMidY = (startY + impactY) / 2;

  const uTurnCtrl1X = -width * 0.08;
  const uTurnCtrl1Y = impactY + height * 0.05;
  const uTurnCtrl2X = impactX - width * 0.15;
  const uTurnCtrl2Y = impactY;

  return [
    `M ${startX} ${startY}`,
    `C ${topCtrl1X} ${topCtrl1Y}, ${topCtrl2X} ${topCtrl2Y}, ${leftMidX} ${leftMidY}`,
    `C ${uTurnCtrl1X} ${uTurnCtrl1Y}, ${uTurnCtrl2X} ${uTurnCtrl2Y}, ${impactX} ${impactY}`,
  ].join(" ");
}
