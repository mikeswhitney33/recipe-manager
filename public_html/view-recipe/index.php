<?php
    $title = "View Recipe";
    $content = file_get_contents("../shared/html/view-recipe.html");
    $css_links = "<link rel='stylesheet' href='/shared/css/view-recipe.css'>";
    $js_scripts = "<script src='/shared/js/view-recipe.js'></script>";
    include("../../templates/main-template.php");
?>