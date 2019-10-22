/***
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 *
 *  你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 *
 *  来源：力扣（LeetCode）
 *  链接：https://leetcode-cn.com/problems/two-sum
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *  e.g.
 *  给定 nums = [2, 7, 11, 15], target = 9
 *  因为 nums[0] + nums[1] = 2 + 7 = 9
 *  所以返回 [0, 1]
 */

// 我的解法(最笨的方法) 时间复杂度 n^2
/**
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
};
// 评论的高效解法 看完觉得非常的巧妙
let two = function (nums, target) {
    let result = new Map();
    console.log(123)
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i]
        if (result.has(diff) && diff !== nums[i]) {
            return [i, result.get(diff)]
        } else {
            result.set(nums[i],i)
        }
    }
}
console.log(two([2, 7, 11, 15], 13))
