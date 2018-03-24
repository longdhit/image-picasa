var url = "https://lh3.googleusercontent.com/-hCQFr4sS7qc/WrZd2b4cbaI/AAAAAAAAAGk/KjA1HsxkZ-cOy9zhTMwDvjoYRzeo6A4KgCHMYCw/logo.jpg";
var newUrl = url.split('/')
newUrl[0]='http:'
newUrl[2]= '1.bp.blogspot.com'
newUrl.splice(newUrl.length -1,0,'s0')

console.log(newUrl.join('/'))
