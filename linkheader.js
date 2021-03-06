'use strict';

/* Adapted from 
   http://bill.burkecentral.com/2009/10/15/parsing-link-headers-with-javascript-and-java/
   by Bill Burke
 */
 
var linkexp=/<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
var paramexp=/[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;

module.exports = function(value,rel){
   var matches = value.match(linkexp);
   var ret = [];
   for (var i = 0; i < matches.length; i++)
   {
      var split = matches[i].split('>');
      var href = split[0].substring(1);
      var ps = split[1];
      var link = new Object();
      link.href = href;
      var s = ps.match(paramexp);
      for (var j = 0; j < s.length; j++)
      {
         var p = s[j];
         var paramsplit = p.split('=');
         var name = paramsplit[0];
         link[name] = unquote(paramsplit[1]);
      }

      if (link.rel && 
          link.rel.toLowerCase() == rel.toLowerCase()) ret.push(link.href);
   }
   return ret;
}

function unquote(value)
{
    if (value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') return value.substring(1, value.length - 1);
    return value;
}

