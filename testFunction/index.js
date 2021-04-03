const puppeteer = require('puppeteer');
const {Ayioo} = require('ayiooo');


module.exports = async function (context, req) {
    context.log("Function started");
   try {

       Ayioo.configure({
           token: '',
           channelID: ''
       })


       Ayioo.log(`Hey ~ test ayioo`);
       context.res = {
           // status defaults to 200 */
           body: "Hey ~ test ayioo"
       };
       
   } catch (error) {

    context.log("Error X",error);
       
   }
};