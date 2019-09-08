$(document).ready(function() {
    var recipe_id = getUrlVars()['recipe_id'];
    $('#add-title').html('Edit Recipe');
    $('#submit-btn').html('Save Edits');
    $('#submit-btn').off('click').on('click', function (event) {
        event.preventDefault();
        var data = getFormData();
        data["recipe_id"] = recipe_id;
        $.ajax({
            type: "PUT",
            url: "/recipes",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (data) {
                window.location.href = "/view?recipe_id=" + data["recipe_id"];
            },
            error: function () {
                alert("An error occured while adding your recipe");
            }
        });
    });
    $('#cancel-btn').off('click').on('click', function() {
        window.location.href = "/view?recipe_id="+recipe_id;
    });
    $('#add-recipe-form-group').append('<div id="delete-btn" class="btn btn-danger mt-3">Delete Recipe</div>')
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
        var obj = JSON.parse(data);
        $("#recipe_name").val(obj['name']);
        $('#recipe_yield').val(obj['yield']);
        $('#recipe_desc').val(obj['description']);
        $('#recipe_notes').val(obj['notes']);
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
    });
});