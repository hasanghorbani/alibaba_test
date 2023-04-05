import {CalendarEvent} from '@/@fake-db/types';
import type {Except} from 'type-fest';

export interface countyModel {

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
    "region": string,
    "population": number

}
