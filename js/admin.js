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

var search = getUrlParameter('search');

if (search != undefined) {
    $('#thanhtimkiem').val(search.toString());
}

if (search == "" || search == undefined) {
    search = "kocodulieu";
}

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
        url : 'module/function/admin-thuoc.php',
        type : 'post',
        dataType : 'json',
        data : {
            page : pagePT,
            search : search
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
                html += '<td><button id="sua" style="text-align: center; " class="btn btn-primary">Sửa</button><button id="xoa" style="text-align: center; margin-left: 5px" class="btn btn-dark"  data-toggle="modal" data-target="#xoathuoc">Xóa</button></td></tr>'
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

if (search != "kocodulieu") {
    $('.pagination .pre a').attr('href', '?page=' + pre.toString() + '&search=' + search);
    $('.pagination .next a').attr('href', '?page=' + next.toString() + '&search=' + search);
} else {
    $('.pagination .pre a').attr('href', '?page=' + pre.toString());
    $('.pagination .next a').attr('href', '?page=' + next.toString());
}


//đếm số lượng trang
$.ajax({
    url : 'module/function/admin-count-thuoc.php',
    type : 'post',
    dataType : 'text',
    data : {
        search : search
    },

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

// xử lý click vào search
$('.search').click(function(event) {
    /* Act on the event */
    var search = $('#thanhtimkiem').val();
    if (search != "") {
        location.assign("admin.html" + "?page=1" + "&search=" + search);
    } else {
        location.assign("admin.html" + "?page=1");
    }
});

//xử lý sự kiện xóa 
//xử lý sự kiện click button xóa trong hàng
$("body").on("click", "#bodythuoc tr td #xoa", function(){
    var thuoc = $(this).parent().parent().children('#thuoc').text();

    $('.modal-body').html(thuoc);
});

//xử lý sự kiện click xóa trong messages
$("body").on("click", ".delete-drug", function(){
    var thuoc = $(this).parent().parent().children('.modal-body').text();
    $.ajax({
        url : 'module/function/admin-delete-thuoc.php',
        type : 'post',
        dataType : 'text',
        data : {
            thuoc : thuoc
        },
        success : function (result){
            if (result == "ok") {
                alert("xóa thành công");

                loadthuoc();
            }
            
        },
        error : function (result) {
            alert("lỗi");
        }
    });
});


//xử lý sự kiện click button sửa trong hàng
$("body").on("click", "#bodythuoc tr td #sua", function(){
    var thuoc = $(this).parent().parent().children('#thuoc').text();
    $.ajax({
        url : 'module/function/get-id-thuoc.php',
        type : 'post',
        dataType : 'text',
        data : {
            thuoc : thuoc
        },
        success : function (result){
            location.assign("change-thuoc.html?id=" + result);
            
        },
        error : function (result) {
            alert("lỗi");
        }
    });
});