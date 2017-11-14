function _createHeader(tableObj, titleTxt, w, h, minVal, maxVal, typeone, typej7, typek10, typek10Green, typek10Green3, typek3ZC, typek3GJ, typek3JB, typek3JB1, typej7l1, typej7l1JHZS, typej7l2, typek12JD, typek12JDHistory, typeJLK3Danshuang, typeJLK3012, type11x5GreenZuXuan, type11x5Green2, type11x5KDZS, big30Small) {
    var r = tableObj.insertRow(tableObj.rows.length)
    var r1 = tableObj.insertRow(tableObj.rows.length)
    if (minVal == undefined || maxVal == undefined || typeJLK3Danshuang || typeJLK3012 || typej7l1 || big30Small) {
        var td = r.insertCell(0)
        td.rowSpan = 2
        td.style.fontSize = Math.min(w, h) * 0.7 + 'px'
        console.log(td.style.fontSize)
        if (curLotteryTypeStyleName.indexOf("快彩") > 0) { //0509快彩期号头背景色
            td.style.backgroundColor = " #EFAE6F"
            td.style.color = "white"
        }
        if (typeJLK3Danshuang) {
            td.colSpan = 2
        } else if (typej7l1) {
            td.colSpan = 3
            td.style.backgroundColor = "#fcfcd9"
        } else if (big30Small) {
            td.colSpan = 3
        } else if (typeJLK3012) {
            td.colSpan = 3
            if (curOrientation == "land") { //20161010 快3和值012 字体过大
                td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, true)
            } else {
                // td.style.fontSize =Math.min(w,h)*1+'px'
                //td.style.backgroundColor = ""
                // td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h*2.5,titleTxt)
            }
        } else {
            td.colSpan = 1
            //td.style.backgroundColor = ""
        }
        if (curHeightRedundantPixels > 0) {
            td.height = h * 2 + 1 + Math.min(2, curHeightRedundantPixels) //1px border between two rows
            console.log(td.height);
        } else {
            td.height = h * 2 + 1
            console.log(td.height);
        }


        td.style.borderBottom = "1px solid black" //设置表头线下黑色

        curHeightRedundantPixels -= Math.min(2, curHeightRedundantPixels)
        td.innerHTML = titleTxt //td.innerHTML =getCellHTML("container",w,h,titleTxt,true)
        if (typeJLK3012) {
            td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h * 0.65, titleTxt)

        }
    } else {
        var td = r.insertCell(0)
        td.colSpan = maxVal - minVal + 1

        if (curHeightRedundantPixels > 0) {
            td.height = h + 1
        } else {
            td.height = h
        }
        if (curHeightRedundantPixels > 0)
            curHeightRedundantPixels--

        if (typek3ZC) {
            td.style.fontSize = Math.min(w, h) * 0.6 + 'px' //liutest for K3ZC
            td.innerHTML = titleTxt
        } else if (typeone) { //用于k3高级号码形态 设置后 横版有问题
            if (curOrientation == "port") {
                // td.style.fontSize = Math.min(w,h)*0.8+'px'
                td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, true, false, false, false, true)
                // td.getElementsByClassName("container")[0].style.margin=0+"px";
                td.getElementsByClassName("container")[0].style.fontSize = (w) + "px";   //暂时处理号码形态的字体大小问题
                // console.log(td.innerHTML);	
            } else {
                td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, true, false, false, false, true)
            }
        } else if (typek3GJ) { //用于 k3高级 和值012 //删除 20161010和值012字体过大
            if (curOrientation == "land") {
                td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, true)
            } else {
                //td.style.fontSize =Math.min(w,h)*1+'px'
                td.style.fontSize = Math.min(w, h) * 1.2 + 'px'
                td.innerHTML = titleTxt
            }
        } else if (typek3JB) {
            td.style.fontSize = Math.min(w, h) * 0.8 + 'px'
            // console.log(w+'/'+h);
            td.innerHTML = titleTxt
        } else if (typej7) {
            td.style.fontSize = 17 + 'px'
            td.innerHTML = titleTxt
            td.style.backgroundColor = "#d8e4fe"
        }
        else if (typej7l1JHZS) {
            td.style.fontSize = Math.min(w, h) * 0.8 + 'px'
            // console.log(td.style.fontSize);
            td.innerHTML = titleTxt
        } else if (type11x5KDZS) {
            if (curOrientation == "land") {
                //td.innerHTML=getCellHTML("container",w*(maxVal-minVal+1),h,titleTxt,true)
                td.style.fontSize = Math.min(w, h) * 1.3 + 'px' //11选5 "跨度走势" 字体过大
                td.innerHTML = titleTxt
            } else {
                td.style.fontSize = Math.min(w, h) * 1.5 + 'px' //11选5 "跨度走势" 字体过大
                td.innerHTML = titleTxt
            }
        }
        else {
            td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, true)
            if ((curLotteryTypeName.indexOf("七星彩") >= 0 || curLotteryTypeName.indexOf("排列3") >= 0) && curOrientation === "port") {
                if (titleTxt.indexOf("第") >= 0 || titleTxt.indexOf("排列三") >= 0) {
                    td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, false, false, false, "titlesmall")
                    td.style.fontSize = (h - 9) + "px"
                }
            }
        }

        if (typek10Green) {
            td.style.color = "#91695d"
        }
        if (typek10Green3) {
            td.style.color = "#7ca899"
        }
        if (typek3ZC) {
            td.style.backgroundColor = "#d6d8dd"
        }
        if (type11x5GreenZuXuan) {
            td.style.color = "#53938e"
            console.log(td);
            td.style.fontSize = Math.min(w, h) * 1.2 + 'px';
        }
        if (type11x5Green2) {
            td.style.color = "#91695d";
            td.style.fontSize = Math.min(w, h) * 1.2 + 'px';
        }
        if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩 1-11数字
            td.style.color = "white"
            td.style.backgroundColor = "#EFAE6F"
        }
        if (titleTxt === "麻将分布") {
            td.style.color = "#91695d"
        }

        if (typej7 || typej7l2) {
            for (var i = 0; i < 2; i++) {
                td = r1.insertCell(i)
                td.style.borderBottom = "1px solid black" //设置表头线下黑色	
                if (i == 0) {
                    td.colSpan = 3
                    //td.rowSpan = 1
                    td.innerHTML = "前区"
                    td.style.fontSize = Math.min(w, h) * 0.8 + "px"
                    //td.style.height = "11px"
                    if (typej7) {
                        td.style.backgroundColor = "#d8e4fe"
                    }
                } else {
                    td.colSpan = 1
                    td.innerHTML = "后"
                    td.style.fontSize = Math.min(w, h) * 0.8 + "px"
                    //td.style.height = "11px"
                    td.style.backgroundColor = "#fcfcd9"
                }
            }
            //td=r1.insertCell(r1.cells.length)
        } else {
            for (var i = minVal; i <= maxVal; i++) { //console.log(123);	
                td = r1.insertCell(r1.cells.length)
                td.style.borderBottom = "1px solid black" //设置表头线下黑色	
                if (curHeightRedundantPixels > 0) {
                    td.height = h + 1
                } else {
                    td.height = h
                }

                td.style.fontWeight = "lighter"
                if (typek3JB1 || typek3GJ) {
                    td.innerHTML = getCellHTML("container", 0, 14, i)
                }
                else {
                    if (i > 9) {
                        td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                        td.style.fontSize = (h - 4) + "px"
                        console.log(12313);
                    } else {
                        if (curLotteryTypeName.indexOf("排列") >= 0 || curLotteryTypeName.indexOf("七星彩") >= 0) {
                            td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                            td.style.fontSize = (h - 4) + "px"
                        } else if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩开奖号码分布  1-11  1-9前有数字0
                            i = "0" + i
                            td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                            td.style.fontSize = (h - 4) + "px"
                        } else {
                            td.innerHTML = getCellHTML("containerCH", w, h, i, true)
                        }
                    }
                }
                if (typek10Green) {
                    td.style.color = "#91695d"
                    td.style.fontWeight = "bold"
                }
                if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩开奖号码分布 表头  1-11  背景色 和字体颜色
                    td.style.color = "white"
                    td.style.backgroundColor = "#EFAE6F"
                }
                if (type11x5GreenZuXuan) {
                    td.style.color = "#53938e";
                }
                if (type11x5Green2) {
                    td.style.color = "#91695d"
                }
                if (typek3ZC) {
                    td.style.backgroundColor = "#d6d8dd"
                }
                if (typej7l1) {
                    td.style.backgroundColor = "#fcfcd9"
                }
                if (typeone) {
                    if (curOrientation == "land") {
                        if (i === 0) {
                            td.innerHTML = getCellHTML("container", w, h, "豹", true, false, false, false, true)

                        }
                        if (i === 1) {
                            td.innerHTML = getCellHTML("container", w, h, "连", true, false, false, false, true)

                        }
                        if (i === 2) {
                            td.innerHTML = getCellHTML("container", w, h, "双", true, false, false, false, true)

                        }
                        if (i === 3) {
                            td.innerHTML = getCellHTML("container", w, h, "单", true, false, false, false, true)
                        }

                    } else {
                        if (i === 0) {
                            td.innerHTML = getCellHTML("container", w, h - 2, "豹", true, false, false, false, true)
                        }
                        if (i === 1) {
                            td.innerHTML = getCellHTML("container", w, h - 2, "连", true, false, false, false, true)
                        }
                        if (i === 2) {
                            td.innerHTML = getCellHTML("container", w, h - 2, "双", true, false, false, false, true)
                        }
                        if (i === 3) {
                            td.innerHTML = getCellHTML("container", w, h - 2, "单", true, false, false, false, true)
                        }
                        td.getElementsByClassName("container")[0].style.fontSize = (w) + "px";   //暂时处理号码形态的字体大小问题
                    }
                }
                if (typek12JD) {
                    if (i === 1) {
                        td.innerHTML = getCellHTML("container", w, h, "一", true)
                    }
                    if (i === 2) {
                        td.innerHTML = getCellHTML("container", w, h, "二", true)
                    }
                    if (i === 3) {
                        td.innerHTML = getCellHTML("container", w, h, "三", true)
                    }
                    if (i === 4) {
                        td.innerHTML = getCellHTML("container", w, h, "四", true)
                    }
                    if (i === 5) {
                        td.innerHTML = getCellHTML("container", w, h, "五", true)
                    }
                }
                if (titleTxt === "麻将分布") {
                    td.style.color = "#91695d"
                    if (i === 1) {
                        td.innerHTML = getCellHTML("container", w, h, "一")
                    }
                    if (i === 2) {
                        td.innerHTML = getCellHTML("container", w, h, "二")
                    }
                    if (i === 3) {
                        td.innerHTML = getCellHTML("container", w, h, "三")
                    }
                    if (i === 4) {
                        td.innerHTML = getCellHTML("container", w, h, "四")
                    }
                    if (i === 5) {
                        td.innerHTML = getCellHTML("container", w, h, "五")
                    }
                    if (i === 6) {
                        td.innerHTML = getCellHTML("container", w, h, "六")
                    }
                    if (i === 7) {
                        td.innerHTML = getCellHTML("container", w, h, "七")
                    }
                    if (i === 8) {
                        td.innerHTML = getCellHTML("container", w, h, "八")
                    }
                    if (i === 9) {
                        td.innerHTML = getCellHTML("container", w, h, "九")
                    }
                    if (i === 10) {
                        td.innerHTML = getCellHTML("container", w, h, "中")
                    }
                    if (i === 11) {
                        td.innerHTML = getCellHTML("container", w, h, "發")
                    }
                    if (i === 12) {
                        td.innerHTML = getCellHTML("container", w, h, "白")
                    }
                    if (i === 13) {
                        td.innerHTML = getCellHTML("container", w, h, "東")
                    }
                    if (i === 14) {
                        td.innerHTML = getCellHTML("container", w, h, "南")
                    }
                    if (i === 15) {
                        td.innerHTML = getCellHTML("container", w, h, "西")
                    }
                    if (i === 16) {
                        td.innerHTML = getCellHTML("container", w, h, "北")
                    }
                    if (i === 17) {
                        td.innerHTML = getCellHTML("container", w, h, "春")
                    }
                    if (i === 18) {
                        td.innerHTML = getCellHTML("container", w, h, "夏")
                    }
                    if (i === 19) {
                        td.innerHTML = getCellHTML("container", w, h, "秋")
                    }
                    if (i === 20) {
                        td.innerHTML = getCellHTML("container", w, h, "冬")
                    }

                }
            }
        }
        if (curHeightRedundantPixels > 0)
            curHeightRedundantPixels--
    }
}
function createheadercm(tableObj, titleTxt, w, h, style, innerhtml) {
    var r = tableObj.insertRow(tableObj.rows.length)
    var r1 = tableObj.insertRow(tableObj.rows.length)
    var td = r.insertCell(0)
    td.colSpan = maxVal - minVal + 1
    if (curHeightRedundantPixels > 0) {
        td.height = h + 1
    } else {
        td.height = h
    }
    if (curHeightRedundantPixels > 0)
        curHeightRedundantPixels--
    td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, true)
    if ((curLotteryTypeName.indexOf("七星彩") >= 0 || curLotteryTypeName.indexOf("排列3") >= 0) && curOrientation === "port") {
        if (titleTxt.indexOf("第") >= 0 || titleTxt.indexOf("排列三") >= 0) {
            td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, titleTxt, false, false, false, "titlesmall")
            td.style.fontSize = (h - 9) + "px"
        }
    }
    for (var i = minVal; i <= maxVal; i++) { //console.log(123);	
        td = r1.insertCell(r1.cells.length)
        td.style.borderBottom = "1px solid black" //设置表头线下黑色	
        if (curHeightRedundantPixels > 0) {
            td.height = h + 1
        } else {
            td.height = h
        }

        td.style.fontWeight = "lighter"
        if (typek3JB1 || typek3GJ) {
            td.innerHTML = getCellHTML("container", 0, 14, i)
        }
        else {
            if (i > 9) {
                td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                td.style.fontSize = (h - 4) + "px"
                console.log(12313);
            } else {
                if (curLotteryTypeName.indexOf("排列") >= 0 || curLotteryTypeName.indexOf("七星彩") >= 0) {
                    td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                    td.style.fontSize = (h - 4) + "px"
                } else if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩开奖号码分布  1-11  1-9前有数字0
                    i = "0" + i
                    td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                    td.style.fontSize = (h - 4) + "px"
                } else {
                    td.innerHTML = getCellHTML("containerCH", w, h, i, true)
                }
            }
        }
        if (typek10Green) {
            td.style.color = "#91695d"
            td.style.fontWeight = "bold"
        }
        if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩开奖号码分布 表头  1-11  背景色 和字体颜色
            td.style.color = "white"
            td.style.backgroundColor = "#EFAE6F"
        }
        if (type11x5GreenZuXuan) {
            td.style.color = "#53938e";
        }
        if (type11x5Green2) {
            td.style.color = "#91695d"
        }
        if (typek3ZC) {
            td.style.backgroundColor = "#d6d8dd"
        }
        if (typej7l1) {
            td.style.backgroundColor = "#fcfcd9"
        }
        if (typeone) {
            if (curOrientation == "land") {
                if (i === 0) {
                    td.innerHTML = getCellHTML("container", w, h, "豹", true, false, false, false, true)

                }
                if (i === 1) {
                    td.innerHTML = getCellHTML("container", w, h, "连", true, false, false, false, true)

                }
                if (i === 2) {
                    td.innerHTML = getCellHTML("container", w, h, "双", true, false, false, false, true)

                }
                if (i === 3) {
                    td.innerHTML = getCellHTML("container", w, h, "单", true, false, false, false, true)
                }

            } else {
                if (i === 0) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "豹", true, false, false, false, true)
                }
                if (i === 1) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "连", true, false, false, false, true)
                }
                if (i === 2) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "双", true, false, false, false, true)
                }
                if (i === 3) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "单", true, false, false, false, true)
                }
                td.getElementsByClassName("container")[0].style.fontSize = (w) + "px";   //暂时处理号码形态的字体大小问题
            }
        }
        if (typek12JD) {
            if (i === 1) {
                td.innerHTML = getCellHTML("container", w, h, "一", true)
            }
            if (i === 2) {
                td.innerHTML = getCellHTML("container", w, h, "二", true)
            }
            if (i === 3) {
                td.innerHTML = getCellHTML("container", w, h, "三", true)
            }
            if (i === 4) {
                td.innerHTML = getCellHTML("container", w, h, "四", true)
            }
            if (i === 5) {
                td.innerHTML = getCellHTML("container", w, h, "五", true)
            }
        }
        if (titleTxt === "麻将分布") {
            td.style.color = "#91695d"
            if (i === 1) {
                td.innerHTML = getCellHTML("container", w, h, "一")
            }
            if (i === 2) {
                td.innerHTML = getCellHTML("container", w, h, "二")
            }
            if (i === 3) {
                td.innerHTML = getCellHTML("container", w, h, "三")
            }
            if (i === 4) {
                td.innerHTML = getCellHTML("container", w, h, "四")
            }
            if (i === 5) {
                td.innerHTML = getCellHTML("container", w, h, "五")
            }
            if (i === 6) {
                td.innerHTML = getCellHTML("container", w, h, "六")
            }
            if (i === 7) {
                td.innerHTML = getCellHTML("container", w, h, "七")
            }
            if (i === 8) {
                td.innerHTML = getCellHTML("container", w, h, "八")
            }
            if (i === 9) {
                td.innerHTML = getCellHTML("container", w, h, "九")
            }
            if (i === 10) {
                td.innerHTML = getCellHTML("container", w, h, "中")
            }
            if (i === 11) {
                td.innerHTML = getCellHTML("container", w, h, "發")
            }
            if (i === 12) {
                td.innerHTML = getCellHTML("container", w, h, "白")
            }
            if (i === 13) {
                td.innerHTML = getCellHTML("container", w, h, "東")
            }
            if (i === 14) {
                td.innerHTML = getCellHTML("container", w, h, "南")
            }
            if (i === 15) {
                td.innerHTML = getCellHTML("container", w, h, "西")
            }
            if (i === 16) {
                td.innerHTML = getCellHTML("container", w, h, "北")
            }
            if (i === 17) {
                td.innerHTML = getCellHTML("container", w, h, "春")
            }
            if (i === 18) {
                td.innerHTML = getCellHTML("container", w, h, "夏")
            }
            if (i === 19) {
                td.innerHTML = getCellHTML("container", w, h, "秋")
            }
            if (i === 20) {
                td.innerHTML = getCellHTML("container", w, h, "冬")
            }

        }
    }
    if (curHeightRedundantPixels > 0)
        curHeightRedundantPixels--


}


