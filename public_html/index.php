<?php
    $title = "Home";
    $content = file_get_contents("shared/html/home.html");
    $css_links = "<link rel='stylesheet' href='/shared/css/recipe-list.css'>";
    $js_scripts = "<script src='/shared/js/recipe-list.js'></script>";
    include("../templates/main-template.php");
?>
