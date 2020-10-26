<?php  
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $tenthuoc = isset($_POST['tenthuoc']) ? $_POST['tenthuoc'] : 0;
    $sdki = isset($_POST['sdki']) ? $_POST['sdki'] : 0;
    $hoatchat = isset($_POST['hoatchat']) ? $_POST['hoatchat'] : 0;
    $qcdg = isset($_POST['qcdg']) ? $_POST['qcdg'] : 0;
    $hsd = isset($_POST['hsd']) ? $_POST['hsd'] : 0;
    $gia = isset($_POST['gia']) ? $_POST['gia'] : 0;
    $anh = isset($_POST['anh']) ? $_POST['anh'] : 0;
    $cty = isset($_POST['cty']) ? $_POST['cty'] : 0;
    $lhkd = isset($_POST['lhkd']) ? $_POST['lhkd'] : 0;
    $sdt = isset($_POST['sdt']) ? $_POST['sdt'] : 0;
    $diachi = isset($_POST['diachi']) ? $_POST['diachi'] : 0;
    $dckd = isset($_POST['dckd']) ? $_POST['dckd'] : 0;
    $baoche = isset($_POST['baoche']) ? $_POST['baoche'] : 0;

    $user = $_SESSION['username'];

    //lấy id user 
    $sql = "SELECT * FROM admin WHERE username = '$user' ";
    $query = mysqli_query($conn, $sql);
    if (mysqli_num_rows($query) > 0) {
		$row = mysqli_fetch_assoc($query);
		$idadmin = $row['ID_admin'];
	}

    // kiểm tra thuốc đã tồn tại chưa
    $sql = "select * from thuoc where ten_thuoc = '$tenthuoc' and so_dang_ki = '$sdki'";

    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0){
    	die("thuốc đã tồn tại");
    }


    //kiểm tra xem công ty tồn tại chưa
    $searchcty = "select * from co_so_kinh_doanh where ten_cong_ty = '$cty'";

    $querysearchcty = mysqli_query($conn, $searchcty);

    if (mysqli_num_rows($querysearchcty) > 0){
    	//nếu tồn tại công ty
    	//lấy id của công ty đó
    	$row = mysqli_fetch_assoc($querysearchcty);
    	$idcty = $row['ID_cong_ty'];
    } else {
    	//thêm công ty vào csdl
    	$addcty = "INSERT INTO co_so_kinh_doanh(ten_cong_ty, dia_chi_tru_so_chinh, dia_chi_kinh_doanh, dien_thoai,loai_hinh_kinh_doanh) VALUES ('$cty', '$diachi', 'dckd', '$sdt', '$lhkd')";
    	$queryaddcty = mysqli_query($conn, $addcty);

    	//lấy ra id công ty đó
    	$querysearchcty = mysqli_query($conn, $searchcty);
    	if (mysqli_num_rows($querysearchcty) > 0){
	    	
	    	$row = mysqli_fetch_assoc($querysearchcty);
	    	$idcty = $row['ID_cong_ty'];
	    }
    }

    //thêm thuốc vào csdl
    $addthuoc = "INSERT INTO thuoc(ten_thuoc, so_dang_ki, hoat_chat, dang_bao_che, quy_cach_dong_goi, han_su_dung, ID_cong_ty, gia_thanh, anh_image, ID_admin) VALUES ('$tenthuoc', '$sdki', '$hoatchat', '$baoche', '$qcdg', '$hsd', '$idcty', '$gia', '$anh', '$idadmin')";
    $queryaddthuoc = mysqli_query($conn, $addthuoc);

    die("thêm hoàn tất");
?>