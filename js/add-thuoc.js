$(document).ready(function() {
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
        url : 'module/function/add-thuoc.php',
        type : 'post',
        dataType : 'text',
        data : {
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
            location.assign("admin.html");
        },
        error : function (result) {
            alert("lỗi");
        }
    });
    }
});