// 最长回文子串
// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
// 示例 1：
// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let length = 0;
    if(s.length > 0) {
        length = 1;
    }
    let result = s?s[0]:'';
    let first = s[0]
    for(i in s) {
        if(i > 0 && s[i] === first) {
            result += s[i]
        } else {
            first = s[i]
        }
        console.log(i,first,result)
        let index = s.indexOf(first,parseInt(i) + 1)
        let lastIndex = s.lastIndexOf(first)
        let reverse = s.slice(i,index + 1)
        let lastReverse = s.slice(i,lastIndex + 1)
        
        if(index >=0 && reverse === reverse.split('').reverse().join('')) {
            if(length < reverse.length) {
                length = reverse.length
                result = reverse
            }
        }
        if(lastIndex >=0 && lastReverse === lastReverse.split('').reverse().join('')) {
            
            if(length < lastReverse.length) {
                length = lastReverse.length
                result = lastReverse
                
            }
        }
    }
    console.log(result)
    return result;
};
// longestPalindrome('cbbd')
longestPalindrome('aaaabaa')