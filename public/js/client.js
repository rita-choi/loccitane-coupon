console.log('Client-side code running');

var notice ="";

$( document ).ready(function() {
    console.log( "CN ready!" );

if($('#lang').val() === "cn") notice = "<h3>立即到乐天免税店12/F欧舒丹专柜<br />换领试用装</h3><img src='images/map.png'/><p>每人限享礼遇一次, 按下「确认」<br />后表示欧舒丹美容顾问已经认证并 <br />派发礼品，往后将不能再次换领</p>";
if($('#lang').val() === "kr") notice = "<h3>쿠폰을 사용 하시겠습니까?</h3><p>현재 페이지를 직원에게 보여주세요.</p><p>직원 확인 후에 쿠폰은 사용처리되어<br />더이상 쓸 수 없습니다.</p>";

console.log("언어>>>"+ notice);
});




(function($){
    function processForm( e ){
        $.ajax({
            url: '/clicked',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize(),
            success: function( data, textStatus, jQxhr ){
              console.log("data>>>" + data);
                for(var key in data){
                  $("#"+key).val(data[key]);
                }

                $('#popup1').removeClass('hidden');
                $("#msg").html(notice);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }
    $('#coupon-form').submit( processForm );
})(jQuery);


(function($){
    function UseCoupon( e ){
        $.ajax({
            url: '/usecoupon',
            dataType: 'text',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize(),
            success: function( data, textStatus, jQxhr ){
                $("#msg").html(data);
                $("#cancel").addClass("hidden");
                $("#coupon_btn").addClass("hidden");
                setTimeout('redirectToPromotion()', 2000);

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }
    $('#used-coupon').submit( UseCoupon );
})(jQuery);

   function redirectToPromotion() {
        if($('#lang').val() == "cn") location.replace("promotion");
        if($('#lang').val() == "kr") location.replace("promotion-kr");
   }


  $("#cancel").click(function(){
        $('#popup1').addClass('hidden');
        $('#coupon-form').removeClass('hidden');
  });
