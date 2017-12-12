(function(){
    var datepicker = window.datepicker;
    var monthData;
    var $wrapper;

    datepicker.buildUi = function(year,month){
        monthData = datepicker.getMonthData(year,month);

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
                html += '<td data-date=" ' + date.date +' ">' + date.showDate + '</td>';
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

    datepicker.render = function(direction){
        var year,month;
        
        if(monthData){
            year = monthData.year;
            month = monthData.month;
        }

        if(direction === 'prev') month--;
        if(direction === 'next') month++;

        var html = datepicker.buildUi(year,month);

        $wrapper = document.querySelector('.ync-datepicker-wrapper');
        
        if(!$wrapper){
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ync-datepicker-wrapper';
        }
        $wrapper.innerHTML = html;
    };


    //內容放到頁面顯示
    datepicker.init = function(input){
        datepicker.render();

        //2017-12-12增加點擊展開收起事件
        var $input = document.querySelector(input);
        var isOpen = false;
        
        $input.addEventListener('click',function(){
            if(isOpen){
                $wrapper.classList.remove('ync-datepicker-wrapper-show');
                isOpen = false;
            }else{
                $wrapper.classList.add('ync-datepicker-wrapper-show');
                // 計算input與日曆的位置
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height =  $input.offsetHeight;
                $wrapper.style.top =  top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        }, false);
        $wrapper.addEventListener('click',function(e){
            var $target = e.target;
            if(!$target.classList.contains('ync-datepicker-btn'))
                return;

            
            if($target.classList.contains('ync-datepicker-prev-btn')){
                datepicker.render('prev');

            }else if($target.classList.contains('ync-datepicker-next-btn'))
                datepicker.render('next');

        },false);

        $wrapper.addEventListener('click',function(e){
            var $target = e.target;
            if($target.tagName.toLowerCase() !== 'td') return;

            var date = new Date(monthData.year,monthData.month - 1,$target.dataset.date);

            $input.value = format(date);
            
            $wrapper.classList.remove('ync-datepicker-wrapper-show');
            isOpen = false;

        },false);

    };
    //日期格式化
    function format(date){
        ret = '';
        var padding = function(num){
            if(num <= 0){
            return '0' + num;
            }
            return num;
        }

        ret += date.getFullYear() + '/';
        ret += padding(date.getMonth() + 1) + '/';
        ret += padding(date.getDate());

        return ret;
    }
})();