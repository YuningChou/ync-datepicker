(function(){
    var datepicker = window.datepicker;
    datepicker.buildUi = function(year,month){
        var monthData = datepicker.getMonthData(year,month);

        //日曆html結構
        var html = '<div class="ync-datepicker-header">' +
        '<a href="#" class="ync-datepicker-btn ync-datepicker-prev-btn">&lt;</a>' +
        '<a href="#" class="ync-datepicker-btn ync-datepicker-next-btn">&gt;</a>' +
        ' <span class="ync-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
    '</div>' +
    '<div class="ync-datepicker-body">' +
        '<table>' +
            '<thead>' +
                '<tr>' +
                    '<th>一</th>' +
                    '<th>二</th>' +
                    '<th>三</th>' +
                    '<th>四</th>' +
                    '<th>五</th>' +
                    '<th>六</th>' +
                    '<th>日</th>' + 
                '</tr>' +
            '</thead>' +
            '<tbody>';

            for(var i = 0; i<monthData.days.length; i++){
                var date = monthData.days[i];
                if(i%7 === 0){
                    //i被7整除是一週的第一天
                    html += '<tr>';
                }
                html += '<td>' + date.showDate + '</td>';
                if(i%7 === 6){
                    //i被7除的時候餘6則是一週的最後一天
                    html += '</tr>';
                }    
            }
                
            html +=  '</tbody>' +
        '</table>' +
    '</div>';
    
    return html;

    };
    //內容放到頁面顯示
    datepicker.init = function($input){
        var html = datepicker.buildUi();
        var $wrapper = document.createElement('div');
        $wrapper.className = 'ync-datepicker-wrapper';
        $wrapper.innerHTML = html;
        document.body.appendChild($wrapper);
    };
})();