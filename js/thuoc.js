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

            //lấy danh sách các thuốc
			$.ajax({
                url : 'module/function/thuoc.php',
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
                        html += '<td><button style="text-align: center;" class="btn btn-primary">Xem</button></td></tr>'
                    });
                      
                    // Gán nội dung html vào thẻ content
                    $('#bodythuoc').html(html);
                    
                },
                error : function (result) {
                    alert("lỗi");
                }
            });
            
            $.ajax({
                url : 'module/function/count-thuoc.php',
                type : 'post',
                dataType : 'text',
                success : function (result){
                    var count  = result;
                    if (pagePT.toString() == "1") {
                        $('.pagination .pre').addClass('disabled');

                        $('#giua').text("2");
                        $('#truoc').text("1");
                        $('#sau').text("3");

                        $('#truoc').parent().addClass('active');
                    }else if (pagePT.toString() == count) {
                        $('.pagination .next').addClass('disabled');
                        var giua = new Number(pagePT) - 1;
                        var truoc = new Number(pagePT) - 2;

                        $('#giua').text(giua.toString());
                        $('#sau').text(pagePT.toString());
                        $('#truoc').text(truoc.toString());

                        $('#sau').parent().addClass('active');
                    } else {
                        var truoc = new Number(pagePT) - 1;
                        var sau = new Number(pagePT) + 1;
                        $('#truoc').text(truoc.toString());
                        $('#giua').text(pagePT.toString());
                        $('#sau').text(sau.toString());

                        $('#giua').parent().addClass('active');
                    }
                    
                },
                error : function (result) {
                    alert("lỗi");
                }


            });

            var pre = Number(pagePT) - 1;
            $('.pagination .pre a').attr('href', 'thuoc.html?page=' + pre.toString());

            var next = Number(pagePT) + 1; 
            $('.pagination .next a').attr('href', '?page=' + next.toString());

		});

        $("body").on("click", ".pagination .page-item .numpage", function(){
            var trang = $(this).text();
            $(this).attr('href', '?page=' + trang);
        });
        
		//xử lý sự kiện click button xem
		$("body").on("click", "#bodythuoc tr td button", function(){
            var thuoc = $(this).parent().parent().children('#thuoc').text();
            location.assign("info-thuoc.html?thuoc=" + thuoc);
        });