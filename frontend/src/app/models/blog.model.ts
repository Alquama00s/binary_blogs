export class Blog{
  constructor(
    public id:string,
    public title:string,
    public description:string,
    public content:string,
    public tags:string[],
    public authorId:string
  ){}
}