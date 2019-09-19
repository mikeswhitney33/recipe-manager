var recipe_list = [];
var viewed_list = [];

function renderList() {
    $('#recipe-list').html('');
    $.each(viewed_list, function(i, item) {
        $('#recipe-list').append('<a class="recipe-list-item list-group-item list-group-item-action" href=/view?recipe_id=' + item['recipe_id'] + '>\
            <span class="recipe-name">' + item['name'] + '</span>\
        </a>');
    });
}

$(document).ready(function() {
    $.ajax({
        type:"GET",
        url:"/recipes"
    }).done(function(data) {
        rows = JSON.parse(data);
        recipe_list = rows;
        viewed_list = rows;
        renderList();
        $('.recipe-list-item').click(function(event) {
            window.location.href = "/view?recipe_id=" + $(this).attr('value');
        });
    });

    $('#recipe-search').keyup(function(e) {
        var query = $('#recipe-search').val().toLowerCase().trim();
        if(query.length == 0) {
            viewed_list = recipe_list;
        }
        else {
            viewed_list = [];
            for(var i = 0;i < recipe_list.length;i++) {
                var recipe = recipe_list[i];
                if(recipe['name'].toLowerCase().includes(query)) {
                    viewed_list.push(recipe);
                }
            }
        }
        renderList();
    });
});
