(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['partials/search'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form role=\"movie-search-field\" action=\"search-movies\">\r\n    <label for=\"s\">Search</label>\r\n    <input type=\"text\" name=\"s\" value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.search : depth0), depth0))
    + "\" placeholder=\"Search for movies...\">\r\n    <input type=\"submit\" value=\"Search\">\r\n    WOOT\r\n</form>\r\n";
},"useData":true});
})();