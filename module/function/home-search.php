<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $search = isset($_POST['search']) ? $_POST['search'] : 0;
    $entity = isset($_POST['entity']) ? $_POST['entity'] : 0;
    $page = isset($_POST['page']) ? $_POST['page'] : 1;
    $count = ($page - 1 )*9;

    $muc = "co_so_kinh_doanh";

    if ($entity === 'tên thuốc') {
    	# code...
    	$muc = 'ten_thuoc';
    } else if ($entity === 'hoạt chất') {
    	$muc = 'hoat_chat';
    } else{
    	$muc = 'ten_cong_ty';
    }

    if ($search === "null") {
    	$sql = "select * from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty order by so_luong_tim_kiem desc limit 9 offset $count";
    } else {
    	$sql = "select * from thuoc t join co_so_kinh_doanh cskd on t.ID_cong_ty = cskd.ID_cong_ty where $muc like '%$search%' order by so_luong_tim_kiem desc limit 9 offset $count";
    }

    


    $query = mysqli_query($conn, $sql);

    $result = array();

    if (mysqli_num_rows($query) > 0){
	    while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
	        $result[] = array(
	            'ten_thuoc' => $row['ten_thuoc'],
	            'sdk' => $row['so_dang_ki'],
	            'hoat_chat' => $row['hoat_chat'],
	            'cty' => $row['ten_cong_ty'],
	            'gia' => $row['gia_thanh']
	        );
	    }
	}

	die (json_encode($result));

?>