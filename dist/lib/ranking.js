const G = 0.35;
export function calculateRankingScore(likes, hourAge) {
    return likes / Math.pow(hourAge + 2, G);
}
//# sourceMappingURL=ranking.js.map