
import {post,get} from './http.js';
import { app } from '../component/FireBase.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
//import { aes_gcm_encrypt, aes_gcm_decrypt } from 'crypto-aes-gcm';
const md5=require('md5');
const firestore = getFirestore();
const url='http://localhost:9999';
// 임의의 변수
const hash_login='z%9kdiAf/keiIlmn#14Gvojknk';
const hash_profile='z%9kdiAf/keiIlmn#14Gvojknk';
const access_hash='fOm09fElo3jOj9JMNiojflvi39JInjvls';
// 난수생성을 위한 후보군
const keybase = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';

//#region 공용함수
// 암호화 함수 (문자열 데이터를 암호화)
async function aes_gcm_encrypt(plaintext, password) {
	const pwUtf8 = new TextEncoder().encode(password);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const ivStr = Array.from(iv).map(b => String.fromCharCode(b)).join(''); // 추후 복호화과정에 쓰기위해 사용
	const alg = { name: 'AES-GCM', iv: iv };
	const key = await crypto.subtle.importKey('raw', pwUtf8, alg, false, ['encrypt']); // password를 비밀키로 전환후 저장
	const ptUint8 = new TextEncoder().encode(plaintext); // plaintext 인코딩
	const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8); // plaintext 를 비밀키로 암호화 후 저장
	const ctArray = Array.from(new Uint8Array(ctBuffer)); // ctBuffer를 JavaScript 배열로 변환
	const ctStr = ctArray.map(byte => String.fromCharCode(byte)).join(''); // JavaScript 배열을 JSON 문자열로 변환

	// iv+ciphertext base64-encoded
	return btoa(ctStr+ivStr); // btoa함수를 통해 binary데이터를 ASCII 문자열로 변환

// 복호화 함수
}async function aes_gcm_decrypt(ciphertext, password) {
	const pwUtf8 = new TextEncoder().encode(password);
    const t=atob(ciphertext);
	const ivStr = t.slice(t.length-12, t.length);
	const iv = new Uint8Array(Array.from(ivStr).map(ch => ch.charCodeAt(0)));
	const alg = { name: 'AES-GCM', iv: iv };
	const key = await crypto.subtle.importKey('raw', pwUtf8, alg, false, ['decrypt']);
	const ctStr = t.slice(0, t.length-12);
	const ctUint8 = new Uint8Array(Array.from(ctStr).map(ch => ch.charCodeAt(0)));

	try {
		const plainBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);
		return new TextDecoder().decode(plainBuffer);
	} catch (error) {
		throw new Error('decrypt failed');
	}
}

// 난수 생성 함수
var random=(min,max)=>{
    return Math.floor(Math.random() * (max - min)) + min;
}

// 키 생성 함수
const keymake=(len) =>{
    var key = '';
    for (var i = 0; i < len; i++) {
        key += keybase.charAt(random(0, keybase.length - 1));
    }
    return key;
}

// 통신 결과 처리 함수
const result= async (http,isauth)=>{
const r=await http;
if(r.status!==200){
if(r.status==418){//로그인정보 오류(없거나 잘못됨)
    return{code:-2,data:null}
}else if(r.status==417){//서버 코드 오류
    return{code:-1,data:null}
}else if(r.status==421){//서버 요청제한
    return{code:-4,data:null}
}else{//서버 기타 오류
    return{code:-3,data:null}
}
}
if(isauth){
    const info=JSON.parse(window.sessionStorage.getItem('kol'));
    if(!info){
        return{code:-2,data:null}
    }
    try{
        const text=await r.text();
        return{
            code:0,
            data:await aes_gcm_decrypt(text,info.session)
        }
    }catch(e){
        console.log(e)
        return{code:-2,data:null}
    }
}else{
    return{code:0,data:await r.text()}
}
}
//#endregion

//#region 로그인
/**
 * 서버 로그인 요청
 * @param {string} uid // 파이어베이스 사용자 인증에서 받은 사용자 ID
 * @returns {{code:에러코드_정상0_실패0미만,
 *  data:{
 * name:유저이름
 * profile:프로필정보객체
* email:이메일
* grade:등급n
 * } 
 * }} 
 */
const login=async (uid)=>{
    const session=keymake(32);
    const token=keymake(128);
    const token2=keymake(128);
    const kol=keymake(32);
    window.sessionStorage.setItem('kol',JSON.stringify({token:token2, session:session,uid:uid}));

    // 파이어베이스 firestore에 token 및 session 저장
    const ref=doc(firestore,'login',uid);
    // session 값을 kol로 암호화
    await setDoc(ref,{token:token,session: await aes_gcm_encrypt(session,kol)});

    // 서버로 로그인 요청을 위한 파라미터 생성
    // JSON.stringify : key:value 형태 객체를 JSON 문자열로 전환 이후 aes_gcm_encrypt를통해 uid의 MD5 해시로 암호화
    var par={m:await aes_gcm_encrypt(JSON.stringify({
        hash:hash_login, // 서버와 클라이언트 간 암구호로 외부인이 아님을 확인하는 용도
        token:token,    
        token2:token2,
        kol:kol
    }),md5(uid)),u:uid}

    // 서버에 POST 요청 및 결과 반환
    // api.js : 로그인과 관련된 데이터를 가공
    // http.js : POST를 통해 서버에 전송
    return result(
        post(url+'/hgem/login',{
        'Content-Type': 'application/json', // 클라이언트가 전송하는 데이터가 JSON 형식임을 알려준다.
        'tom':access_hash // 클라이언트와 서버간 추가인증정보 제공
    },par),
    true); // result에대해 true 를 선언함으로 비동기 호출사용을 선언
}
//#endregion

//#region 
//#endregion
export{login}