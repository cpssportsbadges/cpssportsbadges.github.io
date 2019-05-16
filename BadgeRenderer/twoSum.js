/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // differences
    
    var differences = {a:"b"};
    
    for (let idx= 0; idx < nums.length; idx++) {
        let difference = target - nums[idx];
        
        if (differences[difference] !== undefined) { // if the difference is there
            // return index of difference and current index
            return [differences[difference], idx];
        }
        else {
            // Store original index of occurrence
            let val = nums[idx];
            differences[val] = idx;
        }
    }
    
    
    
};