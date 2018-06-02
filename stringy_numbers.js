//this validates numbers entered: limited to one at a time and checks for correct format

/*------------VALIDATE() TAKES: ONE STRING NUMBER, RETURNS: OBJECT --------------------*/
/*-----------------------------helper function-----------------------------------------*/
function validate(number){
  let sign,power,original,decimal,num1=number,num={}
  if (arguments.length>1){
    throw "Please enter just 1 number";
  }
  if (typeof num1!=="string"){
    throw "Numbers have to be input as strings";
  }
  if (/[^.-\d]/.test(num1)){

     throw "Please only use digit characters, '.' or '-' in your strings";
  }
  if(num1[0]==="-"){
    sign=true;
  }
  else {
    sign=false;
  }
  
  num1 = num1.replace(/-/g,"").replace(/\.$/,"").replace(/^0+/,"").replace(/(\.0+)$/,"").replace(/(\.\d+[1-9])(0+$)/, "$1") //CHECK THIS!!!
  switch (num1.indexOf(".")){
    case -1:
          power = num1.length;
          break;
    case 0:
          power = -(/[1-9]/.exec(num1)["index"]);
          break;
    default:
          power = num1.indexOf(".");
  }
  decimal = /\.(\d+)/.exec(num1)?/\.(\d+)/.exec(num1)[1]: "";
  original = num1;
  num1 = num1.replace(/\./g,"");
  num ={sign,value:num1,pow:power,decimal,original};
  return num

}



/*----------MULT()  TAKES TWO STRING NUMBERS, RETURNS ONE STRING NUMBER-----------------------*/
/*--------------------------------------------------------------------------------------------*/

function mult(a,b){
    let num1 = validate(a);
    let num2 = validate(b);
    let sign = false;
    let firstnum = equalise_floatlength(num1,num2)[0];//num1["value"];
    let secondnum = equalise_floatlength(num1,num2)[1];//num2["value"];
    let declength = Math.max(num1["decimal"].length,num2["decimal"].length)*2;

    if (num1["sign"]?!num2["sign"]:num2["sign"])
      { sign = true} //this tests the sign of each number and assigns final sign, replicates XOR
  //need to figure out signing algorithm
  //values lower than one - fractions - do not convert correctly
  firstnum=firstnum.split("");
  secondnum=secondnum.split("");
 let bigarr = [];
 let arr = [];
 let carry = 0;
 let bigarr_final; 

 for (let i=secondnum.length-1;i>=0;i--){
   for(let j=firstnum.length-1;j>=0;j-- ){
     let product = 0;
     if(j!==0){
     product = secondnum[i]*firstnum[j];
     product = product+Number(carry);
     product = product.toString().split("");
     arr.unshift(product.pop());
     carry = product.join("");
     product = 0;
     }
    else  {
      product = secondnum[i]*firstnum[j];
      arr.unshift(product+Number(carry));
      let pusher  = arr.join("");
      for(k=0;k<secondnum.length-1-i;k++){
        pusher=pusher+"0";
      }
     bigarr.unshift(pusher)
      arr=[];
      carry=0;

    }



   }


 }

bigarr = adder(bigarr);
bigarr = trimnum(bigarr);  
    
let place =  bigarr.length-declength ; 


if(place>=0) { 
bigarr_final = bigarr.slice(0,place)+"."+ bigarr.slice(place);
}
else {
  for(let i = 0; i<Math.abs(place);i++){
    bigarr = "0"+bigarr;
  }
   bigarr_final = "."+bigarr;
}  

if(sign){
  bigarr_final="-"+bigarr_final;  //add sign to arr
}
  
return trimnum(bigarr_final);
}




/*------------FINDLENGTH() TAKES: ARRAY OF STRING NUMBERS, RETURNS: STRING NUMBER--------------*/
/*-------------------------------------helper function-----------------------------------------*/



//findLength returns the length of the longest element in an array of strings
function findLength(arr){
 let biggest = Math.max(...(arr.map(el=>el.length)));
 return biggest;
}


/*------------SAME() TAKES: ARRAY OF STRING NUMBERS, RETURNS: ARRAY--------------------*/
/*-----------------------------helper function-----------------------------------------*/

//same makes all the strings the same length, number of digits by adding 00
function same(arr){
 let newarr=[];
 let biggest=findLength(arr);

 for (let i of arr){  //added 'let' declaration to i
   let j = biggest - i.length;
   let newi=i;
     while(j>0){
    newi ="0"+newi;
       j--;
   }
   newarr.push(newi);


}
   return newarr;
}


