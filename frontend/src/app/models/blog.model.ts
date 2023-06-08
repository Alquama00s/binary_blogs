export class Blog{
  constructor(
    public id:string,
    public title:string,
    public description:string,
    public content:string,
    public tags:string[],
    public authorId:string
  ){}

  toJSON():string{
    return JSON.stringify(this)
  }

  static fromJSON(json:string):Blog{
    const {id,title,description,content,tags,authorId}=JSON.parse(json)
    return new Blog(id,title,description,content,tags,authorId)
  }


}