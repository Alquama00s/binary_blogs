export class User{
  constructor(
    public name:string,
    public email:string,
    public profile_url:string
  ){}

  toJSON():string{
    return JSON.stringify(this)
  }

  static fromJSON(json:string):User{
    const {name,email,profile_pic}=JSON.parse(json)
    return new User(name,email,profile_pic)
  }


}