/*------------EQUALISE_FLOATLENGTH() TAKES: VALIDATE() OBJECTS, RETURNS: ARRAY OF TWO STRING NUMBERS---------------*/
/*-----------------------------------------------helper function---------------------------------------------------*/


//adding new function to equalise length of strings containing decimal point.

function equalise_floatlength(a,b){
  let [num1_int,num1_dec] = [a.value,[]];
  let [num2_int,num2_dec]  = [b.value,[]];

  if(a.original.indexOf(".")!=-1){
     [num1_int,num1_dec] = a.original.split(".");
  }

  if(b.original.indexOf(".")!=-1){
      [num2_int,num2_dec] = b.original.split(".");
  }
  let i = Math.max(num1_int.length,num2_int.length);
     while(i>num1_int.length){
       num1_int="0"+num1_int;
     }
     while(i>num2_int.length){
      num2_int="0"+num2_int;
    }

  let j = Math.max(num1_dec.length,num2_dec.length)
    while(j>num1_dec.length){
      num1_dec=num1_dec+"0";
    }
    while(j>num2_dec.length){
     num2_dec=num2_dec+"0";
   }

 return [[num1_int,num1_dec].join(""),[num2_int,num2_dec].join("")]; //maybe not join?
}


/*----------ADDER() - TAKES: ARRAY OF ANY NUMBER OF STRING NUMBERS   RETURNS:STRING NUMBER----------*/
/*----------------helper function used in mult(), does not deal with decimal or signs---------------*/


function adder(arr){
 let finalarr = [];
 let temparr = [];
 let newarr = same(arr);
 let cols = findLength(newarr);
 let carry  = 0;
 for(let i=cols-1; i>=0;i--){
   let product = 0;
   if(i!==0){
   for(let j of newarr){
     product = product + Number(j[i]);
                       }
     product = product+Number(carry);
     product = product.toString().split("");
   finalarr.unshift(product.pop());
   carry = product.join("");
   }
   else{ for(let j of newarr){product = product+Number(j[i])}; product=product+Number(carry);
       product = product.toString().split("");
       finalarr.unshift(product.join(""))}
 }
 finalarr=finalarr.join("");
 return finalarr;

}
/*-----------ADD() - TAKES: TWO STRING NUMBERS  RETURNS: ONE STRING NUMBER-------------*/
/*-------------------------------------------------------------------------------------*/

function add(...args){

  let finalarr = [];
  let temparr = [];
  let set1 = validate(args[0]);
  let set2 = validate(args[1]);
  let newarr = equalise_floatlength(set1,set2);
  let pow1 = set1.pow;
  let pow2 = set2.pow;
  let finalpow = Math.max(pow1,pow2);
  let diff;
  let cols = findLength(newarr);
  let carry  = 0;
  let sign=false;
  if (set1.sign&& set2.sign){
      sign=true;
  }
  else if (set1.sign && !set2.sign){
     let res = minus(set2.original,set1.original);
     return res
     }
  else if (!set1.sign && set2.sign){
    let res = minus(set1.original,set2.original);
    return res
     }
     
  
  for(let i=cols-1; i>=0;i--){
    let product = 0;
    if(i!==0){
    for(let j of newarr){
      product = product + Number(j[i]);
                        }
      product = product+Number(carry);
      product = product.toString().split("");
    finalarr.unshift(product.pop());
    carry = product.join("");
    }
    else{ for(let j of newarr){product = product+Number(j[i])}; product=product+Number(carry);
        product = product.toString().split("");
        finalarr.unshift(product.join(""))}
  }
  if (finalpow<finalarr.length){
      diff = finalarr.length-finalpow;
  }
  else {
      diff = finalpow;
  }
  finalarr.splice(finalpow,0,".");
  finalarr=finalarr.join("");
  finalarr=trimnum(finalarr);
  finalarr=sign?"-":"" + finalarr;

  return finalarr;


}

/*-----------MINUS() - TAKES: TWO STRING NUMBERS  RETURNS: ONE STRING NUMBER-------------*/
/*---------------------------------------------------------------------------------------*/