function getCellHTML(type, w, h, v, smallFlag, boldFlag, bigFlag, flag) {
    var minVal = Math.min(w, h)



    // test

    // 
    if (type == "container") {
        if (flag === "YCbig") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 7) + "px;'>" + v + "</div>"
        } else if (boldFlag) {
            if (curLotteryTypeStyleName.indexOf("隔行1") >= 0 && curLotteryTypeName.indexOf("吉林快3") >= 0) {
                return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 2) + "px;'>" + v + "</div>"	//font-weight:"+(h-2)+"px;
            } else {
                return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h) + "px;'>" + v + "</div>"	//font-weight:"+(h-2)+"px;
            }
        } else if (bigFlag) {
            if (curLotteryTypeStyleName.indexOf("隔行1") >= 0 && curLotteryTypeName.indexOf("吉林快3") >= 0) {
                return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 4) + "px;'>" + v + "</div>"	//font-weight:"+(h-2)+"px;
            } else {
                return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 2) + "px;'>" + v + "</div>"	//font-weight:"+(h-2)+"px;
            }
        } else if (flag === "titlesmall") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px;'>" + v + "</div>"
        }
        else {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h - 2) + "px;'>" + v + "</div>"
        }
    }
    else if (type == "containerCH") {//20161011 解决重号 奇数 跨度 期号 和值 字体稍大问题 
        if (flag === "YCbig") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h - 5) + "px;'>" + v + "</div>"
        } else {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h - 5) + "px;'>" + v + "</div>"
        }
    }
    else if (type == "containerShape") {
        if (flag === "YCbig") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 7) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else if (smallFlag) {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h - 5) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else if (bigFlag) {
            if (curLotteryTypeStyleName.indexOf("隔行1") >= 0 && curLotteryTypeName.indexOf("吉林快3") >= 0) {
                return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 4) + "px;'>" + "<span>" + v + "</span>" + "</div>"
            } else {
                return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 2) + "px;'>" + "<span>" + v + "</span>" + "</div>"
            }
        } else if (flag === "titlesmall") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else if (flag === "fontSmall") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h - 2) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        }

    }
    else if (type == "containerShape10") {
        if (flag === "YCbig") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 7) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else if (flag === "HZsmall") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else if (flag === "fontSmall") {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h - 3) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        } else {
            return "<div class='" + type + "' style='width:" + (w - 2) + "px;height:" + (h - 2) + "px;line-height:" + (h - 2) + "px; font-size:" + (h + 4) + "px;'>" + "<span>" + v + "</span>" + "</div>"
        }
    }
    //0519 球内数字压缩一下  快彩部分  以后可复用
    else if (flag === "kuaicai") {
        return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal) + "px;'>" + "<div style = transform:scaleX(0.7)>" + v + "</div>" + "</div>"
    } else if (type == "greyball") {
        return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal - 7) + "px;'>" + v + "</div>"
    }
    else {
        if (flag === "YCbig") {
            return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal + 4) + "px;'>" + v + "</div>"
        } else if (flag === "YC10") {
            return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal + 4) + "px;'>" + "<div style = transform:scaleX(0.7)>" + v + "</div>" + "</div>"
        } else {
            return "<div class='" + type + "' style='width:" + (minVal) + "px;height:" + (minVal) + "px;line-height:" + (minVal) + "px; font-size:" + (minVal - 2) + "px;'>" + v + "</div>"
        }
    }
}

