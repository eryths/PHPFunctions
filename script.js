/*  PHPFunctions - Main JavaScript

    Version 2014-02-19
*/

// Замена значений одного массива на значения другого массива
function str_replace ( search, replace, subject ) {	// Replace all occurrences of the search string with the replacement string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Gabriel Paderni

	if(!(replace instanceof Array)){
		replace=new Array(replace);
		if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
			while(search.length>replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
		replace[replace.length]='';
	}

	if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}

	for(var k=0; k<search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;
}



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

// Исправим текст в неверной клавиатурной раскладке
function fixKeyboard(text) {
    
    // Если нет кириллицы, то вернем текст без изменений
    if (text.search(/[а-я]/) == -1) return text;
    return str_replace(new Array('й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'), new Array('q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'), text);
  
}


// Поиск по названию функции
function search() {

    var query = fixKeyboard(elQuery.val().toLowerCase());
    
    
    // Минимальная длина поискового запроса - 2 символа
    if (query.length < 2) 
    {
        elEesult.html('<div class="alert alert-info">Введите 2 и более символа в поисковую строку</div>');
        return false;
    }
    
    // Массив с HTML функций с разным приоритетом
    var htmlFunctions = ['','',''];

    var pos;
    var functionInfo;
    for (name in functionsJson) {
    
        pos = name.indexOf(query);
        functionInfo = functionsJson[name];
        functionInfo['name'] = name;
        
        // Если строка запроса в начале названия функции
        if (pos == 0) {
            if (name == query) htmlFunctions[0] += getHtml(functionInfo);
            else htmlFunctions[1] += getHtml(functionInfo);

        }
        // Если строка запроса не в начале названия функции
        else if (pos > 0) {
            htmlFunctions[2] += getHtml(functionInfo);        
        }
    }

    // Объеденим группы результатов через разделитель и обернем тегом списка
    var searchResult = '';
    
    if (htmlFunctions[0] == '' && htmlFunctions[1] == '' && htmlFunctions[2] == '') {
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