function minus(...args){
 let set1 = validate(args[0]);
 let set2 = validate(args[1]);
 let newargs = equalise_floatlength(set1,set2);
 let pow1 = set1.pow;
 let pow2 = set2.pow;
 let finalpow = Math.max(pow1,pow2);
 let final=[];
 let sign="";
 let carry = 0;
 let product = 0;
 let top,bottom;
 if (set1.sign && !set2.sign){
  let res = "-"+add(set1.original,set2.original);
  return res
  }
else if (!set1.sign && set2.sign){
 let res = add(set1.original,set2.original);
 return res
  }
  if(newargs[0]>=newargs[1]){
    top= newargs[0];
    bottom = newargs[1];
     }
  else{
     bottom= newargs[0];
     top = newargs[1];
     sign="-"
     }
   for(let i = newargs[0].length-1;i>=0;i--){
     let topnum = Number(top[i]);
     let botnum = Number(bottom[i]);
     if(carry==1){topnum=topnum-1};
      if(topnum<botnum){
      product=(topnum+10)-botnum;
      carry=1;
      }
     else{
       product = topnum-botnum;
       carry=0}
     final.unshift(product) ;

   }
 if (finalpow<final.length){
   final.splice(finalpow,0,".");
 }
 if (set1.sign && set2.sign){
    if(sign==="-"){
      sign="";
    }
    else {
    sign="-";
    }
 }
 final.unshift(sign);
 final = final.join("");
 return final

}

/*-----------REMOVE_POINT() - TAKES:STRING NUMBER - RETURNS OBJECT / INTEGER AND INDEX OF POINT------------*/
/*--------------------------------------------helper function----------------------------------------------*/

//removes decimal

function remove_point(a){

 let ind = /\./.exec(a)?/\./.exec(a)["index"]:a.length;
 let num = a.replace(/\./,"")
 return {ind:ind,num:num}

}

function trimnum(num){
let finalnum = num.replace(/\.$/,"").replace(/^0+/,"").replace(/(\.0+)$/,"").replace(/(\.\d+[1-9])(0+$)/, "$1");

return finalnum
}



/*----------QUOT() - TAKES: TWO STRING NUMBERS - RETURNS: ARRAY //  QUOTIENT AND REMAINDER ------------*/
/*--------------------------------------helper function------------------------------------------------*/

//like a modulo operation but returns both quotient and remainder

function quot(num1,num2){
let count = "0";
let init= num1;
let last;
let ans = "";
while(ans[0]!="-"){    
 count=add(count,"1")
 ans=minus(init,num2);
 init=ans

}

let mod = add(num2,init);
mod = trimnum(mod);
return [minus(count,"1"),mod]
}

/*------------CORRECT_LENGTH()  -  TAKES: TWO STRING NUMBERS  RETURNS: ARRAY----------------*/
/*---------------------------------helper function-----------------------------------------*/

// Corrects length of smaller number by magnitudes of 10 to bring to as close to the size of bigger number without going over
// returns corrected numbers and an array of the mgnitude change and the number changed, + = first number, - = second number

function correctLength(a,b){ 
let num = trimnum(a);
let denom = trimnum(b);
let diff = Math.abs(num.length-denom.length);  
let mag = [0,""];
if(num==denom){
  return [num,denom,mag];
}  
if(num.length<denom.length)
 {
    let loop;
   mag[1]="+";
   if(num>=denom){loop=diff;}
   else {loop=diff+1;mag[0]+2;}               
   if(loop==0){mag[1]=""}                   
   for(let i=1;i<=loop;i++){
     mag[0]++;
     num=num+"0";
   }
 }
else if(num.length>denom.length)
 {
    let loop;
   mag[1]="-";                               
   if(num>=denom){loop=diff;}
   else {loop=diff-1;};
   if(loop==0){mag[1]=""}                          
   for(let i=0;i<loop;i++){
     mag[0]++;
     denom=denom+"0";
   }
 }
 else if(num.length===denom.length){
   let loop;
   if(num<denom){loop=1;}
   else{loop=0;}
   mag[1]="+";
   for(let i=0;i<loop;i++){
    mag[0]++;
    num=num+"0";
  }
   }
if(mag[0]==0){mag[1]=""}
return [num,denom,mag];
}
/*------------correctLength for DIV operations----------------*/
/*---------------------helper function------------------------*/
function correctDivLength(a,b){ 

let num = trimnum(a);
let denom = trimnum(b);
let diff = Math.abs(num.length-denom.length);  
let mag = [0,""];
if(num==denom){
  return [num,denom,mag];
}  
if(num.length<denom.length)
 {
   let loop;
    
   mag[1]="+";
   if(num>=denom || num.replace(/0+$/,"")==denom.replace(/0+$/,"")){loop=diff;}
   else {loop=diff+1;mag[0]+2;}               
   if(loop==0){mag[1]=""}                   
   for(let i=1;i<=loop;i++){
     mag[0]++;
     num=num+"0";
   }
 }
else if(num.length>denom.length)
 {
    let loop;
   mag[1]="-";                               
   if(num>=denom){loop=diff;}
   else {loop=diff-1;};
   if(loop==0){mag[1]=""}                          
   for(let i=0;i<loop;i++){
     mag[0]++;
     denom=denom+"0";
   }
 }
 else if(num.length===denom.length){
   let loop;
   if(num<denom){loop=1; mag[1]="+"}
   else{loop=0;mag[1]=""}

   for(let i=0;i<loop;i++){
    mag[0]++;
    num=num+"0";
  }
   }

return [num,denom,mag];
}

