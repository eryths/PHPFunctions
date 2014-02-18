/*  PHPFunctions - Main JavaScript

    Version 2014-02-18
*/


var elEesult = $('#result');
var elQuery = $("#query");

// Получим HTML код с информацией о функции
function getHtml(functionInfo) {

    var html = '';
    html += '<div class="functionInfo">';
    html += '<div class="head"><span class="name">'+functionInfo['name']+'</span>';
    html += ' - <span class="shortdesc">' + functionInfo['shortdesc'] + '</span>';
    html += '<span class="version"> ' + functionInfo['version'] + '</span>';
    html += '</div>';

    html += '<div class="syntax">'+functionInfo['syntax']+'</div>';
    html += '<div class="desc">'+functionInfo['desc']+'</div>';
    html += '<div class="link"><a target="_blank" href="http://ru2.php.net/ru/'+functionInfo['name']+'">отрыть на php.net</a></div>';
    html += '</div><hr>';   

    return html;
    
}

// Поиск по названию функции
function search() {

    elEesult.html('');

    var query = $(elQuery).val();

    if (query.length < 2) return false;
    
    // Массив с HTML функций с разным приоритетом
    var htmlFunctions = ['',''];

    for (name in functionsJson) {
    
        var pos = name.indexOf(query);
        var functionInfo = functionsJson[name];
        functionInfo['name'] = name;
        
        // Если строка запроса в начале названия функции
        if (pos == 0) {

            htmlFunctions[0] += getHtml(functionInfo);

        }
        // Если строка запроса не в начале названия функции
        else if (pos > 0) {
            htmlFunctions[1] += getHtml(functionInfo);        
        }
    }

    if(htmlFunctions[0] != '') htmlFunctions[0] += "<br><hr>";
    elEesult.append(htmlFunctions.join(''));

    console.log(htmlFunctions);
  
  
}

elQuery.change(function(){
    search();
});

elQuery.keyup(function(){
    search();
});

search();


// console.log(functionsJson['abs']);
