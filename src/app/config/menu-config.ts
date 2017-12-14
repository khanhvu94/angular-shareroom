import { menu_option } from '../../app/models/menu_options'
export class menu{
    getMenu():any{
        var item1 = new menu_option("Home","");
        var item2 = new menu_option("Maps","maps");
        var item3 = new menu_option("New Post","post");
        return [item1,item2,item3];
    }
}