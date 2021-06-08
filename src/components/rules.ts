export default {
   required: v => !!v || 'Поле обязательно',
   numbersOnly: v => { 
         return !isNaN(+v) || 'Можно вводить только цифры' 
      }
}