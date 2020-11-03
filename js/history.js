//lấy giá trị page
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
var pagePT = getUrlParameter('page');

$(document).ready(function() {

    $.ajax({
        url: 'module/function/checkss.php',
        type: 'post',
        dataType: 'text',
        
        success: function(result) {
            if (result != "") {
                $('.user .nav-link').text('Xin Chào: ' + result.toUpperCase());
                $('.user').css('visibility', 'visible');
                $('.dangnhap .nav-link').text("ĐĂNG XUẤT");
                $('.dangnhap .nav-link').attr('href', './module/function/logout.php');

                $('.admin').css('visibility', 'visible');
            } else {
                $('.user').css('visibility', 'hidden');

                $('.dangnhap .nav-link').text("ĐĂNG NHẬP");
                $('.dangnhap .nav-link').attr('href', 'login.html');

                $('.admin').css('visibility', 'hidden');
                alert("vui lòng đăng nhập");
                location.assign("home.html")
            }
        }
    });

    loadthuoc();
});

function loadthuoc() {
    // body...
    
    $.ajax({
        url : 'module/function/history.php',
        type : 'post',
        dataType : 'json',
        data : {
            page : pagePT
        },
        success : function (result){
            var html = '';

            // Vì kết quả trả về dạng JSON nên ta lặp để lấy kết quả
            $.each(result, function (key, item){
                html += '<tr>';
                html += '<td>' + item.so_dki + "</td>";
                html += '<td id = "thuoc">' + item.ten_thuoc + "</td>";
                html += '<td>' + item.hoat_chat + "</td>";
                html += '<td>' + item.cty + "</td>";
                html += '<td>' + item.date + "</td>";
                html += '<td>' + item.note + "</td>";
                html += '</tr>';
            });
              
            // Gán nội dung html vào thẻ content
            $('#bodythuoc').html(html);
        },
        error : function (result) {
            alert("lỗi");
        }
    });
};


//phân trang
//gán giá trị và link cho các button ở phân trang
$('.pagination .active a').text(pagePT.toString());
var pre = Number($('.pagination .active').text()) - 1;
var next = Number($('.pagination .active').text()) + 1; 

$('.pagination .pre a').attr('href', '?page=' + pre.toString());
$('.pagination .next a').attr('href', '?page=' + next.toString());



//đếm số lượng trang
$.ajax({
    url : 'module/function/history-count-thuoc.php',
    type : 'post',
    dataType : 'text',

    success : function (result){
        var count  = result;
        if ($('.pagination .active').text() == "1") {
            $('.pagination .pre').addClass('disabled');
        };

        if ($('.pagination .active').text() == count) {
            $('.pagination .next').addClass('disabled');
        };
        
    },
    error : function (result) {
        alert("lỗi");
    }
});


if ($('.pagination .active').text() == "1") {
    $('.pagination .pre').addClass('disabled');
};





