define(function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;__fest_buf+=("<div id=\"ruleModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h3 class=\"modal-title\">Правила игры</h3></div><div class=\"modal-body\"><h4 style=\"text-align:center\">Компоненты игры</h4><p>64 уникальные карты<br/>2 карты джокера<br/>Правила игры</p><h4 style=\"text-align:center\">Цель игры</h4><p>Получить как можно больше победных очков, составляя вертикальные и горизонтальные линии по определённым правилам.</p><p><b style=\"font-weight:bold;\">Линия</b> состоит из 2, 3 или 4 карт, выложенных по горизонтали или вертикали, причём у всех карт в линии значение каждого из признаков (цвет, форма и число) должно быть или одинаковым для всех карт или совершенно разным для всех карт.</p><p><b style=\"font-weight: bold;\">Цепочка</b> – это линия из 4 карт.</p><h4 style=\"text-align:center\">Как играть</h4><p><b style=\"font-weight: bold;\">1. Выложить 1, 2, 3 или 4 карты</b> в линию по правилам</p><p>или</p><p><b style=\"font-weight: bold;\">2. Пропустить ход.</b> Пропуская ход, вы можете положить любое количество карт из руки (от 1 до 4) под низ колоды и взять из неё соответствующее количество карт взамен. Менять таким образом карты не обязательно.</p><h4 style=\"text-align:center\">Правила выкладывания линий</h4><p>Выкладывая карты в линию, вы должны соблюдать три условия:</p><p><b style=\"font-weight: bold;\">1. Сторона.</b> Каждая из выкладываемых карт должна хотя бы одной из сторон касаться уже лежащей на столе карты.</p><p><b style=\"font-weight: bold;\">2. Линия.</b> Вы можете:<br/>• создать\/продолжить линию с одной стороны от ранее выложенной карты,<br/>• создать\/продолжить линию с двух стороны от ранее выложенной карты</p><p>При этом у вас могут возникать и\/или продолжаться и другие линии</p><p><b style=\"font-weight: bold;\">3. Признаки.</b> У карт в одной линии каждый из признаков (цвет, форма и число), рассмотренных по отдельности, должен быть или одинаковым для всех карт, или совсем разным для всех карт – смотрите</p><h4 style=\"text-align:center\">Подсчёт очков</h4><p>После каждого хода, подсчитайте количество очков за каждую линию, созданную или продолженную вами в этот ход – для этого сложите числа, указанные на картах в линии.</p><h4 style=\"text-align:center\">Конец игры</h4><p>Игра завершается, когда заканчивается стопка карт и один из игроков выкладывает свою последнюю карту. Если вы выложили последнюю карту, удвойте количество очков за этот ход. Тот, кто набрал больше всего очков – выигрывает</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Вернуться</button></div></div></div></div><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"container\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><i class=\"glyphicon glyphicon-knight\"></i> iota game</a></div><form class=\"navbar-form navbar-left\"><div class=\"form-group\"><div class=\"btn-group\"><button type=\"button\" class=\"btn btn-link\" data-toggle=\"modal\" data-target=\"#ruleModal\"><i class=\"glyphicon glyphicon-paperclip\"></i> Правила игры</button></div></div></form></div></div></nav><div class=\"container\"><div class=\"row\"><div class=\"col-md-6 col-md-offset-3\"><div class=\"panel panel-default\"><div class=\"panel-body\"><ul class=\"nav nav-tabs\" role=\"tablist\"><li role=\"presentation\" class=\"active\"><a href=\"#home\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">Вход</a></li><li role=\"presentation\"><a href=\"#profile\" aria-controls=\"profile\" role=\"tab\" data-toggle=\"tab\">Регистрация</a></li></ul><div class=\"tab-content\"><div role=\"tabpanel\" class=\"tab-pane fade in active panel-body\" id=\"home\"><div class=\"alert alert-danger alert-dismissible js-alert-main\" role=\"alert\" style=\"display:none\"><strong class=\"js-alert-text\"></strong></div><form class=\"form-horizontal js-submit-login\"><div class=\"form-group\"><label for=\"inputLogin\" class=\"col-sm-2 control-label\">Логин</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control js-login-log\" id=\"inputLogin\" placeholder=\"johndoe\"/></div></div><div class=\"form-group\"><label for=\"inputPassword\" class=\"col-sm-2 control-label\">Пароль</label><div class=\"col-sm-10\"><input type=\"password\" class=\"form-control js-password-log\" id=\"inputPassword\" placeholder=\"password\"/></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-success\"><i class=\"glyphicon glyphicon-log-in\"></i> Войти</button></div></div></form></div><div role=\"tabpanel\" class=\"tab-pane fade panel-body\" id=\"profile\"><div class=\"alert alert-danger alert-dismissible js-alert-main\" role=\"alert\" style=\"display:none\"><strong class=\"js-alert-text\">Ошибка</strong></div><form class=\"form-horizontal js-submit-reg\"><div class=\"form-group\"><label for=\"inputLoginReg\" class=\"col-sm-4 control-label\">Логин</label><div class=\"col-sm-8\"><input type=\"text\" class=\"form-control js-login\" id=\"inputLoginReg\" placeholder=\"johndoe\"/></div></div><div class=\"form-group\"><label for=\"inputEmailReg\" class=\"col-sm-4 control-label\">Email</label><div class=\"col-sm-8\"><input type=\"email\" class=\"form-control js-email\" id=\"inputEmailReg\" placeholder=\"john.doe@example.com\"/></div></div><div class=\"form-group\"><label for=\"inputPasswordReg\" class=\"col-sm-4 control-label\">Пароль</label><div class=\"col-sm-8\"><input type=\"password\" class=\"form-control js-password\" id=\"inputPasswordReg\" placeholder=\"password\"/></div></div><div class=\"form-group\"><label for=\"inputPasswordConfirmReg\" class=\"col-sm-4 control-label\">Повтор пароля</label><div class=\"col-sm-8\"><input type=\"password\" class=\"form-control js-password2\" id=\"inputPasswordConfirmReg\" placeholder=\"password\"/></div></div><div class=\"form-group\"><div class=\"col-sm-offset-4 col-sm-8\"><button type=\"submit\" class=\"btn btn-success\"><i class=\"glyphicon glyphicon-log-in\"></i> Зарегистрироваться</button></div></div></form></div></div></div></div></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });