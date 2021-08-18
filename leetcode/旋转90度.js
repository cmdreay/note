/**
     * [
     *  1 2 3
     *  4 5 6
     *  7 8 9
     * ]
     * 结果
     * [
     * 7 4 1
     * 8 5 2
     * 9 6 3
     * ]
     * 
     */
    
function rotateData() {
    let initData = [[1,2,3],[4,5,6],[7,8,9]];
    console.log(initData);
    // 1 对角线翻转
    // 1 4 7
    // 2 5 8
    // 3 6 9
    let a = initData;
    for(let i =0;i<3;i++) {
        for(let j=i;j<3;j++) {
            let temp = a[i][j];
            a[i][j] = a[j][i];
            a[j][i] = temp;
        }
    }
    // 7 4 1
    // 8 5 2
    // 9 6 3
    for(let i=0;i<3;i++) {
        for(let j=0;j<3/2;j++)  {
            let temp = a[i][j];
            a[i][j] = a[i][3-j-1];
            a[i][3-j-1] = temp;
        }
    }
    console.log(a)
    // 2. 左右对折
}
rotateData();