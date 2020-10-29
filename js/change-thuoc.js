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
var id = getUrlParameter('id');


$(document).ready(function() {

    //lấy dữ liệu thuốc vè input
    $.ajax({
        url : 'module/function/get-change-thuoc.php',
        type : 'post',
        dataType : 'json',
        data : {
            id : id
        },
        success : function (result)
        {
            $("#tenthuoc").val(result["ten_thuoc"]);
            $("#sdki").val(result["so_dang_ki"]);
            $("#hc").val(result["hoat_chat"]);
            $("#qcdg").val(result["quy_cach_dong_goi"]);
            $("#baoche").val(result["dang_bao_che"]);
            $("#hsd").val(result["han_su_dung"]);
            $("#cty").val(result["ten_cong_ty"]);
            $("#gia").val(result["gia_thanh"]);
            $("#srcanh").val(result["anh"]);
            $("#lhkd").val(result["lhkd"]);
            $("#diachi").val(result["tru_so"]);
            $("#sdt").val(result["sdt"]);
            $("#dckd").val(result["dckd"]);
            $('#img').attr('src', result["anh"]);

        },
        error : function (result) {
            alert(result["ten_thuoc"]);
        }
    });

    //kiểm tra số điện thoại
    $('.add-drug').find('#sdt').change(function(event) {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var mobile = $('#sdt').val();
        if(mobile !==''){
            if (vnf_regex.test(mobile) == false) 
            {
                alert('Số điện thoại của bạn không đúng định dạng!');
            }
        }else{
            alert('Bạn chưa điền số điện thoại!');
        }
    }); 


    // kiểm tra đăng nhập
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


});

$('.add-drug').find('#anh').change(function(evt) {
  var f = evt.target.files[0]; 
  var reader = new FileReader();
  reader.onload = (function() {
    return function(e) {
      evt.target.parentNode.querySelector('#srcanh').value = e.target.result;
      evt.target.parentNode.querySelector('#img').src = e.target.result;
    };
  })(f);
  reader.readAsDataURL(f);
});


$('.add button').click(function(event) {

    //kiểm tra nhập đầy đủ thông tin
    var baoloi = "";
    if ($('#tenthuoc').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }

    if ($('#sdki').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#hc').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#qcdg').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#hsd').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#gia').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#srcanh').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#cty').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#lhkd').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#diachi').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#sdt').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#baoche').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#dckd').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }

    if (baoloi != "") {
        // nếu lỗi sẽ thông báo
        alert(baoloi);
    } else {
        // nếu không lỗi sẽ gửi dữ liệu bằng ajax
        $.ajax({
        url : 'module/function/update-thuoc.php',
        type : 'post',
        dataType : 'text',
        data : {
            id : id,
            tenthuoc : $('#tenthuoc').val(),
            sdki : $('#sdki').val(),
            hoatchat : $('#hc').val(),
            qcdg : $('#qcdg').val(),
            baoche : $('#baoche').val(),
            hsd : $('#hsd').val(),
            gia : $('#gia').val(),
            anh : $('#srcanh').val(),
            cty : $('#cty').val(),
            lhkd : $('#lhkd').val(),
            sdt : $('#sdt').val(),
            diachi : $('#diachi').val(),
            dckd : $('#dckd').val()
        },
        success : function (result){
            alert(result);
            location.assign("admin.html?page=1");
        },
        error : function (result) {
            alert("lỗi");
        }
    });
    }
});
