var counter = 0;

for(var ix = 0;ix<user.tasks.length;ix++){
    
  if(user.tasks[ix]){
   counter ++  
  }
}

var barValue = user.tasks.length/counter*100 