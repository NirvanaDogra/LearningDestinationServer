export class Group{
    constructor(
        public gid:string,
        public tid:string[],
        public name:string,
        public description:string,
        public imgUrl:string,
        public email:string[]
    ){}
}