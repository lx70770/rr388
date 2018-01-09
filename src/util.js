 export function redirectToFun(type, avatar) {
     let url = (type==='boss') ? '/boss' : '/genius';
     setTimeout(function () {
         if(!avatar){
             url += "info";
         }
     },300);
     return url;
 }
 
 export function getChatId(userId, targetId) {
     return [userId, targetId].sort().join('_');
 }