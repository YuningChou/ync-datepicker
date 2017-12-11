(function(){
    var datepicker = {};

    datepicker.getMonthData = function(year,month){
        var ret = []; //用來返回結果
        if(!year || !month){ 
            var today = new Date(); 
            year = today.getFullYear();
            month = today.getMonth() + 1; //如果用getMonth()會得到真實月份減1的月份，因此要+1才會得到真實月份
            //如果沒有傳year或month就用當前日期
        }
        var firstDay = new Date(year,month - 1,1); //這個月的第一天, month需要-1
        var firstDayWeekDay = firstDay.getDay(); //在當月月曆前需要補上個月的日期，獲取第一天是星期幾
        if(firstDayWeekDay === 0) firstDayWeekDay = 7; //如果是週日就是7

        year = firstDay.getFullYear();
        month = firstDay.getMonth()+1;

        var lastDayOfLastMonth = new Date(year,month - 1, 0);//上個月的最後一天，也就是這個月的第0天
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        var preMonthDayCount = firstDayWeekDay - 1; //需要顯示多少上個月的日期

        var lastDay = new Date(year,month,0); //當月最後一天，需要知道什麼時候算是下個月，下個月的第0天等於本月最後一天
        var lastDate = lastDay.getDate();

        for(var i = 0; i < 7 * 6; i++){
            //得到當月每一天的數據
            var date = i + 1 - preMonthDayCount;//減去上個月的
            var showDate = date;//用來算應該顯示的是哪一天
            var thisMonth = month;
            if(date <= 0){ 
                //上個月 
                thisMonth = month - 1 ; //小於等於0，所以是上個月的，這個月-1
                showDate = lastDateOfLastMonth + date; //上個月的最後一天減去date,他本身就是負的所以該加date
            }else if(date > lastDate){
                //下個月
                thisMonth = month + 1; //date大於本月最後一天就是下個月，這個月+1
                showDate = showDate - lastDate; //減去當月最後一天得到下個月的日期
            }
            if(thisMonth === 0) thisMonth = 12; //去年12月
            if(thisMonth === 12) thisMonth = 1; //明年1月

            ret.push({
                month:thisMonth,
                date:date,
                showDate : showDate
            });
        }

        return {
            year: year,
            month: month,
            days: ret
        };
    };

    window.datepicker = datepicker;
})();