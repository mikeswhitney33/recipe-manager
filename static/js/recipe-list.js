$(document).ready(function() {
    $.ajax({
        type:"GET",
        url:"/recipes"
    }).done(function(data) {
        rows = JSON.parse(data);
        for(var i = 0;i < rows.length;i++) {
            var row = rows[i];
            $("#recipe-list").append('<a class="recipe-list-item list-group-item list-group-item-action" href=/view?recipe_id='+row['recipe_id']+'>\
                <span class="recipe-name">'+row['name']+'</span>\
                </a>'
            );
        }
        $('.recipe-list-item').click(function(event) {
            window.location.href = "/view?recipe_id=" + $(this).attr('value');
        });
    });
});
