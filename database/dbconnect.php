<?php

    function dbConnect(){
        $db_host = "localhost";
        $db_name = "jerocam";
        $db_pass = "jero";
        $db_table = "sell_stuff";
        $db_port = 3307;

        $conn = new mysqli($db_host, $db_name, $db_pass, $db_table, $db_port) or die ("Connection failed!" . mysql_connect_error());

        return $conn;
    }

    function dbClose($conn){
        $conn -> close();
    }

?>