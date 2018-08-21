console.log('Client-side code running');

$( document ).ready(function() {
    console.log( "KR ready!" );

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
        location.replace("promotion");
   }


  $("#cancel").click(function(){
        $('#popup1').addClass('hidden');
        $('#coupon-form').removeClass('hidden');
  });
