const post=(url,header,body)=>{
  return  fetch(url,{
        method:'POST',
        headers:header,
        body:JSON.stringify(body)
    })
}
const get=(url,header,body)=>{
  const a =Object.keys(body);
  if(a.length>0){
    for(var i =0;i<a.length;i++){
      if(i==0){
        url+='?'+a[i]+"="+encodeURIComponent(body[a[i]]);
      }else{
        url+='&'+a[i]+"="+encodeURIComponent(body[a[i]]);
      }
    }
  }
  return  fetch(url,{
        method:'GET',
        headers:header
    })
}
export {post,get};