export interface teamObj {
    id:number,
    name:string,
    logo:string,
    winner:boolean
}

export interface fixtureObj {
    fixture:Object,
    league:Object,
    teams:{
        home:teamObj,
        away:teamObj
    };
    goals:{
        home:number,
        away:number
    }
    score:Object
}


export interface fixureType {
    get:string,
    parameters:{
        season:string,
        team:string,
        last:string
    };
    errors:string[],
    results:number,
    paging:{
        current:number,
        total:string
    };
    response:fixtureObj[]

}