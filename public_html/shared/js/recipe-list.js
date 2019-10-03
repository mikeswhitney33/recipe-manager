function setList(viewRecipes) {

    $('#recipe-list').html('');
    for(var i = 0;i < viewRecipes.length;i++) {
        var recipe = viewRecipes[i];
        var image_path = recipe['image_path'];
        if(image_path === null || image_path.length === 0) {
            image_path = '/shared/images/missing.png';
        }
        $('#recipe-list').append(
            "<div class='col-md-3'>" +
                "<div class='recipe-list-item' value='"+recipe['recipe_id']+"'>" + 
                    "<img src='" + image_path + "' height=150 width=200>" +
                    "<div class='recipe-list-item-body'>" + 
                        "<h3>" + recipe['name'] + "</h3>" + 
                    "</div>" +
                "</div>" +
            "</div>");
    }
    $(".recipe-list-item").click(function() {
        window.location.href = "/view-recipe?recipe_id=" + $(this).attr('value');
    });
}

$(document).ready(function(){
    $('#page-title-wrapper').find('h3').html("Recipe List");
    
    $("#special-btn").click(function(){
        window.location.href="/add-recipe";
    });

    var recipes = [];
    var viewRecipes = [];

    $.ajax({
        url:"/recipe_api",
        type:"GET",
    }).done(function(res){
        var resobj = JSON.parse(res);

        var status = resobj.status;
        if (status === "success") {
            recipes = resobj.recipes;
            viewRecipes = recipes;
            setList(viewRecipes);
        }
    });

    // key up listener for the search bar
    $('#search-bar-wrapper').find('input').keyup(function() {
        viewRecipes = [];
        var query = $(this).val().trim().toLowerCase();
        if(query.length === 0) {
            viewRecipes = recipes;
        }
        else {
            for(var i = 0;i < recipes.length;i++) {
                var recipe = recipes[i];
                // check the name of the recipe
                if(recipe['name'].trim().toLowerCase().includes(query)) {
                    viewRecipes.push(recipe);
                    continue;
                }

                // check the ingredients in the recipe
                var found = false;
                var ingredients = recipe.ingredients;
                for(var j = 0;j < ingredients.length;j++) {
                    var ingredient = ingredients[j];
                    if(ingredient.name.trim().toLowerCase().includes(query)) {
                        viewRecipes.push(recipe);
                        found = true;
                        break;
                    }
                }
                if(found) continue;

                // // check the keywords in the recipe
                var keywords = recipe['keywords'].split(/,/g);
                for(var j = 0;j < keywords.length;j++) {
                    if(keywords[j].trim().toLowerCase().includes(query)) {
                        viewRecipes.push(recipe);
                        found = true;
                        break;
                    }
                }
                if(found) continue;
            }
        }
        setList(viewRecipes);
    });


});