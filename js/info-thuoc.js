var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
    
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var thuocTK = getUrlParameter('thuoc');


$(document).ready(function() {
    $(".tenthuoc").text(thuocTK);
    $.ajax({
        url : 'module/function/info-thuoc.php',
        type : 'post',
        dataType : 'json',
        data : {
            thuoc : thuocTK
        },
        success : function (result)
        {
            $("#ten-thuoc").text(result["ten_thuoc"]);
            $("#so-dang-ki").text(result["so_dang_ki"]);
            $("#hoat-chat").text(result["hoat_chat"]);
            $("dong-goi").text(result["quy_cach_dong_goi"]);
            $("#dang-bao-che").text(result["dang_bao_che"]);
            $("#hsd").text(result["han_su_dung"]);
            $("#cty-sx").text(result["ten_cong_ty"]);
            $("#gia").text(result["gia_thanh"]);
            if (result["anh"]) {
                $('#img').attr('src', result["anh"]);
            }
        },
        error : function (result) {
            alert("lỗi");
        }
    });

    $.ajax({
        url : 'module/function/same-hc-info-thuoc.php',
        type : 'post',
        dataType : 'json',
        data : {
            thuoc : thuocTK
        },
        success : function (result)
        {
            var html = '';

            // Vì kết quả trả về dạng JSON nên ta lặp để lấy kết quả
            $.each(result, function (key, item){
                html += '<div class="col-sm-3">';
                html += '<div class="card" style="height : 19rem">';
                html += '<div class="card-body">';
                html += '<h5 class="card-title">'+item.ten_thuoc+'</h5>';
                html += '<p class="card-text">'+item.so_dang_ki+'</p>';
                html += '<p class="card-text">'+item.hoat_chat+'</p>';
                html += '</div></div></div>';
            });
              
            // Gán nội dung html vào thẻ content
            $('.likehc .row').html(html);                },
        error : function (result) {
            alert("lỗi");
        }
    }); 


    $.ajax({
        url : 'module/function/same-cty-info-thuoc.php',
        type : 'post',
        dataType : 'json',
        data : {
            thuoc : thuocTK
        },
        success : function (result)
        {
            var html = '';

            // Vì kết quả trả về dạng JSON nên ta lặp để lấy kết quả
            $.each(result, function (key, item){
                html += '<div class="col-sm-3">';
                html += '<div class="card" style="height : 19rem">';
                html += '<div class="card-body">';
                html += '<h5 class="card-title">'+item.ten_thuoc+'</h5>';
                html += '<p class="card-text">'+item.so_dang_ki+'</p>';
                html += '<p class="card-text">'+item.hoat_chat+'</p>';
                html += '</div></div></div>';
            });
              
            // Gán nội dung html vào thẻ content
            $('.likecty .row').html(html);               
        },
        error : function (result) {
            alert("lỗi");
        }
    }); 

});

// xử lý click vào 1 thuốc nào đó
$("body").on("click", ".container .row .col-sm-3 .card", function(){
    var thuoc = $(this).find('.card-title').text();
    location.assign("info-thuoc.html?thuoc=" + thuoc);
});