/** 
*    td innerhtml
*@param {string} type  - element classname
*@param {number} w - width equal tablecellwidth
*@param {number} h - height equal tablecellheight
*@param {number} f - fontSize
*@param {string} v - 1.number 2.<span>number</span> 3.&nbsp
*/
function getSingleCellHTML(type, w, h, f, v) {
    return "<div class='" + type + "' style='width:" + (w) + "px;height:" + (h) + "px;line-height:" + (h) + "px; font-size:" + (h) + "px;'>" + v + "</div>"
}


/**
 *@param {object} tableObj - mtable table element
 *@param {object} firstattribute  - {colSpan,rowSpan,fontSize,backgroundColor,color,width,height,innerhtml}
 *@param {object} secondattribute - {colSpan,fontSize,innerhtml,backgroundColor,fontWeight} 
 *@param {number} maxVal - max number
 *@param {number} minVal - min number
 *@param {number} flag - special state
 *@param {number} w - width
 *@param {number} h - height
 */
function createHeaderDefault(tableObj, firstattribute, secondattribute, w, h, maxVal, minVal, flag) {
    var r = tableObj.insertRow(tableObj.rows.length)
    var r1 = tableObj.insertRow(tableObj.rows.length)
    var td = r.insertCell(0)
    td.colSpan = firstattribute.colSpan || (maxVal - minVal + 1)
    if (curHeightRedundantPixels > 0) {
        td.height = h + 1
    } else {
        td.height = h
    }
    if (curHeightRedundantPixels > 0)
        curHeightRedundantPixels--
    td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1) - 2, h - 2, h - 2, firstattribute.innerhtml)
    if ((curLotteryTypeName.indexOf("七星彩") >= 0 || curLotteryTypeName.indexOf("排列3") >= 0) && curOrientation === "port") {
        if (firstattribute.innerhtml.indexOf("第") >= 0 || firstattribute.innerhtml.indexOf("排列三") >= 0) {
            td.innerHTML = getCellHTML("container", w * (maxVal - minVal + 1), h, firstattribute.innerhtml, false, false, false, "titlesmall")
            td.style.fontSize = (h - 9) + "px"
        }
    }
    for (var i = minVal; i <= maxVal; i++) { //console.log(123);	
        td = r1.insertCell(r1.cells.length)
        td.style.borderBottom = "1px solid black" //设置表头线下黑色	
        if (curHeightRedundantPixels > 0) {
            td.height = h + 1
        } else {
            td.height = h
        }

        td.style.fontWeight = "lighter"
        if (typek3JB1 || typek3GJ) {
            td.innerHTML = getCellHTML("container", 0, 14, i)
        }
        else {
            if (i > 9) {
                td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
            } else {
                if (curLotteryTypeName.indexOf("排列") >= 0 || curLotteryTypeName.indexOf("七星彩") >= 0) {
                    td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                } else if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩开奖号码分布  1-11  1-9前有数字0
                    i = "0" + i
                    td.innerHTML = getCellHTML("containerShape", w, h, i, false, false, false, "titlesmall")
                } else {
                    td.innerHTML = getCellHTML("containerCH", w, h, i, true)
                }
            }
        }
        // if (typek10Green) {
        //     td.style.color = "#91695d"
        //     td.style.fontWeight = "bold"
        // }
        // if (curLotteryTypeStyleName.indexOf("快彩") >= 0) { //0509快彩开奖号码分布 表头  1-11  背景色 和字体颜色
        //     td.style.color = "white"
        //     td.style.backgroundColor = "#EFAE6F"
        // }
        // if (type11x5GreenZuXuan) {
        //     td.style.color = "#53938e";
        // }
        // if (type11x5Green2) {
        //     td.style.color = "#91695d"
        // }
        // if (typek3ZC) {
        //     td.style.backgroundColor = "#d6d8dd"
        // }
        // if (typej7l1) {
        //     td.style.backgroundColor = "#fcfcd9"
        // }
        td.setAttribute("style", secondattribute);
        if (typeone) {
            if (curOrientation == "land") {
                if (i === 0) {
                    td.innerHTML = getCellHTML("container", w, h, "豹", true, false, false, false, true)

                }
                if (i === 1) {
                    td.innerHTML = getCellHTML("container", w, h, "连", true, false, false, false, true)

                }
                if (i === 2) {
                    td.innerHTML = getCellHTML("container", w, h, "双", true, false, false, false, true)

                }
                if (i === 3) {
                    td.innerHTML = getCellHTML("container", w, h, "单", true, false, false, false, true)
                }

            } else {
                if (i === 0) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "豹", true, false, false, false, true)
                }
                if (i === 1) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "连", true, false, false, false, true)
                }
                if (i === 2) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "双", true, false, false, false, true)
                }
                if (i === 3) {
                    td.innerHTML = getCellHTML("container", w, h - 2, "单", true, false, false, false, true)
                }
                td.getElementsByClassName("container")[0].style.fontSize = (w) + "px";   //暂时处理号码形态的字体大小问题
            }
        }
        if (typek12JD) {
            if (i === 1) {
                td.innerHTML = getCellHTML("container", w, h, "一", true)
            }
            if (i === 2) {
                td.innerHTML = getCellHTML("container", w, h, "二", true)
            }
            if (i === 3) {
                td.innerHTML = getCellHTML("container", w, h, "三", true)
            }
            if (i === 4) {
                td.innerHTML = getCellHTML("container", w, h, "四", true)
            }
            if (i === 5) {
                td.innerHTML = getCellHTML("container", w, h, "五", true)
            }
        }
        if (firstattribute.innerhtml === "麻将分布") {
            if (i === 1) {
                td.innerHTML = getCellHTML("container", w, h, "一")
            }
            if (i === 2) {
                td.innerHTML = getCellHTML("container", w, h, "二")
            }
            if (i === 3) {
                td.innerHTML = getCellHTML("container", w, h, "三")
            }
            if (i === 4) {
                td.innerHTML = getCellHTML("container", w, h, "四")
            }
            if (i === 5) {
                td.innerHTML = getCellHTML("container", w, h, "五")
            }
            if (i === 6) {
                td.innerHTML = getCellHTML("container", w, h, "六")
            }
            if (i === 7) {
                td.innerHTML = getCellHTML("container", w, h, "七")
            }
            if (i === 8) {
                td.innerHTML = getCellHTML("container", w, h, "八")
            }
            if (i === 9) {
                td.innerHTML = getCellHTML("container", w, h, "九")
            }
            if (i === 10) {
                td.innerHTML = getCellHTML("container", w, h, "中")
            }
            if (i === 11) {
                td.innerHTML = getCellHTML("container", w, h, "發")
            }
            if (i === 12) {
                td.innerHTML = getCellHTML("container", w, h, "白")
            }
            if (i === 13) {
                td.innerHTML = getCellHTML("container", w, h, "東")
            }
            if (i === 14) {
                td.innerHTML = getCellHTML("container", w, h, "南")
            }
            if (i === 15) {
                td.innerHTML = getCellHTML("container", w, h, "西")
            }
            if (i === 16) {
                td.innerHTML = getCellHTML("container", w, h, "北")
            }
            if (i === 17) {
                td.innerHTML = getCellHTML("container", w, h, "春")
            }
            if (i === 18) {
                td.innerHTML = getCellHTML("container", w, h, "夏")
            }
            if (i === 19) {
                td.innerHTML = getCellHTML("container", w, h, "秋")
            }
            if (i === 20) {
                td.innerHTML = getCellHTML("container", w, h, "冬")
            }

        }
    }
    if (curHeightRedundantPixels > 0)
        curHeightRedundantPixels--
}
