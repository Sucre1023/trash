// 引入css
(function () {
  var js = document.scripts,
      url = js[js.length - 1].src.replace('yssDate.js', 'yssDate.css');
  $('head').append('<link rel="stylesheet" href="' + url + '">');
  $('body').append('<div id="yssDate"><div class="input-group selectBox"><select class="form-control year"></select><span class="input-group-addon">年</span><select class="form-control month"></select><span class="input-group-addon">月</span><input type="button" class="form-control btn-info todata" value="今日"></div><ul class="day-h"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class="monDay"></ul></div>')
}());

(function () {

  function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  }

  function init (tm) {
    var i;
    $year.html('');
    $month.html('');
    for (i = 2000; i < 2036; i++) {
      $yssDate.find('>.selectBox>.year').append('<option value="' + i + '"' + (tm ? i == parseInt(tm) ? ' selected' : '' : i == time.getFullYear() ? ' selected' : '') + '>' + i + '</option>');
    }
    for (i = 0; i < 12; i++) {
      $yssDate.find('>.selectBox>.month').append('<option value="' + i + '"' + (tm ? i == parseInt(tm.split('-')[1]) - 1 ? ' selected' : '' : i == time.getMonth() ? ' selected' : '') + '>' + pad(i+1, 2) + '</option>');
    }
  }
  
  function getdt (time) {
    return time.getFullYear() + '-' + pad(time.getMonth()+1, 2) + '-' + pad(time.getDate(), 2);
  }

  function rander (year, month, tdate) {
    var i,
        time = new Date(),
        $monDay = $yssDate.find('>.monDay').html('');

    
    time.setYear(year);
    time.setMonth(month);

    /*
      将时间设到当月初，当然为周几再往前推，从而得到第一个渲染日期，可避免大小月的蛋疼计算
    */
    time.setDate(1);
    if (time.getDay() > 0) {
      day = time.getDay();
      time.setDate(time.getDate() - day);
      for (i = 0 ;i < day ; i++) {
        $monDay.append('<li data-timer="' + getdt(time) + '" class="beck">' + pad(time.getDate(), 2) + '</li>');
        time.setDate(time.getDate() + 1);
      }
    }
    do {
      $monDay.append('<li data-timer="' + getdt(time) + '" class="' + (adate == getdt(time) ? ' autodate ' : '') + (tdate == time.getDate() ? ' active ' : '') + '">' + pad(time.getDate(), 2) + '</li>');
      time.setDate(time.getDate() + 1);
    } while (time.getDate() != 1);
    while (time.getDay() > 0) {
      $monDay.append('<li data-timer="' + getdt(time) + '" class="beck">' + pad(time.getDate(), 2) + '</li>');
      time.setDate(time.getDate() + 1);
    }
  }

  var i, e = 0,
      time = new Date(),
      adate = getdt(time),
      year = time.getFullYear(),
      month = time.getMonth(),
      date = time.getDate(),
      $yssDate = $('#yssDate'),
      $year = $yssDate.find('>.selectBox>.year'),
      $month = $yssDate.find('>.selectBox>.month'),
      $monDay = $yssDate.children('.monDay'),
      tdate = 0;

  init();
  rander(year, month, tdate);

  $year.on('change', function () {
    rander($year.val(), $month.val(), tdate);
  });
  $month.on('change', function () {
    rander($year.val(), $month.val(), tdate);
  });

  $monDay.on('click', '>li', function (ev) {
    if (parseInt($(this).data('timer')) < 2000 || parseInt($(this).data('timer')) > 2035) {
      alert('超出范围'); return;
    }
    tdate = parseInt($(this).data('timer').split('-')[2]);
    rander(parseInt($(this).data('timer')), parseInt($(this).data('timer').split('-')[1])-1, tdate);
    init($(this).data('timer'));
    $('input[dateId=' + $yssDate.data('action') + ']').val($(this).data('timer'));
  });

  $yssDate.on('click', function (ev) {
    ev.stopPropagation();
  });


  $('.yssdate').on('focus', function (ev) {
    var $this = $(this);
    if (!$this.attr('dateId')) {
      e++;
      $this.attr('dateId', e);
      $yssDate.data('action', e);
    } else {
      $yssDate.data('action', $this.attr('dateId'));
    }
    
    $yssDate.css({'left': $this.offset().left, 'top': $this.offset().top + 40});

    if ($(window).width() - parseInt($yssDate.css('left')) < 325 && $(window).width() >= 325) {
      $yssDate.css('left', $(window).width() - 325)
    }
    $yssDate.show();

    if ($this.val()) {
      init($this.val());
      rander(parseInt($this.val()), parseInt($this.val().split('-')[1])-1, parseInt($this.val().split('-')[2]));
    }
    
    ev.stopPropagation();
  }).on('click', function (ev) {
    ev.stopPropagation();
  });

  $(document).on('click', function () {
    $yssDate.hide();
  })

  $(window).resize(function () {
    $yssDate.hide();
  })

  $yssDate.on('click', '.todata', function () {
    tdate = date;
    init();
    rander(year, month, tdate);
  })

}());








/*
      year = time.getFullYear(),
      month = time.getMonth(), // 0: 1月, 1: 2月  其他又是正常的为什么那么奇葩 - -
      date = time.getDate(),
      hours = time.getHours(),
      minute = time.getMinutes(),
      second = time.getSeconds(),
      day = time.getDay(),
*/