## es6中的新数据类型set
+ set成员的值是唯一的

数据去重

        let arr = [3, 5, 2, 2, 5, 5];
        let unique = [...new Set(arr)];
        // [3, 5, 2]