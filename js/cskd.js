$(document).ready(function() {
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

    //hiển thị danh sách cơ sở kinh doanh
	$.ajax({
        url : 'module/function/cskd.php',
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
                html += '<td class="cty">' + item.ten_cong_ty + "</td>";
                html += '<td class="lhkd">' + item.loai_hinh_kinh_doanh + "</td>";
                html += '<td>' + item.tru_so + "</td>";
                html += '<td><button style="text-align: center;" class="btn btn-primary">Xem</button></td></tr>'
            });
              
            // Gán nội dung html vào thẻ content
            $('#body').html(html);
            
        },
        error : function (result) {
            alert("lỗi");
        }

    });

    //PHÂN TRANG

    //gán giá trị và link cho các button ở phân trang
    $('.pagination .active a').text(pagePT.toString());
    var pre = Number($('.pagination .active').text()) - 1;
    var next = Number($('.pagination .active').text()) + 1; 

    console.log('alo1234');

    if (search != "kocodulieu") {
        $('.pagination .pre a').attr('href', 'cskd.html?page=' + pre.toString() + '&search=' + search);
        $('.pagination .next a').attr('href', 'cskd.html?page=' + next.toString() + '&search=' + search);
    } else {
        $('.pagination .pre a').attr('href', 'cskd.html?page=' + pre.toString());
        $('.pagination .next a').attr('href', 'cskd.html?page=' + next.toString());
    }


    //lấy số tổng số trang, so sánh để disabled button khi trang tại 2 đầu mút
    $.ajax({
        url : 'module/function/count-cskd.php',
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
});

// xử lý click vào search
$('.search').click(function(event) {
    /* Act on the event */
    var search = $('#thanhtimkiem').val();
    if (search != "") {
        location.assign("cskd.html" + "?page=1" + "&search=" + search);
    } else {
        location.assign("cskd.html" + "?page=1");
    }
});

//xử lý sự kiện click button xem
$("body").on("click", "#body tr td button", function(){
    var cskd = $(this).parent().parent().children('.cty').text();
    var lhkd = $(this).parent().parent().children('.lhkd').text();
    location.assign("info-cskd.html?cskd=" + cskd + "&lhkd=" + lhkd);
});