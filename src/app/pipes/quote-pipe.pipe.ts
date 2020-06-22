import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotePipe'
})
export class QuotePipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let quoteOfTheDay = '';

    switch (value) {
      case 1:
        quoteOfTheDay = 'Act as if what you do makes a difference. It does. (William james)';
        break;
      case 2:
        quoteOfTheDay = 'Success is not final, failure is not fatal: it is the courage to continue that counts (Winsten Churchil)';
        break;
      case 3:
        quoteOfTheDay = 'Believe you can and you\'re halfway there. (Theodore Roosevelt)';
        break;
      case 4:
        quoteOfTheDay = 'When you have a dream, you\'ve got to grab it and never let go.(Carol Burnett)';
        break;
      case 5:
        quoteOfTheDay = 'I can\'t change the direction of the wind, but I can adjust my sails to always reach my destination.(Jimmy Dean)';
        break;
      case 6:
        quoteOfTheDay = 'No matter what you\'re going through, there is a light at the end of the tunnel. (Demi Lovato)';
        break;
      case 7:
        quoteOfTheDay = 'Life is like riding a bicycle. To keep your balance, you must keep moving. (Albert Einstein)';
        break;
      case 8:
        quoteOfTheDay = 'Limit your "always" and your "nevers." (AMY Poehler)';
        break;
      case 9:
        quoteOfTheDay = 'You are never too old to set another goal or to dream a new dream. (C.S. Lewis)';
        break;
      case 10:
        quoteOfTheDay = 'Try to be a rainbow in someone else\'s cloud. (Maya Angelou)';
        break;

      default:
        break;
    }
    return quoteOfTheDay;
  }

}
