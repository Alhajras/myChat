import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  getCustomersLarge () {
    return [
      {
        id: 1000,
        name: 'James Butt',
        country: {
          name: 'Algeria',
          code: 'dz',
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        activity: 17,
        representative: {
          name: 'Ioni Bowcher',
          image: 'default.png',
        },
      },
      {
        id: 1001,
        name: 'Josephine Darakjy',
        country: {
          name: 'Egypt',
          code: 'eg',
        },
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'proposal',
        activity: 0,
        representative: {
          name: 'Amy Elsner',
          image: 'default.png',
        },
      },
      {
        id: 1002,
        name: 'Art Venere',
        country: {
          name: 'Panama',
          code: 'pa',
        },
        company: 'Chemel, James L Cpa',
        date: '2017-05-13',
        status: 'qualified',
        activity: 63,
        representative: {
          name: 'Asiya Javayant',
          image: 'default.png',
        },
      },
      {
        id: 1003,
        name: 'Lenna Paprocki',
        country: {
          name: 'Slovenia',
          code: 'si',
        },
        company: 'Feltz Printing Service',
        date: '2020-09-15',
        status: 'new',
        activity: 37,
        representative: {
          name: 'Xuxue Feng',
          image: 'default.png',
        },
      },
    ]
  }
}
