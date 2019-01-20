/**Service worker registration */
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js',{scope:'./'})
    .then(function(registration){
      console.log("SW registered",registration);
    })
    .catch(function(err){
      console.log("SW not registered",err);
    });
  }