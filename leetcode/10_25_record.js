// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
// 你可以假设 nums1 和 nums2 不会同时为空。
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * 
 * nums1 = [1, 3]
 * nums2 = [2]
 * 则中位数是 2.0
 */
// 解题思路
// 1 2 3 6 8 12
// 5 7 9
// 1 5 => 1  0 0
// 2 5 => 2  2 0
// 3 5 => 3  3 0
// 6 5 => 5  3 1
// 6 7 => 6  4 1
// 7 8 => 7  4 2
// 8 9 => 8  5 2
// 12 9 => 9 5 3
// 12
var findMedianSortedArrays = function(nums1, nums2) {
    let len = nums1.length + nums2.length
    let result = [];
    let x = 0;
    let y = 0;
    for(let i = 0;i<len;i++) {
        if(nums1[x] < nums2[y]) {
            if(x <= nums1.length - 1 && nums1.length > 0) {
                result.push(nums1[x])
                x ++
            }
        } else {
            if(y<= nums2.length - 1 && nums2.length > 0) {
                result.push(nums2[y])
                y ++
            } else {
                result.push(nums1[x])
                x ++ 
            }
        }
    }
    console.log(result)
    let res = 0
    let n = Math.floor(len/ 2)
    if(len % 2 === 0) {
        res = ((result[n] +  result[n - 1]) / 2)
    } else {
        res = result[n]
    }
    return res
};
findMedianSortedArrays([2,3,4],[1,5,7,8])
// 我自己想出来的,不过时间复杂度应该是 m + n,不符合要求
// 下面是评论大神解法

// 作者：yujie-3
// 链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/javascript-san-chong-shi-jian-fu-za-du-by-yujie-3/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// 1.代码最少的方法，时间复杂度为O((m + n)log(m + n))。(因为sort在数据量少的时候采用的是冒泡排序，数据量大的时候采用的是插排)
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const arr = [...nums1, ...nums2].sort((a, b) => a - b);
    const { length } = arr;
    return length % 2 ? arr[Math.floor(length / 2)] : (arr[length / 2] + arr[length / 2 - 1]) / 2;
};
// 2.双指针排序法，时间复杂度为O(m + n)。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let reIndex = nums2.length - 1;
    for (let i = nums1.length - 1; i >= 0; i--) {
        while (nums1[i] <= nums2[reIndex] && reIndex > -1) {
            nums1.splice(i + 1, 0, ...(nums2.splice(reIndex, 1)));
            reIndex--;
        }
    }
    const arr = nums2.concat(nums1);
    const { length } = arr;
    return length % 2 ? arr[Math.floor(length / 2)] : (arr[length / 2] + arr[length / 2 - 1]) / 2;
};
// 3.二分查找法（官方推荐），时间复杂度O(log(min(m, n)))。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
    const length1 = nums1.length;
    const length2 = nums2.length;
    let min = 0;
    let max = length1;
    let half = Math.floor((length1 + length2 + 1) / 2); // 一半的长度
    while (max >= min) {
        const i = Math.floor((max + min) / 2); // 最大最小的一半
        const j = half - i;
        console.log('i&j',i,j)
        if (i > min && nums1[i - 1] > nums2[j]) {
            max = i - 1; // 最大的index前移
            console.log('max',max)
        } else if (i < max && nums1[i] < nums2[j - 1]) {
            min = i + 1; // 最小的index后移
            console.log('min',min)
        } else {
            console.log('else:',i,j)
            let left,right;
            if (i === 0) left = nums2[j - 1];
            else if (j === 0) left = nums1[i - 1];
            else left = Math.max(nums1[i - 1], nums2[j - 1]);
            
            if (i === length1) right = nums2[j];
            else if (j === length2) right = nums1[i];
            else right = Math.min(nums1[i], nums2[j]);
             console.log('left,right',left,right)
            return (length1 + length2) % 2 ? left : (left + right) / 2;
        }
    }
    return 0;
};
