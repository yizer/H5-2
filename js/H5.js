var H5 = function () {
  this.id = ('h5_'+Math.random()).replace('.','_');
  this.el =$('<div class = "h5" id="'+this.id+'">').hide();
  this.page = [];
  $('body').append(this.el);
  // 新增一个页
  // @param {string} name 组建的名称,会加入到className中
  // @param {string} text 页内的默认文本
  // @param return{H5},可以重复使用H%对象支持的方法
  this.addPage = function (name,text) {
    // 添加一个;类名为h5_page的类名
    var page = $('<div class = "h5_page section">');
    //判断,如name不为空,这把name加入类中,用于标识区别
    if (name != undefined) {
      page.addClass('h5_page_'+name)
    }
    if (text != undefined) {
      page.text(text);
    }
    this.el.append(page);
    this.page.push( page );
    if (typeof this.whenAddpage === 'function') {
      this.whenAddpage();
    }
    return this;
  }
  //新增一个组件
  this.addComponent = function(name,cfg) {
    var cfg = cfg || {};
    //cfg中没有type参数,就使用默认的base,不要的话就用cfg中的
    cfg = $.extend({
      type : 'base'
    },cfg);

    var component;//定义一个变量,存储组件元素
    var page = this.page.slice(-1)[0];

    switch(cfg.type) {
      case 'base':
         component = new H5ComponentBase(name,cfg);
      break;
      case 'polyline':
         component = new H5ComponentPolyline(name, cfg);
         break;
      case 'pie':
        component = new H5ComponentPie(name,cfg);
        break;
      case 'bar':
        component = new H5ComponentBar(name,cfg);
        break;
      case 'bar_v':
        component = new H5ComponentBar_v(name,cfg);
        break;
      case 'radar':
        component = new H5ComponentRadar(name,cfg);
        break;
      case 'ring':
        component = new H5ComponentRing(name,cfg);
        break;
      case 'point':
        component = new H5ComponentPoint(name,cfg);
        break;
    }
    page.append(component);
    return this;
  }


  this.loader = function ( firstPage ) {
    this.el.fullpage({
      onLeave:function (index, nextIndex, direction) {
        $(this).find('.h5_component').trigger('onLeave');
      },
      afterLoad:function (anchorLink,index ) {
        $(this).find('.h5_component').trigger('onLoad');
      },
    });
    this.page[0].find(".h5_component").trigger("onLoad");
    this.el.show();
    if (firstPage) {
      $.fn.fullpage.moveTo(firstPage)
    }
  }
}
