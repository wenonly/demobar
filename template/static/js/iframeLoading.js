$(document).ready(function() {
  var iframe = document.getElementById("iframe-box");    
  if (iframe.attachEvent) {    
      iframe.attachEvent("onload", function() {    
          //iframe加载完成后你需要进行的操作  
          console.log('12222222222')
        });    
      } else {    
        iframe.onload = function() {    
          console.log('12222222222')
                //iframe加载完成后你需要进行的操作  
      };    
  }
})