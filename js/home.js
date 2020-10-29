$(document).ready(function() {
    $.ajax({
        url : 'module/function/home-thuoc.php',
        type : 'post',
        dataType : 'json',
        success : function (result){
            var html = '';

            // Vì kết quả trả về dạng JSON nên ta lặp để lấy kết quả
            $.each(result, function (key, item){
                html += '<div class="col-sm-3">';
                html += '<div class="card">';
                if (item.anh_image != "") {
                    html += '<img class="card-img-top" src="'+ item.anh_image + '" alt="Card image cap">';
                } else {
                    html += '<img class="card-img-top" src="https://via.placeholder.com/400x400.png?text=%E1%BA%A3nh%20thu%E1%BB%91c" alt="Card image cap">';
                }
                html += '<div class="card-body">';
                html += '<h5 class="card-title">'+item.ten_thuoc+'</h5>';
                html += '</div></div></div>';
            });
              
            // Gán nội dung html vào thẻ content
            $('.drug .row').html(html);
            
        },
        error : function (result) {
            alert("lỗi");
        }

    });

    $.ajax({
        url : 'module/function/home-cskd.php',
        type : 'post',
        dataType : 'json',
        success : function (result){
            var html = '';

            // Vì kết quả trả về dạng JSON nên ta lặp để lấy kết quả
            $.each(result, function (key, item){
                html += '<div class="col-sm-3" >';
                html += '<div class="card" style = "height: 13rem">';
                html += '<div class="card-body">';
                html += '<h5 class="card-title">'+item.ten_cong_ty+'</h5>';
                html += '<p class="card-text">'+item.dien_thoai+'</p>';
                html += '<p class="card-text">'+item.lhkd+'</p>';
                html += '</div></div></div>';
            });
              
            // Gán nội dung html vào thẻ content
            $('.company .row').html(html);
            
        },
        error : function (result) {
            alert("sai");
        }

    });
});

// xử lý thanh tìm kiếm
$("#thanhtimkiem").keypress(function(event) {
    /* Act on the event */
    if ($(this).value != "")
    {
        $('#x').css("visibility",'visible');
    }
});

$("#x").click(function(event) {
    /* Act on the event */
    $("#thanhtimkiem").val("");
     $('#x').css("visibility",'hidden');
});

//xử lý chọn cách tìm kiếm

$(".entity").click(function(event) {
    $('#thanhtimkiem').attr("placeholder", "tìm kiếm theo "+ $(this).val() );
    /* Act on the event */
    if (!$(this).hasClass('entityfocus'))
    {
        $(this).parent().children().removeClass('entityfocus');
        $(this).addClass('entityfocus');
    }
});

// xử lý click vào 1 thuốc nào đó
$("body").on("click", ".drug .row .card", function(){
    var thuoc = $(this).find('.card-title').text();
    location.assign("info-thuoc.html?thuoc=" + thuoc);
});

// xử lý click vào 1 cở sở kinh doanh nào đó
$("body").on("click", ".company .row .card", function(){
    var cskd = $(this).find('.card-title').text();
    location.assign("info-cskd.html?cskd=" + cskd);
});

// xử lý click vào search
$('.search').click(function(event) {
    /* Act on the event */
    var entity = $('.entityfocus').val();
    var search = $('#thanhtimkiem').val();
    location.assign("home-search.html" + "?entity=" + entity + "&search=" + search + "&page=1");
});