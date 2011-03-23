// Documentation - http://wordpress.org/extend/plugins/json-api/other_notes/
// https://github.com/bitzesty/qunit-mock
var WP = {
	open: function(blogUrl){
		var superPublicMethods  = {
			posts: function(){
				var limit = 10;
				var page = 0;
				var publicMethods = {
					all: function(callback){
						var url = blogUrl + '/api/get_recent_posts/'
						url += '?count=' + limit + '&page=' + page + '&callback=?'; 
						$.getJSON(url, function(data) {
							var newPosts = data.posts;
							for(var i = 0; i < newPosts.length; i++){
								var newPost = newPosts[i];
								newPost.createComment = function(data, callback){
									data.postId = newPost.id;
									superPublicMethods.comments().create(data, callback);
								}
							}
							callback(newPosts);
						});
					}, 
					findBySlug: function(slug, callback){
						var url = blogUrl + '/api/get_post/'
						url += '?slug=' + slug + '&callback=?'; 
						$.getJSON(url, function(data) {
							 callback(data.post);
						});								
					},
					limit: function(_limit){
						limit = _limit;
						return publicMethods;
					},
					page: function(_page){
						page = _page;
						return publicMethods;
					}
				};
				return publicMethods;
			},
			pages: function(){
				var publicMethods = {
					findBySlug: function(slug, callback){
						var url = blogUrl + '/api/get_page/';
						url += '?slug=' + slug + '&callback=?'; 
						$.getJSON(url, function(data) {
							 callback(data.page);
						});								
					}
				};
				return publicMethods;
			},
			categories: function(){
				var publicMethods = {
					all: function(callback){
						var url = blogUrl + '/api/get_category_index/';
						url += '?callback=?'; 
						alert(url);
						$.getJSON(url, function(data) {
							 callback(data.categories);
						});								
					}
				};
				return publicMethods;						
			},
			tags: function(){
				var publicMethods = {
					all: function(callback){
						var url = blogUrl + '/api/get_tag_index/';
						url += '?callback=?'; 
						$.getJSON(url, function(data) {
							 callback(data.tags);
						});								
					}
				};
				return publicMethods;						
			},
			comments: function(){
				var publicMethods = {
					create: function(comment, callback){
						var url = blogUrl + '/api/submit_comment/';
						url += '?post_id=' + comment.postId + '&name=' + comment.name + '&email=' + comment.email + '&content=' + comment.content + '&callback=?'; 
						$.getJSON(url, function(data) {
							 callback(data);
						});								
					}
				};
				return publicMethods;
			}
		};
		return superPublicMethods;
	}
}