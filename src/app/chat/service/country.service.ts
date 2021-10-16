import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  getCountries () {
    return [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'Andorra', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
    ]
  }
}
