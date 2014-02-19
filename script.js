/*  PHPFunctions - Main JavaScript

    Version 2014-02-19
*/


var elQuery = $("#query");
var elEesult = $('#result');

elQuery.focus();

// Получим HTML код с информацией о функции
function getHtml(functionInfo) {

    var html = '';
    html += '<li class="functionInfo list-group-item">';
    html += '<h4 class="head"><span class="name">'+functionInfo['name']+'</span>';
    html += ' - <span class="shortdesc">' + functionInfo['shortdesc'] + '</span>';
    html += '<span class="version label label-info pull-right"> ' + functionInfo['version'] + '</span>';
    html += '</h4>';

    html += '<p class="syntax">'+functionInfo['syntax']+'</p>';
    html += '<p class="desc text-info">'+functionInfo['desc']+'</p>';
    html += '<div class="link"><a class="btn btn-default btn-sm" target="_blank" href="http://ru2.php.net/ru/'+functionInfo['name']+'">отрыть на php.net</a></div>';
    html += '</li>';   

    return html;
    
}

// Поиск по названию функции
function search() {

    var query = elQuery.val();

    // Минимальная длина поискового запроса - 2 символа
    if (query.length < 2) 
    {
        elEesult.html('<div class="alert alert-info">Введите 2 и более символа в поисковую строку</div>');
        return false;
    }
    
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

    // Объеденим группы результатов через разделитель и обернем тегом списка
    var searchResult = '';
    
    if (htmlFunctions[0] == '' && htmlFunctions[1] == '') {
        searchResult ='<div class="alert alert-warning">Ничего не найдено</div>';
    } else {
        searchResult = '<ul class="list-group">' + htmlFunctions.join('<hr>') + '</ul>';
    }
    
    elEesult.html(searchResult);
}

elQuery.change(function(){
    search();
});

elQuery.keyup(function(){
    search();
});

search();


