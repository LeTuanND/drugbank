<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $search = isset($_POST['search']) ? $_POST['search'] : 0;
    $entity = isset($_POST['entity']) ? $_POST['entity'] : 0;

    $muc = "";

    if ($entity === 'tên thuốc') {
    	# code...
    	$muc = 'ten_thuoc';
    } else if ($entity === 'hoạt chất') {
    	$muc = 'hoat_chat';
    } else {
    	$muc = 'ten_cong_ty';
    }

    if ($search === "null") {
        $sql = "select count(ID_thuoc) as total from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty";
    } else {
         $sql = "select count(ID_thuoc) as total from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty where $muc like '%$search%'";
    }


    $query = mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0){
        $row = mysqli_fetch_assoc($query);
        echo ceil($row['total']/9);
    }
