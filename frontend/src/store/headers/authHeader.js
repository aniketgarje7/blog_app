
const AuthHeader  = ()=>{
    const token = localStorage.getItem("ba_token");
    const userHeader = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-blog": `${token}`,
    };
    return userHeader;
}
export {AuthHeader};