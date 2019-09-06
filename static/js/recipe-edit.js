$(document).ready(function() {
    var recipe_id = getUrlVars()['recipe_id'];
    $('#add-title').html('Edit Recipe');
    $('#submit-btn').val('Save Edits');
    $('#submit-btn').click(function(event){
        event.preventDefault();
        var data = getFormData();
        data['recipe_id'] = recipe_id;
        $.ajax({
            type:"PUT",
            url:"/recipes",
            data: data
        }).done(function(data) {
            alert(data);
            // window.location.href="/view?recipe_id="+recipe_id;
        });
        // alert(JSON.stringify(data));
    });
    $('#add-recipe-form').prepend('<div id="delete-btn" class="btn btn-danger float-right">Delete Recipe</div>')
    $('#add-recipe-form').prepend('<input type=text name="recipe_id" value="'+recipe_id+'" hidden>');
    $("#delete-btn").click(function() {
        $.ajax({
            type: "DELETE",
            url: "/recipes?recipe_id="+recipe_id
        }).done(function(){
            window.location.href = "/";
        })
    });
    $.ajax({
        type: "GET",
        url: "/recipes?recipe_id="+recipe_id
    }).done(function(data) {
        alert(data);
        var obj = JSON.parse(data);
        $("#recipe_name").val(obj['name']);
        $('#recipe_yield').val(obj['yield']);
        $('#recipe_desc').val(obj['description']);
        var ingredients = obj['ingredients'];
        for(var i = 0; i < ingredients.length;i++) {
            add_ingredient_field();
            var field = $('#add-ingredient-list').children()[i];
        
            $(field).find('.ing-name').val(ingredients[i]['name']);
            $(field).find('.ing-amount').val(ingredients[i]['amount']);
        }

        var steps = obj['steps'];
        for(var i = 0;i < steps.length;i++) {
            add_step_field();
            var field = $("#add-step-list").children()[i];
            $(field).find('.step-field').val(steps[i]);
        }
        // alert(obj['name']);
    });
});