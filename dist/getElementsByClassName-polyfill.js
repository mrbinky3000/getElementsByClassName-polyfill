/**
 * Add a getElementsByClassName method if the browser doesn't have one.
 * 99% created by Eike Send.  All I did was change document to Element, and
 * then made it an IIFE to get it out of global scope.
 * 
 * Limitation: can only get one classname at a time.
 *
 * @see https://gist.github.com/eikes/2299607
 * @author Eike Send, Matthew Toledo
 * @copyright Eike Send http://eike.se/nd
 * @liscence MIT License
 */
(function(){
  if (!Element.getElementsByClassName) {
      Element.prototype.getElementsByClassName = function (search) {
          var d = document,
              elements, pattern, i, results = [];
          if (d.querySelectorAll) { // IE8
              return d.querySelectorAll("." + search);
          }
          if (d.evaluate) { // IE6, IE7
              pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
              elements = d.evaluate(pattern, d, null, 0, null);
              while ((i = elements.iterateNext())) {
                  results.push(i);
              }
          } else {
              elements = d.getElementsByTagName("*");
              pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
              for (i = 0; i < elements.length; i++) {
                  if (pattern.test(elements[i].className)) {
                      results.push(elements[i]);
                  }
              }
          }
          return results;
      }
  }
})();
