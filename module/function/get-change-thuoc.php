<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;

    $sql = "select * from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty where ID_thuoc = $id";

    // echo $sql;


    $query = mysqli_query($conn, $sql);

    $result = array();


    if (mysqli_num_rows($query) > 0){
	    $row = mysqli_fetch_assoc($query);
	    $result["ten_thuoc"] = $row["ten_thuoc"];
	    $result["so_dang_ki"] = $row["so_dang_ki"];
	    $result["hoat_chat"] = $row["hoat_chat"];
	    $result["quy_cach_dong_goi"] = $row["quy_cach_dong_goi"];
	    $result["dang_bao_che"] = $row["dang_bao_che"];
	    $result["han_su_dung"] = $row["han_su_dung"];
	    $result["anh"] = $row["anh_image"];
	    $result["ten_cong_ty"] = $row["ten_cong_ty"];
	    $result["gia_thanh"] = $row["gia_thanh"];
	    $result["lhkd"] = $row["loai_hinh_kinh_doanh"];
	    $result["tru_so"] = $row["dia_chi_tru_so_chinh"];
	    $result["dckd"] = $row["dia_chi_kinh_doanh"];
	    $result["sdt"] = $row["dien_thoai"];
	    
	}
	die (json_encode($result));

?>