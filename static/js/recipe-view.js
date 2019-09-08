$(document).ready(function(){
    var recipe_id = getUrlVars()['recipe_id'];
    $("#edit-btn").click(function() {
        window.location.href = "/edit?recipe_id=" + recipe_id;
    });
    $.ajax({
        type: "GET",
        url: "/recipes?recipe_id=" + recipe_id
    }).done(function(data) {
        var obj = JSON.parse(data);
        $('#recipe-viewer').append('<h1>'+obj['name']+'</h1>');
        if(obj['yield'].length > 0) {
            $("#recipe-viewer").append('<h3>Yield: </h3><p>'+obj['yield']+'</p>');
        }
        if(obj['description'].length > 0) {
            $("#recipe-viewer").append('<h3>Description: </h3>\
            <p>'+obj['description']+'</p>');
        }
        if(obj['notes'].length > 0) {
            $('#recipe-viewer').append('<h3>Notes: </h3>\
            <p>'+obj['notes']+'</p>');
        }
        if(obj['ingredients'].length > 0) {
            $("#recipe-viewer").append('<h3>Ingredients: </h3><table class="table" id="ing-list"><tbody></tbody></table>');
            for(var i = 0;i < obj['ingredients'].length;i++) {
                $('#ing-list').append('<tr>\
                    <td>'+obj['ingredients'][i]['amount']+'</td>\
                    <td>'+obj['ingredients'][i]['name']+'</td>\
                </tr>');
            }
        }
        if(obj['steps'].length > 0) {
            $("#recipe-viewer").append('<h3>Directions: </h3><ol id="step-list"></ol>');
            for(var i = 0;i < obj['steps'].length;i++) {
                $('#step-list').append('<li>'+obj['steps'][i]+'</li>');
            }
        }
    });
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}