define(function () { return function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_htmlchars=/[&<>"]/g,__fest_htmlchars_test=/[&<>"]/,__fest_short_tags = {"area":true,"base":true,"br":true,"col":true,"command":true,"embed":true,"hr":true,"img":true,"input":true,"keygen":true,"link":true,"meta":true,"param":true,"source":true,"wbr":true},__fest_element_stack = [],__fest_htmlhash={"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"},__fest_jschars=/[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test=/[\\'"\/\n\r\t\b\f<>]/,__fest_jshash={"\"":"\\\"","\\":"\\\\","/":"\\/","\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","'":"\\'","<":"\\u003C",">":"\\u003E"},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_replaceHTML(chr){return __fest_htmlhash[chr]}function __fest_replaceJS(chr){return __fest_jshash[chr]}function __fest_extend(dest, src){for(var i in src)if(src.hasOwnProperty(i))dest[i]=src[i];}function __fest_param(fn){fn.param=true;return fn}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}function __fest_escapeJS(s){if (typeof s==="string") {if (__fest_jschars_test.test(s))return s.replace(__fest_jschars,__fest_replaceJS);} else if (typeof s==="undefined")return "";return s;}function __fest_escapeHTML(s){if (typeof s==="string") {if (__fest_htmlchars_test.test(s))return s.replace(__fest_htmlchars,__fest_replaceHTML);} else if (typeof s==="undefined")return "";return s;}var json=__fest_context;(function(__fest_context){var json=__fest_context;__fest_buf+=("<div id=\"header\" class=\"grid__container_fluid\"><div class=\"grid__row title__page-header\"><div class=\"grid__col_4 grid__col-offset_4\"><h1 class=\"title__text\">iota</h1></div></div></div>");})(__fest_context);__fest_buf+=("<div class=\"grid__row\"><div class=\"grid__col grid__col_4 grid__col-offset_4 block__jumbotron\"><p><h2 class=\"title__text\">Registration</h2></p><form class=\"js-submit\"><div class=\"js-alert\"></div><div class=\"form__group\"><label class=\"grid__col grid__col_3 form__control_label\" for=\"name\">Login</label><div class=\"grid__col grid__col_9\"><input required=\"\" type=\"text\" class=\"js-login form__control\" name=\"login\" id=\"name\" placeholder=\"Name\"/></div></div><div class=\"form__group\"><label class=\"grid__col grid__col_3 form__control_label\">Email</label><div class=\"col-sm-9\"><input required=\"\" type=\"email\" class=\"js-email form-control\" name=\"email\" id=\"email\" placeholder=\"Email\"/></div></div><div class=\"form__group\"><label class=\"grid__col grid__col_3 form__control_label\" for=\"passwd\">Password</label><div class=\"grid__col grid__col_9\"><input required=\"\" type=\"password\" class=\"js-password form-control\" name=\"password\" id=\"passwd\" placeholder=\"Password\"/></div></div><div class=\"form__group\"><label class=\"form__control_label grid__col grid__col_3\" for=\"confpasswd\">Confim Password</label><div class=\"grid__col grid__col_9\"><input required=\"\" type=\"password\" class=\"js-password2 form-control\" name=\"confirm_password\" id=\"confpasswd\" placeholder=\"Confim password\"/></div></div><button type=\"submit\" class=\"button button_success button-block\">Submit</button><a type=\"button\" class=\"button button_danger button-block\" href=\"#\">Back</a></form></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}} ; });