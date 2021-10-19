# Express-Intro-API
using System;

namespace test
{   

    static void Main(){
       string[,] field =  { { ' ', ' ', ' ' },{ ' ', ' ', ' ' },{ ' ', ' ', ' ' },{ ' ', ' ', ' ' } };
       int steps = {{0, 0}, {0, 1}, {1, 1}, {0, 2}, {2, 2}};

       ShowTheField(field);

       for(int i = 0; i < steps.length; i++){
           if(isWin(field)){
               System.Console.WriteLine('Step' + i);
               if(i % 2 == 0){
                   field = DoStep(field, steps[i], 'x');
               }
               else{
                   field = DoStep(field, steps[i], 'o');
               }
           }
           else if(){

           }
           else if()
           {
                
           }
       }
   }
    
    static isWin(string[,] field, ste)

   static ShowTheField(string[,] field){
       show = transformField(field)
       System.Console.WriteLine(show);
   }

   static transformField(string[,] field){
       transform = '';
       for(int i = 0; i < field.length; i++)
           transform += $'{field[i][0]}|{field[i][1]}|{field[i][2]} \n';
       return transform;
   }
}
