<?php  
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
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


    //lấy tên thuốc để so sánh với tên mới 
    $sql = "select * from thuoc where ID_thuoc = '$id'";
    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0){
        $row = mysqli_fetch_assoc($query);
        $thuoccu = $row['ten_thuoc'];
    }

    // kiểm tra thuốc đã tồn tại chưa
    $sql = "select * from thuoc where ten_thuoc = '$tenthuoc'";

    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0 && $thuoccu !== $tenthuoc){
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

        $updatecty = "UPDATE co_so_kinh_doanh SET ten_cong_ty = '$cty', dia_chi_tru_so_chinh = '$diachi', dia_chi_kinh_doanh = '$dckd', dien_thoai = '$sdt', loai_hinh_kinh_doanh = '$lhkd' WHERE ID_cong_ty = $idcty";
        $queryupdatecty = mysqli_query($conn, $updatecty);

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
    $updatethuoc = "UPDATE thuoc SET ten_thuoc='$tenthuoc', so_dang_ki='$sdki', hoat_chat='$hoatchat', dang_bao_che='$baoche', quy_cach_dong_goi='$qcdg', han_su_dung='$hsd', ID_cong_ty='$idcty',gia_thanh='$gia',anh_image='$anh',ID_admin='$idadmin' WHERE ID_thuoc = $id";
    $queryupdatethuoc = mysqli_query($conn, $updatethuoc);

    die("chỉnh sửa hoàn tất");
?>