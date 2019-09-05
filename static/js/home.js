$(document).ready(function() {
    $('#add-ing-btn').click(function() {
        $('#add-ingredient-list').append('<li class="add-ing-item list-group-item">\
            <div class="input-group">\
                <input type=text class="form-control" placeholder="Enter Ingredient Name..." name="ingredient-name"]>\
                <input type=text class="form-control" placeholder="Enter Ingredient Amount..." name="ingredient-amount">\
                <div class="input-group-append">\
                    <button class="remove-ing-btn btn btn-danger" type="button">Remove</button>\
                </div>\
            </div>\
        </li>');
        $(".remove-ing-btn").click(function() {
            $(this).parents('.add-ing-item').remove();
        });
    });

    $('#add-step-btn').click(function() {
        $('#add-step-list').append('<li class="add-step-item list-group-item">\
            <div class="input-group">\
                <textarea name="step" form="add-recipe-form" class="form-control" placeholder="Enter Step..."></textarea>\
                <div class="input-group-append">\
                    <button class="remove-step-btn btn btn-danger" type="button">Remove</button>\
                </div>\
            </div>\
        </li>');
        $('.remove-step-btn').click(function() {
            $(this).parents('.add-step-item').remove();
        });
    });
});