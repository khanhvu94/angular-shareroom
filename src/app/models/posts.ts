import { users } from './users';

export class posts{
    id: number;
    user_id : number;
    title :string;
    description: string;
    // country : string;
    city_id : number;
    // city: string;
    district_id : number;
    // district :string;
    address : string;
    price : number;
    acreage : number;
    latitude : number;
    longitude : number;
    // map_address:string;
    create_at: Date;
    update_at: Date;
    count_vote: number;
    total_vote_value: number;
    status : boolean;
    expired: number;
    url_image: string;
    user : users;
    constructor(){};
}