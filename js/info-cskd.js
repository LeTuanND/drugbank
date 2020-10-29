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
var cskdTK = getUrlParameter('cskd');
var lhkd = getUrlParameter('lhkd');

//hiển thị thông tin công ty đó
$(document).ready(function() {
    $(".tencty").text(cskdTK);
    $.ajax({
        url : 'module/function/info-cskd.php',
        type : 'post',
        dataType : 'json',
        data : {
            cskd : cskdTK,
            lhkd : lhkd
        },
        success : function (result)
        {
            $("#ten-cty").text(result["ten_cty"]);
            $("#tru-so").text(result["dia_chi_tru_so"]);
            $("#dia-chi-kd").text(result["dia_chi_kinh_doanh"]);
            $("#loai-hinh-kd").text(result["loai_hinh_kd"]);
            $("#sdt").text(result["sdt"]);
        },
        error : function (result) {
            alert("lỗi");
        }
    });

    //hiển thị các thuốc do công ty đó sản xuất
    $.ajax({
        url : 'module/function/thuoc-info-cskd.php',
        type : 'post',
        dataType : 'json',
        data : {
            cskd : cskdTK
        },
        success : function (result)
        {
            var html = '';

            // Vì kết quả trả về dạng JSON nên ta lặp để lấy kết quả
            $.each(result, function (key, item){

                html += '<div class="col-sm-4">';
                html += '<div class="card" style="height: 320px">';
                html += '<div class="card-body">';
                html += '<h5 class="card-title">'+item.ten_thuoc+'</h5>';
                html += '<p class="card-text">'+item.so_dang_ki+'</p>';
                html += '<p class="card-text">'+item.hoat_chat+'</p>';
                html += '<p class="card-text">Giá bán buôn kê khai: '+item.gia_thanh+'</p>';
                html += '<a style="position: absolute; left: 10px; bottom: 10px" href="info-thuoc.html" class="btn btn-primary">Chi tiết</a>'
                html += '</div></div></div>';
            });
              
            // Gán nội dung html vào thẻ content
            $('.same-cty .row').html(html);
        },
        error : function (result) {
            alert("lỗi");
        }
    });
});

// xử lý click vào 1 thuốc nào đó
$("body").on("click", ".same-cty .row .col-sm-4 .card a", function(){
    var thuoc = $(this).parent().find('.card-title').text();
    $(this).attr('href', 'info-thuoc.html?thuoc=' + thuoc );
});
