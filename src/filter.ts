import { BloomFilter } from 'bloom-filters'

// DO NOT BAN THIS IS WORD LIST VERY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!
const badWords: string[] = [
        "nigger",
        "nigga",
        "faggot",
        "fag",
        "chink",
        "dike",
        "tranny",
        "trannie",
        "dindu",
        "beaner",
        "jigaboo",
        "kike ",
        "retard",
        "retarded ",
        "towelhead",
        "raghead",
        "wigger",
        "negro",
        "lesbo",
        "dyke ",
        "blackie ",
        "spastic",
        "mong ",
        "darky",
        "nignog",
        "paki ",
        "sambo",
        "wog ",
        "coon"
];

const bloom = BloomFilter.create(badWords.length, 0.01);
badWords.forEach(word => bloom.add(word.toLowerCase()));

function isSimilar(a: string, b: string, threshold: number = 1): boolean {
        const m = a.length, n = b.length;
        if (Math.abs(m - n) > threshold) return false;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                        if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                        else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
        }
        return dp[m][n] <= threshold;
}

export function isBadWord(word: string): boolean {
        const lowerWord = word.toLowerCase();
        if (bloom.has(lowerWord)) return true;
        return badWords.some(bad => isSimilar(lowerWord, bad));
}