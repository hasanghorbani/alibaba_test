export interface countryModel {

  "flags": {
    "png": string, "svg": string, "alt": string
  },
  "name": {
    "common": string, "official": string, "nativeName": {
      [index: string]: {
        "official": string, "common": string
      }
    }
  },
  "capital": [string],
  "tld": [string],
  "borders": [string],
  "languages": { [index: string]: string },
  "region": string,
  "cca2": string,
  "subregion": string,
  "population": number,
  "currencies": {
    [index: string]: {
      name: string, symbol: string
    }
  }

}
