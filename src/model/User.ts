import { Status } from "./Status";
export class User{
    constructor(
        public uid:string,
        public gid:string[],
        public name:string,
        public email:string,
        public imgUrl:string,
        public assignedTrackers:Status[]
    ){}
}