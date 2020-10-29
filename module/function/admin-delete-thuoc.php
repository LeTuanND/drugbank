<?php  
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $thuoc = isset($_POST['thuoc']) ? $_POST['thuoc'] : 0;

    $sql = "DELETE FROM thuoc WHERE ten_thuoc = '$thuoc'";

    $query = mysqli_query($conn, $sql);

    echo "ok";

?>