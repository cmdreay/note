
// 我的笨方法..
var lengthOfLongestSubstring = function(s) {
    let result = 0
    let strArr = s.split('')
    for(let i = 0;i<strArr.length;i++) {
        let length = strArr.length
        for(let j=i+1;j <length + 1;j++) {
            let data = s.slice(i,j)
            if(data.indexOf(strArr[j]) >= 0) {
                j = length
                if(result < data.length) {
                    result = data.length
                }
            } else if( j === strArr.length ) {
                if(result < data.length) {
                    result = data.length
                }
            }
            
        }
    }
    return result
};
// 别人的高效方法 
//   作者：Heternally
//   链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/javascriptjie-fa-chao-9998-by-heternally/
//   来源：力扣（LeetCode）
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
var lengthOfLongestSubstring = function(s) {
    let num = 0,res = 0; // num：目前循环的子串不含有重复字符长度 res：不含有重复字符最长长度
    let m = ''; // 子串
    for (n of s) {
      if (m.indexOf(n) == -1) { // 不包含重复字符
        m += n; // 累加字符串
        num++; // 长度加一 
        res = res < num ? num: res;
      } else {
        m += n;
        m = m.slice(m.indexOf(n)+1); // 重新从重复后面的一位开始计算 如 abcdddef  => def
        num = m.length;
      }
    }
    return res;
  };
  