/*-------DIV(), TAKES: 1 NUMBER and 2 STRING NUMBERS, RETURNS: 1 STRING NUMBER-------*/
/*-----------------------------------------------------------------------------------*/



function div(precision=100, ...args){ 
  let final = [];
  let prec=precision;
  let set1=validate(args[0]);
  let set2=validate(args[1]);
  let nums = equalise_floatlength(set1,set2);
  let num1 = nums[0], num2 = nums[1];
  let old_mag = "start";
  let old_sign;

  function cal(a,b){

    let set3 = correctDivLength(a.replace(/^0+/,""),b.replace(/^0+/,""));
    let mag = set3[2][0];
    let sign = set3[2][1];
    let ex= quot(set3[0],set3[1]);
    let quotient=ex[0];
    let remainder=ex[1];
    let zeros;
    if(old_mag!="start"){
      if (remainder!=""){
          zeros = (old_mag-mag-1)} 
      else {zeros = mag-1}
        }
    else  {zeros=mag;}

    if(prec>0){
      prec--;
      if(sign=="+"){
        if(old_sign="-" && final.indexOf(".")==-1){
          for(let i=0;i<old_mag;i++){
          final.push("0");
           }
        }
        if(final.indexOf(".")==-1){
          final.push(".")
        }
        for(let i=1;i<mag;i++){
          final.push("0");

        }
        final.push(quotient);
        if(remainder==""){
                          return
                          }
      }
      
      
      else if(sign=="-"){
       
        if(old_mag=="start" ){
          final.push(quotient)
          if(remainder==""){
            for(let i=0;i<mag;i++){
          final.push("0"); 
           }
            return
          }
        }
        
        else {

           for(let i=0;i<zeros;i++){
          final.push("0");
           }
          final.push(quotient)

        } 
       
      }
      else{
        if(old_mag=="start"){
          final.push(quotient);
          for(let i=0;i<zeros;i++){
          final.push("0");
           }
          if(remainder==""){return}
        }
        
        else if(old_mag!="start"){
           for(let i=0;i<old_mag-1;i++){  
          final.push("0");
           }
          final.push(quotient)
         if(remainder==""){return}
        }
      }
      old_mag= mag;
      old_sign=sign;      
      return cal(remainder,num2);
   
    }
    return;
  }
  cal(num1,num2);

  //map any chars begining with 0 to remove 0
  let point_place = final.indexOf(".");

  if(point_place>0){
    final.splice(point_place,1)
  }

  final=final.map(el=>el.length>1? el.replace(/^0/,""):el);

  final = final.join("");
  if(point_place>0){final = [final.slice(0,point_place),".",final.slice(point_place)].join("")}

  if(set1.sign ^ set2.sign){
    final="-"+final;
  }
  final = trimnum(final);
  return final;
}

/*--------------TEST() TAKES TWO NUMBERS, CONSOLE.LOGS RESULTS OF MATH OPERATIONS COMAPRED TO RESULTS FROM NATIVE JS MATH ----------------*/
/*---------------------------------------------------------test function------------------------------------------------------------------*/
function test(x,y){
  console.clear();
  console.log("-----------------------------------------------");
  console.log("|              BIG FLOAT TEST                  |");
  console.log("-----------------------------------------------");
  console.log(`MY MULT:   ${mult(String(x),String(y)) }`);
  console.log(`NATIVE JS: ${x*y}`)
  console.log("-----------------------------------------------");
  console.log(`MY ADD:    ${add(String(x),String(y)) }`);
  console.log(`NATIVE JS: ${x+y}`)
  console.log("-----------------------------------------------");
  console.log(`MY MINUS:    ${minus(String(x),String(y)) }`);
  console.log(`NATIVE JS: ${x-y}`)
  console.log("-----------------------------------------------");
  console.log(`MY DIV:    ${div(20,String(x),String(y))}`);
  console.log(`NATIVE JS: ${x/y}`)
}

module.exports.mult = mult
module.exports.div = div
module.exports.minus = minus
module.exports.add = add
module.exports.test = test



