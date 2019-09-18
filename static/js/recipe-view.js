function addElem(pdf, cury, txt) {
    if(txt.length > 0) {
        pdf.text(25.4, cury, txt);
        cury += 10;
    }
    return cury;
}

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
        $('#download-btn').click(function( ){
            var pdf = new jsPDF("p", "mm", "a4");
            var cury = 25.4;
            var margin_left = 25.4
            pdf.setFontSize(24);
            pdf.text(margin_left, cury, obj['name']);
            cury += pdf.getTextDimensions(obj['name'])['h'];
            if(obj['yield'].length > 0) {
                pdf.setFontSize(8);
                pdf.setFontType("bold");
                pdf.text(margin_left, cury, "Yield: ");
                pdf.setFontType("normal");
                pdf.text(margin_left + pdf.getTextWidth("Yield: "), cury, obj['yield']);
                cury += pdf.getTextDimensions(obj['yield'])['h'] + 2.5;
            }
            if(obj['description'].length > 0) {
                pdf.setFontSize(8);
                pdf.setFontType("bold");
                pdf.text(margin_left, cury, "Description:");
                cury += pdf.getTextDimensions("Description: ")['h'] + 2.5;
                var lines = pdf.splitTextToSize(obj['description'], 210 - (margin_left + margin_left));
                pdf.setFontType("normal");
                pdf.text(margin_left, cury, lines);
                cury += pdf.getTextDimensions(lines)['h'] + 2.5;
            }
            if(obj['ingredients'].length > 0) {
                pdf.setFontSize(8);
                pdf.setFontType("bold");
                pdf.text(margin_left, cury, "Ingredients:");
                cury += 2.5;
                cury += pdf.getTextDimensions("Ingredients:")['h'];
                pdf.setFontType("normal");

                var longest = 0;
                for(var i = 0;i < obj['ingredients'].length;i++) {
                    var ing = obj['ingredients'][i];
                    if(ing['amount'].length > longest) {
                        longest = ing['amount'].length;
                    }
                }
                
                for(var i = 0;i < obj['ingredients'].length;i++) {
                    var ing = obj['ingredients'][i];
                    pdf.text(margin_left , cury, ing['amount']);
                    pdf.text(margin_left + longest + 15, cury, ing['name']);
                    cury += pdf.getTextDimensions(ing['name'])['h'] + 1;
                }
                cury += 1.5;
            }
            if(obj['steps'].length > 0) {
                pdf.setFontSize(8);
                pdf.setFontType("bold");
                pdf.text(margin_left, cury, "Directions:");
                cury += 2.5;
                cury += pdf.getTextDimensions("Directions:")['h'];
                pdf.setFontType("normal");

                var longest = 0;
                for(var i = 0;i < obj['steps'].length;i++) {
                    if(pdf.getTextWidth((i+1) + '. ') > longest) {
                        longest = pdf.getTextWidth((i+1) + '. ');
                    }
                }

                for(var i = 0;i < obj['steps'].length;i++) {
                    pdf.text(margin_left, cury, (i+1) + ". ");
                    var lines = pdf.splitTextToSize(obj['steps'][i], 210 - (margin_left + longest + margin_left));
                    pdf.text(margin_left + longest, cury, lines);
                    cury += pdf.getTextDimensions(lines)['h'] + 1;
                }
            }
            // cury = addElem(pdf, cury, obj['name']);
            // cury = addElem(pdf, cury, "Yield:");
            // pdf.setFontSize(12);
            // cury = addElem(pdf, cury, obj['yield']);
            // cury = addElem(pdf, cury, obj['description']);
            pdf.save("test.pdf");
        });
        $('#recipe-viewer').append('<h1>'+obj['name']+'</h1>');
        if(obj['yield'].length > 0) {
            $("#recipe-viewer").append('<h3>Yield: </h3><p>'+obj['yield']+'</p>');
        }
        if(obj['description'].length > 0) {
            $("#recipe-viewer").append('<h3>Description: </h3>\
            <p>'+obj['description']+'</p>');
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
        if(obj['notes'].length > 0) {
            $('#recipe-viewer').append('<h3>Notes: </h3>\
            <p>'+obj['notes'].replace(/\n/g, '<br>')+'</p>');
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