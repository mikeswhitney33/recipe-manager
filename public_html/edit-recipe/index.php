<?php
    $title = "Edit Recipe";
    $content = file_get_contents("../shared/html/add-recipe.html");
    $css_links = "<link rel='stylesheet' href='/shared/css/add-recipe.css'>";
    $js_scripts = "<script src='/shared/js/add-recipe.js'></script><script src='/shared/js/edit-recipe.js'></script>";
    include("../../templates/main-template.php");
?>