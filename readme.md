# Stringy Numbers


## Introduction

Stringy Numbers is a lightweight javascript library that allows basic maths operations on very large numbers.

It works by using strings to bypass javascripts limitation on number sizes.
Numbers are input into functions as strings, ie. you have to enclose them in quotes as you would a string.
The operations support floating point.

## Installation

```
const {mult,div,add,minus} = require('_path_')

```

## Functions

As of version 1.0.0 there are four basic maths operations available: 

-**mult()**  - _multiplication_,
-**div()**   - _division_,
-**add()**   - _addition_,
-**minus()** - _substraction_

  **mult()** takes two string numbers as arguments, multiplies them together 
            and returns the result as a string
 __e.g__
```
mult("1234","5678");
'7006652' 
``` 


  **div()** takes a number as its first argument, this sets the precision number 
          of significant figures for the answer, the next two arguments are the 
          dividend and divisor in that order, entered as strings.
__e.g__

```
div(10,"1234","5678");
' .2173300457907' 
``` 

_Note: the leading zero is  omitted in answers that are less than one._
_however answers can be input with leading or trailing 0s._



  **add()** takes two string numbers as arguments, adds them together and
           returns the result as a string 
 __e.g__
```
add("1234","5678");
'6912' 
``` 


   **minus()** takes two string numbers as arguments, substracts the second 
   ``         from the first and returns teh result as a string.
 __e.g__
```
minus("1234","5678");
'-4444' 
``` 




There is also a __test()__ function that will run two given numbers through each of 
the maths operations and compare them with the output of javascripts equivalent 
native operation, e.g.

`test(404,3)`

logs the following to the console..

```
-----------------------------------------------
|              BIG FLOAT TEST                  |
-----------------------------------------------
MY MULT:   1212
NATIVE JS: 1212
-----------------------------------------------
MY ADD:    407
NATIVE JS: 407
-----------------------------------------------
MY MINUS:    401
NATIVE JS: 401
-----------------------------------------------
MY DIV:    134.66666666666666666
NATIVE JS: 134.66666666666666 

```


**Additional Notes**

 Negative numbers are supported simply by appending the string number with
 a '**-**' sign. Leading and Trailing zeros are permitted in entered numbers.


