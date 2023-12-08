interface SignUpBody{
    username?:string,
    email?:string,
    password?:string
}
interface loginBody{
    username?:string,
    password?:string,
}
export {SignUpBody,loginBody};