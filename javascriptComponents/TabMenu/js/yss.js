(function ($) {

"use struct";

var TabMenu = function (box, opt) {
  if (box.tabMenu) return;

  var me = this,
      defOpt = {
        ts: '>.titBox>li', /* 标题 */
        bs: '>.byBox>li', /* 内容 */
        fn: null, /* 回调，异步加载需用给定此函数 */
        arg: {} /* 回调函数的参数 */
      };
  opt = $.extend({}, defOpt, opt);
  me.init(box, opt);

  /* 绑定事件 */
  this.tClick();

  /* 自定义设置接口 */
  return box.tabMenu = function (optc) {
    opt = $.extend({}, opt, optc);
    me.init(box, opt);
  };
}

TabMenu.prototype.init = function (box, opt) {
  var $box = $(box);
  
  this.$ts = $box.find(opt.ts);
  this.$bs = $box.find(opt.bs);
  this.fn  = opt.fn;
  this.arg = opt.arg;

  /* 给标题指定下标，与内容区对应 */
  this.$ts.each(function (i, box) {
    $(box).data('tabPage', i);
  });
}

TabMenu.prototype.tClick = function () {
  var me = this;
  this.$ts.on('click', function () {
    var $this = $(this);
    $this.addClass('action').siblings().removeClass('action');
    me.$bs.eq($this.data('tabPage')).addClass('action').siblings().removeClass('action');
    if ('function' === typeof me.fn) {
      me.fn.apply($this, me.arg);
    }
  });
  me.$ts.eq(0).trigger('click');
}

/*
  以下为jQuery包装函数
*/

$.fn.tabMenu = function (opt) {
  var i;
  this.each(function (opt) {
    if (!this.tabMenu) {
      new TabMenu(this, opt);
    } else {
      this.tabMenu(opt);
    }
  }, [opt]);
  return this;
}

})(window.jQuery);
