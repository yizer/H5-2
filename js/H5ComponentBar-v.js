/* vertical bar object part */

var H5ComponentBar_v =function ( name, cfg ) {
  // ceate new H5ComponentBar object , Amazing!
  var component =  new H5ComponentBar( name ,cfg );
  // ralated with the data[array].lenth,and use ">>0 " to abandon the decimal part
  var width = ( 100 / cfg.data.length ) >> 0 ;
  component.find('.line').width( width + '%');
  // traversal  the component to set css style,
  $.each( component.find('.rate') ,function(){
      var w = $(this).css('width');
      // to set new height and resize width
      $(this).height(w).width('');

  });

  $.each( component.find('.per'),function(){
      $(this).appendTo( $(this).prev() ) ;
  })
  return component;
}
