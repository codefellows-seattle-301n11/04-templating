'use strict';

let articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
  // TODONE: Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.
  let source = $('#article-template').html();
  let template = Handlebars.compile(source);
  $('article').removeClass('template');

  // REVIEWED: If your template will use properties that aren't on the object yet, add them.
  // Since your template can't hold any JS logic, we need to execute the logic here.
  // The result is added to the object as a new property, which can then be referenced by key in the template.
  // For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? `Published ${this.daysAgo} days ago` : '(draft)';

  // REVIEWED: The ternary operator above accomplishes this same logic.
  // if(this.publishedOn) {
  //   this.publishStatus = `published ${this.daysAgo} days ago`;
  // } else {
  //   this.publishStatus = '(draft)';
  // }

  // TODONE: Use the method that Handlebars gave you to return your filled-in html template for THIS article.
  // let context = {title: this.title, category: this.category, author: this.author, authorURL: this.authorURL, publishedStatus: this.publishStatus, body: this.body};
  // let html = template(context);
  return template(this);
};

// COMMENTED: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// There are parentheses around "(a,b)" because there are two inputs that the function is comparing against one another. Each forEach function is only using one input so parentheses are unnecessary.
rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  articles.push(new Article(articleObject));
});

articles.forEach(article => {
  console.log(article);
  $('#articles').append(article.toHtml());
});
