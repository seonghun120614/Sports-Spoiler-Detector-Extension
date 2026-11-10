(function(){function e(e){let t=e.replace(/[\r\n=]/g,``),n=t.length,r=new Uint8Array(n*3>>2),i=0,a=0;for(let e=0;e<n;e++)e%4==0&&e&&(r[a++]=i>>16&255,r[a++]=i>>8&255,r[a++]=i&255),i=i<<6|`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.indexOf(t.charAt(e));let o=n%4*6;return o===0?(r[a++]=i>>16&255,r[a++]=i>>8&255,r[a++]=i&255):o===18?(r[a++]=i>>10&255,r[a++]=i>>2&255):o===12&&(r[a++]=i>>4&255),r}var t;function n(){if(t!==void 0||(t=!1,typeof WebAssembly>`u`))return t;try{let e=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),n=new WebAssembly.Module(e);return new WebAssembly.Instance(n,{}).exports.test(4)!==0&&(t=!0),t}catch{}return t}var r={js:!0,wasm:!0},i=class{constructor(e){let t=Object.assign({},r,e||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1,!this.options.js&&!this.options.wasm)throw Error(`mathlib: at least "js" or "wasm" should be enabled`)}has_wasm(){return n()}use(e){return this.__modules[e.name]=e,this.options.wasm&&this.has_wasm()&&e.wasm_fn?this[e.name]=e.wasm_fn:this[e.name]=e.fn,this}init(){return this.__init_promise?this.__init_promise:!this.options.js&&this.options.wasm&&!this.has_wasm()?Promise.reject(Error(`mathlib: only "wasm" was enabled, but it's not supported`)):(this.__init_promise=Promise.all(Object.keys(this.__modules).map(t=>{let n=this.__modules[t];return!this.options.wasm||!this.has_wasm()||!n.wasm_fn||this.__wasm[t]?null:WebAssembly.compile(e(n.wasm_src)).then(e=>{this.__wasm[t]=e})})).then(()=>this),this.__init_promise)}__reallocate(e){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(e/65536)}),this.__memory;let t=this.__memory.buffer.byteLength;return t<e&&this.__memory.grow(Math.ceil((e-t)/65536)),this.__memory}__instance(t,n,r){if(n&&this.__reallocate(n),!this.__wasm[t]){let n=this.__modules[t];this.__wasm[t]=new WebAssembly.Module(e(n.wasm_src))}if(!this.__cache[t]){let e={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:`anyfunc`})};this.__cache[t]=new WebAssembly.Instance(this.__wasm[t],{env:Object.assign(e,r||{})})}return this.__cache[t]}__align(e,t){t||=8;let n=e%t;return e+(n?t-n:0)}};function a(e){e<.5&&(e=.5);let t=Math.exp(.527076)/e,n=Math.exp(-t),r=Math.exp(-2*t),i=(1-n)*(1-n)/(1+2*t*n-r),a=i,o=i*(t-1)*n,s=i*(t+1)*n,c=-i*r,l=2*n,u=-r,d=(a+o)/(1-l-u),f=(s+c)/(1-l-u);return new Float32Array([a,o,s,c,l,u,d,f])}function o(e,t,n,r,i,a){let o,s,c,l,u,d,f,p,m,h,g,_,v,y;for(m=0;m<a;m++){for(d=m*i,f=m,p=0,o=e[d],u=o*r[6],l=u,g=r[0],_=r[1],v=r[4],y=r[5],h=0;h<i;h++)s=e[d],c=s*g+o*_+l*v+u*y,u=l,l=c,o=s,n[p]=l,p++,d++;for(d--,p--,f+=a*(i-1),o=e[d],u=o*r[7],l=u,s=o,g=r[2],_=r[3],h=i-1;h>=0;h--)c=s*g+o*_+l*v+u*y,u=l,l=c,o=s,s=e[d],t[f]=n[p]+l,d--,p--,f-=a}}function s(e,t,n,r){if(!r)return;let i=new Uint16Array(e.length),s=new Float32Array(Math.max(t,n)),c=a(r);o(e,i,s,c,t,n,r),o(i,e,s,c,n,t,r)}function c(e,t,n){let r=t*n,i=new Uint16Array(r),a,o,s,c;for(let t=0;t<r;t++)a=e[4*t],o=e[4*t+1],s=e[4*t+2],c=a>=o&&a>=s?a:o>=s&&o>=a?o:s,i[t]=c<<8;return i}function l(e,t,n,r,i,a){let o,l,u,d,f;if(r===0||i<.5)return;i>2&&(i=2);let p=c(e,t,n),m=new Uint16Array(p);s(m,t,n,i);let h=r/100*4096+.5|0,g=a<<8,_=t*n;for(let t=0;t<_;t++)o=p[t],d=o-m[t],Math.abs(d)>=g&&(l=o+(h*d+2048>>12),l=l>65280?65280:l,l=l<0?0:l,o=o===0?1:o,u=(l<<12)/o|0,f=t*4,e[f]=e[f]*u+2048>>12,e[f+1]=e[f+1]*u+2048>>12,e[f+2]=e[f+2]*u+2048>>12)}function u(e,t,n,r,i,a){if(r===0||i<.5)return;i>2&&(i=2);let o=t*n,s=o*4,c=o*2,l=o*2,u=Math.max(t,n)*4,d=s,f=d+c,p=f+l,m=p+l,h=m+u,g=this.__instance(`unsharp_mask`,s+c+l*2+u+32,{exp:Math.exp}),_=new Uint32Array(e.buffer);new Uint32Array(this.__memory.buffer).set(_);let v=g.exports.hsv_v16||g.exports._hsv_v16;if(!v)throw Error(`WASM hsv_v16 function is not available`);if(v(0,d,t,n),v=g.exports.blurMono16||g.exports._blurMono16,!v)throw Error(`WASM blurMono16 function is not available`);if(v(d,f,p,m,h,t,n,i),v=g.exports.unsharp||g.exports._unsharp,!v)throw Error(`WASM unsharp function is not available`);v(0,0,d,f,t,n,r,a),_.set(new Uint32Array(this.__memory.buffer,0,o))}var d={name:`unsharp_mask`,fn:l,wasm_fn:u,wasm_src:`AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL`},f={filter:{box:{win:.5,fn(e){return e<0&&(e=-e),+(e<.5)}},hamming:{win:1,fn(e){if(e<0&&(e=-e),e>=1)return 0;if(e<1.1920929e-7)return 1;let t=e*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(e){if(e<0&&(e=-e),e>=2)return 0;if(e<1.1920929e-7)return 1;let t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(e){if(e<0&&(e=-e),e>=3)return 0;if(e<1.1920929e-7)return 1;let t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn(e){return e<0&&(e=-e),e>=2.5?0:e>=1.5?-.125*(e-2.5)*(e-2.5):e>=.5?.25*(4*e*e-11*e+7):1.0625-1.75*e*e}}}},p=14;function m(e){return Math.round(e*((1<<p)-1))}function h(e,t,n,r,i){let a=f.filter[e].fn,o=1/r,s=Math.min(1,r),c=f.filter[e].win/s,l,u,d,p,h,g,_,v,y,b,x,S,C,w,T,E,D,O=Math.floor((c+1)*2),k=new Int16Array((O+2)*n),A=0,j=!k.subarray||!k.set;for(l=0;l<n;l++){for(u=(l+.5)*o+i,d=Math.max(0,Math.floor(u-c)),p=Math.min(t-1,Math.ceil(u+c)),h=p-d+1,g=new Float32Array(h),_=new Int16Array(h),v=0,y=d,b=0;y<=p;y++,b++)x=a((y+.5-u)*s),v+=x,g[b]=x;for(S=0,b=0;b<g.length;b++)C=g[b]/v,S+=C,_[b]=m(C);for(_[n>>1]+=m(1-S),w=0;w<_.length&&_[w]===0;)w++;if(w<_.length){for(T=_.length-1;T>0&&_[T]===0;)T--;if(E=d+w,D=T-w+1,k[A++]=E,k[A++]=D,!j)k.set(_.subarray(w,T+1),A),A+=D;else for(b=w;b<=T;b++)k[A++]=_[b]}else k[A++]=0,k[A++]=0}return k}function g(e){return e<0?0:e>255?255:e}function _(e){return e>=0?e:0}function v(e,t,n,r,i,a){let o,s,c,l,u,d,f,p,m,h,g,v=0,y=0;for(m=0;m<r;m++){for(u=0,h=0;h<i;h++){for(d=a[u++],f=a[u++],p=v+d*4|0,o=s=c=l=0;f>0;f--)g=a[u++],l=l+g*e[p+3]|0,c=c+g*e[p+2]|0,s=s+g*e[p+1]|0,o=o+g*e[p]|0,p=p+4|0;t[y+3]=_(l>>7),t[y+2]=_(c>>7),t[y+1]=_(s>>7),t[y]=_(o>>7),y=y+r*4|0}y=(m+1)*4|0,v=(m+1)*n*4|0}}function y(e,t,n,r,i,a){let o,s,c,l,u,d,f,p,m,h,_,v=0,y=0;for(m=0;m<r;m++){for(u=0,h=0;h<i;h++){for(d=a[u++],f=a[u++],p=v+d*4|0,o=s=c=l=0;f>0;f--)_=a[u++],l=l+_*e[p+3]|0,c=c+_*e[p+2]|0,s=s+_*e[p+1]|0,o=o+_*e[p]|0,p=p+4|0;o>>=7,s>>=7,c>>=7,l>>=7,t[y+3]=g(l+8192>>14),t[y+2]=g(c+8192>>14),t[y+1]=g(s+8192>>14),t[y]=g(o+8192>>14),y=y+r*4|0}y=(m+1)*4|0,v=(m+1)*n*4|0}}function b(e,t,n,r,i,a){let o,s,c,l,u,d,f,p,m,h,g,v,y=0,b=0;for(h=0;h<r;h++){for(d=0,g=0;g<i;g++){for(f=a[d++],p=a[d++],m=y+f*4|0,o=s=c=l=0;p>0;p--)v=a[d++],u=e[m+3],l=l+v*u|0,c=c+v*e[m+2]*u|0,s=s+v*e[m+1]*u|0,o=o+v*e[m]*u|0,m=m+4|0;c=c/255|0,s=s/255|0,o=o/255|0,t[b+3]=_(l>>7),t[b+2]=_(c>>7),t[b+1]=_(s>>7),t[b]=_(o>>7),b=b+r*4|0}b=(h+1)*4|0,y=(h+1)*n*4|0}}function x(e,t,n,r,i,a){let o,s,c,l,u,d,f,p,m,h,_,v=0,y=0;for(m=0;m<r;m++){for(u=0,h=0;h<i;h++){for(d=a[u++],f=a[u++],p=v+d*4|0,o=s=c=l=0;f>0;f--)_=a[u++],l=l+_*e[p+3]|0,c=c+_*e[p+2]|0,s=s+_*e[p+1]|0,o=o+_*e[p]|0,p=p+4|0;o>>=7,s>>=7,c>>=7,l>>=7,l=g(l+8192>>14),l>0&&(o=o*255/l|0,s=s*255/l|0,c=c*255/l|0),t[y+3]=l,t[y+2]=g(c+8192>>14),t[y+1]=g(s+8192>>14),t[y]=g(o+8192>>14),y=y+r*4|0}y=(m+1)*4|0,v=(m+1)*n*4|0}}function S(e,t,n){let r=3,i=t*n*4|0;for(;r<i;){if(e[r]!==255)return!0;r=r+4|0}return!1}function C(e,t,n){let r=3,i=t*n*4|0;for(;r<i;)e[r]=255,r=r+4|0}function w(e){let t=e.src,n=e.width,r=e.height,i=e.toWidth,a=e.toHeight,o=e.scaleX||e.toWidth/e.width,s=e.scaleY||e.toHeight/e.height,c=e.offsetX||0,l=e.offsetY||0,u=e.dest||new Uint8Array(i*a*4),d=e.filter===void 0?`mks2013`:e.filter,f=h(d,n,i,o,c),p=h(d,r,a,s,l),m=new Uint16Array(i*r*4);return S(t,n,r)?(b(t,m,n,r,i,f),x(m,u,r,i,a,p)):(v(t,m,n,r,i,f),y(m,u,r,i,a,p),C(u,i,a)),u}function T(e,t,n){let r=3,i=t*n*4|0;for(;r<i;){if(e[r]!==255)return!0;r=r+4|0}return!1}function E(e,t,n){let r=3,i=t*n*4|0;for(;r<i;)e[r]=255,r=r+4|0}function D(e){return new Uint8Array(e.buffer,0,e.byteLength)}var O=!0;try{O=new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]===1}catch{}function k(e,t,n){if(O){t.set(D(e),n);return}for(let r=n,i=0;i<e.length;i++){let n=e[i];t[r++]=n&255,t[r++]=n>>8&255}}function A(e){let t=e.src,n=e.width,r=e.height,i=e.toWidth,a=e.toHeight,o=e.scaleX||e.toWidth/e.width,s=e.scaleY||e.toHeight/e.height,c=e.offsetX||0,l=e.offsetY||0,u=e.dest||new Uint8Array(i*a*4),d=e.filter===void 0?`mks2013`:e.filter,f=h(d,n,i,o,c),p=h(d,r,a,s,l),m=Math.max(t.byteLength,u.byteLength),g=this.__align(0+m),_=r*i*4*2,v=this.__align(g+_),y=this.__align(v+f.byteLength),b=y+p.byteLength,x=this.__instance(`resize`,b),S=new Uint8Array(this.__memory.buffer),C=new Uint32Array(this.__memory.buffer),w=new Uint32Array(t.buffer);C.set(w),k(f,S,v),k(p,S,y);let D=x.exports.convolveHV||x.exports._convolveHV;if(!D)throw Error(`WASM resize function is not available`);return T(t,n,r)?D(v,y,g,n,r,i,a,1):(D(v,y,g,n,r,i,a,0),E(u,i,a)),new Uint32Array(u.buffer).set(new Uint32Array(this.__memory.buffer,0,a*i)),u}var j={name:`resize`,fn:w,wasm_fn:A,wasm_src:`AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL`},ee=class extends i{constructor(e){let t=e||[],n={js:t.indexOf(`js`)>=0,wasm:t.indexOf(`wasm`)>=0};super(n),this.features={js:n.js,wasm:n.wasm&&this.has_wasm()},this.use(d),this.use(j)}resizeAndUnsharp(e){let t=this.resize(e);return e.unsharpAmount&&this.unsharp_mask(t,e.toWidth,e.toHeight,e.unsharpAmount,e.unsharpRadius,e.unsharpThreshold),t}};function te(e){"@babel/helpers - typeof";return te=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},te(e)}function ne(e,t){if(te(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(te(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function re(e){var t=ne(e,`string`);return te(t)==`symbol`?t:t+``}function ie(e,t,n){return(t=re(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ae(Object(n),!0).forEach(function(t){ie(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var se=100,ce=class{constructor(e,t){ie(this,`create`,void 0),ie(this,`available`,void 0),ie(this,`acquired`,void 0),ie(this,`lastId`,void 0),ie(this,`timeoutId`,void 0),ie(this,`idle`,void 0),this.create=e,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=t||2e3}acquire(){let e;return e=this.available.length===0?oe(oe({},this.create()),{},{id:this.lastId++,lastUsed:0}):this.available.pop(),this.acquired[e.id]=e,{value:e.value,release:()=>this.release(e)}}release(e){delete this.acquired[e.id],e.lastUsed=Date.now(),this.available.push(e),this.timeoutId===0&&(this.timeoutId=setTimeout(()=>this.gc(),se))}gc(){let e=Date.now();this.available=this.available.filter(t=>e-t.lastUsed>this.idle?(t.destroy(),!1):!0),this.timeoutId=this.available.length===0?0:setTimeout(()=>this.gc(),se)}};function le(e){var t;return(e==null||(t=e.constructor)==null?void 0:t.name)??``}function ue(e){let t=le(e);return t===`HTMLCanvasElement`||t===`OffscreenCanvas`||t===`Canvas`||t===`CanvasElement`}function de(e){return le(e)===`HTMLImageElement`}function fe(e){return le(e)===`ImageBitmap`}function pe(e){let t=0,n=[];function r(){if(t<e&&n.length){var r;t++,(r=n.shift())==null||r()}}return function(e){return new Promise((i,a)=>{n.push(()=>{e().then(e=>{i(e),t--,r()},e=>{a(e),t--,r()})}),r()})}}function me(e){switch(e){case 0:return`pixelated`;case 1:return`low`;case 2:return`medium`}return`high`}var he=[`box`,`hamming`,`lanczos2`,`lanczos3`];function ge(e){return he[e]}function _e(e){return he.indexOf(e)>=0}function M(e){let t=he.indexOf(e);return t>=0?t:void 0}var ve=2,ye=3;function be(e,t,n,r,i){let a=n/e,o=r/t,s=(2*ye+ve+1)/i;if(s>.5)return[[n,r]];let c=Math.ceil(Math.log(Math.min(a,o))/Math.log(s));if(c<=1)return[[n,r]];let l=[];for(let i=0;i<c;i++){let a=Math.round((e**(c-i-1)*n**+(i+1))**(1/c)),o=Math.round((t**(c-i-1)*r**+(i+1))**(1/c));l.push([a,o])}return l}var xe=1e-5;function Se(e){let t=Math.round(e);return Math.abs(e-t)<xe?t:Math.floor(e)}function Ce(e){let t=Math.round(e);return Math.abs(e-t)<xe?t:Math.ceil(e)}function we(e){let t=e.toWidth/e.width,n=e.toHeight/e.height,r=Se(e.srcTileSize*t)-2*e.destTileBorder,i=Se(e.srcTileSize*n)-2*e.destTileBorder;if(r<1||i<1)throw Error(`Internal error in pica: target tile width/height is too small.`);let a,o,s,c,l,u,d=[],f;for(c=0;c<e.toHeight;c+=i)for(s=0;s<e.toWidth;s+=r)a=s-e.destTileBorder,a<0&&(a=0),l=s+r+e.destTileBorder-a,a+l>=e.toWidth&&(l=e.toWidth-a),o=c-e.destTileBorder,o<0&&(o=0),u=c+i+e.destTileBorder-o,o+u>=e.toHeight&&(u=e.toHeight-o),f={toX:a,toY:o,toWidth:l,toHeight:u,toInnerX:s,toInnerY:c,toInnerWidth:r,toInnerHeight:i,offsetX:a/t-Se(a/t),offsetY:o/n-Se(o/n),scaleX:t,scaleY:n,x:Se(a/t),y:Se(o/n),width:Ce(l/t),height:Ce(u/n)},d.push(f);return d}var Te=`/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==`,Ee={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},De=!1,Oe=null,ke={willReadFrequently:!0};function Ae(){if(typeof document>`u`||!document.createElement)return!1;try{let e=document.createElement(`canvas`);e.width=2,e.height=1;let t=e.getContext(`2d`,ke),n=t.createImageData(2,1);return n.data[0]=12,n.data[1]=23,n.data[2]=34,n.data[3]=255,n.data[4]=45,n.data[5]=56,n.data[6]=67,n.data[7]=255,t.putImageData(n,0,0),n=t.getImageData(0,0,2,1),n.data[0]===12&&n.data[1]===23&&n.data[2]===34&&n.data[3]===255&&n.data[4]===45&&n.data[5]===56&&n.data[6]===67&&n.data[7]===255}catch{return!1}}function je(){if(typeof OffscreenCanvas>`u`)return!1;try{let e=new OffscreenCanvas(2,1).getContext(`2d`,ke),t=e.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,e.putImageData(t,0,0),t=e.getImageData(0,0,2,1),t.data[0]===12&&t.data[1]===23&&t.data[2]===34&&t.data[3]===255&&t.data[4]===45&&t.data[5]===56&&t.data[6]===67&&t.data[7]===255}catch{return!1}}function Me(){return typeof createImageBitmap<`u`}function Ne(){return typeof Worker<`u`&&typeof URL<`u`&&!!URL.createObjectURL}function Pe(){try{return!!(typeof navigator<`u`&&navigator.userAgent&&navigator.userAgent.indexOf(`Safari`)>=0&&navigator.userAgent.indexOf(`Chrome`)<0)}catch{return!1}}function Fe(){return Promise.resolve().then(()=>{if(je()&&Me()&&typeof Blob<`u`&&typeof atob<`u`){let e=atob(Te),t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return createImageBitmap(new Blob([t],{type:`image/jpeg`})).then(e=>{let t=new OffscreenCanvas(1,1);try{let n=t.getContext(`2d`,ke);return n.drawImage(e,1,1,1,1,0,0,1,1),n.getImageData(0,0,1,1).data[0]<240}finally{e.close()}})}return Ae()&&typeof Image<`u`?new Promise(e=>{let t=new Image;t.onload=()=>{try{let n=document.createElement(`canvas`);n.width=1,n.height=1;let r=n.getContext(`2d`,ke);r.drawImage(t,1,1,1,1,0,0,1,1),e(r.getImageData(0,0,1,1).data[0]<240)}catch{e(!0)}},t.onerror=()=>e(!0),t.src=`data:image/jpeg;base64,${Te}`}):!0}).catch(()=>!0)}function Ie(){return Promise.resolve().then(()=>{if(!Ee.create_image_bitmap&&!Me()||typeof Blob>`u`||typeof atob>`u`)return!0;let e=je(),t=Ae();if(!e&&!t)return!0;let n=atob(Te),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return createImageBitmap(new Blob([r],{type:`image/jpeg`})).then(t=>createImageBitmap(t,1,1,1,1).then(n=>{let r;e?r=new OffscreenCanvas(1,1):(r=document.createElement(`canvas`),r.width=1,r.height=1);try{let e=r.getContext(`2d`,ke);return e.drawImage(n,0,0),n.width!==1||n.height!==1||e.getImageData(0,0,1,1).data[0]<240}finally{t.close(),n.close()}},()=>(t.close(),!0)))}).catch(()=>!0)}function Le(){return Promise.resolve().then(()=>{if(!Me())return!1;let e;if(Ee.canvas||Ae())e=document.createElement(`canvas`),e.width=20,e.height=20;else if(Ee.offscreen_canvas||je())e=new OffscreenCanvas(20,20),e.getContext(`2d`,ke).clearRect(0,0,20,20);else return!1;return createImageBitmap(e,0,0,20,20,{resizeWidth:5,resizeHeight:5,resizeQuality:`high`}).then(t=>{let n=t.width===5&&!!t.close;return t.close&&t.close(),e=null,n})}).catch(()=>!1)}function Re(){if(De)return Promise.resolve(Object.assign({},Ee));if(Oe)return Oe.then(()=>Object.assign({},Ee));Ee.canvas=Ae(),Ee.offscreen_canvas=je(),Ee.may_be_worker=Ne(),Ee.create_image_bitmap=Me(),Ee.safari_put_image_data_fix=Pe();let e=Fe().then(e=>{Ee.bug_canvas_orientation_region=e}).catch(()=>{}),t=Ie().then(e=>{Ee.bug_image_bitmap_orientation_region=e}).catch(()=>{}),n=Le().then(e=>{Ee.cib_resize=e}).catch(()=>{});return Oe=Promise.all([e,t,n]).then(()=>(De=!0,Oe=null,Object.assign({},Ee)),e=>{throw Oe=null,e}),Oe}function ze(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function Be(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function o(e){ze(a,r,i,o,s,`next`,e)}function s(e){ze(a,r,i,o,s,`throw`,e)}o(void 0)})}}var Ve=`/*!

pica
https://github.com/nodeca/pica

*/
!function(){var A;function t(A){const t=A.replace(/[\\r\\n=]/g,""),e=t.length,n=new Uint8Array(3*e>>2);let a=0,i=0;for(let s=0;s<e;s++)s%4==0&&s&&(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a),a=a<<6|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(s));const r=e%4*6;return 0===r?(n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=255&a):18===r?(n[i++]=a>>10&255,n[i++]=a>>2&255):12===r&&(n[i++]=a>>4&255),n}var e={js:!0,wasm:!0},n=class{constructor(A){const t=Object.assign({},e,A||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0],!this.options.js&&!this.options.wasm)throw new Error('mathlib: at least "js" or "wasm" should be enabled')}has_wasm(){return function(){if(void 0!==A)return A;if(A=!1,"undefined"==typeof WebAssembly)return A;try{const t=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),e=new WebAssembly.Module(t);return 0!==new WebAssembly.Instance(e,{}).exports.test(4)&&(A=!0),A}catch(t){}return A}()}use(A){return this.__modules[A.name]=A,this.options.wasm&&this.has_wasm()&&A.wasm_fn?this[A.name]=A.wasm_fn:this[A.name]=A.fn,this}init(){return this.__init_promise?this.__init_promise:this.options.js||!this.options.wasm||this.has_wasm()?(this.__init_promise=Promise.all(Object.keys(this.__modules).map(A=>{const e=this.__modules[A];return this.options.wasm&&this.has_wasm()&&e.wasm_fn?this.__wasm[A]?null:WebAssembly.compile(t(e.wasm_src)).then(t=>{this.__wasm[A]=t}):null})).then(()=>this),this.__init_promise):Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\\'s not supported'))}__reallocate(A){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(A/65536)}),this.__memory;const t=this.__memory.buffer.byteLength;return t<A&&this.__memory.grow(Math.ceil((A-t)/65536)),this.__memory}__instance(A,e,n){if(e&&this.__reallocate(e),!this.__wasm[A]){const e=this.__modules[A];this.__wasm[A]=new WebAssembly.Module(t(e.wasm_src))}if(!this.__cache[A]){const t={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[A]=new WebAssembly.Instance(this.__wasm[A],{env:Object.assign(t,n||{})})}return this.__cache[A]}__align(A,t){const e=A%(t=t||8);return A+(e?t-e:0)}};function a(A,t,e,n,a,i){let r,s,o,g,I,h,B,Q,E,C,c,f,u,d;for(E=0;E<i;E++){for(h=E*a,B=E,Q=0,r=A[h],I=r*n[6],g=I,c=n[0],f=n[1],u=n[4],d=n[5],C=0;C<a;C++)s=A[h],o=s*c+r*f+g*u+I*d,I=g,g=o,r=s,e[Q]=g,Q++,h++;for(h--,Q--,B+=i*(a-1),r=A[h],I=r*n[7],g=I,s=r,c=n[2],f=n[3],C=a-1;C>=0;C--)o=s*c+r*f+g*u+I*d,I=g,g=o,r=s,s=A[h],t[B]=e[Q]+g,h--,Q--,B-=i}}function i(A,t,e,n){if(!n)return;const i=new Uint16Array(A.length),r=new Float32Array(Math.max(t,e)),s=function(A){A<.5&&(A=.5);const t=Math.exp(.527076)/A,e=Math.exp(-t),n=Math.exp(-2*t),a=(1-e)*(1-e)/(1+2*t*e-n),i=a*(t-1)*e,r=a*(t+1)*e,s=-a*n,o=2*e,g=-n;return new Float32Array([a,i,r,s,o,g,(a+i)/(1-o-g),(r+s)/(1-o-g)])}(n);a(A,i,r,s,t,e),a(i,A,r,s,e,t)}var r={name:"unsharp_mask",fn:function(A,t,e,n,a,r){let s,o,g,I,h;if(0===n||a<.5)return;a>2&&(a=2);const B=function(A,t,e){const n=t*e,a=new Uint16Array(n);let i,r,s,o;for(let g=0;g<n;g++)i=A[4*g],r=A[4*g+1],s=A[4*g+2],o=i>=r&&i>=s?i:r>=s&&r>=i?r:s,a[g]=o<<8;return a}(A,t,e),Q=new Uint16Array(B);i(Q,t,e,a);const E=n/100*4096+.5|0,C=r<<8,c=t*e;for(let i=0;i<c;i++)s=B[i],I=s-Q[i],Math.abs(I)>=C&&(o=s+(E*I+2048>>12),o=o>65280?65280:o,o=o<0?0:o,s=0!==s?s:1,g=(o<<12)/s|0,h=4*i,A[h]=A[h]*g+2048>>12,A[h+1]=A[h+1]*g+2048>>12,A[h+2]=A[h+2]*g+2048>>12)},wasm_fn:function(A,t,e,n,a,i){if(0===n||a<.5)return;a>2&&(a=2);const r=t*e,s=4*r,o=2*r,g=2*r,I=4*Math.max(t,e),h=s,B=h+o,Q=B+g,E=Q+g,C=E+I,c=this.__instance("unsharp_mask",s+o+2*g+I+32,{exp:Math.exp}),f=new Uint32Array(A.buffer);new Uint32Array(this.__memory.buffer).set(f);let u=c.exports.hsv_v16||c.exports._hsv_v16;if(!u)throw new Error("WASM hsv_v16 function is not available");if(u(0,h,t,e),u=c.exports.blurMono16||c.exports._blurMono16,!u)throw new Error("WASM blurMono16 function is not available");if(u(h,B,Q,E,C,t,e,a),u=c.exports.unsharp||c.exports._unsharp,!u)throw new Error("WASM unsharp function is not available");u(0,0,h,B,t,e,n,i),f.set(new Uint32Array(this.__memory.buffer,0,r))},wasm_src:"AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"},s={filter:{box:{win:.5,fn:A=>(A<0&&(A=-A),A<.5?1:0)},hamming:{win:1,fn(A){if(A<0&&(A=-A),A>=1)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},lanczos2:{win:2,fn(A){if(A<0&&(A=-A),A>=2)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},lanczos3:{win:3,fn(A){if(A<0&&(A=-A),A>=3)return 0;if(A<1.1920929e-7)return 1;const t=A*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},mks2013:{win:2.5,fn:A=>(A<0&&(A=-A),A>=2.5?0:A>=1.5?-.125*(A-2.5)*(A-2.5):A>=.5?.25*(4*A*A-11*A+7):1.0625-1.75*A*A)}}};function o(A){return Math.round(16383*A)}function g(A,t,e,n,a){const i=s.filter[A].fn,r=1/n,g=Math.min(1,n),I=s.filter[A].win/g;let h,B,Q,E,C,c,f,u,d,m,l,w,y,_,b,D,M;const p=Math.floor(2*(I+1)),G=new Int16Array((p+2)*e);let U=0;const F=!G.subarray||!G.set;for(h=0;h<e;h++){for(B=(h+.5)*r+a,Q=Math.max(0,Math.floor(B-I)),E=Math.min(t-1,Math.ceil(B+I)),C=E-Q+1,c=new Float32Array(C),f=new Int16Array(C),u=0,d=Q,m=0;d<=E;d++,m++)l=i((d+.5-B)*g),u+=l,c[m]=l;for(w=0,m=0;m<c.length;m++)y=c[m]/u,w+=y,f[m]=o(y);for(f[e>>1]+=o(1-w),_=0;_<f.length&&0===f[_];)_++;if(_<f.length){for(b=f.length-1;b>0&&0===f[b];)b--;if(D=Q+_,M=b-_+1,G[U++]=D,G[U++]=M,F)for(m=_;m<=b;m++)G[U++]=f[m];else G.set(f.subarray(_,b+1),U),U+=M}else G[U++]=0,G[U++]=0}return G}function I(A){return A<0?0:A>255?255:A}function h(A){return A>=0?A:0}var B=!0;try{B=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]}catch(G){}function Q(A,t,e){if(B)t.set(function(A){return new Uint8Array(A.buffer,0,A.byteLength)}(A),e);else for(let n=e,a=0;a<A.length;a++){const e=A[a];t[n++]=255&e,t[n++]=e>>8&255}}var E={name:"resize",fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,B=A.offsetY||0,Q=A.dest||new Uint8Array(a*i*4),E=void 0===A.filter?"mks2013":A.filter,C=g(E,e,a,r,o),c=g(E,n,i,s,B),f=new Uint16Array(a*n*4);return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,c,f,u=0,d=0;for(C=0;C<n;C++){for(I=0,c=0;c<a;c++){for(B=i[I++],Q=i[I++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)f=i[I++],g=g+f*A[E+3]|0,o=o+f*A[E+2]|0,s=s+f*A[E+1]|0,r=r+f*A[E]|0,E=E+4|0;t[d+3]=h(g>>7),t[d+2]=h(o>>7),t[d+1]=h(s>>7),t[d]=h(r>>7),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(t,f,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,c,f,u=0,d=0;for(C=0;C<n;C++){for(h=0,c=0;c<a;c++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)f=i[h++],g=g+f*A[E+3]|0,o=o+f*A[E+2]|0,s=s+f*A[E+1]|0,r=r+f*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,t[d+3]=I(g+8192>>14),t[d+2]=I(o+8192>>14),t[d+1]=I(s+8192>>14),t[d]=I(r+8192>>14),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(f,Q,n,a,i,c),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(Q,a,i)):(function(A,t,e,n,a,i){let r,s,o,g,I,B,Q,E,C,c,f,u,d=0,m=0;for(c=0;c<n;c++){for(B=0,f=0;f<a;f++){for(Q=i[B++],E=i[B++],C=d+4*Q|0,r=s=o=g=0;E>0;E--)u=i[B++],I=A[C+3],g=g+u*I|0,o=o+u*A[C+2]*I|0,s=s+u*A[C+1]*I|0,r=r+u*A[C]*I|0,C=C+4|0;o=o/255|0,s=s/255|0,r=r/255|0,t[m+3]=h(g>>7),t[m+2]=h(o>>7),t[m+1]=h(s>>7),t[m]=h(r>>7),m=m+4*n|0}m=4*(c+1)|0,d=(c+1)*e*4|0}}(t,f,e,n,a,C),function(A,t,e,n,a,i){let r,s,o,g,h,B,Q,E,C,c,f,u=0,d=0;for(C=0;C<n;C++){for(h=0,c=0;c<a;c++){for(B=i[h++],Q=i[h++],E=u+4*B|0,r=s=o=g=0;Q>0;Q--)f=i[h++],g=g+f*A[E+3]|0,o=o+f*A[E+2]|0,s=s+f*A[E+1]|0,r=r+f*A[E]|0,E=E+4|0;r>>=7,s>>=7,o>>=7,g>>=7,g=I(g+8192>>14),g>0&&(r=255*r/g|0,s=255*s/g|0,o=255*o/g|0),t[d+3]=g,t[d+2]=I(o+8192>>14),t[d+1]=I(s+8192>>14),t[d]=I(r+8192>>14),d=d+4*n|0}d=4*(C+1)|0,u=(C+1)*e*4|0}}(f,Q,n,a,i,c)),Q},wasm_fn:function(A){const t=A.src,e=A.width,n=A.height,a=A.toWidth,i=A.toHeight,r=A.scaleX||A.toWidth/A.width,s=A.scaleY||A.toHeight/A.height,o=A.offsetX||0,I=A.offsetY||0,h=A.dest||new Uint8Array(a*i*4),B=void 0===A.filter?"mks2013":A.filter,E=g(B,e,a,r,o),C=g(B,n,i,s,I),c=Math.max(t.byteLength,h.byteLength),f=this.__align(0+c),u=n*a*4*2,d=this.__align(f+u),m=this.__align(d+E.byteLength),l=m+C.byteLength,w=this.__instance("resize",l),y=new Uint8Array(this.__memory.buffer),_=new Uint32Array(this.__memory.buffer),b=new Uint32Array(t.buffer);_.set(b),Q(E,y,d),Q(C,y,m);const D=w.exports.convolveHV||w.exports._convolveHV;if(!D)throw new Error("WASM resize function is not available");return!function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;){if(255!==A[n])return!0;n=n+4|0}return!1}(t,e,n)?(D(d,m,f,e,n,a,i,0),function(A,t,e){let n=3;const a=t*e*4|0;for(;n<a;)A[n]=255,n=n+4|0}(h,a,i)):D(d,m,f,e,n,a,i,1),new Uint32Array(h.buffer).set(new Uint32Array(this.__memory.buffer,0,i*a)),h},wasm_src:"AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL"},C=class extends n{constructor(A){const t=A||[],e={js:t.indexOf("js")>=0,wasm:t.indexOf("wasm")>=0};super(e),this.features={js:e.js,wasm:e.wasm&&this.has_wasm()},this.use(r),this.use(E)}resizeAndUnsharp(A){const t=this.resize(A);return A.unsharpAmount&&this.unsharp_mask(t,A.toWidth,A.toHeight,A.unsharpAmount,A.unsharpRadius,A.unsharpThreshold),t}},c="/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/4AAQskZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAACAAMBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABsQAAMBAQADAAAAAAAAAAAAAAECAwQFABEx/9oACAEBAAA/AC06fW6va0ps7PT179E88MiV02arrCEkjGQZiSEnKc5ovxURVHoADz//2Q==",f={canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},u=!1,d=null,m={willReadFrequently:!0};function l(){if("undefined"==typeof document||!document.createElement)return!1;try{const A=document.createElement("canvas");A.width=2,A.height=1;const t=A.getContext("2d",m);let e=t.createImageData(2,1);return e.data[0]=12,e.data[1]=23,e.data[2]=34,e.data[3]=255,e.data[4]=45,e.data[5]=56,e.data[6]=67,e.data[7]=255,t.putImageData(e,0,0),e=t.getImageData(0,0,2,1),12===e.data[0]&&23===e.data[1]&&34===e.data[2]&&255===e.data[3]&&45===e.data[4]&&56===e.data[5]&&67===e.data[6]&&255===e.data[7]}catch(G){return!1}}function w(){if("undefined"==typeof OffscreenCanvas)return!1;try{const A=new OffscreenCanvas(2,1).getContext("2d",m);let t=A.createImageData(2,1);return t.data[0]=12,t.data[1]=23,t.data[2]=34,t.data[3]=255,t.data[4]=45,t.data[5]=56,t.data[6]=67,t.data[7]=255,A.putImageData(t,0,0),t=A.getImageData(0,0,2,1),12===t.data[0]&&23===t.data[1]&&34===t.data[2]&&255===t.data[3]&&45===t.data[4]&&56===t.data[5]&&67===t.data[6]&&255===t.data[7]}catch(G){return!1}}function y(){return"undefined"!=typeof createImageBitmap}function _(){if(u)return Promise.resolve(Object.assign({},f));if(d)return d.then(()=>Object.assign({},f));f.canvas=l(),f.offscreen_canvas=w(),f.may_be_worker="undefined"!=typeof Worker&&"undefined"!=typeof URL&&!!URL.createObjectURL,f.create_image_bitmap=y(),f.safari_put_image_data_fix=function(){try{return!!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.indexOf("Safari")>=0&&navigator.userAgent.indexOf("Chrome")<0)}catch(G){return!1}}();const A=Promise.resolve().then(()=>{if(w()&&y()&&"undefined"!=typeof Blob&&"undefined"!=typeof atob){const A=atob(c),t=new Uint8Array(A.length);for(let e=0;e<A.length;e++)t[e]=A.charCodeAt(e);return createImageBitmap(new Blob([t],{type:"image/jpeg"})).then(A=>{const t=new OffscreenCanvas(1,1);try{const e=t.getContext("2d",m);return e.drawImage(A,1,1,1,1,0,0,1,1),e.getImageData(0,0,1,1).data[0]<240}finally{A.close()}})}return!l()||"undefined"==typeof Image||new Promise(A=>{const t=new Image;t.onload=()=>{try{const e=document.createElement("canvas");e.width=1,e.height=1;const n=e.getContext("2d",m);n.drawImage(t,1,1,1,1,0,0,1,1),A(n.getImageData(0,0,1,1).data[0]<240)}catch(G){A(!0)}},t.onerror=()=>A(!0),t.src=\`data:image/jpeg;base64,\${c}\`})}).catch(()=>!0).then(A=>{f.bug_canvas_orientation_region=A}).catch(()=>{}),t=Promise.resolve().then(()=>{if(!f.create_image_bitmap&&!y())return!0;if("undefined"==typeof Blob||"undefined"==typeof atob)return!0;const A=w(),t=l();if(!A&&!t)return!0;const e=atob(c),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return createImageBitmap(new Blob([n],{type:"image/jpeg"})).then(t=>createImageBitmap(t,1,1,1,1).then(e=>{let n;A?n=new OffscreenCanvas(1,1):(n=document.createElement("canvas"),n.width=1,n.height=1);try{const A=n.getContext("2d",m);return A.drawImage(e,0,0),1!==e.width||1!==e.height||A.getImageData(0,0,1,1).data[0]<240}finally{t.close(),e.close()}},()=>(t.close(),!0)))}).catch(()=>!0).then(A=>{f.bug_image_bitmap_orientation_region=A}).catch(()=>{}),e=Promise.resolve().then(()=>{if(!y())return!1;const A=20;let t;if(f.canvas||l())t=document.createElement("canvas"),t.width=A,t.height=A;else{if(!f.offscreen_canvas&&!w())return!1;t=new OffscreenCanvas(A,A),t.getContext("2d",m).clearRect(0,0,A,A)}return createImageBitmap(t,0,0,A,A,{resizeWidth:5,resizeHeight:5,resizeQuality:"high"}).then(A=>{const e=5===A.width&&!!A.close;return A.close&&A.close(),t=null,e})}).catch(()=>!1).then(A=>{f.cib_resize=A}).catch(()=>{});return d=Promise.all([A,t,e]).then(()=>(u=!0,d=null,Object.assign({},f)),A=>{throw d=null,A})}var b=self,D=null;function M(A,t){return D||(D=new C(A.features)),D.resizeAndUnsharp(t)}function p(A){if("bitmap"===A.job.kind)return void function(A,t){let e=new OffscreenCanvas(t.width,t.height);const n={willReadFrequently:!0},a=e.getContext("2d",n);a.drawImage(t.src,0,0);const i=a.getImageData(0,0,t.width,t.height).data;e.width=e.height=0,e=null,t.src.close();const r=M(A,{src:i,width:t.width,height:t.height,toWidth:t.toWidth,toHeight:t.toHeight,scaleX:t.scaleX,scaleY:t.scaleY,offsetX:t.offsetX,offsetY:t.offsetY,filter:t.filter,unsharpAmount:t.unsharpAmount,unsharpRadius:t.unsharpRadius,unsharpThreshold:t.unsharpThreshold}),s=new OffscreenCanvas(t.toWidth,t.toHeight),o=s.getContext("2d",n),g=o.createImageData(t.toWidth,t.toHeight);g.data.set(r),o.putImageData(g,0,0);const I=s.transferToImageBitmap();b.postMessage({kind:"bitmap",data:I},[I])}(A,A.job);const t=M(A,A.job);b.postMessage({kind:"array",data:t},[t.buffer])}b.onmessage=function(A){Promise.resolve().then(()=>function(A){switch(A.method){case"get_supported_features":return _().then(A=>{b.postMessage({data:A})});case"resize":return p(A),Promise.resolve();default:return Promise.reject(new Error(\`Unknown worker method: \${A.method}\`))}}(A.data)).catch(A=>{b.postMessage({err:A})})}}();
//# sourceURL=pica-inline-worker.js`,He=1;typeof navigator<`u`&&(He=Math.min(navigator.hardwareConcurrency||1,4));var Ue={tile:1024,concurrency:He,features:[`js`,`wasm`,`ww`],idle:2e3},We={filter:`mks2013`,unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},Ge={willReadFrequently:!0},Ke=class{constructor(e){ie(this,`options`,void 0),ie(this,`__limit`,void 0),ie(this,`resize_features`,void 0),ie(this,`__workersPool`,void 0),ie(this,`capabilities`,void 0),ie(this,`__requested_features`,void 0),ie(this,`__mathlib`,void 0),ie(this,`__initPromise`,void 0),this.options=Object.assign({},Ue,e||{}),(this.options.features.indexOf(`ww`)>=0||this.options.features.indexOf(`all`)>=0)&&this.options.workerURL,this.__limit=pe(this.options.concurrency),this.resize_features={js:!1,wasm:!1,cib:!1,ww:!1},this.__workersPool=null,this.capabilities={worker:!1,ww_offscreen_canvas:!1,canvas:!1,offscreen_canvas:!1,may_be_worker:!1,create_image_bitmap:!1,safari_put_image_data_fix:!1,bug_canvas_orientation_region:!0,bug_image_bitmap_orientation_region:!0,cib_resize:!1},this.__requested_features=[],this.__mathlib=null}init(){return this.__initPromise||=this.__init(),this.__initPromise}__init(){var e=this;return Be(function*(){let t=e.options.features.slice();t.indexOf(`all`)>=0&&(t=[`cib`,`wasm`,`js`,`ww`]),e.__requested_features=t,e.__mathlib=new ee(t);let n=yield Re();if(Object.assign(e.capabilities,n),e.capabilities.cib_resize&&t.indexOf(`cib`)>=0&&(e.resize_features.cib=!0),e.capabilities.may_be_worker&&t.indexOf(`ww`)>=0&&Ve&&(e.__workersPool=new ce(()=>e.__createWorkerSlot(),e.options.idle)),e.__workersPool)try{let t=yield e.__invokeWorker(`get_supported_features`),n=t&&t.data;n&&(e.capabilities.worker=!0,e.resize_features.ww=!0,e.capabilities.ww_offscreen_canvas=!!n.offscreen_canvas)}catch{}let r=yield e.__mathlib.init();return Object.assign(e.resize_features,r.features),e})()}createCanvas(e,t,n){if(n&&this.capabilities.offscreen_canvas)return new OffscreenCanvas(e,t);if(this.capabilities.canvas){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}if(this.capabilities.ww_offscreen_canvas)return new OffscreenCanvas(e,t);throw Error(`Pica: cannot create canvas`)}__createWorkerSlot(){if(this.options.workerURL){let e=new Worker(String(this.options.workerURL));return{value:e,destroy(){e.terminate()}}}{let e=window.URL.createObjectURL(new Blob([Ve],{type:`text/javascript`})),t=new Worker(e);return{value:t,destroy(){if(t.terminate(),typeof window<`u`){var n,r;(n=window.URL)==null||(r=n.revokeObjectURL)==null||r.call(n,e)}}}}}__invokeWorker(e,t,n,r){return new Promise((i,a)=>{let o=this.__workersPool.acquire();r&&r.cancelToken&&r.cancelToken.catch(e=>a(e)),o.value.onmessage=e=>{o.release(),e.data.err?a(e.data.err):i(e.data)},o.value.postMessage(Object.assign({method:e},t||{}),n||[])})}__invokeResize(e,t){var n=this;return Be(function*(){if(yield Promise.resolve(),!n.resize_features.ww){if(e.kind!==`array`)throw Error(`Pica: resize tile data is missing`);let t={src:e.src,width:e.width,height:e.height,toWidth:e.toWidth,toHeight:e.toHeight,scaleX:e.scaleX,scaleY:e.scaleY,offsetX:e.offsetX,offsetY:e.offsetY,filter:e.filter,unsharpAmount:e.unsharpAmount,unsharpRadius:e.unsharpRadius,unsharpThreshold:e.unsharpThreshold};return{kind:`array`,data:n.__mathlib.resizeAndUnsharp(t)}}let r=[];return e.kind===`array`?r.push(e.src.buffer):r.push(e.src),n.__invokeWorker(`resize`,{job:e,features:n.__requested_features},r,t)})()}__extractTileData(e,t,n,r){if(this.resize_features.ww&&this.capabilities.ww_offscreen_canvas){this.debug(`Create tile imageBitmap`);let i=this.createCanvas(e.width,e.height,{preferOffscreen:!0});if(i.getContext(`2d`,Ge).drawImage(n.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),!(`transferToImageBitmap`in i))throw Error(`Pica: offscreen canvas is not available for worker transfer`);return Object.assign({},r,{kind:`bitmap`,src:i.transferToImageBitmap()})}if(ue(t))return n.srcCtx||=t.getContext(`2d`,Ge),this.debug(`Get tile pixel data`),Object.assign({},r,{kind:`array`,src:n.srcCtx.getImageData(e.x,e.y,e.width,e.height).data});this.debug(`Draw tile imageBitmap/image to temporary canvas`);let i=this.createCanvas(e.width,e.height,{preferOffscreen:!0}),a=i.getContext(`2d`,Ge);a.globalCompositeOperation=`copy`,a.drawImage(n.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),this.debug(`Get tile pixel data`);let o=a.getImageData(0,0,e.width,e.height).data;return i.width=i.height=0,Object.assign({},r,{kind:`array`,src:o})}__landTileData(e,t,n){if(t.kind===`bitmap`)return n.toCtx.drawImage(t.data,e.toX,e.toY),t.data.close(),null;this.debug(`Draw tile`);let r=n.toCtx.createImageData(e.toWidth,e.toHeight);return r.data.set(t.data),this.capabilities.safari_put_image_data_fix?n.toCtx.putImageData(r,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth+1e-5,e.toInnerHeight+1e-5):n.toCtx.putImageData(r,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth,e.toInnerHeight),null}__tileAndResize(e,t,n,r){var i=this;return Be(function*(){let a={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null},o=t=>i.__limit(Be(function*(){if(r.canceled)return r.cancelToken;let o={width:t.width,height:t.height,toWidth:t.toWidth,toHeight:t.toHeight,scaleX:t.scaleX,scaleY:t.scaleY,offsetX:t.offsetX,offsetY:t.offsetY,filter:n.filter,unsharpAmount:n.unsharpAmount,unsharpRadius:n.unsharpRadius,unsharpThreshold:n.unsharpThreshold};i.debug(`Invoke resize math`);let s=yield i.__extractTileData(t,e,a,o);i.debug(`Invoke resize math`);let c=yield i.__invokeResize(s,r);return r.canceled?r.cancelToken:i.__landTileData(t,c,a)}));if(yield Promise.resolve(),a.toCtx=t.getContext(`2d`,Ge),!ue(e))if(fe(e))a.srcImageBitmap=e,a.isImageBitmapReused=!0;else if(de(e)){if(i.capabilities.create_image_bitmap){i.debug(`Decode image via createImageBitmap`);try{a.srcImageBitmap=yield createImageBitmap(e)}catch{}}}else throw Error(`Pica: ".from" should be Image, Canvas or ImageBitmap`);if(r.canceled)return r.cancelToken;i.debug(`Calculate tiles`);let s=we({width:n.width,height:n.height,srcTileSize:i.options.tile,toWidth:n.toWidth,toHeight:n.toHeight,destTileBorder:Math.ceil(Math.max(3,2.5*n.unsharpRadius|0))}).map(e=>o(e));function c(e){e.srcImageBitmap&&=(e.isImageBitmapReused||e.srcImageBitmap.close(),null)}i.debug(`Process tiles`);try{return yield Promise.all(s),i.debug(`Finished!`),c(a),t}catch(e){throw c(a),e}})()}__planStagesAndResize(e,t,n,r){var i=this;return Be(function*(){let a=e,o=n.width,s=n.height,c=be(n.width,n.height,n.toWidth,n.toHeight,i.options.tile);for(;c.length>0;){if(r.canceled)return r.cancelToken;let[l,u]=c.shift(),d=c.length===0,f;f=d||!_e(n.filter)?n.filter:n.filter===`box`?`box`:`hamming`;let p=oe(oe({},n),{},{filter:f,width:o,height:s,toWidth:l,toHeight:u}),m=d?t:i.createCanvas(l,u,{preferOffscreen:!0}),h=a===e?void 0:a;try{yield i.__tileAndResize(a,m,p,r)}finally{h&&(h.width=h.height=0)}a=m,o=l,s=u}return t})()}__resizeViaCreateImageBitmap(e,t,n,r){var i=this;return Be(function*(){let a=t.getContext(`2d`,Ge);i.debug(`Resize via createImageBitmap()`);let o=yield createImageBitmap(e,{resizeWidth:n.toWidth,resizeHeight:n.toHeight,resizeQuality:me(M(n.filter)??3)});if(r.canceled)return r.cancelToken;if(!n.unsharpAmount)return a.drawImage(o,0,0),o.close(),a=null,i.debug(`Finished!`),t;i.debug(`Unsharp result`);let s=i.createCanvas(n.toWidth,n.toHeight),c=s.getContext(`2d`,Ge);c.drawImage(o,0,0),o.close();let l=c.getImageData(0,0,n.toWidth,n.toHeight);return i.__mathlib.unsharp_mask(l.data,n.toWidth,n.toHeight,n.unsharpAmount,n.unsharpRadius,n.unsharpThreshold),a.putImageData(l,0,0),s.width=s.height=0,l=c=s=a=null,i.debug(`Finished!`),t})()}resize(e,t,n){var r=this;return Be(function*(){r.debug(`Start resize...`);let i={};n&&Object.assign(i,n);let a=i.filter||We.filter;if(Object.prototype.hasOwnProperty.call(i,`quality`)){let e=i.quality;if(typeof e!=`number`||e<0||e>3)throw Error(`Pica: .quality should be [0..3], got ${e}`);a=ge(e)}let o={filter:a,unsharpAmount:i.unsharpAmount||We.unsharpAmount,unsharpRadius:i.unsharpRadius||We.unsharpRadius,unsharpThreshold:i.unsharpThreshold||We.unsharpThreshold,width:de(e)?e.naturalWidth:e.width,height:de(e)?e.naturalHeight:e.height,toWidth:t.width,toHeight:t.height};if(o.unsharpRadius>2&&(o.unsharpRadius=2),t.width===0||t.height===0)return Promise.reject(Error(`Invalid output size: ${t.width}x${t.height}`));let s={cancelToken:i.cancelToken,canceled:!1};if(s.cancelToken&&=s.cancelToken.then(e=>{throw s.canceled=!0,e},e=>{throw s.canceled=!0,e}),yield r.init(),s.canceled)return s.cancelToken;if(r.capabilities.bug_image_bitmap_orientation_region&&(de(e)||fe(e))){let t=r.createCanvas(o.width,o.height);t.getContext(`2d`,Ge).drawImage(e,0,0),e=t}if(r.resize_features.cib){if(_e(o.filter))return r.__resizeViaCreateImageBitmap(e,t,o,s);r.debug(`cib is enabled, but not supports provided filter, fallback to manual math`)}if(!r.capabilities.canvas&&!r.capabilities.offscreen_canvas){let e=Error(`Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled`);throw e.code=`ERR_GET_IMAGE_DATA`,e}return r.__planStagesAndResize(e,t,o,s)})()}resizeBuffer(e){var t=this;return Be(function*(){let n=Object.assign({},We,e);if(Object.prototype.hasOwnProperty.call(n,`quality`)){let e=n.quality;if(typeof e!=`number`||e<0||e>3)throw Error(`Pica: .quality should be [0..3], got ${e}`);n.filter=ge(e)}if(yield t.init(),!t.__mathlib)throw Error(`Pica: math library is not initialized`);let r={src:n.src,width:n.width,height:n.height,toWidth:n.toWidth,toHeight:n.toHeight,dest:n.dest,scaleX:n.toWidth/n.width,scaleY:n.toHeight/n.height,offsetX:0,offsetY:0,filter:n.filter,unsharpAmount:n.unsharpAmount,unsharpRadius:n.unsharpRadius,unsharpThreshold:n.unsharpThreshold};return t.__mathlib.resizeAndUnsharp(r)})()}toBlob(e,t,n){return Be(function*(){if(t||=`image/png`,`toBlob`in e&&e.toBlob)return new Promise(r=>{e.toBlob(e=>r(e),t,n)});if(`convertToBlob`in e&&e.convertToBlob)return e.convertToBlob({type:t,quality:n});let r=atob(e.toDataURL(t,n).split(`,`)[1]),i=r.length,a=new Uint8Array(i);for(let e=0;e<i;e++)a[e]=r.charCodeAt(e);return new Blob([a],{type:t})})()}debug(...e){}};function qe(e){return new Ke(e)}var Je=function(e,t,n){let r=Promise.resolve();function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ye=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,Ze=Object.getOwnPropertyNames,N=Object.prototype.hasOwnProperty,Qe=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error(`Dynamic require of "`+e+`" is not supported`)}),P=(e,t)=>()=>(e&&(t=e(e=0)),t),$e=(e,t)=>{for(var n in t)Ye(e,n,{get:t[n],enumerable:!0})},et=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(let i of Ze(t))!N.call(e,i)&&i!==n&&Ye(e,i,{get:()=>t[i],enumerable:!(r=Xe(t,i))||r.enumerable});return e},tt=e=>et(Ye({},`__esModule`,{value:!0}),e),nt,rt,it,at,ot,st=P(()=>{"use strict";nt=new Map,rt=[],it=(e,t,n)=>{if(t&&typeof t.init==`function`&&typeof t.createInferenceSessionHandler==`function`){let r=nt.get(e);if(r===void 0)nt.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let t=rt.indexOf(e);t!==-1&&rt.splice(t,1);for(let t=0;t<rt.length;t++)if(nt.get(rt[t]).priority<=n){rt.splice(t,0,e);return}rt.push(e)}return}throw TypeError(`not a valid backend`)},at=async e=>{let t=nt.get(e);if(!t)return`backend not found.`;if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(e){return n||(t.error=`${e}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ot=async e=>{let t=e.executionProviders||[],n=t.map(e=>typeof e==`string`?e:e.name),r=n.length===0?rt:n,i,a=[],o=new Set;for(let e of r){let t=await at(e);typeof t==`string`?a.push({name:e,err:t}):(i||=t,i===t&&o.add(e))}if(!i)throw Error(`no available backend found. ERR: ${a.map(e=>`[${e.name}] ${e.err}`).join(`, `)}`);for(let{name:e,err:t}of a)n.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let s=t.filter(e=>o.has(typeof e==`string`?e:e.name));return[i,new Proxy(e,{get:(e,t)=>t===`executionProviders`?s:Reflect.get(e,t)})]}}),ct=P(()=>{"use strict";st()}),lt,ut=P(()=>{"use strict";lt=`1.27.0`}),dt,ft,pt=P(()=>{"use strict";ut(),dt=`warning`,ft={wasm:{},webgl:{},webgpu:{},versions:{common:lt},set logLevel(e){if(e!==void 0){if(typeof e!=`string`||[`verbose`,`info`,`warning`,`error`,`fatal`].indexOf(e)===-1)throw Error(`Unsupported logging level: ${e}`);dt=e}},get logLevel(){return dt}},Object.defineProperty(ft,"logLevel",{enumerable:!0})}),F,mt=P(()=>{"use strict";pt(),F=ft}),ht,gt,_t=P(()=>{"use strict";ht=(e,t)=>{let n=typeof document<`u`?document.createElement(`canvas`):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext(`2d`);if(r!=null){let i,a;t?.tensorLayout!==void 0&&t.tensorLayout===`NHWC`?(i=e.dims[2],a=e.dims[3]):(i=e.dims[3],a=e.dims[2]);let o=t?.format===void 0?`RGB`:t.format,s=t?.norm,c,l;s===void 0||s.mean===void 0?c=[255,255,255,255]:typeof s.mean==`number`?c=[s.mean,s.mean,s.mean,s.mean]:(c=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(c[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias==`number`?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let u=a*i,d=0,f=u,p=u*2,m=-1;o===`RGBA`?(d=0,f=u,p=u*2,m=u*3):o===`RGB`?(d=0,f=u,p=u*2):o===`RBG`&&(d=0,p=u,f=u*2);for(let t=0;t<a;t++)for(let n=0;n<i;n++){let i=(e.data[d++]-l[0])*c[0],a=(e.data[f++]-l[1])*c[1],o=(e.data[p++]-l[2])*c[2],s=m===-1?255:(e.data[m++]-l[3])*c[3];r.fillStyle=`rgba(`+i+`,`+a+`,`+o+`,`+s+`)`,r.fillRect(n,t,1,1)}if(`toDataURL`in n)return n.toDataURL();throw Error(`toDataURL is not supported`)}throw Error(`Can not access image data`)},gt=(e,t)=>{let n=typeof document<`u`?document.createElement(`canvas`).getContext(`2d`):new OffscreenCanvas(1,1).getContext(`2d`),r;if(n!=null){let i,a,o;t?.tensorLayout!==void 0&&t.tensorLayout===`NHWC`?(i=e.dims[2],a=e.dims[1],o=e.dims[3]):(i=e.dims[3],a=e.dims[2],o=e.dims[1]);let s=t!==void 0&&t.format!==void 0?t.format:`RGB`,c=t?.norm,l,u;c===void 0||c.mean===void 0?l=[255,255,255,255]:typeof c.mean==`number`?l=[c.mean,c.mean,c.mean,c.mean]:(l=[c.mean[0],c.mean[1],c.mean[2],255],c.mean[3]!==void 0&&(l[3]=c.mean[3])),c===void 0||c.bias===void 0?u=[0,0,0,0]:typeof c.bias==`number`?u=[c.bias,c.bias,c.bias,c.bias]:(u=[c.bias[0],c.bias[1],c.bias[2],0],c.bias[3]!==void 0&&(u[3]=c.bias[3]));let d=a*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!==`RGBA`||o===3&&t.format!==`RGB`&&t.format!==`BGR`))throw Error(`Tensor format doesn't match input tensor dims`);let f=0,p=1,m=2,h=3,g=0,_=d,v=d*2,y=-1;s===`RGBA`?(g=0,_=d,v=d*2,y=d*3):s===`RGB`?(g=0,_=d,v=d*2):s===`RBG`&&(g=0,v=d,_=d*2),r=n.createImageData(i,a);for(let t=0;t<a*i;f+=4,p+=4,m+=4,h+=4,t++)r.data[f]=(e.data[g++]-u[0])*l[0],r.data[p]=(e.data[_++]-u[1])*l[1],r.data[m]=(e.data[v++]-u[2])*l[2],r.data[h]=y===-1?255:(e.data[y++]-u[3])*l[3]}else throw Error(`Can not access image data`);return r}}),vt,yt,bt,xt,St,Ct,wt=P(()=>{"use strict";Pt(),vt=(e,t)=>{if(e===void 0)throw Error(`Image buffer must be defined`);if(t.height===void 0||t.width===void 0)throw Error(`Image height and width must be defined`);if(t.tensorLayout===`NHWC`)throw Error(`NHWC Tensor layout is not supported yet`);let{height:n,width:r}=t,i=t.norm??{mean:255,bias:0},a,o;a=typeof i.mean==`number`?[i.mean,i.mean,i.mean,i.mean]:[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],o=typeof i.bias==`number`?[i.bias,i.bias,i.bias,i.bias]:[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let s=t.format===void 0?`RGBA`:t.format,c=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:`RGB`,l=n*r,u=c===`RGBA`?new Float32Array(l*4):new Float32Array(l*3),d=4,f=0,p=1,m=2,h=3,g=0,_=l,v=l*2,y=-1;s===`RGB`&&(d=3,f=0,p=1,m=2,h=-1),c===`RGBA`?y=l*3:c===`RBG`?(g=0,v=l,_=l*2):c===`BGR`&&(v=0,_=l,g=l*2);for(let t=0;t<l;t++,f+=d,m+=d,p+=d,h+=d)u[g++]=(e[f]+o[0])/a[0],u[_++]=(e[p]+o[1])/a[1],u[v++]=(e[m]+o[2])/a[2],y!==-1&&h!==-1&&(u[y++]=(e[h]+o[3])/a[3]);return c===`RGBA`?new Nt(`float32`,u,[1,4,n,r]):new Nt(`float32`,u,[1,3,n,r])},yt=async(e,t)=>{let n=typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement,r=typeof ImageData<`u`&&e instanceof ImageData,i=typeof ImageBitmap<`u`&&e instanceof ImageBitmap,a=typeof e==`string`,o,s=t??{},c=()=>{if(typeof document<`u`)return document.createElement(`canvas`);if(typeof OffscreenCanvas<`u`)return new OffscreenCanvas(1,1);throw Error(`Canvas is not supported`)},l=e=>typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext(`2d`):null;if(n){let n=c();n.width=e.width,n.height=e.height;let r=l(n);if(r!=null){let n=e.height,i=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(n=t.resizedHeight,i=t.resizedWidth),t!==void 0){if(s=t,t.tensorFormat!==void 0)throw Error(`Image input config format must be RGBA for HTMLImageElement`);s.tensorFormat=`RGBA`,s.height=n,s.width=i}else s.tensorFormat=`RGBA`,s.height=n,s.width=i;r.drawImage(e,0,0),o=r.getImageData(0,0,i,n).data}else throw Error(`Can not access image data`)}else if(r){let n,r;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(n=t.resizedHeight,r=t.resizedWidth):(n=e.height,r=e.width),t!==void 0&&(s=t),s.format=`RGBA`,s.height=n,s.width=r,t!==void 0){let t=c();t.width=r,t.height=n;let i=l(t);if(i!=null)i.putImageData(e,0,0),o=i.getImageData(0,0,r,n).data;else throw Error(`Can not access image data`)}else o=e.data}else if(i){if(t===void 0)throw Error(`Please provide image config with format for Imagebitmap`);let n=c();n.width=e.width,n.height=e.height;let r=l(n);if(r!=null){let t=e.height,n=e.width;return r.drawImage(e,0,0,n,t),o=r.getImageData(0,0,n,t).data,s.height=t,s.width=n,vt(o,s)}throw Error(`Can not access image data`)}else{if(a)return new Promise((t,n)=>{let r=c(),i=l(r);if(!e||!i)return n();let a=new Image;a.crossOrigin=`Anonymous`,a.src=e,a.onload=()=>{r.width=a.width,r.height=a.height,i.drawImage(a,0,0,r.width,r.height);let e=i.getImageData(0,0,r.width,r.height);s.height=r.height,s.width=r.width,t(vt(e.data,s))}});throw Error(`Input data provided is not supported - aborted tensor creation`)}if(o!==void 0)return vt(o,s);throw Error(`Input data provided is not supported - aborted tensor creation`)},bt=(e,t)=>{let{width:n,height:r,download:i,dispose:a}=t;return new Nt({location:`texture`,type:`float32`,texture:e,dims:[1,r,n,4],download:i,dispose:a})},xt=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new Nt({location:`gpu-buffer`,type:n??`float32`,gpuBuffer:e,dims:r,download:i,dispose:a})},St=(e,t)=>{let{dataType:n,dims:r,download:i,dispose:a}=t;return new Nt({location:`ml-tensor`,type:n??`float32`,mlTensor:e,dims:r,download:i,dispose:a})},Ct=(e,t,n)=>new Nt({location:`cpu-pinned`,type:e,data:t,dims:n??[t.length]})}),Tt,Et,Dt,Ot,kt=P(()=>{"use strict";Tt=new Map([[`float32`,Float32Array],[`uint8`,Uint8Array],[`int8`,Int8Array],[`uint16`,Uint16Array],[`int16`,Int16Array],[`int32`,Int32Array],[`bool`,Uint8Array],[`float64`,Float64Array],[`uint32`,Uint32Array],[`int4`,Uint8Array],[`uint4`,Uint8Array]]),Et=new Map([[Float32Array,`float32`],[Uint8Array,`uint8`],[Int8Array,`int8`],[Uint16Array,`uint16`],[Int16Array,`int16`],[Int32Array,`int32`],[Float64Array,`float64`],[Uint32Array,`uint32`]]),Dt=!1,Ot=()=>{if(!Dt){Dt=!0;let e=typeof BigInt64Array<`u`&&BigInt64Array.from,t=typeof BigUint64Array<`u`&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<`u`&&n.from;e&&(Tt.set(`int64`,BigInt64Array),Et.set(BigInt64Array,`int64`)),t&&(Tt.set(`uint64`,BigUint64Array),Et.set(BigUint64Array,`uint64`)),r?(Tt.set(`float16`,n),Et.set(n,`float16`)):Tt.set(`float16`,Uint16Array)}}}),At,jt,Mt=P(()=>{"use strict";Pt(),At=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!=`number`||!Number.isSafeInteger(r))throw TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},jt=(e,t)=>{switch(e.location){case`cpu`:return new Nt(e.type,e.data,t);case`cpu-pinned`:return new Nt({location:`cpu-pinned`,data:e.data,type:e.type,dims:t});case`texture`:return new Nt({location:`texture`,texture:e.texture,type:e.type,dims:t});case`gpu-buffer`:return new Nt({location:`gpu-buffer`,gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case`ml-tensor`:return new Nt({location:`ml-tensor`,mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Nt,Pt=P(()=>{"use strict";_t(),wt(),kt(),Mt(),Nt=class{constructor(e,t,n){Ot();let r,i;if(typeof e==`object`&&`location`in e)switch(this.dataLocation=e.location,r=e.type,i=e.dims,e.location){case`cpu-pinned`:{let t=Tt.get(r);if(!t)throw TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case`texture`:if(r!==`float32`)throw TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case`gpu-buffer`:if(r!==`float32`&&r!==`float16`&&r!==`int32`&&r!==`int64`&&r!==`uint32`&&r!==`uint8`&&r!==`bool`&&r!==`uint4`&&r!==`int4`)throw TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case`ml-tensor`:if(r!==`float32`&&r!==`float16`&&r!==`int32`&&r!==`int64`&&r!==`uint32`&&r!==`uint64`&&r!==`int8`&&r!==`uint8`&&r!==`bool`&&r!==`uint4`&&r!==`int4`)throw TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e==`string`)if(r=e,o=n,e===`string`){if(!Array.isArray(t))throw TypeError(`A string tensor's data must be a string array.`);a=t}else{let n=Tt.get(e);if(n===void 0)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e===`float16`&&n===Uint16Array||e===`uint4`||e===`int4`)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${n.name} as data.`);a=e===`uint64`||e===`int64`?n.from(t,BigInt):n.from(t)}else if(t instanceof n)a=t;else if(t instanceof Uint8ClampedArray)if(e===`uint8`)a=Uint8Array.from(t);else throw TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);else if(e===`float16`&&t instanceof Uint16Array&&n!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${r} tensor's data must be type of ${n}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw TypeError(`Tensor type cannot be inferred from an empty array.`);let t=typeof e[0];if(t===`string`)r=`string`,a=e;else if(t===`boolean`)r=`bool`,a=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)r=`uint8`,a=Uint8Array.from(e);else{let t=Et.get(e.constructor);if(t===void 0)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=t,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw TypeError(`A tensor's dims must be a number array`);i=o,this.cpuData=a,this.dataLocation=`cpu`}let a=At(i);if(this.cpuData&&a!==this.cpuData.length&&(r!==`uint4`&&r!==`int4`||Math.ceil(a/2)!==this.cpuData.length))throw Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=i,this.size=a}static async fromImage(e,t){return yt(e,t)}static fromTexture(e,t){return bt(e,t)}static fromGpuBuffer(e,t){return xt(e,t)}static fromMLTensor(e,t){return St(e,t)}static fromPinnedBuffer(e,t,n){return Ct(e,t,n)}toDataURL(e){return ht(this,e)}toImageData(e){return gt(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error(`The data is not stored as a WebGL texture.`);return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error(`The data is not stored as a WebGPU buffer.`);return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error(`The data is not stored as a WebNN MLTensor.`);return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case`cpu`:case`cpu-pinned`:return this.data;case`texture`:case`gpu-buffer`:case`ml-tensor`:if(!this.downloader)throw Error(`The current tensor is not created with a specified data downloader.`);if(this.isDownloading)throw Error(`The current tensor is being downloaded.`);try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation=`cpu`,this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error(`The current tensor is being downloaded.`);this.disposer&&=(this.disposer(),void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation=`none`}ensureValid(){if(this.dataLocation===`none`)throw Error(`The tensor is disposed.`)}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error(`Cannot reshape a tensor that owns GPU resource.`);return jt(this,e)}}}),Ft,It=P(()=>{"use strict";Pt(),Ft=Nt}),Lt,Rt,zt,Bt,Vt,Ht,Ut=P(()=>{"use strict";pt(),Lt=(e,t)=>{(typeof ft.trace>`u`?!ft.wasm.trace:!ft.trace)||console.timeStamp(`${e}::ORT::${t}`)},Rt=(e,t)=>{let n=Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let i=0;i<n.length;i++){if(r&&!n[i].includes(`TRACE_FUNC`)){let r=`FUNC_${e}::${n[i].trim().split(` `)[1]}`;t&&(r+=`::${t}`),Lt(`CPU`,r);return}n[i].includes(`TRACE_FUNC`)&&(r=!0)}},zt=e=>{(typeof ft.trace>`u`?!ft.wasm.trace:!ft.trace)||Rt(`BEGIN`,e)},Bt=e=>{(typeof ft.trace>`u`?!ft.wasm.trace:!ft.trace)||Rt(`END`,e)},Vt=e=>{(typeof ft.trace>`u`?!ft.wasm.trace:!ft.trace)||console.time(`ORT::${e}`)},Ht=e=>{(typeof ft.trace>`u`?!ft.wasm.trace:!ft.trace)||console.timeEnd(`ORT::${e}`)}}),Wt,Gt=P(()=>{"use strict";st(),It(),Ut(),Wt=class e{constructor(e){this.handler=e}async run(e,t,n){zt(),Vt(`InferenceSession.run`);let r={},i={};if(typeof e!=`object`||!e||e instanceof Ft||Array.isArray(e))throw TypeError(`'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.`);let a=!0;if(typeof t==`object`){if(t===null)throw TypeError(`Unexpected argument[1]: cannot be null.`);if(t instanceof Ft)throw TypeError(`'fetches' cannot be a Tensor`);if(Array.isArray(t)){if(t.length===0)throw TypeError(`'fetches' cannot be an empty array.`);a=!1;for(let e of t){if(typeof e!=`string`)throw TypeError(`'fetches' must be a string array or an object.`);if(this.outputNames.indexOf(e)===-1)throw RangeError(`'fetches' contains invalid output name: ${e}.`);r[e]=null}if(typeof n==`object`&&n)i=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else{let e=!1,o=Object.getOwnPropertyNames(t);for(let n of this.outputNames)if(o.indexOf(n)!==-1){let i=t[n];(i===null||i instanceof Ft)&&(e=!0,a=!1,r[n]=i)}if(e){if(typeof n==`object`&&n)i=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else i=t}}else if(typeof t<`u`)throw TypeError(`Unexpected argument[1]: must be 'fetches' or 'options'.`);for(let t of this.inputNames)if(typeof e[t]>`u`)throw Error(`input '${t}' is missing in 'feeds'.`);if(a)for(let e of this.outputNames)r[e]=null;let o=await this.handler.run(e,r,i),s={};for(let e in o)if(Object.hasOwnProperty.call(o,e)){let t=o[e];s[e]=t instanceof Ft?t:new Ft(t.type,t.data,t.dims)}return Ht(`InferenceSession.run`),Bt(),s}async release(){return this.handler.dispose()}static async create(t,n,r,i){zt(),Vt(`InferenceSession.create`);let a,o={};if(typeof t==`string`){if(a=t,typeof n==`object`&&n)o=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else if(t instanceof Uint8Array){if(a=t,typeof n==`object`&&n)o=n;else if(typeof n<`u`)throw TypeError(`'options' must be an object.`)}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer){let e=t,s=0,c=t.byteLength;if(typeof n==`object`&&n)o=n;else if(typeof n==`number`){if(s=n,!Number.isSafeInteger(s))throw RangeError(`'byteOffset' must be an integer.`);if(s<0||s>=e.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${e.byteLength}).`);if(c=t.byteLength-s,typeof r==`number`){if(c=r,!Number.isSafeInteger(c))throw RangeError(`'byteLength' must be an integer.`);if(c<=0||s+c>e.byteLength)throw RangeError(`'byteLength' is out of range (0, ${e.byteLength-s}].`);if(typeof i==`object`&&i)o=i;else if(typeof i<`u`)throw TypeError(`'options' must be an object.`)}else if(typeof r<`u`)throw TypeError(`'byteLength' must be a number.`)}else if(typeof n<`u`)throw TypeError(`'options' must be an object.`);a=new Uint8Array(e,s,c)}else throw TypeError(`Unexpected argument[0]: must be 'path' or 'buffer'.`);let[s,c]=await ot(o),l=await s.createInferenceSessionHandler(a,c);return Ht(`InferenceSession.create`),Bt(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Kt,qt=P(()=>{"use strict";Gt(),Kt=Wt}),Jt=P(()=>{"use strict";}),Yt=P(()=>{"use strict";}),Xt=P(()=>{"use strict";}),Zt=P(()=>{"use strict";});$e({},{InferenceSession:()=>Kt,TRACE:()=>Lt,TRACE_EVENT_BEGIN:()=>Vt,TRACE_EVENT_END:()=>Ht,TRACE_FUNC_BEGIN:()=>zt,TRACE_FUNC_END:()=>Bt,Tensor:()=>Ft,env:()=>F,registerBackend:()=>it});var Qt=P(()=>{"use strict";ct(),mt(),qt(),It(),Jt(),Yt(),Ut(),Xt(),Zt()}),$t=P(()=>{"use strict";}),en={};$e(en,{default:()=>rn});var tn,nn,rn,an=P(()=>{"use strict";_f(),Pn(),Tn(),tn=`ort-wasm-proxy-worker`,nn=globalThis.self?.name===tn,nn&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case`init-wasm`:Nn(n.wasm).then(()=>{af(n).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case`init-ep`:{let{epName:e,env:r}=n;of(r,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case`copy-from`:{let{buffer:e}=n,r=uf(e);postMessage({type:t,out:r});break}case`create`:{let{model:e,options:r}=n;df(e,r).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case`release`:ff(n),postMessage({type:t});break;case`run`:{let{sessionId:e,inputIndices:r,inputs:i,outputIndices:a,options:o}=n;mf(e,r,i,a,Array(a.length).fill(null),o).then(e=>{e.some(e=>e[3]!==`cpu`)?postMessage({type:t,err:`Proxy does not support non-cpu tensor location.`}):postMessage({type:t,out:e},gf([...i,...e]))},e=>{postMessage({type:t,err:e})});break}case`end-profiling`:hf(n),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),rn=nn?null:e=>new Worker(e??mn,{type:`module`,name:tn})}),on={};$e(on,{default:()=>cn});async function sn(e={}){var t=e,n=!!globalThis.window,r=!!globalThis.WorkerGlobalScope,i=r&&self.name?.startsWith(`em-pthread`);t.mountExternalData=(e,n)=>{e.startsWith(`./`)&&(e=e.substring(2)),(t.Xc||=new Map).set(e,n)},t.unmountExternalData=()=>{delete t.Xc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=e=>async(...n)=>{try{if(t.Yc)throw Error(`Session already started`);let r=t.Yc={Kd:n[0],errors:[]},i=await e(...n);if(t.Yc!==r)throw Error(`Session mismatch`);t.dd?.flush();let a=r.errors;if(0<a.length){let e=await Promise.all(a);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return i}finally{t.Yc=null}};t.jsepInit=(e,n)=>{if(e===`webgpu`){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=n;let e=t.dd;t.jsepRegisterBuffer=(t,n,r,i)=>e.registerBuffer(t,n,r,i),t.jsepGetBuffer=t=>e.getBuffer(t),t.jsepCreateDownloader=(t,n,r)=>e.createDownloader(t,n,r),t.jsepOnCreateSession=t=>{e.onCreateSession(t)},t.jsepOnReleaseSession=t=>{e.onReleaseSession(t)},t.jsepOnRunStart=t=>e.onRunStart(t),t.Id=(t,n)=>{e.upload(t,n)}}else if(e===`webnn`){let e=n[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=n.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=t=>e.onRunStart(t),t.webnnOnRunEnd=e.onRunEnd.bind(e),t.webnnOnReleaseSession=t=>{e.onReleaseSession(t)},t.webnnCreateMLTensorDownloader=(t,n)=>e.createMLTensorDownloader(t,n),t.webnnRegisterMLTensor=(t,n,r,i)=>e.registerMLTensor(t,n,r,i),t.webnnCreateMLContext=t=>e.createMLContext(t),t.webnnRegisterMLConstant=(n,r,i,a,o,s)=>e.registerMLConstant(n,r,i,a,o,t.Xc,s),t.webnnRegisterGraphInput=e.registerGraphInput.bind(e),t.webnnIsGraphInput=e.isGraphInput.bind(e),t.webnnRegisterGraphOutput=e.registerGraphOutput.bind(e),t.webnnIsGraphOutput=e.isGraphOutput.bind(e),t.webnnCreateTemporaryTensor=e.createTemporaryTensor.bind(e),t.webnnIsGraphInputOutputTypeSupported=e.isGraphInputOutputTypeSupported.bind(e)}};let o=()=>{let e=e=>(...t)=>{let n=rn;return t=e(...t),rn==n?t:new Promise((e,t)=>{dn={resolve:e,reject:t}})};(()=>{for(let n of[`_OrtAppendExecutionProvider`,`_OrtCreateSession`,`_OrtRun`,`_OrtRunWithBinding`,`_OrtBindInput`])t[n]=e(t[n])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),o=void 0};t.asyncInit=()=>{o?.()};var s,c,l=(e,t)=>{throw t},u={}.url,d=``;if(n||r){try{d=new URL(`.`,u).href}catch{}r&&(c=e=>{var t=new XMLHttpRequest;return t.open(`GET`,e,!1),t.responseType=`arraybuffer`,t.send(null),new Uint8Array(t.response)}),s=async e=>{if(C(e))return new Promise((t,n)=>{var r=new XMLHttpRequest;r.open(`GET`,e,!0),r.responseType=`arraybuffer`,r.onload=()=>{r.status==200||r.status==0&&r.response?t(r.response):n(r.status)},r.onerror=n,r.send(null)});var t=await fetch(e,{credentials:`same-origin`});if(t.ok)return t.arrayBuffer();throw Error(t.status+` : `+t.url)}}var f,p,m,h,g,_,v=console.log.bind(console),y=console.error.bind(console),b=v,x=y,S=!1,C=e=>e.startsWith(`file://`);function w(){ke.buffer!=E.buffer&&oe()}if(i){let e=function(n){try{var r=n.data,i=r.Sc;if(i===`load`){let n=[];self.onmessage=e=>n.push(e),_=()=>{postMessage({Sc:`loaded`});for(let t of n)e(t);self.onmessage=e};for(let e of r.xd)t[e]&&!t[e].proxy||(t[e]=(...t)=>{postMessage({Sc:`callHandler`,wd:e,args:t})},e==`print`&&(b=t[e]),e==`printErr`&&(x=t[e]));ke=r.Od,oe(),p=r.Pd,ue(),ra()}else if(i===`run`){(function(e){var t=(w(),j)[e+52>>>2>>>0];e=(w(),j)[e+56>>>2>>>0],Ar(t,t-e),U(t)})(r.Rc),Sr(r.Rc,0,0,1,0,0),Ee(),Kt(r.Rc),T||=(vr(),!0);try{Ae(r.Md,r.bd)}catch(e){if(e!=`unwind`)throw e}}else r.target!==`setimmediate`&&(i===`checkMailbox`?T&&qt():i&&(x(`worker: received unknown command ${i}`),x(r)))}catch(e){throw Cr(),e}};var T=!1;self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=e}var E,D,O,k,A,j,ee,te,ne,re,ie,ae=!1;function oe(){var e=ke.buffer;t.HEAP8=E=new Int8Array(e),O=new Int16Array(e),t.HEAPU8=D=new Uint8Array(e),k=new Uint16Array(e),t.HEAP32=A=new Int32Array(e),t.HEAPU32=j=new Uint32Array(e),ee=new Float32Array(e),te=new Float64Array(e),ne=new BigInt64Array(e),re=new BigUint64Array(e)}function se(){ae=!0,i?_():hi.sb()}function ce(e){throw x(e=`Aborted(`+e+`)`),S=!0,e=new WebAssembly.RuntimeError(e+`. Build with -sASSERTIONS for more info.`),g?.(e),e}function le(){return{a:{ma:yi,gb:vi,g:Ne,J:Fe,f:Be,o:Ve,h:He,ha:Ue,b:We,T:Ge,Ha:qe,n:Je,$:Qe,Xa:P,Da:$e,Fa:et,Ya:tt,Va:nt,Oa:rt,Ua:it,ka:at,Ea:ot,Ba:st,Wa:ct,Ca:lt,bb:ut,ea:_t,wa:vt,ua:Et,da:Ot,O:kt,H:At,va:Nt,_:Vt,xa:Ht,Ra:Ut,za:Jt,Ia:Xt,sa:Zt,fa:Qt,Qa:Kt,_a:$t,R:mn,r:xn,c:xt,hb:Sn,y:Cn,M:wn,D:Tn,l:En,s:Dn,ib:On,I:kn,S:An,j:jn,u:Mn,q:Nn,k:I,La:Pn,Ma:Ln,Na:Rn,Ja:zn,Ka:Bn,ta:Un,db:Wn,ab:qn,v:Xn,aa:Zn,ga:Qn,$a:Gn,W:$n,Za:er,Aa:R,F:Hn,U:tr,la:or,ya:sr,fb:ar,eb:cr,Sa:dr,Ta:B,Ga:be,V:fr,ja:pr,Pa:mr,ia:V,kb:ta,na:Xi,lb:ea,oa:Yi,G:Bi,e:Ci,t:xi,w:bi,B:Ni,mb:Ki,K:Li,x:Ei,pa:qi,Y:Zi,ba:Gi,nb:Wi,ob:Ui,P:Pi,qa:Hi,pb:Vi,N:Ri,Z:Ji,d:Si,A:Ti,m:wi,jb:na,p:Oi,z:ki,C:Di,E:Ai,L:Fi,qb:zi,Q:Qi,ca:Ii,X:$i,rb:Mi,ra:ji,i:gr,a:ke,cb:ve}}}async function ue(){function e(e,n){var r=hi=e.exports;e={};for(let[t,n]of Object.entries(r))typeof n==`function`?(r=tn(n),e[t]=r):e[t]=n;return hi=e,hi=(function(){var e=hi,t=e=>t=>e(t)>>>0,n=e=>()=>e()>>>0;return(e=Object.assign({},e)).tb=t(e.tb),e.Xb=n(e.Xb),e.Zb=t(e.Zb),e.lc=t(e.lc),e.mc=n(e.mc),e.qc=t(e.qc),e})(),Ce.push(hi._b),_r=(e=hi).tb,vr=e.ub,t._OrtInit=e.vb,t._OrtGetLastError=e.wb,t._OrtCreateSessionOptions=e.xb,t._OrtAppendExecutionProvider=e.yb,t._OrtAddFreeDimensionOverride=e.zb,t._OrtAddSessionConfigEntry=e.Ab,t._OrtReleaseSessionOptions=e.Bb,t._OrtCreateSession=e.Cb,t._OrtReleaseSession=e.Db,t._OrtGetInputOutputCount=e.Eb,t._OrtGetInputOutputMetadata=e.Fb,t._OrtFree=e.Gb,t._OrtCreateTensor=e.Hb,t._OrtGetTensorData=e.Ib,t._OrtReleaseTensor=e.Jb,t._OrtCreateRunOptions=e.Kb,t._OrtAddRunConfigEntry=e.Lb,t._OrtReleaseRunOptions=e.Mb,t._OrtCreateBinding=e.Nb,t._OrtBindInput=e.Ob,t._OrtBindOutput=e.Pb,t._OrtClearBoundOutputs=e.Qb,t._OrtReleaseBinding=e.Rb,t._OrtRunWithBinding=e.Sb,t._OrtRun=e.Tb,t._OrtEndProfiling=e.Ub,t._JsepOutput=e.Vb,t._JsepGetNodeName=e.Wb,yr=e.Xb,br=t._free=e.Yb,xr=t._malloc=e.Zb,Sr=e.ac,Cr=e.bc,wr=e.cc,Tr=e.dc,Er=e.ec,Dr=e.fc,Or=e.gc,H=e.hc,kr=e.ic,Ar=e.jc,U=e.kc,jr=e.lc,W=e.mc,Mr=e.nc,Nr=e.oc,Pr=e.pc,Fr=e.qc,Ir=e.rc,Lr=e.sc,Rr=e.tc,zr=e.uc,Br=e.vc,Vr=e.wc,Hr=e.xc,G=e.yc,K=e.zc,Ur=e.Ac,Wr=e.Bc,Gr=e.Cc,Kr=e.Dc,q=e.Ec,J=e.Fc,qr=e.Gc,Jr=e.Hc,Yr=e.Ic,Y=e.Jc,Xr=e.Kc,X=e.Lc,Z=e.Mc,Zr=e.Nc,Qr=e.Pc,$r=e.Qc,ei=e.$c,Q=e.ad,ti=e.fd,ni=e.jd,ri=e.kd,ii=e.ld,ai=e.md,oi=e.nd,si=e.od,ci=e.pd,li=e.qd,ui=e.vd,di=e.Td,fi=e.Ud,pi=e.Vd,mi=e.Wd,p=n,hi}var n,r=le();return t.instantiateWasm?new Promise(n=>{t.instantiateWasm(r,(t,r)=>{n(e(t,r))})}):i?e(new WebAssembly.Instance(p,le()),p):(ie??=t.locateFile?t.locateFile?t.locateFile(`ort-wasm-simd-threaded.jsep.wasm`,d):d+`ort-wasm-simd-threaded.jsep.wasm`:new URL(`/assets/ort-wasm-simd-threaded.jsep-DC5y_g6C.wasm`,``+{}.url).href,n=await(async function(e){var t=ie;if(!f&&!C(t))try{var n=fetch(t,{credentials:`same-origin`});return await WebAssembly.instantiateStreaming(n,e)}catch(e){x(`wasm streaming compile failed: ${e}`),x(`falling back to ArrayBuffer instantiation`)}return(async function(e,t){try{var n=await(async function(e){if(!f)try{var t=await s(e);return new Uint8Array(t)}catch{}if(e==ie&&f)e=new Uint8Array(f);else{if(!c)throw`both async and sync fetching of the wasm failed`;e=c(e)}return e})(e);return await WebAssembly.instantiate(n,t)}catch(e){x(`failed to asynchronously prepare wasm: ${e}`),ce(e)}})(t,e)})(r),e(n.instance,n.module))}class de{name=`ExitStatus`;constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var fe=e=>{e.terminate(),e.onmessage=()=>{}},pe=[],me=0,he=null,ge=e=>{xe.length==0&&(Oe(),De(xe[0]));var t=xe.pop();if(!t)return 6;Se.push(t),we[e.Rc]=t,t.Rc=e.Rc;var n={Sc:`run`,Md:e.Ld,bd:e.bd,Rc:e.Rc};return t.postMessage(n,e.rd),0},_e=0,M=(e,t,...n)=>{var r,i=16*n.length,a=W(),o=jr(i),s=o>>>3;for(r of n)typeof r==`bigint`?((w(),ne)[s++>>>0]=1n,(w(),ne)[s++>>>0]=r):((w(),ne)[s++>>>0]=0n,(w(),te)[s++>>>0]=r);return e=wr(e,0,i,o,t),U(a),e};function ve(e){if(i)return M(0,1,e);if(m=e,!(0<_e)){for(var t of Se)fe(t);for(t of xe)fe(t);xe=[],Se=[],we={},S=!0}l(0,new de(e))}function ye(e){if(i)return M(1,0,e);be(e)}var be=e=>{if(m=e,i)throw ye(e),`unwind`;ve(e)},xe=[],Se=[],Ce=[],we={},Te=e=>{var t=e.Rc;delete we[t],xe.push(e),Se.splice(Se.indexOf(e),1),e.Rc=0,Tr(t)};function Ee(){Ce.forEach(e=>e())}var De=e=>new Promise(n=>{e.onmessage=r=>{var i=r.data;if(r=i.Sc,i.Zc&&i.Zc!=yr()){var a=we[i.Zc];a?a.postMessage(i,i.rd):x(`Internal error! Worker sent a message "${r}" to target pthread ${i.Zc}, but that thread no longer exists!`)}else r===`checkMailbox`?qt():r===`spawnThread`?ge(i):r===`cleanupThread`?Wt(()=>{Te(we[i.Nd])}):r===`loaded`?(e.loaded=!0,n(e)):i.target===`setimmediate`?e.postMessage(i):r===`uncaughtException`?e.onerror(i.error):r===`callHandler`?t[i.wd](...i.args):r&&x(`worker sent an unknown command ${r}`)},e.onerror=e=>{throw x(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var r,i=[];for(r of[])t.propertyIsEnumerable(r)&&i.push(r);e.postMessage({Sc:`load`,xd:i,Od:ke,Pd:p})});function Oe(){var e=new Worker((()=>{let e=URL;return{}.url>`file:`&&{}.url<`file;`?new e(`ort.bundle.min.mjs`,{}.url):new URL({}.url)})(),{type:`module`,workerData:`em-pthread`,name:`em-pthread`});xe.push(e)}var ke,Ae=(e,t)=>{_e=0,e=Lr(e,t),0<_e?m=e:Er(e)},je=[],Me=0;function Ne(e){var t=new Re(e>>>=0);return(w(),E)[t.Tc+12>>>0]==0&&(Ie(t,!0),Me--),Le(t,!1),je.push(t),Fr(e)}var Pe=0,Fe=()=>{H(0,0);var e=je.pop();Mr(e.cd),Pe=0};function Ie(e,t){t=+!!t,(w(),E)[e.Tc+12>>>0]=t}function Le(e,t){t=+!!t,(w(),E)[e.Tc+13>>>0]=t}class Re{constructor(e){this.cd=e,this.Tc=e-24}}var ze=e=>{var t=Pe;if(!t)return kr(0),0;var n=new Re(t);(w(),j)[n.Tc+16>>>2>>>0]=t;var r=(w(),j)[n.Tc+4>>>2>>>0];if(!r)return kr(0),t;for(var i of e){if(i===0||i===r)break;if(Pr(i,r,n.Tc+16))return kr(i),t}return kr(r),t};function Be(){return ze([])}function Ve(e){return ze([e>>>0])}function He(e,t,n,r){return ze([e>>>0,t>>>0,n>>>0,r>>>0])}var Ue=()=>{var e=je.pop();e||ce(`no exception to throw`);var t=e.cd;throw(w(),E)[e.Tc+13>>>0]==0&&(je.push(e),Le(e,!0),Ie(e,!1),Me++),Nr(t),Pe=t};function We(e,t,n){var r=new Re(e>>>=0);throw t>>>=0,n>>>=0,(w(),j)[r.Tc+16>>>2>>>0]=0,(w(),j)[r.Tc+4>>>2>>>0]=t,(w(),j)[r.Tc+8>>>2>>>0]=n,Nr(e),Me++,Pe=e}var Ge=()=>Me;function Ke(e,t,n,r){return i?M(2,1,e,t,n,r):qe(e,t,n,r)}function qe(e,t,n,r){if(e>>>=0,t>>>=0,n>>>=0,r>>>=0,!globalThis.SharedArrayBuffer)return 6;var a=[];return i&&a.length===0?Ke(e,t,n,r):(e={Ld:n,Rc:e,bd:r,rd:a},i?(e.Sc=`spawnThread`,postMessage(e,a),0):ge(e))}function Je(e){throw Pe||=e>>>0,Pe}var Ye=globalThis.TextDecoder&&new TextDecoder,Xe=(e,t,n,r)=>{if(n=t+n,r)return n;for(;e[t]&&!(t>=n);)++t;return t},Ze=(e,t=0,n,r)=>{if(16<(n=Xe(e,t>>>=0,n,r))-t&&e.buffer&&Ye)return Ye.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,n):e.slice(t,n));for(r=``;t<n;){var i=e[t++];if(128&i){var a=63&e[t++];if((224&i)==192)r+=String.fromCharCode((31&i)<<6|a);else{var o=63&e[t++];65536>(i=(240&i)==224?(15&i)<<12|a<<6|o:(7&i)<<18|a<<12|o<<6|63&e[t++])?r+=String.fromCharCode(i):(i-=65536,r+=String.fromCharCode(55296|i>>10,56320|1023&i))}}else r+=String.fromCharCode(i)}return r},N=(e,t,n)=>(e>>>=0)?Ze((w(),D),e,t,n):``;function Qe(e,t,n){return i?M(3,1,e,t,n):0}function P(e,t){if(i)return M(4,1,e,t)}function $e(e,t){if(i)return M(5,1,e,t)}function et(e,t,n){if(i)return M(6,1,e,t,n)}function tt(e,t,n){return i?M(7,1,e,t,n):0}function nt(e,t){if(i)return M(8,1,e,t)}function rt(e,t,n){if(i)return M(9,1,e,t,n)}function it(e,t,n,r){if(i)return M(10,1,e,t,n,r)}function at(e,t,n,r){if(i)return M(11,1,e,t,n,r)}function ot(e,t,n,r){if(i)return M(12,1,e,t,n,r)}function st(e){if(i)return M(13,1,e)}function ct(e,t){if(i)return M(14,1,e,t)}function lt(e,t,n){if(i)return M(15,1,e,t,n)}var ut=()=>ce(``),dt=e=>{e>>>=0;for(var t=``;;){var n=(w(),D)[e++>>>0];if(!n)return t;t+=String.fromCharCode(n)}},ft={},pt={},F={},mt=class extends Error{constructor(e){super(e),this.name=`BindingError`}};function ht(e,t,n={}){return(function(e,t,n={}){var r=t.name;if(!e)throw new mt(`type "${r}" must have a positive integer typeid pointer`);if(pt.hasOwnProperty(e)){if(n.yd)return;throw new mt(`Cannot register type '${r}' twice`)}pt[e]=t,delete F[e],ft.hasOwnProperty(e)&&(t=ft[e],delete ft[e],t.forEach(e=>e()))})(e,t,n)}var gt=(e,t,n)=>{switch(t){case 1:return n?e=>(w(),E)[e>>>0]:e=>(w(),D)[e>>>0];case 2:return n?e=>(w(),O)[e>>>1>>>0]:e=>(w(),k)[e>>>1>>>0];case 4:return n?e=>(w(),A)[e>>>2>>>0]:e=>(w(),j)[e>>>2>>>0];case 8:return n?e=>(w(),ne)[e>>>3>>>0]:e=>(w(),re)[e>>>3>>>0];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function _t(e,t,n,r,i){e>>>=0,n>>>=0,t=dt(t>>>0);let a=e=>e;if(r=r===0n){let e=8*n;a=t=>BigInt.asUintN(e,t),i=a(i)}ht(e,{name:t,Oc:a,Vc:(e,t)=>(typeof t==`number`&&(t=BigInt(t)),t),Uc:gt(t,n,!r),Wc:null})}function vt(e,t,n,r){ht(e>>>=0,{name:t=dt(t>>>0),Oc:function(e){return!!e},Vc:function(e,t){return t?n:r},Uc:function(e){return this.Oc((w(),D)[e>>>0])},Wc:null})}var yt=[],bt=[0,1,,1,null,1,!0,1,!1,1];function xt(e){9<(e>>>=0)&&--bt[e+1]===0&&(bt[e]=void 0,yt.push(e))}var St=e=>{if(!e)throw new mt(`Cannot use deleted val. handle = ${e}`);return bt[e]},Ct=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=yt.pop()||bt.length;return bt[t]=e,bt[t+1]=1,t}};function wt(e){return this.Oc((w(),j)[e>>>2>>>0])}var Tt={name:`emscripten::val`,Oc:e=>{var t=St(e);return xt(e),t},Vc:(e,t)=>Ct(t),Uc:wt,Wc:null};function Et(e){return ht(e>>>0,Tt)}var Dt=(e,t)=>{switch(t){case 4:return function(e){return this.Oc((w(),ee)[e>>>2>>>0])};case 8:return function(e){return this.Oc((w(),te)[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}};function Ot(e,t,n){n>>>=0,ht(e>>>=0,{name:t=dt(t>>>0),Oc:e=>e,Vc:(e,t)=>t,Uc:Dt(t,n),Wc:null})}function kt(e,t,n,r,i){e>>>=0,n>>>=0,t=dt(t>>>0);let a=e=>e;if(r===0){var o=32-8*n;a=e=>e<<o>>>o,i=a(i)}ht(e,{name:t,Oc:a,Vc:(e,t)=>t,Uc:gt(t,n,r!==0),Wc:null})}function At(e,t,n){function r(e){var t=(w(),j)[e>>>2>>>0];return e=(w(),j)[e+4>>>2>>>0],new i((w(),E).buffer,e,t)}var i=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];ht(e>>>=0,{name:n=dt(n>>>0),Oc:r,Uc:r},{yd:!0})}var jt=(e,t,n)=>{var r=(w(),D);if(t>>>=0,0<n){var i=t;n=t+n-1;for(var a=0;a<e.length;++a){var o=e.codePointAt(a);if(127>=o){if(t>=n)break;r[t++>>>0]=o}else if(2047>=o){if(t+1>=n)break;r[t++>>>0]=192|o>>6,r[t++>>>0]=128|63&o}else if(65535>=o){if(t+2>=n)break;r[t++>>>0]=224|o>>12,r[t++>>>0]=128|o>>6&63,r[t++>>>0]=128|63&o}else{if(t+3>=n)break;r[t++>>>0]=240|o>>18,r[t++>>>0]=128|o>>12&63,r[t++>>>0]=128|o>>6&63,r[t++>>>0]=128|63&o,a++}}r[t>>>0]=0,e=t-i}else e=0;return e},Mt=e=>{for(var t=0,n=0;n<e.length;++n){var r=e.charCodeAt(n);127>=r?t++:2047>=r?t+=2:55296<=r&&57343>=r?(t+=4,++n):t+=3}return t};function Nt(e,t){ht(e>>>=0,{name:t=dt(t>>>0),Oc(e){var t=(w(),j)[e>>>2>>>0];return t=N(e+4,t,!0),br(e),t},Vc(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var n=typeof t==`string`;if(!(n||ArrayBuffer.isView(t)&&t.BYTES_PER_ELEMENT==1))throw new mt(`Cannot pass non-string to std::string`);var r=n?Mt(t):t.length,i=xr(4+r+1),a=i+4;return(w(),j)[i>>>2>>>0]=r,n?jt(t,a,r+1):(w(),D).set(t,a>>>0),e!==null&&e.push(br,i),i},Uc:wt,Wc(e){br(e)}})}var Pt=globalThis.TextDecoder?new TextDecoder(`utf-16le`):void 0,Ft=(e,t,n)=>{if(e>>>=1,16<(t=Xe((w(),k),e,t/2,n))-e&&Pt)return Pt.decode((w(),k).slice(e,t));for(n=``;e<t;++e){var r=(w(),k)[e>>>0];n+=String.fromCharCode(r)}return n},It=(e,t,n)=>{if(n??=2147483647,2>n)return 0;var r=t;n=(n-=2)<2*e.length?n/2:e.length;for(var i=0;i<n;++i){var a=e.charCodeAt(i);(w(),O)[t>>>1>>>0]=a,t+=2}return(w(),O)[t>>>1>>>0]=0,t-r},Lt=e=>2*e.length,Rt=(e,t,n)=>{var r=``;e>>>=2;for(var i=0;!(i>=t/4);i++){var a=(w(),j)[e+i>>>0];if(!a&&!n)break;r+=String.fromCodePoint(a)}return r},zt=(e,t,n)=>{if(t>>>=0,n??=2147483647,4>n)return 0;var r=t;n=r+n-4;for(var i=0;i<e.length;++i){var a=e.codePointAt(i);if(65535<a&&i++,(w(),A)[t>>>2>>>0]=a,(t+=4)+4>n)break}return(w(),A)[t>>>2>>>0]=0,t-r},Bt=e=>{for(var t=0,n=0;n<e.length;++n)65535<e.codePointAt(n)&&n++,t+=4;return t};function Vt(e,t,n){if(e>>>=0,t>>>=0,n=dt(n>>>=0),t===2)var r=Ft,i=It,a=Lt;else r=Rt,i=zt,a=Bt;ht(e,{name:n,Oc:e=>{var n=(w(),j)[e>>>2>>>0];return n=r(e+4,n*t,!0),br(e),n},Vc:(e,r)=>{if(typeof r!=`string`)throw new mt(`Cannot pass non-string to C++ string type ${n}`);var o=a(r),s=xr(4+o+t);return(w(),j)[s>>>2>>>0]=o/t,i(r,s+4,o+t),e!==null&&e.push(br,s),s},Uc:wt,Wc(e){br(e)}})}function Ht(e,t){ht(e>>>=0,{zd:!0,name:t=dt(t>>>0),Oc:()=>{},Vc:()=>{}})}function Ut(e){Sr(e>>>0,!r,1,!n,131072,!1),Ee()}var Wt=e=>{if(!S)try{if(e(),!(0<_e))try{i?yr()&&Er(m):be(m)}catch(e){e instanceof de||e==`unwind`||l(0,e)}}catch(e){e instanceof de||e==`unwind`||l(0,e)}},Gt=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function Kt(e){e>>>=0,Gt||(Atomics.waitAsync((w(),A),e>>>2,e).value.then(qt),e+=128,Atomics.store((w(),A),e>>>2,1))}var qt=()=>Wt(()=>{var e=yr();e&&(Kt(e),Or())});function Jt(e,t){(e>>>=0)==t>>>0?setTimeout(qt):i?postMessage({Zc:e,Sc:`checkMailbox`}):(e=we[e])&&e.postMessage({Sc:`checkMailbox`})}var Yt=[];function Xt(e,t,n,r,i){for(t>>>=0,i>>>=0,Yt.length=0,n=i>>>3,r=i+r>>>3;n<r;){var a=(w(),ne)[n++>>>0]?(w(),ne)[n++>>>0]:(w(),te)[n++>>>0];Yt.push(a)}return(t?_i[t]:gi[e])(...Yt)}var Zt=()=>{_e=0};function Qt(e){e>>>=0,i?postMessage({Sc:`cleanupThread`,Nd:e}):Te(we[e])}function $t(e){}var en=e=>{try{e()}catch(e){ce(e)}};function tn(e){var t=(...t)=>{on.push(e);try{return e(...t)}finally{S||(on.pop(),rn&&nn===1&&on.length===0&&(nn=0,_e+=1,en(fi),typeof Fibers<`u`&&Fibers.Zd()))}};return ln.set(e,t),t}var nn=0,rn=null,an=0,on=[],sn=new Map,cn=new Map,ln=new Map,un=0,dn=null,fn=[],pn=e=>(function(e){if(!S){if(nn===0){var t=!1,n=!1;e((e=0)=>{if(!S&&(an=e,t=!0,n)){nn=2,en(()=>pi(rn)),typeof MainLoop<`u`&&MainLoop.ud&&MainLoop.resume(),e=!1;try{var r=(function(){var e=(w(),A)[rn+8>>>2>>>0];return e=cn.get(e),e=ln.get(e),--_e,e()})()}catch(t){r=t,e=!0}var i=!1;if(!rn){var a=dn;a&&(dn=null,(e?a.reject:a.resolve)(r),i=!0)}if(e&&!i)throw r}}),n=!0,t||(nn=1,rn=(function(){var e=xr(65548),t=e+12;if((w(),j)[e>>>2>>>0]=t,(w(),j)[e+4>>>2>>>0]=t+65536,t=on[0],!sn.has(t)){var n=un++;sn.set(t,n),cn.set(n,t)}return t=sn.get(t),(w(),A)[e+8>>>2>>>0]=t,e})(),typeof MainLoop<`u`&&MainLoop.ud&&MainLoop.pause(),en(()=>di(rn)))}else nn===2?(nn=0,en(mi),br(rn),rn=null,fn.forEach(Wt)):ce(`invalid state: ${nn}`);return an}})(t=>{e().then(t)});function mn(e){return e>>>=0,pn(async()=>Ct(await St(e)))}var hn=[],gn=e=>{var t=hn.length;return hn.push(e),t},_n=(e,t)=>{for(var n=Array(e),r=0;r<e;++r){var i=r,a=(w(),j)[t+4*r>>>2>>>0],o=pt[a];if(o===void 0)throw e=`parameter ${r}`,a=_r(a),t=dt(a),br(a),new mt(`${e} has unknown type ${t}`);n[i]=o}return n},vn=(e,t,n)=>{var r=[];return e=e(r,n),r.length&&((w(),j)[t>>>2>>>0]=Ct(r)),e},yn={},bn=e=>{var t=yn[e];return t===void 0?dt(e):t};function xn(e,t,n){var[r,...i]=_n(e,t>>>0);t=r.Vc.bind(r);var a=i.map(e=>e.Uc.bind(e));e--;var o={toValue:St};switch(e=a.map((e,t)=>{var n=`argFromPtr${t}`;return o[n]=e,`${n}(args${t?`+`+8*t:``})`}),n){case 0:var s=`toValue(handle)`;break;case 2:s=`new (toValue(handle))`;break;case 3:s=``;break;case 1:o.getStringOrSymbol=bn,s=`toValue(handle)[getStringOrSymbol(methodName)]`}return s+=`(${e})`,r.zd||(o.toReturnWire=t,o.emval_returnValue=vn,s=`return emval_returnValue(toReturnWire, destructorsRef, ${s})`),s=`return function (handle, methodName, destructorsRef, args) {
  ${s}
  }`,n=Function(Object.keys(o),s)(...Object.values(o)),s=`methodCaller<(${i.map(e=>e.name)}) => ${r.name}>`,gn(Object.defineProperty(n,"name",{value:s}))}function Sn(e,t){return t>>>=0,(e=St(e>>>0))==St(t)}function Cn(e){return(e>>>=0)?(e=bn(e),Ct(globalThis[e])):Ct(globalThis)}function wn(e){return e=bn(e>>>0),Ct(t[e])}function Tn(e,t){return t>>>=0,e=St(e>>>0),t=St(t),Ct(e[t])}function En(e){9<(e>>>=0)&&(bt[e+1]+=1)}function Dn(e,t,n,r,i){return hn[e>>>0](t>>>0,n>>>0,r>>>0,i>>>0)}function On(e,t,n,r,i){return Dn(e>>>0,t>>>0,n>>>0,r>>>0,i>>>0)}function kn(){return Ct([])}function An(e){e=St(e>>>0);for(var t=Array(e.length),n=0;n<e.length;n++)t[n]=e[n];return Ct(t)}function jn(e){return Ct(bn(e>>>0))}function Mn(){return Ct({})}function Nn(e){for(var t=St(e>>>=0);t.length;){var n=t.pop();t.pop()(n)}xt(e)}function I(e,t,n){t>>>=0,n>>>=0,e=St(e>>>0),t=St(t),n=St(n),e[t]=n}function Pn(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(w(),A)[t>>>2>>>0]=e.getUTCSeconds(),(w(),A)[t+4>>>2>>>0]=e.getUTCMinutes(),(w(),A)[t+8>>>2>>>0]=e.getUTCHours(),(w(),A)[t+12>>>2>>>0]=e.getUTCDate(),(w(),A)[t+16>>>2>>>0]=e.getUTCMonth(),(w(),A)[t+20>>>2>>>0]=e.getUTCFullYear()-1900,(w(),A)[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(w(),A)[t+28>>>2>>>0]=e}var Fn=e=>e%4==0&&(e%100!=0||e%400==0),In=[0,31,60,91,121,152,182,213,244,274,305,335],L=[0,31,59,90,120,151,181,212,243,273,304,334];function Ln(e,t){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),t>>>=0,e=new Date(1e3*e),(w(),A)[t>>>2>>>0]=e.getSeconds(),(w(),A)[t+4>>>2>>>0]=e.getMinutes(),(w(),A)[t+8>>>2>>>0]=e.getHours(),(w(),A)[t+12>>>2>>>0]=e.getDate(),(w(),A)[t+16>>>2>>>0]=e.getMonth(),(w(),A)[t+20>>>2>>>0]=e.getFullYear()-1900,(w(),A)[t+24>>>2>>>0]=e.getDay();var n=(Fn(e.getFullYear())?In:L)[e.getMonth()]+e.getDate()-1|0;(w(),A)[t+28>>>2>>>0]=n,(w(),A)[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var r=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(n!=r&&e.getTimezoneOffset()==Math.min(r,n)),(w(),A)[t+32>>>2>>>0]=e}function Rn(e){e>>>=0;var t=new Date((w(),A)[e+20>>>2>>>0]+1900,(w(),A)[e+16>>>2>>>0],(w(),A)[e+12>>>2>>>0],(w(),A)[e+8>>>2>>>0],(w(),A)[e+4>>>2>>>0],(w(),A)[e>>>2>>>0],0),n=(w(),A)[e+32>>>2>>>0],r=t.getTimezoneOffset(),i=new Date(t.getFullYear(),6,1).getTimezoneOffset(),a=new Date(t.getFullYear(),0,1).getTimezoneOffset(),o=Math.min(a,i);return 0>n?(w(),A)[e+32>>>2>>>0]=+(i!=a&&o==r):0<n!=(o==r)&&(i=Math.max(a,i),t.setTime(t.getTime()+6e4*((0<n?o:i)-r))),(w(),A)[e+24>>>2>>>0]=t.getDay(),n=(Fn(t.getFullYear())?In:L)[t.getMonth()]+t.getDate()-1|0,(w(),A)[e+28>>>2>>>0]=n,(w(),A)[e>>>2>>>0]=t.getSeconds(),(w(),A)[e+4>>>2>>>0]=t.getMinutes(),(w(),A)[e+8>>>2>>>0]=t.getHours(),(w(),A)[e+12>>>2>>>0]=t.getDate(),(w(),A)[e+16>>>2>>>0]=t.getMonth(),(w(),A)[e+20>>>2>>>0]=t.getYear(),e=t.getTime(),BigInt(isNaN(e)?-1:e/1e3)}function zn(e,t,n,r,a,o,s){return i?M(16,1,e,t,n,r,a,o,s):-52}function Bn(e,t,n,r,a,o){if(i)return M(17,1,e,t,n,r,a,o)}var Vn={},Hn=()=>performance.timeOrigin+performance.now();function Un(e,t){return i?M(18,1,e,t):(Vn[e]&&(clearTimeout(Vn[e].id),delete Vn[e]),t&&(Vn[e]={id:setTimeout(()=>{delete Vn[e],Wt(()=>Dr(e,performance.timeOrigin+performance.now()))},t),Yd:t}),0)}function Wn(e,t,n,r){e>>>=0,t>>>=0,n>>>=0,r>>>=0;var i=new Date().getFullYear(),a=new Date(i,0,1).getTimezoneOffset();i=new Date(i,6,1).getTimezoneOffset();var o=Math.max(a,i);(w(),j)[e>>>2>>>0]=60*o,(w(),A)[t>>>2>>>0]=+(a!=i),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?`-`:`+`}${String(Math.floor(t/60)).padStart(2,`0`)}${String(t%60).padStart(2,`0`)}`})(a),t=t(i),i<a?(jt(e,n,17),jt(t,r,17)):(jt(e,r,17),jt(t,n,17))}var Gn=()=>Date.now(),Kn=1;function qn(e,t,n){if(n>>>=0,!(0<=e&&3>=e))return 28;if(e===0)e=Date.now();else{if(!Kn)return 52;e=performance.timeOrigin+performance.now()}return e=Math.round(1e6*e),(w(),ne)[n>>>3>>>0]=BigInt(e),0}var Jn=[],Yn=(e,t)=>{Jn.length=0;for(var n;n=(w(),D)[e++>>>0];){var r=n!=105;t+=(r&=n!=112)&&t%8?4:0,Jn.push(n==112?(w(),j)[t>>>2>>>0]:n==106?(w(),ne)[t>>>3>>>0]:n==105?(w(),A)[t>>>2>>>0]:(w(),te)[t>>>3>>>0]),t+=r?8:4}return Jn};function Xn(e,t,n){return e>>>=0,t=Yn(t>>>0,n>>>0),_i[e](...t)}function Zn(e,t,n){return e>>>=0,t=Yn(t>>>0,n>>>0),_i[e](...t)}var Qn=()=>{};function $n(e,t){return x(N(e>>>0,t>>>0))}var er=()=>{throw _e+=1,`unwind`};function R(){return 4294901760}var tr=()=>navigator.hardwareConcurrency,nr={},rr=e=>{var t;return(t=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e))?+t[1]:(t=/:(\d+):\d+(?:\)|$)/.exec(e))?2147483648|t[1]:0},ir=e=>{for(var t of e)(e=rr(t))&&(nr[e]=t)};function ar(){var e=Error().stack.toString().split(`
`);return e[0]==`Error`&&e.shift(),ir(e),nr.gd=rr(e[3]),nr.Jd=e,nr.gd}function or(e){if(!(e=nr[e>>>0]))return 0;var t;if(t=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e))e=t[1];else if(t=/^\s+at (.*) \(.*\)$/.exec(e))e=t[1];else{if(!(t=/^(.+?)@/.exec(e)))return 0;e=t[1]}br(or.hd??0),t=Mt(e)+1;var n=xr(t);return n&&jt(e,n,t),or.hd=n,or.hd}function sr(e){e>>>=0;var t=(w(),D).length;if(e<=t||4294901760<e)return!1;for(var n=1;4>=n;n*=2){var r=t*(1+.2/n);r=Math.min(r,e+100663296);e:{r=(Math.min(4294901760,65536*Math.ceil(Math.max(e,r)/65536))-ke.buffer.byteLength+65535)/65536|0;try{ke.grow(r),oe();var i=1;break e}catch{}i=void 0}if(i)return!0}return!1}function cr(e,t,n){if(e>>>=0,t>>>=0,nr.gd==e)var r=nr.Jd;else(r=Error().stack.toString().split(`
`))[0]==`Error`&&r.shift(),ir(r);for(var i=3;r[i]&&rr(r[i])!=e;)++i;for(e=0;e<n&&r[e+i];++e)(w(),A)[t+4*e>>>2>>>0]=rr(r[e+i]);return e}var z,lr={},ur=()=>{if(!z){var e,t={USER:`web_user`,LOGNAME:`web_user`,PATH:`/`,PWD:`/`,HOME:`/home/web_user`,LANG:(globalThis.navigator?.language??`C`).replace(`-`,`_`)+`.UTF-8`,_:`./this.program`};for(e in lr)lr[e]===void 0?delete t[e]:t[e]=lr[e];var n=[];for(e in t)n.push(`${e}=${t[e]}`);z=n}return z};function dr(e,t){if(i)return M(19,1,e,t);e>>>=0,t>>>=0;var n,r=0,a=0;for(n of ur()){var o=t+r;(w(),j)[e+a>>>2>>>0]=o,r+=jt(n,o,1/0)+1,a+=4}return 0}function B(e,t){if(i)return M(20,1,e,t);e>>>=0,t>>>=0;var n=ur();for(var r of((w(),j)[e>>>2>>>0]=n.length,e=0,n))e+=Mt(r)+1;return(w(),j)[t>>>2>>>0]=e,0}function fr(e){return i?M(21,1,e):52}function pr(e,t,n,r){return i?M(22,1,e,t,n,r):52}function mr(e,t,n,r){return i?M(23,1,e,t,n,r):70}var hr=[null,[],[]];function V(e,t,n,r){if(i)return M(24,1,e,t,n,r);t>>>=0,n>>>=0,r>>>=0;for(var a=0,o=0;o<n;o++){var s=(w(),j)[t>>>2>>>0],c=(w(),j)[t+4>>>2>>>0];t+=8;for(var l=0;l<c;l++){var u=e,d=(w(),D)[s+l>>>0],f=hr[u];d===0||d===10?((u===1?b:x)(Ze(f)),f.length=0):f.push(d)}a+=c}return(w(),j)[r>>>2>>>0]=a,0}function gr(e){return e>>>0}i||(function(){for(var e=t.numThreads-1;e--;)Oe();pe.push(async()=>{var e=(async function(){if(!i)return Promise.all(xe.map(De))})();me++,await e,--me==0&&he&&(e=he,he=null,e())})})(),i||(ke=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),oe()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>W(),t.stackRestore=e=>U(e),t.stackAlloc=e=>jr(e),t.setValue=function(e,t,n=`i8`){switch(n.endsWith(`*`)&&(n=`*`),n){case`i1`:case`i8`:(w(),E)[e>>>0]=t;break;case`i16`:(w(),O)[e>>>1>>>0]=t;break;case`i32`:(w(),A)[e>>>2>>>0]=t;break;case`i64`:(w(),ne)[e>>>3>>>0]=BigInt(t);break;case`float`:(w(),ee)[e>>>2>>>0]=t;break;case`double`:(w(),te)[e>>>3>>>0]=t;break;case`*`:(w(),j)[e>>>2>>>0]=t;break;default:ce(`invalid type for setValue: ${n}`)}},t.getValue=function(e,t=`i8`){switch(t.endsWith(`*`)&&(t=`*`),t){case`i1`:case`i8`:return(w(),E)[e>>>0];case`i16`:return(w(),O)[e>>>1>>>0];case`i32`:return(w(),A)[e>>>2>>>0];case`i64`:return(w(),ne)[e>>>3>>>0];case`float`:return(w(),ee)[e>>>2>>>0];case`double`:return(w(),te)[e>>>3>>>0];case`*`:return(w(),j)[e>>>2>>>0];default:ce(`invalid type for getValue: ${t}`)}},t.UTF8ToString=N,t.stringToUTF8=jt,t.lengthBytesUTF8=Mt;var _r,vr,yr,br,xr,Sr,Cr,wr,Tr,Er,Dr,Or,H,kr,Ar,U,jr,W,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,G,K,Ur,Wr,Gr,Kr,q,J,qr,Jr,Yr,Y,Xr,X,Z,Zr,Qr,$r,ei,Q,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi,mi,hi,gi=[ve,ye,Ke,Qe,P,$e,et,tt,nt,rt,it,at,ot,st,ct,lt,zn,Bn,Un,dr,B,fr,pr,mr,V],_i={1003524:(e,n,r,i,a)=>{if(t===void 0||!t.Xc)return 1;if((e=N(Number(e>>>0))).startsWith(`./`)&&(e=e.substring(2)),!(e=t.Xc.get(e)))return 2;if(n=Number(n>>>0),r=Number(r>>>0),i=Number(i>>>0),n+r>e.byteLength)return 3;try{let o=e.subarray(n,n+r);switch(a){case 0:(w(),D).set(o,i>>>0);break;case 1:t.Qd?t.Qd(i,o):t.Id(i,o);break;default:return 4}return 0}catch{return 4}},1004348:(e,n,r)=>{t.td(e,(w(),D).subarray(n>>>0,n+r>>>0))},1004412:()=>t.Sd(),1004454:e=>{t.sd(e)},1004491:()=>{t.Bd()},1004522:()=>{t.Cd()},1004551:()=>{t.Gd()},1004576:e=>t.Ad(e),1004609:e=>t.Ed(e),1004641:(e,n,r)=>{t.ed(Number(e),Number(n),Number(r),!0)},1004704:(e,n,r)=>{t.ed(Number(e),Number(n),Number(r))},1004761:()=>typeof wasmOffsetConverter<`u`,1004818:e=>{t.$b(`Abs`,e,void 0)},1004869:e=>{t.$b(`Neg`,e,void 0)},1004920:e=>{t.$b(`Floor`,e,void 0)},1004973:e=>{t.$b(`Ceil`,e,void 0)},1005025:e=>{t.$b(`Reciprocal`,e,void 0)},1005083:e=>{t.$b(`Sqrt`,e,void 0)},1005135:e=>{t.$b(`Exp`,e,void 0)},1005186:e=>{t.$b(`Erf`,e,void 0)},1005237:e=>{t.$b(`Sigmoid`,e,void 0)},1005292:(e,n,r)=>{t.$b(`HardSigmoid`,e,{alpha:n,beta:r})},1005371:e=>{t.$b(`Log`,e,void 0)},1005422:e=>{t.$b(`Sin`,e,void 0)},1005473:e=>{t.$b(`Cos`,e,void 0)},1005524:e=>{t.$b(`Tan`,e,void 0)},1005575:e=>{t.$b(`Asin`,e,void 0)},1005627:e=>{t.$b(`Acos`,e,void 0)},1005679:e=>{t.$b(`Atan`,e,void 0)},1005731:e=>{t.$b(`Sinh`,e,void 0)},1005783:e=>{t.$b(`Cosh`,e,void 0)},1005835:e=>{t.$b(`Asinh`,e,void 0)},1005888:e=>{t.$b(`Acosh`,e,void 0)},1005941:e=>{t.$b(`Atanh`,e,void 0)},1005994:e=>{t.$b(`Tanh`,e,void 0)},1006046:e=>{t.$b(`Not`,e,void 0)},1006097:(e,n,r)=>{t.$b(`Clip`,e,{min:n,max:r})},1006166:e=>{t.$b(`Clip`,e,void 0)},1006218:(e,n)=>{t.$b(`Elu`,e,{alpha:n})},1006276:e=>{t.$b(`Gelu`,e,void 0)},1006328:e=>{t.$b(`Relu`,e,void 0)},1006380:(e,n)=>{t.$b(`LeakyRelu`,e,{alpha:n})},1006444:(e,n)=>{t.$b(`ThresholdedRelu`,e,{alpha:n})},1006514:(e,n)=>{t.$b(`Cast`,e,{to:n})},1006572:e=>{t.$b(`Add`,e,void 0)},1006623:e=>{t.$b(`Sub`,e,void 0)},1006674:e=>{t.$b(`Mul`,e,void 0)},1006725:e=>{t.$b(`Div`,e,void 0)},1006776:e=>{t.$b(`Pow`,e,void 0)},1006827:e=>{t.$b(`Equal`,e,void 0)},1006880:e=>{t.$b(`Greater`,e,void 0)},1006935:e=>{t.$b(`GreaterOrEqual`,e,void 0)},1006997:e=>{t.$b(`Less`,e,void 0)},1007049:e=>{t.$b(`LessOrEqual`,e,void 0)},1007108:(e,n,r,i,a)=>{t.$b(`ReduceMean`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1007283:(e,n,r,i,a)=>{t.$b(`ReduceMax`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1007457:(e,n,r,i,a)=>{t.$b(`ReduceMin`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1007631:(e,n,r,i,a)=>{t.$b(`ReduceProd`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1007806:(e,n,r,i,a)=>{t.$b(`ReduceSum`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1007980:(e,n,r,i,a)=>{t.$b(`ReduceL1`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1008153:(e,n,r,i,a)=>{t.$b(`ReduceL2`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1008326:(e,n,r,i,a)=>{t.$b(`ReduceLogSum`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1008503:(e,n,r,i,a)=>{t.$b(`ReduceSumSquare`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1008683:(e,n,r,i,a)=>{t.$b(`ReduceLogSumExp`,e,{keepDims:!!n,noopWithEmptyAxes:!!r,axes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1008863:e=>{t.$b(`Where`,e,void 0)},1008916:(e,n,r)=>{t.$b(`Transpose`,e,{perm:n?Array.from((w(),A).subarray(Number(n)>>>0,Number(r)>>>0)):[]})},1009040:(e,n,r,i)=>{t.$b(`DepthToSpace`,e,{blocksize:n,mode:N(r),format:i?`NHWC`:`NCHW`})},1009173:(e,n,r,i)=>{t.$b(`DepthToSpace`,e,{blocksize:n,mode:N(r),format:i?`NHWC`:`NCHW`})},1009306:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h)=>{t.$b(`ConvTranspose`,e,{format:l?`NHWC`:`NCHW`,autoPad:n,dilations:[r],group:i,kernelShape:[a],pads:[o,s],strides:[c],wIsConst:()=>!!(w(),E)[u>>>0],outputPadding:d?Array.from((w(),A).subarray(Number(d)>>>0,Number(f)>>>0)):[],outputShape:p?Array.from((w(),A).subarray(Number(p)>>>0,Number(m)>>>0)):[],activation:N(h)})},1009739:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`ConvTranspose`,e,{format:c?`NHWC`:`NCHW`,autoPad:n,dilations:Array.from((w(),A).subarray(Number(r)>>>0,(Number(r)>>>0)+2>>>0)),group:i,kernelShape:Array.from((w(),A).subarray(Number(a)>>>0,(Number(a)>>>0)+2>>>0)),pads:Array.from((w(),A).subarray(Number(o)>>>0,(Number(o)>>>0)+4>>>0)),strides:Array.from((w(),A).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!(w(),E)[l>>>0],outputPadding:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],outputShape:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[],activation:N(m)})},1010400:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h)=>{t.$b(`ConvTranspose`,e,{format:l?`NHWC`:`NCHW`,autoPad:n,dilations:[r],group:i,kernelShape:[a],pads:[o,s],strides:[c],wIsConst:()=>!!(w(),E)[u>>>0],outputPadding:d?Array.from((w(),A).subarray(Number(d)>>>0,Number(f)>>>0)):[],outputShape:p?Array.from((w(),A).subarray(Number(p)>>>0,Number(m)>>>0)):[],activation:N(h)})},1010833:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`ConvTranspose`,e,{format:c?`NHWC`:`NCHW`,autoPad:n,dilations:Array.from((w(),A).subarray(Number(r)>>>0,(Number(r)>>>0)+2>>>0)),group:i,kernelShape:Array.from((w(),A).subarray(Number(a)>>>0,(Number(a)>>>0)+2>>>0)),pads:Array.from((w(),A).subarray(Number(o)>>>0,(Number(o)>>>0)+4>>>0)),strides:Array.from((w(),A).subarray(Number(s)>>>0,(Number(s)>>>0)+2>>>0)),wIsConst:()=>!!(w(),E)[l>>>0],outputPadding:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],outputShape:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[],activation:N(m)})},1011494:(e,n)=>{t.$b(`GlobalAveragePool`,e,{format:n?`NHWC`:`NCHW`})},1011585:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`AveragePool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1012064:(e,n)=>{t.$b(`GlobalAveragePool`,e,{format:n?`NHWC`:`NCHW`})},1012155:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`AveragePool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1012634:(e,n)=>{t.$b(`GlobalMaxPool`,e,{format:n?`NHWC`:`NCHW`})},1012721:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`MaxPool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1013196:(e,n)=>{t.$b(`GlobalMaxPool`,e,{format:n?`NHWC`:`NCHW`})},1013283:(e,n,r,i,a,o,s,c,l,u,d,f,p,m)=>{t.$b(`MaxPool`,e,{format:m?`NHWC`:`NCHW`,auto_pad:n,ceil_mode:r,count_include_pad:i,storage_order:a,dilations:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],kernel_shape:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],pads:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],strides:f?Array.from((w(),A).subarray(Number(f)>>>0,Number(p)>>>0)):[]})},1013758:(e,n,r,i,a)=>{t.$b(`Gemm`,e,{alpha:n,beta:r,transA:i,transB:a})},1013862:e=>{t.$b(`MatMul`,e,void 0)},1013916:(e,n,r,i)=>{t.$b(`ArgMax`,e,{keepDims:!!n,selectLastIndex:!!r,axis:i})},1014024:(e,n,r,i)=>{t.$b(`ArgMin`,e,{keepDims:!!n,selectLastIndex:!!r,axis:i})},1014132:(e,n)=>{t.$b(`Softmax`,e,{axis:n})},1014195:(e,n)=>{t.$b(`Concat`,e,{axis:n})},1014255:(e,n,r,i,a)=>{t.$b(`Split`,e,{axis:n,numOutputs:r,splitSizes:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1014411:e=>{t.$b(`Expand`,e,void 0)},1014465:(e,n)=>{t.$b(`Gather`,e,{axis:Number(n)})},1014536:(e,n)=>{t.$b(`GatherElements`,e,{axis:Number(n)})},1014615:(e,n)=>{t.$b(`GatherND`,e,{batch_dims:Number(n)})},1014694:(e,n,r,i,a,o,s,c,l,u,d)=>{t.$b(`Resize`,e,{antialias:n,axes:r?Array.from((w(),A).subarray(Number(r)>>>0,Number(i)>>>0)):[],coordinateTransformMode:N(a),cubicCoeffA:o,excludeOutside:s,extrapolationValue:c,keepAspectRatioPolicy:N(l),mode:N(u),nearestMode:N(d)})},1015056:(e,n,r,i,a,o,s)=>{t.$b(`Slice`,e,{starts:n?Array.from((w(),A).subarray(Number(n)>>>0,Number(r)>>>0)):[],ends:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[],axes:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[]})},1015320:e=>{t.$b(`Tile`,e,void 0)},1015372:(e,n,r)=>{t.$b(`InstanceNormalization`,e,{epsilon:n,format:r?`NHWC`:`NCHW`})},1015486:(e,n,r)=>{t.$b(`InstanceNormalization`,e,{epsilon:n,format:r?`NHWC`:`NCHW`})},1015600:e=>{t.$b(`Range`,e,void 0)},1015653:(e,n)=>{t.$b(`Einsum`,e,{equation:N(n)})},1015734:(e,n,r,i,a)=>{t.$b(`Pad`,e,{mode:n,value:r,pads:i?Array.from((w(),A).subarray(Number(i)>>>0,Number(a)>>>0)):[]})},1015877:(e,n,r,i,a,o)=>{t.$b(`BatchNormalization`,e,{epsilon:n,momentum:r,spatial:!!a,trainingMode:!!i,format:o?`NHWC`:`NCHW`})},1016046:(e,n,r,i,a,o)=>{t.$b(`BatchNormalization`,e,{epsilon:n,momentum:r,spatial:!!a,trainingMode:!!i,format:o?`NHWC`:`NCHW`})},1016215:(e,n,r)=>{t.$b(`CumSum`,e,{exclusive:Number(n),reverse:Number(r)})},1016312:(e,n,r)=>{t.$b(`DequantizeLinear`,e,{axis:n,blockSize:r})},1016402:(e,n,r,i,a)=>{t.$b(`GridSample`,e,{align_corners:n,mode:N(r),padding_mode:N(i),format:a?`NHWC`:`NCHW`})},1016572:(e,n,r,i,a)=>{t.$b(`GridSample`,e,{align_corners:n,mode:N(r),padding_mode:N(i),format:a?`NHWC`:`NCHW`})},1016742:(e,n)=>{t.$b(`ScatterND`,e,{reduction:N(n)})},1016827:(e,n,r,i,a,o,s,c,l)=>{t.$b(`Attention`,e,{numHeads:n,isUnidirectional:r,maskFilterValue:i,scale:a,doRotary:o,qkvHiddenSizes:s?Array.from((w(),A).subarray(Number(c)>>>0,Number(c)+s>>>0)):[],pastPresentShareBuffer:!!l})},1017099:e=>{t.$b(`BiasAdd`,e,void 0)},1017154:e=>{t.$b(`BiasSplitGelu`,e,void 0)},1017215:e=>{t.$b(`FastGelu`,e,void 0)},1017271:(e,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)=>{t.$b(`Conv`,e,{format:f?`NHWC`:`NCHW`,auto_pad:n,dilations:r?Array.from((w(),A).subarray(Number(r)>>>0,Number(i)>>>0)):[],group:a,kernel_shape:o?Array.from((w(),A).subarray(Number(o)>>>0,Number(s)>>>0)):[],pads:c?Array.from((w(),A).subarray(Number(c)>>>0,Number(l)>>>0)):[],strides:u?Array.from((w(),A).subarray(Number(u)>>>0,Number(d)>>>0)):[],w_is_const:()=>!!(w(),E)[Number(p)>>>0],activation:N(m),activation_params:h?Array.from((w(),ee).subarray(Number(h)>>>0,Number(g)>>>0)):[]})},1017855:e=>{t.$b(`Gelu`,e,void 0)},1017907:(e,n,r,i,a,o,s,c,l)=>{t.$b(`GroupQueryAttention`,e,{numHeads:n,kvNumHeads:r,scale:i,softcap:a,doRotary:o,rotaryInterleaved:s,smoothSoftmax:c,localWindowSize:l})},1018124:(e,n,r,i)=>{t.$b(`LayerNormalization`,e,{axis:n,epsilon:r,simplified:!!i})},1018235:(e,n,r,i)=>{t.$b(`LayerNormalization`,e,{axis:n,epsilon:r,simplified:!!i})},1018346:(e,n,r,i,a,o)=>{t.$b(`MatMulNBits`,e,{k:n,n:r,accuracyLevel:i,bits:a,blockSize:o})},1018473:(e,n,r,i,a,o)=>{t.$b(`MultiHeadAttention`,e,{numHeads:n,isUnidirectional:r,maskFilterValue:i,scale:a,doRotary:o})},1018632:(e,n)=>{t.$b(`QuickGelu`,e,{alpha:n})},1018696:(e,n,r,i,a)=>{t.$b(`RotaryEmbedding`,e,{interleaved:!!n,numHeads:r,rotaryEmbeddingDim:i,scale:a})},1018835:(e,n,r)=>{t.$b(`SkipLayerNormalization`,e,{epsilon:n,simplified:!!r})},1018937:(e,n,r)=>{t.$b(`SkipLayerNormalization`,e,{epsilon:n,simplified:!!r})},1019039:(e,n,r,i)=>{t.$b(`GatherBlockQuantized`,e,{gatherAxis:n,quantizeAxis:r,blockSize:i})},1019160:e=>{t.Fd(e)},1019194:(e,n)=>t.Hd(Number(e),Number(n),t.Yc.Kd,t.Yc.errors)};function vi(e,n,r){return pn(async()=>{await t.Dd(Number(e),Number(n),Number(r))})}function yi(){return typeof wasmOffsetConverter<`u`}function bi(e,t,n,r){var i=W();try{return Ur(e,t,n,r)}catch(e){if(U(i),e!==e+0)throw e;H(1,0)}}function xi(e,t,n){var r=W();try{return Vr(e,t,n)}catch(e){if(U(r),e!==e+0)throw e;H(1,0)}}function Si(e){var t=W();try{Rr(e)}catch(e){if(U(t),e!==e+0)throw e;H(1,0)}}function Ci(e,t){var n=W();try{return Lr(e,t)}catch(e){if(U(n),e!==e+0)throw e;H(1,0)}}function wi(e,t,n){var r=W();try{Ir(e,t,n)}catch(e){if(U(r),e!==e+0)throw e;H(1,0)}}function Ti(e,t){var n=W();try{Wr(e,t)}catch(e){if(U(n),e!==e+0)throw e;H(1,0)}}function Ei(e,t,n,r,i,a,o){var s=W();try{return G(e,t,n,r,i,a,o)}catch(e){if(U(s),e!==e+0)throw e;H(1,0)}}function Di(e,t,n,r,i,a){var o=W();try{zr(e,t,n,r,i,a)}catch(e){if(U(o),e!==e+0)throw e;H(1,0)}}function Oi(e,t,n,r){var i=W();try{K(e,t,n,r)}catch(e){if(U(i),e!==e+0)throw e;H(1,0)}}function ki(e,t,n,r,i){var a=W();try{Br(e,t,n,r,i)}catch(e){if(U(a),e!==e+0)throw e;H(1,0)}}function Ai(e,t,n,r,i,a,o){var s=W();try{Kr(e,t,n,r,i,a,o)}catch(e){if(U(s),e!==e+0)throw e;H(1,0)}}function ji(e,t,n,r,i,a,o){var s=W();try{q(e,t,n,r,i,a,o)}catch(e){if(U(s),e!==e+0)throw e;H(1,0)}}function Mi(e,t,n,r,i,a,o,s){var c=W();try{Yr(e,t,n,r,i,a,o,s)}catch(e){if(U(c),e!==e+0)throw e;H(1,0)}}function Ni(e,t,n,r,i){var a=W();try{return Gr(e,t,n,r,i)}catch(e){if(U(a),e!==e+0)throw e;H(1,0)}}function Pi(e,t,n){var r=W();try{return Y(e,t,n)}catch(e){if(U(r),e!==e+0)throw e;H(1,0)}}function Fi(e,t,n,r,i,a,o,s){var c=W();try{Xr(e,t,n,r,i,a,o,s)}catch(e){if(U(c),e!==e+0)throw e;H(1,0)}}function Ii(e,t,n,r,i,a,o,s,c,l,u,d){var f=W();try{J(e,t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(U(f),e!==e+0)throw e;H(1,0)}}function Li(e,t,n,r,i,a){var o=W();try{return qr(e,t,n,r,i,a)}catch(e){if(U(o),e!==e+0)throw e;H(1,0)}}function Ri(e,t,n){var r=W();try{return X(e,t,n)}catch(e){if(U(r),e!==e+0)throw e;return H(1,0),0n}}function zi(e,t,n,r,i,a,o,s,c){var l=W();try{Hr(e,t,n,r,i,a,o,s,c)}catch(e){if(U(l),e!==e+0)throw e;H(1,0)}}function Bi(e){var t=W();try{return Z(e)}catch(e){if(U(t),e!==e+0)throw e;H(1,0)}}function Vi(e,t){var n=W();try{return ui(e,t)}catch(e){if(U(n),e!==e+0)throw e;return H(1,0),0n}}function Hi(e){var t=W();try{return Zr(e)}catch(e){if(U(t),e!==e+0)throw e;return H(1,0),0n}}function Ui(e,t,n,r){var i=W();try{return ni(e,t,n,r)}catch(e){if(U(i),e!==e+0)throw e;H(1,0)}}function Wi(e,t,n,r,i){var a=W();try{return ri(e,t,n,r,i)}catch(e){if(U(a),e!==e+0)throw e;H(1,0)}}function Gi(e,t,n,r,i,a){var o=W();try{return ii(e,t,n,r,i,a)}catch(e){if(U(o),e!==e+0)throw e;H(1,0)}}function Ki(e,t,n,r,i,a){var o=W();try{return ai(e,t,n,r,i,a)}catch(e){if(U(o),e!==e+0)throw e;H(1,0)}}function qi(e,t,n,r,i,a,o,s){var c=W();try{return Jr(e,t,n,r,i,a,o,s)}catch(e){if(U(c),e!==e+0)throw e;H(1,0)}}function Ji(e,t,n,r,i){var a=W();try{return oi(e,t,n,r,i)}catch(e){if(U(a),e!==e+0)throw e;return H(1,0),0n}}function Yi(e,t,n,r){var i=W();try{return si(e,t,n,r)}catch(e){if(U(i),e!==e+0)throw e;H(1,0)}}function Xi(e,t,n,r){var i=W();try{return ci(e,t,n,r)}catch(e){if(U(i),e!==e+0)throw e;H(1,0)}}function Zi(e,t,n,r,i,a,o,s,c,l,u,d){var f=W();try{return li(e,t,n,r,i,a,o,s,c,l,u,d)}catch(e){if(U(f),e!==e+0)throw e;H(1,0)}}function Qi(e,t,n,r,i,a,o,s,c,l,u){var d=W();try{Q(e,t,n,r,i,a,o,s,c,l,u)}catch(e){if(U(d),e!==e+0)throw e;H(1,0)}}function $i(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){var g=W();try{ti(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}catch(e){if(U(g),e!==e+0)throw e;H(1,0)}}function ea(e,t,n){var r=W();try{return Qr(e,t,n)}catch(e){if(U(r),e!==e+0)throw e;H(1,0)}}function ta(e,t,n){var r=W();try{return $r(e,t,n)}catch(e){if(U(r),e!==e+0)throw e;H(1,0)}}function na(e,t,n,r){var i=W();try{ei(e,t,n,r)}catch(e){if(U(i),e!==e+0)throw e;H(1,0)}}function ra(){if(0<me)he=ra;else if(i)h?.(t),se();else{for(var e=pe;0<e.length;)e.shift()(t);0<me?he=ra:(t.calledRun=!0,S||(se(),h?.(t)))}}return i||(hi=await ue(),ra()),t.PTR_SIZE=4,ae?t:new Promise((e,t)=>{h=e,g=t})}var cn,ln,un=P(()=>{"use strict";cn=sn,ln=globalThis.self?.name?.startsWith(`em-pthread`),ln&&sn()}),dn,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn=P(()=>{"use strict";$t(),dn=typeof location>`u`?void 0:location.origin,fn={}.url>`file:`&&{}.url<`file;`,pn=()=>fn?new URL(new URL(`ort.bundle.min.mjs`,{}.url).href,dn).href:{}.url,mn=pn(),hn=()=>{if(mn&&!mn.startsWith(`blob:`))return mn.substring(0,mn.lastIndexOf(`/`)+1)},gn=(e,t)=>{try{let n=t??mn;return(n?new URL(e,n):new URL(e)).origin===dn}catch{return!1}},_n=(e,t)=>{let n=t??mn;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},vn=(e,t)=>`${t??`./`}${e}`,yn=async e=>{let t=await(await fetch(e,{credentials:`same-origin`})).blob();return URL.createObjectURL(t)},bn=async e=>(await Je(async()=>{let{default:t}=await import(e);return{default:t}},void 0)).default,xn=(an(),tt(en)).default,Sn=async()=>{if(!mn)throw Error(`Failed to load proxy worker: cannot determine the script source URL.`);if(gn(mn))return[void 0,xn()];let e=await yn(mn);return[e,xn(e)]},Cn=(un(),tt(on)).default,wn=async(e,t,n,r)=>{let i=Cn&&!(e||t);if(i)if(mn)i=gn(mn)||r&&!n;else if(r&&!n)i=!0;else throw Error(`cannot determine the script source URL.`);if(i)return[void 0,Cn];{let r=`ort-wasm-simd-threaded.jsep.mjs`,i=e??_n(r,t),a=n&&i&&!gn(i,t),o=a?await yn(i):i??vn(r,t);return[a?o:void 0,await bn(o)]}}}),En,Dn,On,kn,An,jn,Mn,Nn,I,Pn=P(()=>{"use strict";Tn(),Dn=!1,On=!1,kn=!1,An=()=>{if(typeof SharedArrayBuffer>`u`)return!1;try{return typeof MessageChannel<`u`&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},jn=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Mn=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Nn=async e=>{if(Dn)return Promise.resolve();if(On)throw Error(`multiple calls to 'initializeWebAssembly()' detected.`);if(kn)throw Error(`previous call to 'initializeWebAssembly()' failed.`);On=!0;let t=e.initTimeout,n=e.numThreads;if(e.simd!==!1){if(e.simd===`relaxed`){if(!Mn())throw Error(`Relaxed WebAssembly SIMD is not supported in the current environment.`)}else if(!jn())throw Error(`WebAssembly SIMD is not supported in the current environment.`)}let r=An();n>1&&!r&&(typeof self<`u`&&!self.crossOriginIsolated&&console.warn(`env.wasm.numThreads is set to `+n+`, but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info.`),console.warn(`WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading.`),e.numThreads=n=1);let i=e.wasmPaths,a=typeof i==`string`?i:void 0,o=i?.mjs,s=o?.href??o,c=i?.wasm,l=c?.href??c,u=e.wasmBinary,[d,f]=await wn(s,a,n>1,!!u||!!l),p=!1,m=[];if(t>0&&m.push(new Promise(e=>{setTimeout(()=>{p=!0,e()},t)})),m.push(new Promise((e,t)=>{let r={numThreads:n};if(u)r.wasmBinary=u,r.locateFile=e=>e;else if(l||a)r.locateFile=e=>l??a+e;else if(s&&s.indexOf(`blob:`)!==0)r.locateFile=e=>new URL(e,s).href;else if(d){let e=hn();e&&(r.locateFile=t=>e+t)}f(r).then(t=>{On=!1,Dn=!0,En=t,e(),d&&URL.revokeObjectURL(d)},e=>{On=!1,kn=!0,t(e)})})),await Promise.race(m),p)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},I=()=>{if(Dn&&En)return En;throw Error(`WebAssembly is not initialized yet.`)}}),Fn,In,L,Ln=P(()=>{"use strict";Pn(),Fn=(e,t)=>{let n=I(),r=n.lengthBytesUTF8(e)+1,i=n._malloc(r);return n.stringToUTF8(e,i,r),t.push(i),i},In=(e,t,n,r)=>{if(typeof e==`object`&&e){if(n.has(e))throw Error(`Circular reference in options`);n.add(e)}Object.entries(e).forEach(([e,i])=>{let a=t?t+e:e;if(typeof i==`object`)In(i,a+`.`,n,r);else if(typeof i==`string`||typeof i==`number`)r(a,i.toString());else if(typeof i==`boolean`)r(a,i?`1`:`0`);else throw Error(`Can't handle extra config type: ${typeof i}`)})},L=e=>{let t=I(),n=t.stackSave();try{let n=t.PTR_SIZE,r=t.stackAlloc(2*n);t._OrtGetLastError(r,r+n);let i=Number(t.getValue(r,n===4?`i32`:`i64`)),a=t.getValue(r+n,`*`),o=a?t.UTF8ToString(a):``;throw Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(n)}}}),Rn,zn=P(()=>{"use strict";Pn(),Ln(),Rn=e=>{let t=I(),n=0,r=[],i=e||{};try{if(e?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!=`number`||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!=`number`||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(i.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Fn(e.tag,r)),n=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,a),n===0&&L(`Can't create run options.`),e?.extra!==void 0&&In(e.extra,``,new WeakSet,(e,i)=>{let a=Fn(e,r),o=Fn(i,r);t._OrtAddRunConfigEntry(n,a,o)!==0&&L(`Can't set a run config entry: ${e} - ${i}.`)}),[n,r]}catch(e){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(e=>t._free(e)),e}}}),Bn,Vn,Hn,Un,Wn,Gn,Kn=P(()=>{"use strict";Pn(),Ln(),Bn=e=>{switch(e){case`disabled`:return 0;case`basic`:return 1;case`extended`:return 2;case`layout`:return 3;case`all`:return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}},Vn=e=>{switch(e){case`sequential`:return 0;case`parallel`:return 1;default:throw Error(`unsupported execution mode: ${e}`)}},Hn=e=>{e.extra||={},e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||=`1`,e.executionProviders&&e.executionProviders.some(e=>(typeof e==`string`?e:e.name)===`webgpu`)&&(e.enableMemPattern=!1)},Un=(e,t,n,r)=>{let i=Fn(t,r),a=Fn(n,r);I()._OrtAddSessionConfigEntry(e,i,a)!==0&&L(`Can't set a session config entry: ${t} - ${n}.`)},Wn=async(e,t,n)=>{let r=t.executionProviders;for(let t of r){let r=typeof t==`string`?t:t.name,i=[];switch(r){case`webnn`:if(r=`WEBNN`,Un(e,`session.disable_quant_qdq`,`1`,n),Un(e,`session.disable_qdq_constant_folding`,`1`,n),typeof t!=`string`){let r=t?.deviceType;r&&Un(e,`deviceType`,r,n)}break;case`webgpu`:if(r=`JS`,typeof t!=`string`){let r=t;if(r?.preferredLayout){if(r.preferredLayout!==`NCHW`&&r.preferredLayout!==`NHWC`)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${r.preferredLayout}`);Un(e,`preferredLayout`,r.preferredLayout,n)}}break;case`wasm`:case`cpu`:continue;default:throw Error(`not supported execution provider: ${r}`)}let a=Fn(r,n),o=i.length,s=0,c=0;if(o>0){s=I()._malloc(o*I().PTR_SIZE),n.push(s),c=I()._malloc(o*I().PTR_SIZE),n.push(c);for(let e=0;e<o;e++)I().setValue(s+e*I().PTR_SIZE,i[e][0],`*`),I().setValue(c+e*I().PTR_SIZE,i[e][1],`*`)}await I()._OrtAppendExecutionProvider(e,a,s,c,o)!==0&&L(`Can't append execution provider: ${r}.`)}},Gn=async e=>{let t=I(),n=0,r=[],i=e||{};Hn(i);try{let e=Bn(i.graphOptimizationLevel??`all`),a=Vn(i.executionMode??`sequential`),o=typeof i.logId==`string`?Fn(i.logId,r):0,s=i.logSeverityLevel??2;if(!Number.isInteger(s)||s<0||s>4)throw Error(`log severity level is not valid: ${s}`);let c=i.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw Error(`log verbosity level is not valid: ${c}`);let l=typeof i.optimizedModelFilePath==`string`?Fn(i.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(e,!!i.enableCpuMemArena,!!i.enableMemPattern,a,!!i.enableProfiling,0,o,s,c,l),n===0&&L(`Can't create session options.`),i.executionProviders&&await Wn(n,i,r),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!=`boolean`)throw Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);Un(n,`enableGraphCapture`,i.enableGraphCapture.toString(),r)}if(i.freeDimensionOverrides)for(let[e,a]of Object.entries(i.freeDimensionOverrides)){if(typeof e!=`string`)throw Error(`free dimension override name must be a string: ${e}`);if(typeof a!=`number`||!Number.isInteger(a)||a<0)throw Error(`free dimension override value must be a non-negative integer: ${a}`);let i=Fn(e,r);t._OrtAddFreeDimensionOverride(n,i,a)!==0&&L(`Can't set a free dimension override: ${e} - ${a}.`)}return i.extra!==void 0&&In(i.extra,``,new WeakSet,(e,t)=>{Un(n,e,t,r)}),[n,r]}catch(e){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&L(`Can't release session options.`),r.forEach(e=>t._free(e)),e}}}),qn,Jn,Yn,Xn,Zn,Qn,$n,er,R=P(()=>{"use strict";qn=e=>{switch(e){case`int8`:return 3;case`uint8`:return 2;case`bool`:return 9;case`int16`:return 5;case`uint16`:return 4;case`int32`:return 6;case`uint32`:return 12;case`float16`:return 10;case`float32`:return 1;case`float64`:return 11;case`string`:return 8;case`int64`:return 7;case`uint64`:return 13;case`int4`:return 22;case`uint4`:return 21;default:throw Error(`unsupported data type: ${e}`)}},Jn=e=>{switch(e){case 3:return`int8`;case 2:return`uint8`;case 9:return`bool`;case 5:return`int16`;case 4:return`uint16`;case 6:return`int32`;case 12:return`uint32`;case 10:return`float16`;case 1:return`float32`;case 11:return`float64`;case 8:return`string`;case 7:return`int64`;case 13:return`uint64`;case 22:return`int4`;case 21:return`uint4`;default:throw Error(`unsupported data type: ${e}`)}},Yn=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t==`number`?t:t.reduce((e,t)=>e*t,1);return n>0?Math.ceil(r*n):void 0},Xn=e=>{switch(e){case`float16`:return typeof Float16Array<`u`?Float16Array:Uint16Array;case`float32`:return Float32Array;case`uint8`:return Uint8Array;case`int8`:return Int8Array;case`uint16`:return Uint16Array;case`int16`:return Int16Array;case`int32`:return Int32Array;case`bool`:return Uint8Array;case`float64`:return Float64Array;case`uint32`:return Uint32Array;case`int64`:return BigInt64Array;case`uint64`:return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},Zn=e=>{switch(e){case`verbose`:return 0;case`info`:return 1;case`warning`:return 2;case`error`:return 3;case`fatal`:return 4;default:throw Error(`unsupported logging level: ${e}`)}},Qn=e=>e===`float32`||e===`float16`||e===`int32`||e===`int64`||e===`uint32`||e===`uint8`||e===`bool`||e===`uint4`||e===`int4`,$n=e=>e===`float32`||e===`float16`||e===`int32`||e===`int64`||e===`uint32`||e===`uint64`||e===`int8`||e===`uint8`||e===`bool`||e===`uint4`||e===`int4`,er=e=>{switch(e){case`none`:return 0;case`cpu`:return 1;case`cpu-pinned`:return 2;case`texture`:return 3;case`gpu-buffer`:return 4;case`ml-tensor`:return 5;default:throw Error(`unsupported data location: ${e}`)}}}),tr,nr=P(()=>{"use strict";$t(),tr=async e=>{if(typeof e==`string`){let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let n=t.headers.get(`Content-Length`),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),i;try{i=new ArrayBuffer(r)}catch(e){if(e instanceof RangeError){let e=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let a=0;for(;;){let{done:e,value:t}=await n.read();if(e)break;let r=t.byteLength;new Uint8Array(i,a,r).set(t),a+=r}return new Uint8Array(i,0,r)}}return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),rr,ir,ar,or,sr,cr,z,lr=P(()=>{"use strict";R(),rr=[`V`,`I`,`W`,`E`,`F`],ir=(e,t)=>{console.log(`[${rr[e]},${new Date().toISOString()}]${t}`)},sr=(e,t)=>{ar=e,or=t},cr=(e,t)=>{let n=Zn(e);n>=Zn(ar)&&ir(n,typeof t==`function`?t():t)},z=(...e)=>{or&&cr(...e)}}),ur,dr,B,fr,pr,mr,hr,V=P(()=>{"use strict";ur=class{static calcMatMulShape(e,t){return e[1]===t[0]?[e[0],t[1]]:void 0}},dr=class{static calcShape(e,t,n=!1){let r=e.length,i=t.length;if(r===0)return t;if(i===0)return e;let a=Math.max(e.length,t.length),o=Array(a);if(n){if(r<2||i<2)return;let n=ur.calcMatMulShape([e[r-2],e[r-1]],[t[i-2],t[i-1]]);if(n===void 0)return;[o[a-2],o[a-1]]=n}for(let s=n?3:1;s<=a;s++){let n=r-s<0?1:e[r-s],c=i-s<0?1:t[i-s];if(n!==c&&n>1&&c>1)return;let l=Math.max(n,c);if(n&&c)o[a-s]=Math.max(n,c);else{if(l>1)return;o[a-s]=0}}return o}static isValidBroadcast(e,t){let n=e.length,r=t.length;if(n>r)return!1;for(let i=1;i<=n;i++)if(e[n-i]!==1&&e[n-i]!==t[r-i])return!1;return!0}},B=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let n=e.length;if(n===0)return[];let r=Array(n),i=n-1;for(;i>=0;){if(e[i]%t===0){r[i]=e[i]/t;break}if(t%e[i]!==0)throw Error(`cannot convert shape`);r[i]=1,t/=e[i],i--}for(i--;i>=0;i--)r[i]=e[i];return r}static sizeFromDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(e,t,n){let r=1;for(let i=t;i<n;i++){if(e[i]<0)throw Error(`cannot get valid size from specified dimension range. Most likely the range contains negative values in them.`);r*=Number(e[i])}return r}static computeStrides(e){let t=e.length;if(t===0)return[];if(t===1)return[1];let n=Array(t);n[t-1]=1,n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error(`unsupported axis for this operation.`);return e<0?e+t:e}static normalizeAxes(e,t){return e.map(n=>this.normalizeAxis(n,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let n=e.length;return e.map((e,r)=>e+t[r]+t[r+n])}static areEqual(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}},fr=class e{static adjustPoolAttributes(e,t,n,r,i,a){if(!e&&n.length!==t.length-2)throw Error(`length of specified kernel shapes should be 2 less than length of input dimensions`);if(e)for(let e=0;e<t.length-2;e++)e>=n.length?n.push(t[e+2]):n[e]=t[e+2];for(let e=0;e<n.length;e++)if(e<r.length){if(r[e]<0)throw Error(`strides should be greater than or equal to 1`)}else r.push(1);for(let e=0;e<n.length;e++)if(e<i.length){if(i[e]<0)throw Error(`dilations should be greater than or equal to 1`)}else i.push(1);for(let e=0;e<n.length*2;e++)if(e<a.length){if(a[e]<0)throw Error(`pad should be greater than or equal to 1`)}else a.push(0);for(let e=0;e<n.length;e++){if(n[e]<=0)throw Error(`kernel shapes need to be greater than 0`);if(a[e]>=n[e]||a[e+n.length]>=n[e])throw Error(`pads should be smaller than kernel`)}}static adjustPadsBasedOnAutoPad(t,n,r,i,a,o,s){if(s){if(a.length!==2*(t.length-2))throw Error(`length of pads should be twice the length of data dimensions`);if(n.length!==t.length-2)throw Error(`length of strides should be the length of data dimensions`);if(i.length!==t.length-2)throw Error(`length of kernel shapes should be the length of data dimensions`);for(let c=0;c<t.length-2;c++)e.adjustPadAndReturnShape(t[c+(o?1:2)],n[c],r[c],i[c],a,c,c+t.length-2,s)}}static computePoolOutputShape(t,n,r,i,a,o,s){if(n.length<=0)throw Error(`input shape must be of size greater than 0`);let c=[n[0],n[1]];return e.computeShapeHelper(t,n,c,r,i,a,o,s),c}static computeConvOutputShape(t,n,r,i,a,o,s){if(t.length<=0||n.length<=0)throw Error(`invalid input tensor dims or invalid filter tensor dims`);let c=[t[0],n[0]];return e.computeShapeHelper(!1,t,c,r,i,a,o,s),c}static computeShapeHelper(t,n,r,i,a,o,s,c){if(t)for(let e=0;e<n.length-2;e++)r.push(1);else for(let t=0;t<n.length-2;t++)r.push(e.adjustPadAndReturnShape(n[t+2],i[t],a[t],o[t],s,t,t+n.length-2,c))}static adjustPadAndReturnShape(e,t,n,r,i,a,o,s){let c=n*(r-1)+1;if(s&&s!==`NOTSET`)switch(s){case`VALID`:return i[a]=0,i[o]=0,Math.floor((e-c)/t+1);case`SAME_LOWER`:case`SAME_UPPER`:if(n!==1)throw Error(`Dilation not supported for SAME_UPPER or SAME_LOWER`);{let n=((e+t-1)/t-1)*t+r-e;return i[a]=Math.floor(s===`SAME_LOWER`?(n+1)/2:n/2),i[o]=n-i[a],Math.floor((e+n-r)/t+1)}default:throw Error(`Unsupported AutoPad type`)}else return Math.floor((e+i[a]+i[o]-c)/t+1)}},pr=class{static getShapeOfGemmResult(e,t,n,r,i){if(e.length!==2||n.length!==2)throw Error(`shape need to be of size 2`);let a,o,s;t?(a=e[1],o=e[0]):(a=e[0],o=e[1]);let c=-1;if(r?(s=n[0],c=1):(s=n[1],c=0),n[c]!==o)throw Error(`dimension mismatch`);if(a<=0||s<=0||o<=0)throw Error(`invalid shape specified`);if(i&&!dr.isValidBroadcast(i,[a,s]))throw Error(`gemm: invalid bias shape for broadcast`);return[a,s,o]}},mr=-34028234663852886e22,hr=34028234663852886e22}),gr,_r=P(()=>{"use strict";R(),gr=(e,t)=>new(Xn(t))(e)}),vr,yr,br,xr,Sr,Cr,wr,Tr,Er,Dr,Or,H=P(()=>{"use strict";R(),lr(),vr=new Map([[`float32`,32],[`float16`,16],[`int32`,32],[`uint32`,32],[`int64`,64],[`uint64`,64],[`int8`,8],[`uint8`,8],[`int4`,4],[`uint4`,4]]),yr=(e,t)=>{if(t===`int32`)return e;let n=vr.get(t);if(!n)throw Error(`WebNN backend does not support data type: ${t}`);let r=n/8;if(e.byteLength%r!==0)throw Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let i=e.byteLength/r,a=new(Xn(t))(e.buffer,e.byteOffset,i);switch(t){case`int64`:case`uint64`:{let e=new Int32Array(i);for(let t=0;t<i;t++){let n=a[t];if(n>2147483647n||n<-2147483648n)throw Error(`Can not convert int64 data to int32 - value out of range.`);e[t]=Number(n)}return new Uint8Array(e.buffer)}case`int8`:case`uint8`:case`uint32`:{if(t===`uint32`&&a.some(e=>e>2147483647))throw Error(`Can not convert uint32 data to int32 - value out of range.`);let e=Int32Array.from(a,Number);return new Uint8Array(e.buffer)}default:throw Error(`Unsupported data conversion from ${t} to 'int32'`)}},br=(e,t)=>{if(t===`int32`)return e;if(e.byteLength%4!=0)throw Error(`Invalid Uint8Array length - must be a multiple of 4 (int32).`);let n=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,n);switch(t){case`int64`:{let e=BigInt64Array.from(r,BigInt);return new Uint8Array(e.buffer)}case`uint64`:{if(r.some(e=>e<0))throw Error(`Can not convert int32 data to uin64 - negative value found.`);let e=BigUint64Array.from(r,BigInt);return new Uint8Array(e.buffer)}case`int8`:{if(r.some(e=>e<-128||e>127))throw Error(`Can not convert int32 data to int8 - value out of range.`);let e=Int8Array.from(r,Number);return new Uint8Array(e.buffer)}case`uint8`:if(r.some(e=>e<0||e>255))throw Error(`Can not convert int32 data to uint8 - value out of range.`);return Uint8Array.from(r,Number);case`uint32`:{if(r.some(e=>e<0))throw Error(`Can not convert int32 data to uint32 - negative value found.`);let e=Uint32Array.from(r,Number);return new Uint8Array(e.buffer)}default:throw Error(`Unsupported data conversion from 'int32' to ${t}`)}},xr=1,Sr=()=>xr++,Cr=new Map([[`int8`,`int32`],[`uint8`,`int32`],[`uint32`,`int32`],[`int64`,`int32`]]),wr=(e,t)=>{let n=vr.get(e);if(!n)throw Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*n/8):0},Tr=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:n,tensor:r,dataType:i,shape:a,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=n,this.mlTensor=r,this.dataType=i,this.tensorShape=a,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return wr(this.dataType,this.tensorShape)}destroy(){z(`verbose`,()=>`[WebNN] TensorWrapper.destroy`),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),n=br(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(n);return}return new Uint8Array(n).buffer}return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,n){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((e,t)=>e===n[t])}setIsDataConverted(e){this.isDataConverted=e}},Er=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,n,r){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),o;if(!a?.input.dataTypes.includes(t)){if(o=Cr.get(t),!o||a?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${t}`);z(`verbose`,()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==wr(t,n))throw Error(`Unable to copy data to tensor with different size.`);this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>`u`?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,n,s,!0,!0,o),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType===`int32`)t=yr(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}z(`verbose`,()=>`Data size does not match tensor size. Releasing tensor.`),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?br(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}return t.buffer}if(!this.wrapper)throw Error(`Tensor has not been created.`);return e?this.wrapper.read(e):this.wrapper.read()}},Dr=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error(`MLContext not found for session.`);return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Sr();return this.tensorTrackersById.set(e,new Er(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,n,r,i){z(`verbose`,()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(t);if(!a)throw Error(`Tensor not found.`);return a.ensureTensor(e,n,r,i)}upload(e,t){let n=this.tensorTrackersById.get(e);if(!n)throw Error(`Tensor not found.`);n.upload(t)}async download(e,t){z(`verbose`,()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let n=this.tensorTrackersById.get(e);if(!n)throw Error(`Tensor not found.`);return n.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,n,r){let i=this.getMLContext(e),a=Sr(),o=new Tr({sessionId:e,context:i,tensor:t,dataType:n,shape:r});return this.tensorTrackersById.set(a,new Er(this,o)),this.externalTensors.add(o),a}async getCachedTensor(e,t,n,r,i,a,o){let s=this.getMLContext(e);for(let[r,i]of this.freeTensors.entries())if(i.canReuseTensor(s,t,n)){z(`verbose`,()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:``} shape: ${n}`);let i=this.freeTensors.splice(r,1)[0];return i.sessionId=e,i}z(`verbose`,()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:``} shape: ${n}}`);let c=await s.createTensor({dataType:o??t,shape:n,dimensions:n,usage:r,writable:i,readable:a});return new Tr({sessionId:e,context:s,tensor:c,dataType:t,shape:n,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Or=(...e)=>new Dr(...e)}),kr,Ar,U,jr=P(()=>{"use strict";R(),Pn(),_r(),H(),lr(),kr=new Map([[1,`float32`],[10,`float16`],[6,`int32`],[12,`uint32`],[7,`int64`],[13,`uint64`],[22,`int4`],[21,`uint4`],[3,`int8`],[2,`uint8`],[9,`uint8`]]),Ar=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((n,i)=>n===r[i]&&e[n]===t[n])},U=class{constructor(e){this.tensorManager=Or(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,sr(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw Error(`No active session`);return this.activeSessionId}onRunStart(e){z(`verbose`,()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){z(`verbose`,()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)z(`verbose`,()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(e===void 0){let e=this.mlContextCache.findIndex(e=>e.options===void 0&&e.gpuDevice===void 0);if(e!==-1)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>Ar(t.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let n=this.sessionIdsByMLContext.get(t);n||(n=new Set,this.sessionIdsByMLContext.set(t,n)),n.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let n=this.sessionIdsByMLContext.get(t);if(n.delete(e),n.size===0){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);e!==-1&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){z(`verbose`,()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,n,r,i){let a=kr.get(n);if(!a)throw Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,r,i)}async createTemporaryTensor(e,t,n){z(`verbose`,()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${n}}`);let r=kr.get(t);if(!r)throw Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,r,n,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!I().shouldTransferToMLTensor)throw Error(`Trying to upload to a MLTensor while shouldTransferToMLTensor is false`);z(`verbose`,()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let n=await this.tensorManager.download(e);return gr(n,t)}}registerMLTensor(e,t,n,r){let i=kr.get(n);if(!i)throw Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.registerTensor(e,t,i,r);return z(`verbose`,()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${r}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,n,r,i,a,o=!1){if(!a)throw Error(`External mounted files are not available.`);let s=e;e.startsWith(`./`)&&(s=e.substring(2));let c=a.get(s);if(!c)throw Error(`File with name ${s} not found in preloaded files.`);if(t+n>c.byteLength)throw Error(`Out of bounds: data offset and length exceed the external file data size.`);let l=c.slice(t,t+n).buffer,u;switch(i.dataType){case`float32`:u=new Float32Array(l);break;case`float16`:u=typeof Float16Array<`u`?new Float16Array(l):new Uint16Array(l);break;case`int32`:u=new Int32Array(l);break;case`uint32`:u=new Uint32Array(l);break;case`int64`:if(o){let e=yr(new Uint8Array(l),`int64`);u=new Int32Array(e.buffer),i.dataType=`int32`}else u=new BigInt64Array(l);break;case`uint64`:u=new BigUint64Array(l);break;case`int8`:u=new Int8Array(l);break;case`int4`:case`uint4`:case`uint8`:u=new Uint8Array(l);break;default:throw Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return z(`verbose`,()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${o?`(Note: it was int64 data type and registered to int32 as workaround)`:``}`),r.constant(i,u)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let n=this.sessionGraphInputs.get(e);return n?n.includes(t):!1}isGraphOutput(e,t){let n=this.sessionGraphOutputs.get(e);return n?n.includes(t):!1}isGraphInputOutputTypeSupported(e,t,n=!0){let r=kr.get(qn(t)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof r>`u`?!1:n?!!i?.input.dataTypes.includes(r):!!i?.output.dataTypes.includes(r)}flush(){}}}),W=P(()=>{"use strict";}),Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr=P(()=>{"use strict";lr(),W(),Mr=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Nr=[],Pr=e=>Math.ceil(Number(e)/16)*16,Fr=e=>{for(let t=0;t<Nr.length;t++){let n=Nr[t];if(e<=n)return n}return Math.ceil(e/16)*16},Ir=1,Lr=()=>Ir++,Rr=async(e,t,n,r)=>{let i=Pr(n),a=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,a,0,i),e.flush(),await a.mapAsync(GPUMapMode.READ);let s=a.getMappedRange();if(r){let e=r();return e.set(new Uint8Array(s,0,n)),e}return new Uint8Array(s.slice(0,n))}finally{a.destroy()}},zr=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[e]of Mr)Nr.push(e),this.freeBuffers.set(e,[]),this.freeUniformBuffers.set(e,[]);this.sessionCount=0}upload(e,t){let n=t.buffer,r=t.byteOffset,i=t.byteLength,a=Pr(i),o=this.storageCache.get(e);if(!o)throw Error(`gpu data for uploading does not exist`);if(Number(o.originalSize)!==i)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);let s=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=s.getMappedRange();new Uint8Array(c).set(new Uint8Array(n,r,i)),s.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(s,0,o.gpuData.buffer,0,a),this.backend.device.queue.submit([l.finish()]),s.destroy(),z(`verbose`,()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let n=this.storageCache.get(e);if(!n)throw Error(`source gpu data for memcpy does not exist`);let r=this.storageCache.get(t);if(!r)throw Error(`destination gpu data for memcpy does not exist`);if(n.originalSize!==r.originalSize)throw Error(`inconsistent source and destination gpu data size`);let i=Pr(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,r.gpuData.buffer,0,i)}registerExternalBuffer(e,t,n){let r;if(n){if(r=n[0],e===n[1])return z(`verbose`,()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Lr();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),z(`verbose`,()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),z(`verbose`,()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Fr(e),r,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let e=(i?this.freeBuffers:this.freeUniformBuffers).get(n);r=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:n,usage:t})}else r=this.backend.device.createBuffer({size:n,usage:t});let o={id:Lr(),type:0,buffer:r};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),z(`verbose`,()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e==`bigint`?Number(e):e,n=this.storageCache.get(t);if(!n){if(this.storageCache.size===0)return 0;throw Error(`releasing data does not exist`)}return z(`verbose`,()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(e,t){let n=this.storageCache.get(Number(e));if(!n)throw Error(`data does not exist`);await Rr(this.backend,n.gpuData.buffer,n.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Mr.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(e.size)||[];t===void 0||n.length>=t?e.destroy():n.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),--this.sessionCount,this.sessionCount===0&&(z(`warning`,()=>`[WebGPU] Clearing webgpu buffer cache`),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Br=(...e)=>new zr(...e)}),Hr,G,K=P(()=>{"use strict";Hr=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(`;`),this.key}},G=e=>new Hr(e)}),Ur,Wr,Gr,Kr,q,J,qr,Jr,Yr,Y,Xr,X,Z,Zr,Qr,$r,ei,Q=P(()=>{"use strict";R(),V(),Ur=64,Wr=(e,t)=>{if(t===3)throw Error(`vec3 has same alignment as vec4, use vec4 instead`);switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:`f16`;case 1:return t>1?`vec${t}<f32>`:`f32`;case 6:return t>1?`vec${t}<i32>`:`i32`;case 12:return t>1?`vec${t}<u32>`:`u32`;case 7:if(t>1)throw Error(`currently not supported vecX of uint64 yet`);return[`vec2<u32>`,`i32`];case 13:if(t>1)throw Error(`currently not supported vecX of uint64 yet`);return[`vec2<u32>`,`u32`];case 9:if(t!==4)throw Error(`bool must be vec4`);return[`u32`,`vec4<bool>`];case 22:return`i32`;case 21:return`u32`;default:throw Error(`Unknown data type: ${e}`)}},Gr=(e,t=1)=>{let n=Wr(e,t);return typeof n==`string`?n:n[0]},Kr=(e,t=1)=>{let n=Wr(e,t);return typeof n==`string`?n:n[1]},q=(...e)=>{let t=[];return e.forEach(e=>{e.length!==0&&t.push({type:12,data:e},{type:12,data:B.computeStrides(e)})}),t},J=e=>e%4==0?4:e%2==0?2:1,qr=(e=`f32`,t,n=`0`)=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Jr=(e,t,n)=>e===`f32`?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Yr=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Y=(e,t,n,r)=>e.startsWith(`uniforms.`)&&n>4?typeof t==`string`?r===`f16`?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r===`f16`?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Xr=(e,t,n,r,i)=>{let a=typeof n==`number`,o=a?n:n.length,s=[...Array(o).keys()],c=o<2?`u32`:o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,l=Wr(t,i),u=typeof l==`string`?l:l[1],d={indices:c,value:u,storage:typeof l==`string`?l:l[0],tensor:t},f=e=>typeof e==`string`?e:`${e}u`,p={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=a?`uniforms.`:``,h=`${m}${e}_shape`,g=`${m}${e}_strides`,_=``;for(let e=0;e<o-1;e++)_+=`
    let dim${e} = current / ${Y(g,e,o)};
    let rest${e} = current % ${Y(g,e,o)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;_+=`indices[${o-1}] = current;`;let v=o<2?``:`
  fn o2i_${e}(offset: u32) -> ${d.indices} {
    var indices: ${d.indices};
    var current = offset;
    ${_}
    return indices;
  }`,y=t=>(p.offsetToIndices=!0,o<2?t:`o2i_${e}(${t})`),b=[];if(o>=2)for(let e=o-1;e>=0;e--)b.push(`${Y(g,e,o)} * (indices[${e}])`);let x=o<2?``:`
  fn i2o_${e}(indices: ${d.indices}) -> u32 {
    return ${b.join(`+`)};
  }`,S=t=>(p.indicesToOffset=!0,o<2?t:`i2o_${e}(${t})`),C=(...e)=>o===0?`0u`:`${d.indices}(${e.map(f).join(`,`)})`,w=(e,t)=>o<2?`${e}`:`${Y(e,t,o)}`,T=(e,t,n)=>o<2?`${e}=${n};`:`${Y(e,t,o)}=${n};`,E={},D=(t,n)=>{p.broadcastedIndicesToOffset=!0;let r=`${n.name}broadcastedIndicesTo${e}Offset`;if(r in E)return`${r}(${t})`;let i=[];for(let e=o-1;e>=0;e--){let t=n.indicesGet(`outputIndices`,e+n.rank-o);i.push(`${w(g,e)} * (${t} % ${w(h,e)})`)}return E[r]=`fn ${r}(outputIndices: ${n.type.indices}) -> u32 {
             return ${i.length>0?i.join(`+`):`0u`};
           }`,`${r}(${t})`},O=(t,n)=>(()=>{if(d.storage===d.value)return`${e}[${t}]=${n};`;if(d.storage===`vec2<u32>`&&d.value===`i32`)return`${e}[${t}]=vec2<u32>(u32(${n}), select(0u, 0xFFFFFFFFu, ${n} < 0));`;if(d.storage===`vec2<u32>`&&d.value===`u32`)return`${e}[${t}]=vec2<u32>(u32(${n}), 0u);`;if(d.storage===`u32`&&d.value===`vec4<bool>`)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${n}));`;throw Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),k=t=>(()=>{if(d.storage===d.value)return`${e}[${t}]`;if(d.storage===`vec2<u32>`&&d.value===`i32`)return`i32(${e}[${t}].x)`;if(d.storage===`vec2<u32>`&&d.value===`u32`)return`u32(${e}[${t}].x)`;if(d.storage===`u32`&&d.value===`vec4<bool>`)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),A=o<2?``:`
  fn get_${e}ByIndices(indices: ${d.indices}) -> ${u} {
    return ${k(`i2o_${e}(indices)`)};
  }`,j=o<2?``:(()=>{let t=s.map(e=>`d${e}: u32`).join(`, `),n=s.map(e=>`d${e}`).join(`, `);return`
  fn get_${e}(${t}) -> ${u} {
    return get_${e}ByIndices(${C(n)});
  }`})(),ee=(...t)=>{if(t.length!==o)throw Error(`indices length must be ${o}`);let n=t.map(f).join(`,`);return o===0?k(`0u`):o===1?k(n[0]):(p.get=!0,p.getByIndices=!0,p.indicesToOffset=!0,`get_${e}(${n})`)},te=t=>o<2?k(t):(p.getByIndices=!0,p.indicesToOffset=!0,`get_${e}ByIndices(${t})`),ne=o<2?``:`
  fn set_${e}ByIndices(indices: ${d.indices}, value: ${u}) {
    ${O(`i2o_${e}(indices)`,`value`)}
  }`,re=o<2?``:(()=>{let t=s.map(e=>`d${e}: u32`).join(`, `),n=s.map(e=>`d${e}`).join(`, `);return`
  fn set_${e}(${t}, value: ${u}) {
    set_${e}ByIndices(${C(n)}, value);
  }`})();return{impl:()=>{let e=[],t=!1;return p.offsetToIndices&&(e.push(v),t=!0),p.indicesToOffset&&(e.push(x),t=!0),p.broadcastedIndicesToOffset&&(Object.values(E).forEach(t=>e.push(t)),t=!0),p.set&&(e.push(re),t=!0),p.setByIndices&&(e.push(ne),t=!0),p.get&&(e.push(j),t=!0),p.getByIndices&&(e.push(A),t=!0),!a&&t&&e.unshift(`const ${h} = ${d.indices}(${n.join(`,`)});`,`const ${g} = ${d.indices}(${B.computeStrides(n).join(`,`)});`),e.join(`
`)},type:d,offsetToIndices:y,indicesToOffset:S,broadcastedIndicesToOffset:D,indices:C,indicesGet:w,indicesSet:T,set:(...t)=>{if(t.length!==o+1)throw Error(`indices length must be ${o}`);let n=t[o];if(typeof n!=`string`)throw Error(`value must be string`);let r=t.slice(0,o).map(f).join(`,`);return o===0?O(`0u`,n):o===1?O(r[0],n):(p.set=!0,p.setByIndices=!0,p.indicesToOffset=!0,`set_${e}(${r}, ${n})`)},setByOffset:O,setByIndices:(t,n)=>o<2?O(t,n):(p.setByIndices=!0,p.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${n});`),get:ee,getByOffset:k,getByIndices:te,usage:r,name:e,strides:g,shape:h,rank:o}},X=(e,t,n,r=1)=>Xr(e,t,n,`input`,r),Z=(e,t,n,r=1)=>Xr(e,t,n,`output`,r),Zr=(e,t,n)=>Xr(e,t,n,`atomicOutput`,1),Qr=(e,t,n,r=1)=>Xr(e,t,n,`internal`,r),$r=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e==`number`?`${e}u`:e}) { return; }`}mainStart(e=Ur){let t=typeof e==`number`?e:e[0],n=typeof e==`number`?1:e[1],r=typeof e==`number`?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*n*r>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${n}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1;return`@compute @workgroup_size(${t}, ${n}, ${r})
  fn main(${i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`}) {
    ${i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*n*r}u + local_idx;`}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith(`uniforms.`)&&this.uniforms.push({name:e.shape.replace(`uniforms.`,``),type:`u32`,length:e.rank}),e.strides.startsWith(`uniforms.`)&&this.uniforms.push({name:e.strides.replace(`uniforms.`,``),type:`u32`,length:e.rank}))}declareVariable(e,t){if(e.usage===`internal`)throw Error(`cannot use internal variable with declareVariable(). use registerInternalVariables() instead.`);this.variables.push(e),this.appendVariableUniforms(e);let n=e.usage===`input`?`read`:`read_write`,r=e.usage===`atomicOutput`?`atomic<i32>`:e.type.storage;return`@group(0) @binding(${t}) var<storage, ${n}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!==`internal`)throw Error(`cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.`);this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,n=1){return this.uniforms.push({name:e,type:t,length:n}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return``;let e=[];for(let{name:t,type:n,length:r}of this.uniforms)if(r&&r>4)n===`f16`?e.push(`@align(16) ${t}:array<mat2x4<${n}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${n}>, ${Math.ceil(r/4)}>`);else{let i=r==null||r===1?n:`vec${r}<${n}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(`, `)} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=e=>[12,10,1,6][[`u32`,`f16`,`f32`,`i32`].indexOf(e)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},ei=(e,t)=>new $r(e,t)}),ti,ni,ri,ii,ai,oi,si,ci,li,ui=P(()=>{"use strict";R(),V(),K(),Q(),ti=(e,t)=>{if(!e||e.length!==1)throw Error(`Transpose requires 1 input.`);if(t.length!==0&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ni=(e,t)=>t.length===0?[...Array(e).keys()].reverse():t,ri=(e,t)=>B.sortBasedOnPerm(e,ni(e.length,t)),ii=(e,t,n,r)=>{let i=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let n=0;n<t;++n)i+=`a[${e[n]}]=i[${n}];`;return i+=`return a;}`},ai=(e,t)=>{let n=[],r=[];for(let i=0;i<e.length;++i)e[i]!==1&&n.push(e[i]),e[t[i]]!==1&&r.push(t[i]);return{newShape:n,newPerm:r}},oi=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},si=(e,t)=>{let n=e.dataType,r=e.dims.length,i=ni(r,t),a=ri(e.dims,i),o=e.dims,s=a,c=r<2||oi(i,e.dims),l;if(c)return l=e=>{let t=X(`input`,n,o,4),r=Z(`output`,n,s,4);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    output[global_idx] = input[global_idx];
  }`},{name:`TransposeCopy`,shaderCache:{inputDependencies:[`type`]},getRunData:()=>{let t=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:l};let{newShape:u,newPerm:d}=ai(e.dims,i),f=B.areEqual(d,[2,3,1]),p=B.areEqual(d,[3,1,2]);return u.length===2||f||p?(o=f?[u[0],u[1]*u[2]]:p?[u[0]*u[1],u[2]]:u,s=[o[1],o[0]],l=e=>{let t=X(`a`,n,o.length),r=Z(`output`,n,s.length);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,r)}
  var<workgroup> tile : array<array<${r.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${t.getByIndices(`${t.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${r.setByIndices(`${r.type.indices}(output_row, output_col)`,`tile[local_id.x][local_id.y]`)}
    }
  }`},{name:`TransposeShared`,shaderCache:{inputDependencies:[`type`]},getRunData:()=>{let t=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(s[1]/16),y:Math.ceil(s[0]/16)},programUniforms:[{type:12,data:t},...q(o,s)]}},getShaderSource:l}):(l=e=>{let t=X(`a`,n,o.length),a=Z(`output`,n,s.length);return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(t,a)}

  ${ii(i,r,t,a)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let indices = ${a.offsetToIndices(`global_idx`)};
    let aIndices = perm(indices);

    ${a.setByOffset(`global_idx`,t.getByIndices(`aIndices`))}
  }`},{name:`Transpose`,shaderCache:{hint:`${t}`,inputDependencies:[`rank`]},getRunData:()=>{let t=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...q(o,s)]}},getShaderSource:l})},ci=(e,t)=>{ti(e.inputs,t.perm),e.compute(si(e.inputs[0],t.perm))},li=e=>G({perm:e.perm})}),di,fi,pi,mi,hi,gi,_i,vi,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi=P(()=>{"use strict";R(),V(),Q(),aa(),ui(),di={max:`select(bestValue, candidate, candidate > bestValue)`,min:`select(bestValue, candidate, candidate < bestValue)`,mean:`bestValue + candidate`,sum:`bestValue + candidate`,prod:`bestValue * candidate`,sumSquare:`bestValue + candidate * candidate`,logSumExp:`bestValue + exp(candidate)`,l1:`bestValue + abs(candidate)`,l2:`bestValue + candidate * candidate`,logSum:`bestValue + candidate`},fi={max:`select(bestValue, candidate, candidate > bestValue)`,min:`select(bestValue, candidate, candidate < bestValue)`,mean:`bestValue + candidate`,sum:`bestValue + candidate`,prod:`bestValue * candidate`,sumSquare:`bestValue + candidate`,logSumExp:`bestValue + candidate`,l1:`bestValue + candidate`,l2:`bestValue + candidate`,logSum:`bestValue + candidate`},pi={max:`_A[offset]`,min:`_A[offset]`,mean:`0`,sum:`0`,prod:`1`,sumSquare:`0`,logSumExp:`0`,l1:`0`,l2:`0`,logSum:`0`},mi={max:`bestValue`,min:`bestValue`,sum:`bestValue`,prod:`bestValue`,sumSquare:`bestValue`,logSumExp:`log(bestValue)`,l1:`bestValue`,l2:`sqrt(bestValue)`,logSum:`log(bestValue)`},hi=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},gi=(e,t)=>{let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);return[n,t.map(t=>e[t])]},_i=(e,t)=>{let n=e.length+t.length,r=[],i=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[i++]):r.push(1);return r},vi=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},yi=(e,t)=>{let n=[];if(!vi(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(e=>n.push(e))}return n},bi=(e,t,n,r,i,a,o)=>{let s=n[0].dims,c=B.size(a),l=B.size(o),u=X(`_A`,n[0].dataType,s),d=Z(`output`,i,a),f=64;c===1&&(f=256);let p=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `;return{name:e,shaderCache:{hint:`${t};${f}`,inputDependencies:[`type`]},getShaderSource:e=>`
        ${e.registerUniform(`reduceSize`,`u32`).declareVariables(u,d)}
        ${p}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${pi[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${u.getByOffset(`offset + k`)});
           bestValue = ${di[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${fi[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${d.setByOffset(`outputIndex`,`${r===`mean`?`${d.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${d.type.storage}(${mi[r]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:c},programUniforms:[{type:12,data:l}]})}},xi=(e,t,n,r)=>{let i=e.inputs.length===1?n:Ii(e.inputs,n),a=i.axes;a.length===0&&!i.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((e,t)=>t));let o=B.normalizeAxes(a,e.inputs[0].dims.length),s=o,c=e.inputs[0],l=yi(s,e.inputs[0].dims.length);l.length>0&&(c=e.compute(si(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=hi(s.length,c.dims.length));let[u,d]=gi(c.dims,s),f=u;i.keepDims&&(f=_i(u,o)),e.compute(bi(t,i.cacheKey,[c],r,e.inputs[0].dataType,f,d),{inputs:[c]})},Si=(e,t)=>{xi(e,`ReduceMeanShared`,t,`mean`)},Ci=(e,t)=>{xi(e,`ReduceL1Shared`,t,`l1`)},wi=(e,t)=>{xi(e,`ReduceL2Shared`,t,`l2`)},Ti=(e,t)=>{xi(e,`ReduceLogSumExpShared`,t,`logSumExp`)},Ei=(e,t)=>{xi(e,`ReduceMaxShared`,t,`max`)},Di=(e,t)=>{xi(e,`ReduceMinShared`,t,`min`)},Oi=(e,t)=>{xi(e,`ReduceProdShared`,t,`prod`)},ki=(e,t)=>{xi(e,`ReduceSumShared`,t,`sum`)},Ai=(e,t)=>{xi(e,`ReduceSumSquareShared`,t,`sumSquare`)},ji=(e,t)=>{xi(e,`ReduceLogSumShared`,t,`logSum`)}}),Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa=P(()=>{"use strict";R(),V(),K(),Q(),Mi(),Ni=e=>{if(!e||e.length===0||e.length>2)throw Error(`Reduce op requires 1 or 2 inputs.`);if(e.length===2&&e[1].dims.length!==1)throw Error(`Invalid axes input dims.`)},Pi=e=>[``,``,`var value = ${e.getByIndices(`input_indices`)};`,``],Fi=(e,t,n,r,i,a,o=!1,s=!1)=>{let c=[],l=n[0].dims,u=l.length,d=B.normalizeAxes(i,u),f=!s&&d.length===0;l.forEach((e,t)=>{f||d.indexOf(t)>=0?o&&c.push(1):c.push(e)});let p=c.length,m=B.size(c);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],i=X(`_A`,n[0].dataType,u),s=Z(`output`,a,p),c=r(i,s,d),m=c[2];for(let e=0,n=0;e<u;e++)f||d.indexOf(e)>=0?(o&&n++,m=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${c[2].includes(`last_index`)?`let last_index = j${e};`:``}
                  ${i.indicesSet(`input_indices`,e,`j${e}`)}
                  ${m}
                }`):(t.push(`${i.indicesSet(`input_indices`,e,s.indicesGet(`output_indices`,n))};`),n++);return`

        ${e.registerUniform(`output_size`,`u32`).declareVariables(i,s)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          var input_indices: ${i.type.indices};
          let output_indices = ${s.offsetToIndices(`global_idx`)};

          ${t.join(`
`)}
          ${c[0]}       // init ops for reduce max/min
          ${c[1]}
          ${m}
          ${c[3]}
          ${c.length===4?s.setByOffset(`global_idx`,`value`):c.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:c,dataType:a}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...q(l,c)]})}},Ii=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),G({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Li=(e,t,n,r)=>{let i=e.inputs,a=i.length===1?n:Ii(i,n);e.compute(Fi(t,{hint:a.cacheKey,inputDependencies:[`rank`]},[i[0]],a.noopWithEmptyAxes&&a.axes.length===0?Pi:r,a.axes,i[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},Ri=(e,t)=>{Ni(e.inputs),Li(e,`ReduceLogSum`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += ${e.getByIndices(`input_indices`)};`,`value = log(value);`])},zi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceL1`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += abs(${e.getByIndices(`input_indices`)});`,``])},Bi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceL2`,t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,``,`t = ${e.getByIndices(`input_indices`)}; value += (t * t);`,`value = sqrt(value);`])},Vi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceLogSumExp`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += exp(${e.getByIndices(`input_indices`)});`,`value = log(value);`])},Hi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceMax`,t,(e,t,n)=>{let r=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||n.length===0)&&r.push(e.indicesSet(`input_indices`,t,0));return[`${r.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};`,`value = max(value, ${e.getByIndices(`input_indices`)});`,``]})},Ui=(e,t)=>{Ni(e.inputs),Li(e,`ReduceMean`,t,(t,n,r)=>{let i=1;for(let n=0;n<t.rank;n++)(r.indexOf(n)>=0||r.length===0)&&(i*=e.inputs[0].dims[n]);return[`var sum = f32(0);`,``,`sum += f32(${t.getByIndices(`input_indices`)});`,`let value = ${n.type.value}(sum / ${i});`]})},Wi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceMin`,t,(e,t,n)=>{let r=[];for(let t=0;t<e.rank;t++)(n.indexOf(t)>=0||n.length===0)&&r.push(`input_indices[${t}] = 0;`);return[`${r.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};`,`value = min(value, ${e.getByIndices(`input_indices`)});`,``]})},Gi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceProd`,t,(e,t)=>[`var value = ${t.type.storage}(1);`,``,`value *= ${e.getByIndices(`input_indices`)};`,``])},Ki=(e,t)=>{Ni(e.inputs),Li(e,`ReduceSum`,t,(e,t)=>[`var value = ${t.type.storage}(0);`,``,`value += ${e.getByIndices(`input_indices`)};`,``])},qi=(e,t)=>{Ni(e.inputs),Li(e,`ReduceSumSquare`,t,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,``,`t = ${e.getByIndices(`input_indices`)}; value += t * t;`,``])},Ji=(e,t,n)=>{if(t.length===0)return n;let r=1,i=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?r*=e[n]:i*=e[n];return i<32&&r>1024},Yi=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ui(e,t):Si(e,t)},Xi=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zi(e,t):Ci(e,t)},Zi=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Bi(e,t):wi(e,t)},Qi=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vi(e,t):Ti(e,t)},$i=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Hi(e,t):Ei(e,t)},ea=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wi(e,t):Di(e,t)},ta=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Gi(e,t):Oi(e,t)},na=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ki(e,t):ki(e,t)},ra=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qi(e,t):Ai(e,t)},ia=(e,t)=>{Ji(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ri(e,t):ji(e,t)}}),oa,sa,ca,la,ua=P(()=>{"use strict";R(),K(),aa(),oa=e=>{if(!e||e.length===0||e.length>2)throw Error(`ArgMinMaxOp op requires 1 or 2 inputs.`);if(e[0].dataType!==1)throw Error(`Invalid input type.`)},sa=(e,t)=>{oa(e.inputs),e.compute(Fi(`ArgMin`,{hint:t.cacheKey,inputDependencies:[`rank`]},[e.inputs[0]],(e,n,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||r.length===0)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};
var best_index : i32 = 0;`,`if (${e.getByIndices(`input_indices`)} ${t.selectLastIndex>0?`<=`:`<`} value) {
         value = ${e.getByIndices(`input_indices`)};
         best_index = i32(last_index);
       }`,``,n.setByOffset(`global_idx`,`best_index`)]},[t.axis],7,t.keepDims),{inputs:[0]})},ca=(e,t)=>{oa(e.inputs),e.compute(Fi(`argMax`,{hint:t.cacheKey,inputDependencies:[`rank`]},[e.inputs[0]],(e,n,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||r.length===0)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices(`input_indices`)};
var best_index : i32 = 0;`,`if (${e.getByIndices(`input_indices`)} ${t.selectLastIndex>0?`>=`:`>`} value) {
         value = ${e.getByIndices(`input_indices`)};
         best_index = i32(last_index);
       }`,``,n.setByOffset(`global_idx`,`best_index`)]},[t.axis],7,t.keepDims),{inputs:[0]})},la=e=>G(e)}),da,fa,pa,ma,ha,ga,_a,va,ya=P(()=>{"use strict";R(),V(),W(),Q(),da=(e,t)=>{let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];if(o&&s)throw Error(`Attention cannot have both past and attention_bias`);if(n.dims.length!==3)throw Error(`Input "input" must have 3 dimensions`);let c=n.dims[0],l=n.dims[1],u=n.dims[2];if(i.dims.length!==1)throw Error(`Input "bias" is expected to have 1 dimensions`);if(r.dims.length!==2)throw Error(`Input "weights" is expected to have 2 dimensions`);if(r.dims[0]!==u)throw Error(`Input 1 dimension 0 should have same length as dimension 2 of input 0`);if(i.dims[0]!==r.dims[1])throw Error(`Input "bias" dimension 0 should have same length as dimension 1 of input "weights"`);let d=i.dims[0]/3,f=d,p=f;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw Error(`qkv_hidden_sizes attribute should have 3 elements`);for(let e of t.qkvHiddenSizes)if(e%t.numHeads!==0)throw Error(`qkv_hidden_sizes should be divisible by num_heads`);d=t.qkvHiddenSizes[0],f=t.qkvHiddenSizes[1],p=t.qkvHiddenSizes[2]}let m=l;if(d!==f)throw Error(`qkv_hidden_sizes first element should be same as the second`);if(i.dims[0]!==d+f+p)throw Error(`Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes`);let h=0;if(o){if(f!==p)throw Error(`Input "past" expect k_hidden_size == v_hidden_size`);if(o.dims.length!==5)throw Error(`Input "past" must have 5 dimensions`);if(o.dims[0]!==2)throw Error(`Input "past" first dimension must be 2`);if(o.dims[1]!==c)throw Error(`Input "past" second dimension must be batch_size`);if(o.dims[2]!==t.numHeads)throw Error(`Input "past" third dimension must be num_heads`);if(o.dims[4]!==f/t.numHeads)throw Error(`Input "past" fifth dimension must be k_hidden_size / num_heads`);t.pastPresentShareBuffer||(h=o.dims[3])}let g=m+h;if(a)throw Error(`Mask not supported`);if(o)throw Error(`past is not supported`);if(s){if(s.dims.length!==4)throw Error(`Input "attention_bias" must have 4 dimensions`);if(s.dims[0]!==c||s.dims[1]!==t.numHeads||s.dims[2]!==l||s.dims[3]!==g)throw Error(`Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)`)}return{batchSize:c,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:u,hiddenSize:d,vHiddenSize:p,headSize:Math.floor(d/t.numHeads),vHeadSize:Math.floor(p/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},fa=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset(`0`)});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset(`batchIdx`)}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?`let past_sequence_length = uniforms.past_sequence_length`:``};
    let present_sequence_length = total_sequence_length;
    `,pa=(e,t,n,r,i,a,o,s)=>{let c=J(o?1:a),l=64,u=a/c;u<l&&(l=32);let d=Math.ceil(a/c/l),f=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:i},{type:12,data:u},{type:12,data:d}],p=Gr(e.dataType,c),m=Kr(1,c),h=[`type`];return o&&h.push(`type`),s&&h.push(`type`),{name:`AttentionProbsSoftmax`,shaderCache:{hint:`${l};${p};${c}`,inputDependencies:h},getShaderSource:t=>{let n=Z(`x`,e.dataType,e.dims,c),r=[n],i=o?X(`seq_lens`,o.dataType,o.dims):void 0;i&&r.push(i);let a=s?X(`total_sequence_length_input`,s.dataType,s.dims):void 0;a&&r.push(a);let u=Kr(e.dataType);return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${t.registerUniforms([{name:`batch_size`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`past_sequence_length`,type:`u32`},{name:`sequence_length`,type:`u32`},{name:`total_sequence_length`,type:`u32`},{name:`elements_per_thread`,type:`u32`}]).declareVariables(...r)}
  ${t.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${fa(i,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?`u32(past_sequence_length + workgroup_id.y + 1)`:`total_sequence_length`};
    var thread_max_vector = ${m}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(c){case 1:return`thread_max_vector`;case 2:return`max(thread_max_vector.x, thread_max_vector.y)`;case 4:return`max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))`;default:throw Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(c){case 1:return`sum_vector`;case 2:return`sum_vector.x + sum_vector.y`;case 4:return`sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w`;default:throw Error(`Unsupported components: ${c}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${n.type.value}(${u}(1.0) / ${u}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${n.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${n.type.value}(${u}(0));
        }`:``};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*n},programUniforms:f})}},ma=(e,t,n,r,i,a,o,s,c)=>{let l=o+a.kvSequenceLength,u=[a.batchSize,a.numHeads,a.sequenceLength,l],d=e>1&&r,f=a.kvNumHeads?a.kvNumHeads:a.numHeads,p=d?[a.batchSize,f,l,a.headSize]:void 0,m=a.nReps?a.nReps:1,h=a.scale===0?1/Math.sqrt(a.headSize):a.scale,g=J(a.headSize),_=a.headSize/g,v={x:Math.ceil(l/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},y=[{type:12,data:a.sequenceLength},{type:12,data:_},{type:12,data:l},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:h},{type:12,data:o},{type:12,data:a.kvSequenceLength},{type:12,data:m}],b=d&&r&&B.size(r.dims)>0,x=[`type`,`type`];b&&x.push(`type`),i&&x.push(`type`),s&&x.push(`type`),c&&x.push(`type`);let S=[{dims:u,dataType:t.dataType,gpuDataType:0}];return d&&S.push({dims:p,dataType:t.dataType,gpuDataType:0}),{name:`AttentionProbs`,shaderCache:{hint:`${g};${i!==void 0};${r!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:S,dispatchGroup:v,programUniforms:y}),getShaderSource:e=>{let a=X(`q`,t.dataType,t.dims,g),o=[a,X(`key`,n.dataType,n.dims,g)];if(b){let e=X(`past_key`,r.dataType,r.dims,g);o.push(e)}i&&o.push(X(`attention_bias`,i.dataType,i.dims));let l=s?X(`seq_lens`,s.dataType,s.dims):void 0;l&&o.push(l);let f=c?X(`total_sequence_length_input`,c.dataType,c.dims):void 0;f&&o.push(f);let h=Z(`output`,t.dataType,u),_=[h];d&&_.push(Z(`present_key`,t.dataType,p,g));let v=Kr(1,g);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${a.type.storage}, 144>;
  var<workgroup> tileK: array<${a.type.storage}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`alpha`,type:`f32`},{name:`past_sequence_length`,type:`u32`},{name:`kv_sequence_length`,type:`u32`},{name:`n_reps`,type:`u32`}]).declareVariables(...o,..._)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?`headIdx`:`headIdx / uniforms.n_reps`};
    let kv_num_heads = ${m===1?`uniforms.num_heads`:`uniforms.num_heads / uniforms.n_reps`};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${fa(l,f,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${b&&d?`let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;`:``};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${d?`let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;`:``}
    var value = ${v}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${b&&d?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${d?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:``}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${v}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(g){case 1:return`value`;case 2:return`value.x + value.y`;case 4:return`value.x + value.y + value.z + value.w`;default:throw Error(`Unsupported components: ${g}`)}})()};
        output[outputIdx] = ${h.type.value} (sum * uniforms.alpha) + ${i?`attention_bias[outputIdx]`:`0.0`};
    }
  }`}}},ha=(e,t,n,r,i,a,o=void 0,s=void 0)=>{let c=a+i.kvSequenceLength,l=i.nReps?i.nReps:1,u=i.vHiddenSize*l,d=e>1&&r,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,p=d?[i.batchSize,f,c,i.headSize]:void 0,m=[i.batchSize,i.sequenceLength,u],h={x:Math.ceil(i.vHeadSize/12),y:Math.ceil(i.sequenceLength/12),z:i.batchSize*i.numHeads},g=[{type:12,data:i.sequenceLength},{type:12,data:c},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:u},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:l}],_=d&&r&&B.size(r.dims)>0,v=[`type`,`type`];_&&v.push(`type`),o&&v.push(`type`),s&&v.push(`type`);let y=[{dims:m,dataType:t.dataType,gpuDataType:0}];return d&&y.push({dims:p,dataType:t.dataType,gpuDataType:0}),{name:`AttentionScore`,shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:y,dispatchGroup:h,programUniforms:g}),getShaderSource:e=>{let i=X(`probs`,t.dataType,t.dims),a=[i,X(`v`,n.dataType,n.dims)];_&&a.push(X(`past_value`,r.dataType,r.dims));let c=o?X(`seq_lens`,o.dataType,o.dims):void 0;o&&a.push(c);let u=s?X(`total_sequence_length_input`,s.dataType,s.dims):void 0;s&&a.push(u);let f=[Z(`output`,t.dataType,m)];return d&&f.push(Z(`present_value`,t.dataType,p)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${i.type.value}, 144>;
  var<workgroup> tileV: array<${i.type.value}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`v_hidden_size`,type:`u32`},{name:`past_sequence_length`,type:`u32`},{name:`kv_sequence_length`,type:`u32`},{name:`n_reps`,type:`u32`}]).declareVariables(...a,...f)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?`headIdx`:`headIdx / uniforms.n_reps`};
   let kv_num_heads = ${l===1?`uniforms.num_heads`:`uniforms.num_heads / uniforms.n_reps`};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${fa(c,u,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${_&&d?`let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;`:``};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${d?`let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;`:``}
   var value = ${i.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${_&&d?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${d?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:``}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}},ga=(e,t,n,r,i,a,o,s,c,l,u=void 0,d=void 0)=>{let f=Math.min(e.outputCount,1+ +!!o+ +!!s),p=f>1?o:void 0,m=f>1?s:void 0,h=f>1?l.pastSequenceLength:0,g=h+l.kvSequenceLength,_=c&&B.size(c.dims)>0?c:void 0,v=[t,n];p&&B.size(p.dims)>0&&v.push(p),_&&v.push(_),u&&v.push(u),d&&v.push(d);let y=e.compute(ma(f,t,n,p,_,l,h,u,d),{inputs:v,outputs:f>1?[-1,1]:[-1]})[0];e.compute(pa(y,l.batchSize,l.numHeads,h,l.sequenceLength,g,u,d),{inputs:u&&d?[y,u,d]:[y],outputs:[]});let b=[y,r];m&&B.size(m.dims)>0&&b.push(m),u&&b.push(u),d&&b.push(d),e.compute(ha(f,y,r,m,l,h,u,d),{inputs:b,outputs:f>1?[0,2]:[0]})},_a=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,i=t.inputHiddenSize,a=t.headSize,o={x:Math.ceil(t.headSize/12),y:Math.ceil(t.sequenceLength/12),z:t.batchSize*t.numHeads},s=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}];return e.compute({name:`AttentionPrepare`,shaderCache:{inputDependencies:[`type`,`type`,`type`]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:c}),getShaderSource:e=>{let t=Z(`output_q`,s[0].dataType,n),r=Z(`output_k`,s[0].dataType,n),i=Z(`output_v`,s[0].dataType,n),a=X(`input`,s[0].dataType,s[0].dims),o=X(`weight`,s[1].dataType,s[1].dims),c=X(`bias`,s[2].dataType,s[2].dims),l=a.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${e.registerUniforms([{name:`M`,type:`u32`},{name:`K`,type:`u32`},{name:`N`,type:`u32`},{name:`num_heads`,type:`u32`},{name:`head_size`,type:`u32`},{name:`hidden_size`,type:`u32`},{name:`ldb`,type:`u32`}]).declareVariables(a,o,c,t,r,i)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${l}(0);
    var valueK = ${l}(0);
    var valueV = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:s,outputs:[-1,-1,-1]})},va=(e,t)=>{let n=da(e.inputs,t),[r,i,a]=_a(e,n);return ga(e,r,i,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}}),ba,xa,Sa,Ca,wa=P(()=>{"use strict";Qt(),R(),V(),K(),Q(),ba=(e,t)=>{if(!e||e.length!==5)throw Error(`BatchNormalization requires 5 inputs`);let n=(e,t,n)=>{let r=t.length;if(r!==e.length)throw Error(`${n}: num dimensions != ${r}`);t.forEach((t,r)=>{if(t!==e[r])throw Error(`${n}: dim[${r}] do not match`)})};if(e[0].dims.length>1){let r=t.format===`NHWC`?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,`Invalid input scale`),n(e[2].dims,r,`Invalid input B`),n(e[3].dims,r,`Invalid input mean`),n(e[4].dims,r,`Invalid input var`)}else n(e[1].dims,[1],`Invalid input scale`),n(e[2].dims,[1],`Invalid input B`),n(e[3].dims,[1],`Invalid input mean`),n(e[4].dims,[1],`Invalid input var`)},xa=(e,t)=>{let{epsilon:n,spatial:r,format:i}=t,a=e[0].dims,o=r?J(a[a.length-1]):1,s=i===`NHWC`&&a.length>1?o:1,c=B.size(a)/o,l=r,u=l?a.length:a,d=X(`x`,e[0].dataType,e[0].dims,o),f=X(`scale`,e[1].dataType,e[1].dims,s),p=X(`bias`,e[2].dataType,e[2].dims,s),m=X(`inputMean`,e[3].dataType,e[3].dims,s),h=X(`inputVar`,e[4].dataType,e[4].dims,s),g=Z(`y`,e[0].dataType,u,o),_=()=>{let e=``;if(r)e=`let cOffset = ${a.length===1?`0u`:i===`NHWC`?`outputIndices[${a.length-1}] / ${o}`:`outputIndices[1]`};`;else if(i===`NCHW`)e=`
            ${g.indicesSet(`outputIndices`,`0`,`0`)}
            let cOffset = ${g.indicesToOffset(`outputIndices`)};`;else{e=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let t=1;t<f.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${f.indicesToOffset(`cIndices`)};`}return e};return{name:`BatchNormalization`,shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${o}`,inputDependencies:l?[`rank`,`type`,`type`,`type`,`type`]:void 0},getShaderSource:e=>`
  const epsilon = ${n};
  ${e.registerUniform(`outputSize`,`u32`).declareVariables(d,f,p,m,h,g)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${_()}
    let scale = ${f.getByOffset(`cOffset`)};
    let bias = ${p.getByOffset(`cOffset`)};
    let inputMean = ${m.getByOffset(`cOffset`)};
    let inputVar = ${h.getByOffset(`cOffset`)};
    let x = ${d.getByOffset(`global_idx`)};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset(`global_idx`,`value`)}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l?[{type:12,data:c},...q(a)]:[{type:12,data:c}]})}},Sa=e=>G(e),Ca=(e,t)=>{let{inputs:n,outputCount:r}=e,i=Sa({...t,outputCount:r});if(F.webgpu.validateInputContent&&ba(n,i),t.trainingMode)throw Error(`BatchNormalization trainingMode is not supported yet.`);e.compute(xa(n,i))}}),Ta,Ea,Da,Oa=P(()=>{"use strict";V(),Q(),Ta=e=>{if(e[0].dims.length!==3)throw Error(`input should have 3 dimensions`);if(![320,640,1280].includes(e[0].dims[2]))throw Error(`number of channels should be 320, 640 or 1280`);if(e[1].dims.length!==1)throw Error(`bias is expected to have 1 dimensions`);if(e[0].dims[2]!==e[1].dims[0])throw Error(`last dimension of input and bias are not the same`)},Ea=e=>{let t=e[0].dims,n=e[0].dims[2],r=B.size(t)/4,i=e[0].dataType,a=X(`input`,i,t,4),o=X(`bias`,i,[n],4),s=X(`residual`,i,t,4),c=Z(`output`,i,t,4);return{name:`BiasAdd`,getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:e=>`
  const channels = ${n}u / 4;
  ${e.declareVariables(a,o,s,c)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset(`global_idx`)}
      + ${o.getByOffset(`global_idx % channels`)} + ${s.getByOffset(`global_idx`)};
    ${c.setByOffset(`global_idx`,`value`)}
  }`}},Da=e=>{Ta(e.inputs),e.compute(Ea(e.inputs))}}),ka,$,Aa,ja,Ma,Na,Pa,Fa,Ia,La,Ra,za,Ba,Va,Ha,Ua,Wa,Ga,Ka,qa,Ja,Ya,Xa,Za,Qa,$a,eo,to,no,ro,io,ao,oo,so,co,lo,uo,fo,po,mo,ho,go,_o,vo,yo,bo=P(()=>{"use strict";R(),V(),K(),Q(),ka=(e,t,n,r,i,a,o)=>{let s=Math.ceil(t/4),c=``;c=typeof i==`string`?`${i}(a)`:i(`a`);let l=X(`inputData`,n,[s],4),u=Z(`outputData`,r,[s],4),d=[{name:`vec_size`,type:`u32`}];return o&&d.push(...o),`
      ${e.registerUniforms(d).declareVariables(l,u)}

  ${a??``}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}

    let a = ${l.getByOffset(`global_idx`)};
    ${u.setByOffset(`global_idx`,c)}
  }`},$=(e,t,n,r,i,a=e.dataType,o,s)=>{let c=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return o&&c.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:[`type`]},getShaderSource:t=>ka(t,B.size(e.dims),e.dataType,a,n,r,s),getRunData:t=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(B.size(t[0].dims)/64/4)},programUniforms:c})}},Aa=e=>{e.compute($(e.inputs[0],`Abs`,`abs`))},ja=e=>{e.compute($(e.inputs[0],`Acos`,`acos`))},Ma=e=>{e.compute($(e.inputs[0],`Acosh`,`acosh`))},Na=e=>{e.compute($(e.inputs[0],`Asin`,`asin`))},Pa=e=>{e.compute($(e.inputs[0],`Asinh`,`asinh`))},Fa=e=>{e.compute($(e.inputs[0],`Atan`,`atan`))},Ia=e=>{e.compute($(e.inputs[0],`Atanh`,`atanh`))},La=e=>G(e),Ra=(e,t)=>{let n;switch(t.to){case 10:n=`vec4<f16>`;break;case 1:n=`vec4<f32>`;break;case 12:n=`vec4<u32>`;break;case 6:n=`vec4<i32>`;break;case 9:n=`vec4<bool>`;break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute($(e.inputs[0],`Cast`,n,void 0,t.cacheKey,t.to))},za=e=>{let t,n,r=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=i?e[2].getUint16Array()[0]:31743;break;default:throw Error(`Unsupport data type`)}return G({min:t,max:n})},Ba=(e,t)=>{let n=t||za(e.inputs),r=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`Clip`,e=>`clamp(${e}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:`min`,type:r},{name:`max`,type:r}]),{inputs:[0]})},Va=e=>{e.compute($(e.inputs[0],`Ceil`,`ceil`))},Ha=e=>{e.compute($(e.inputs[0],`Cos`,`cos`))},Ua=e=>{e.compute($(e.inputs[0],`Cosh`,`cosh`))},Wa=e=>G(e),Ga=(e,t)=>{let n=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`Elu`,e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Ka=(e=`f32`)=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,qa=e=>{let t=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`Erf`,e=>`erf_vf32(${e})`,Ka(t)))},Ja=e=>{e.compute($(e.inputs[0],`Exp`,`exp`))},Ya=e=>{e.compute($(e.inputs[0],`Floor`,`floor`))},Xa=e=>{let t=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`Gelu`,e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,Ka(t)))},Za=(e,t)=>{let n=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`LeakyRelu`,e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Qa=e=>{e.compute($(e.inputs[0],`Not`,e=>`!${e}`))},$a=e=>{e.compute($(e.inputs[0],`Neg`,e=>`-${e}`))},eo=e=>{e.compute($(e.inputs[0],`Reciprocal`,e=>`1.0/${e}`))},to=e=>{let t=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`Relu`,e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},no=e=>{e.compute($(e.inputs[0],`Sigmoid`,e=>`(1.0 / (1.0 + exp(-${e})))`))},ro=e=>G(e),io=(e,t)=>{let n=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`HardSigmoid`,e=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${e} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},ao=e=>{e.compute($(e.inputs[0],`Sin`,`sin`))},oo=e=>{e.compute($(e.inputs[0],`Sinh`,`sinh`))},so=e=>{e.compute($(e.inputs[0],`Sqrt`,`sqrt`))},co=e=>{e.compute($(e.inputs[0],`Tan`,`tan`))},lo=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,uo=e=>{e.compute($(e.inputs[0],`Tanh`,lo))},fo=(e=`f32`)=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${lo(`v`)};
}
`,po=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,mo=e=>{let t=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`FastGelu`,po,fo(t),void 0,e.inputs[0].dataType))},ho=(e,t)=>{let n=Kr(e.inputs[0].dataType);return e.compute($(e.inputs[0],`ThresholdedRelu`,e=>`select(vec4<${n}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},go=e=>{e.compute($(e.inputs[0],`Log`,`log`))},_o=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,vo=e=>`quick_gelu_impl(${e})`,yo=(e,t)=>{let n=Kr(e.inputs[0].dataType);e.compute($(e.inputs[0],`QuickGelu`,vo,_o(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),xo,So,Co,wo=P(()=>{"use strict";V(),Q(),bo(),xo=e=>{if(e[0].dims.length!==3)throw Error(`input should have 3 dimensions`);if(![2560,5120,10240].includes(e[0].dims[2]))throw Error(`hidden state should be 2560, 5120 or 10240`);if(e[1].dims.length!==1)throw Error(`bias is expected to have 1 dimensions`);if(e[0].dims[2]!==e[1].dims[0])throw Error(`last dimension of input and bias are not the same`)},So=e=>{let t=e[0].dims.slice();t[2]/=2;let n=X(`input`,e[0].dataType,e[0].dims,4),r=X(`bias`,e[0].dataType,[e[0].dims[2]],4),i=Z(`output`,e[0].dataType,t,4),a=B.size(t)/4,o=Gr(e[0].dataType);return{name:`BiasSplitGelu`,getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${t.declareVariables(n,r,i)}

  ${Ka(o)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset(`global_idx`,`valueLeft * geluRight`)}
  }`}},Co=e=>{xo(e.inputs),e.compute(So(e.inputs))}}),To,Eo,Do,Oo,ko,Ao,jo,Mo,No,Po,Fo,Io,Lo,Ro=P(()=>{"use strict";R(),V(),Q(),To=(e,t,n,r,i,a,o,s,c,l,u,d)=>{let f,p;typeof s==`string`?f=p=(e,t)=>`${s}((${e}),(${t}))`:typeof s==`function`?f=p=s:(f=s.scalar,p=s.vector);let m=Z(`outputData`,u,r.length,4),h=X(`aData`,c,t.length,4),g=X(`bData`,l,n.length,4),_;if(i)if(a){let e=B.size(t)===1,r=B.size(n)===1,i=t.length>0&&t[t.length-1]%4==0,a=n.length>0&&n[n.length-1]%4==0;_=e||r?m.setByOffset(`global_idx`,p(e?`${h.type.value}(${h.getByOffset(`0`)}.x)`:h.getByOffset(`global_idx`),r?`${g.type.value}(${g.getByOffset(`0`)}.x)`:g.getByOffset(`global_idx`))):`
            let outputIndices = ${m.offsetToIndices(`global_idx * 4u`)};
            let offsetA = ${h.broadcastedIndicesToOffset(`outputIndices`,m)};
            let offsetB = ${g.broadcastedIndicesToOffset(`outputIndices`,m)};
            ${m.setByOffset(`global_idx`,p(o||i?h.getByOffset(`offsetA / 4u`):`${h.type.value}(${h.getByOffset(`offsetA / 4u`)}[offsetA % 4u])`,o||a?g.getByOffset(`offsetB / 4u`):`${g.type.value}(${g.getByOffset(`offsetB / 4u`)}[offsetB % 4u])`))}
          `}else _=m.setByOffset(`global_idx`,p(h.getByOffset(`global_idx`),g.getByOffset(`global_idx`)));else{if(!a)throw Error(`no necessary to use scalar implementation for element-wise binary op implementation.`);let e=(e,t,n=``)=>{let r=`aData[indexA${t}][componentA${t}]`,i=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${m.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${h.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let offsetB${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,m)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${n}(${f(r,i)});
          `};_=u===9?`
            var data = vec4<u32>(0);
            ${e(`data`,0,`u32`)}
            ${e(`data`,1,`u32`)}
            ${e(`data`,2,`u32`)}
            ${e(`data`,3,`u32`)}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e(`outputData[global_idx]`,0)}
            ${e(`outputData[global_idx]`,1)}
            ${e(`outputData[global_idx]`,2)}
            ${e(`outputData[global_idx]`,3)}
          `}return`
        ${e.registerUniform(`vec_size`,`u32`).declareVariables(h,g,m)}

        ${d??``}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
        ${_}
      }`},Eo=(e,t,n,r,i,a,o=n.dataType)=>{let s=n.dims.map(Number),c=r.dims.map(Number),l=!B.areEqual(s,c),u=s,d=B.size(s),f=!1,p=!1,m=[l];if(l){let e=dr.calcShape(s,c,!1);if(!e)throw Error(`Can't perform binary op on the given tensors`);u=e.slice(),d=B.size(u);let t=B.size(s)===1,n=B.size(c)===1,r=s.length>0&&s[s.length-1]%4==0,i=c.length>0&&c[c.length-1]%4==0;m.push(t),m.push(n),m.push(r),m.push(i);let a=1;for(let e=1;e<u.length;e++){let t=s[s.length-e];if(t===c[c.length-e])a*=t;else break}a%4==0?(p=!0,f=!0):(t||n||r||i)&&(f=!0)}else f=!0;return m.push(f),{name:e,shaderCache:{hint:t+m.map(e=>e.toString()).join(`_`),inputDependencies:[`rank`,`rank`]},getShaderSource:e=>To(e,s,c,u,f,l,p,i,n.dataType,r.dataType,o,a),getRunData:()=>({outputs:[{dims:u,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(u)/4)},...q(s,c,u)]})}},Do=(e,t,n,r,i,a)=>{e.compute(Eo(t,i??``,e.inputs[0],e.inputs[1],n,r,a))},Oo=e=>{Do(e,`Add`,(e,t)=>`${e}+${t}`)},ko=e=>{Do(e,`Div`,(e,t)=>`${e}/${t}`)},Ao=e=>{Do(e,`Equal`,{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},jo=e=>{Do(e,`Mul`,(e,t)=>`${e}*${t}`)},Mo=e=>{let t=X(`input`,e.inputs[0].dataType,e.inputs[0].dims).type.value;Do(e,`Pow`,{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t===`i32`?`round`:``}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},No=e=>{Do(e,`Sub`,(e,t)=>`${e}-${t}`)},Po=e=>{Do(e,`Greater`,{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},Fo=e=>{Do(e,`Less`,{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},Io=e=>{Do(e,`GreaterOrEqual`,{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},Lo=e=>{Do(e,`LessOrEqual`,{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),zo,Bo,Vo,Ho,Uo,Wo,Go=P(()=>{"use strict";R(),V(),K(),Q(),zo=(e,t)=>{if(!e||e.length<1)throw Error(`too few inputs`);let n=e[0],r=n.dataType,i=n.dims.length;e.forEach((e,a)=>{if(a!==0){if(e.dataType!==r)throw Error(`input tensors should be one type`);if(e.dims.length!==i)throw Error(`input tensors should have the same shape`);e.dims.forEach((e,r)=>{if(r!==t&&e!==n.dims[r])throw Error(`non concat dimensions must match`)})}})},Bo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Vo=(e,t)=>{let n=e.length,r=[];for(let i=0;i<n;++i){let a=t.setByOffset(`global_idx`,e[i].getByIndices(`indices`));n===1?r.push(a):i===0?r.push(`if (inputIndex == ${i}u) { ${a} }`):i===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${i}) { ${a} }`)}return r.join(`
`)},Ho=(e,t,n,r)=>{let i=B.size(n),a=Array(e.length),o=Array(e.length),s=0,c=[],l=[],u=[{type:12,data:i}];for(let n=0;n<e.length;++n)s+=e[n].dims[t],a[n]=s,l.push(e[n].dims.length),o[n]=X(`input${n}`,r,l[n]),c.push(`rank`),u.push({type:12,data:a[n]});for(let t=0;t<e.length;++t)u.push(...q(e[t].dims));u.push(...q(n));let d=Z(`output`,r,n.length),f=d.indicesGet(`indices`,t),p=Array.from(Array(a.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(`,`);return{name:`Concat`,shaderCache:{hint:`${t}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:u}),getShaderSource:t=>`

  ${(()=>{t.registerUniform(`outputSize`,`u32`);for(let n=0;n<e.length;n++)t.registerUniform(`sizeInConcatAxis${n}`,`u32`);return t.declareVariables(...o,d)})()}

  ${Bo(a.length,p)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

    var indices = ${d.offsetToIndices(`global_idx`)};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${p});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Vo(o,d)}
  }`}},Uo=(e,t)=>{let n=e.inputs,r=n[0].dims,i=B.normalizeAxis(t.axis,r.length);zo(n,i);let a=r.slice();a[i]=n.reduce((e,t)=>e+(t.dims.length>i?t.dims[i]:0),0);let o=n.filter(e=>B.size(e.dims)>0);e.compute(Ho(o,i,a,n[0].dataType),{inputs:o})},Wo=e=>G({axis:e.axis})}),Ko,qo,Jo,Yo,Xo=P(()=>{"use strict";R(),V(),Ko=(e,t,n=`f32`)=>{switch(e.activation){case`Relu`:return`value = max(value, ${t}(0.0));`;case`Sigmoid`:return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case`Clip`:return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case`HardSigmoid`:return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case`LeakyRelu`:return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case`Tanh`:return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case``:return``;default:throw Error(`Unsupported activation ${e.activation}`)}},qo=(e,t)=>{e.activation===`Clip`?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation===`HardSigmoid`?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation===`LeakyRelu`&&t.push({type:1,data:e.alpha})},Jo=(e,t)=>{e.activation===`Clip`?t.push({name:`clip_max`,type:`f32`},{name:`clip_min`,type:`f32`}):e.activation===`HardSigmoid`?t.push({name:`alpha`,type:`f32`},{name:`beta`,type:`f32`}):e.activation===`LeakyRelu`&&t.push({name:`alpha`,type:`f32`})},Yo=e=>{let t=e?.activation||``;if(t===`HardSigmoid`){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}if(t===`Clip`){let[n,r]=e?.activation_params||[mr,hr];return{activation:t,clipMax:r,clipMin:n}}if(t===`LeakyRelu`){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}}),Zo,Qo,$o=P(()=>{"use strict";Zo=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},Qo=e=>`
      ${e?`value = value + getBiasByOutputCoords(coords);`:``}
      `}),es,ts=P(()=>{"use strict";es=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ns,rs,is=P(()=>{"use strict";R(),V(),Q(),Xo(),ns=(e,t,n,r,i)=>{let a=r-n;return`
      ${Array.from({length:n}).map((n,o)=>`
      if (${Y(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,Y(i,o+a,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join(``)}
`},rs=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,c=o[o.length-2],l=s[s.length-1],u=o[o.length-1],d=J(l),f=J(u),p=J(c),m=B.size(n)/d/p,h=e.length>2,g=r?r.slice(0,-2):n.slice(0,-2),_=[B.size(g),c,l],v=[{type:12,data:m},{type:12,data:c},{type:12,data:l},{type:12,data:u}];return qo(t,v),v.push(...q(g,o,s)),h&&v.push(...q(e[2].dims)),v.push(...q(_)),{name:`MatMulNaive`,shaderCache:{hint:`${t.activation};${d};${f};${p};${i}`,inputDependencies:h?[`rank`,`rank`,`rank`]:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:v}),getShaderSource:r=>{let a=Qr(`batch_dims`,e[0].dataType,g.length),c=X(`a`,e[0].dataType,o.length,f),l=X(`b`,e[1].dataType,s.length,d),u=Z(`output`,e[0].dataType,_.length,d),m=Gr(u.type.tensor),v=Ko(t,u.type.value,m),y=[c,l],b=``;if(h){let t=i?d:1;y.push(X(`bias`,e[2].dataType,e[2].dims.length,t)),b=`${i?`value += bias[col / ${t}];`:`value += ${u.type.value}(bias[row + i]);`}`}let x=[{name:`output_size`,type:`u32`},{name:`M`,type:`u32`},{name:`N`,type:`u32`},{name:`K`,type:`u32`}];Jo(t,x);let S=()=>{let e=`var a_data: ${c.type.value};`;for(let t=0;t<f;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${d}];`;for(let t=0;t<p;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${f}];`;for(let n=0;n<f;n++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${f===1?``:`[${n}]`}), b_data${n}, values[${t}]);
`}return e};return`
  ${r.registerUniforms(x).registerInternalVariables(a).declareVariables(...y,u)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${n.length===2?``:`let batch_indices = ${a.offsetToIndices(`batch`)};`}

    var a_indices: ${c.type.indices};
    ${ns(`a_indices`,c,c.rank-2,a.rank,`batch_indices`)}
    ${c.indicesSet(`a_indices`,c.rank-2,0)}
    ${c.indicesSet(`a_indices`,c.rank-1,0)}
    let a_offset = ${c.indicesToOffset(`a_indices`)};

    var b_indices: ${l.type.indices};
    ${ns(`b_indices`,l,l.rank-2,a.rank,`batch_indices`)}
    ${l.indicesSet(`b_indices`,l.rank-2,0)}
    ${l.indicesSet(`b_indices`,l.rank-1,0)}
    let b_offset = ${l.indicesToOffset(`b_indices`)};
    var values: array<${u.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${S()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${b}
      ${v}
      let cur_indices = ${u.type.indices}(batch, row + i, col);
      let offset = ${u.indicesToOffset(`cur_indices`)};
      ${u.setByOffset(`offset / ${d}`,`value`)};
    }
  }
  `}}}}),as,os,ss,cs,ls,us,ds,fs,ps=P(()=>{"use strict";R(),V(),Q(),Xo(),is(),$o(),as=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?`, batchIndices`:``});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?`, batchIndices`:``});
        `,os=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?``:`let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];`}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?``:`acc[i] = BCached3 * ACached3[i] + acc[i];`}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?``:`acc[i] = BCached3 * ACached.w + acc[i];`}
        }`,ss=(e,t,n=`f32`,r,i=!1,a=32,o=!1,s=32)=>{let c=t[1]*e[1],l=t[0]*e[0],u=i?c:a,d=i?a:c,f=u/t[0],p=a/t[1];if(!((i&&f===4&&e[1]===4||!i&&(f===3||f===4))&&u%t[0]===0&&a%t[1]===0&&e[0]===4))throw Error(`If transposeA ${i} is true, innerElementSize ${f} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${n}>, ${u/f}>, ${d}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${f};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?`0`:`i32(globalId.z)`};
  ${r?`let batchIndices = ${r.offsetToIndices(`u32(batch)`)};`:``}
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${o?`${Math.ceil(s/a)}`:`(uniforms.dim_inner - 1) / tileInner + 1`};
  var kStart = ${o?`i32(globalId.z) * ${s}`:`0`};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${p};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${as(i,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?`, batchIndices`:``});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?``:`let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];`}

          ${os(i,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},cs=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?`, batchIndices`:``});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?`, batchIndices`:``});
            `,ls=e=>e?`let ACached = mm_Asub[k][tileRow + innerRow];`:`let ACached = mm_Asub[tileRow + innerRow][k];`,us=(e,t,n=`f32`,r,i=!1,a=32,o=!1,s=32,c=!1)=>{let l=e[1]*t[1],u=e[0]*t[0],d=i?l:a,f=i?a:l;if(f%t[1]!==0||d%t[0]!==0||a%t[1]!==0)throw Error(`tileAHight ${f} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let p=f/t[1],m=d/t[0],h=a/t[1],g=c?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${u};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          ${cs(i,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?`, batchIndices`:``});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${p};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${cs(i,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?`, batchIndices`:``});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${ls(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${d}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${u}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?`0`:`i32(globalId.z)`};
    ${r?`let batchIndices = ${r.offsetToIndices(`u32(batch)`)};`:``}
    let num_tiles = ${o?`${Math.ceil(s/a)}`:`(uniforms.dim_inner - 1) / tileInner + 1`};
    var kStart = ${o?`i32(globalId.z) * ${s}`:`0`};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${g}
  }
`},ds=(e,t,n,r,i=!1)=>{let[a,o,s,c]=r,l=Gr(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Zo(e,l)} {
      var value = ${Zo(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${ns(`aIndices`,o,o.rank-2,a.rank,`batchIndices`)}
        ${o.indicesSet(`aIndices`,o.rank-2,`u32(row)`)}
        ${o.indicesSet(`aIndices`,o.rank-1,`u32(colIn)`)}
        value = ${o.getByIndices(`aIndices`)};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Zo(e,l)} {
      var value = ${Zo(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${ns(`bIndices`,s,s.rank-2,a.rank,`batchIndices`)}
        ${s.indicesSet(`bIndices`,s.rank-2,`u32(row)`)}
        ${s.indicesSet(`bIndices`,s.rank-1,`u32(colIn)`)}
        value = ${s.getByIndices(`bIndices`)};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Zo(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?`bias[colIn]`:`${Zo(e,l)}(bias[row])`};`:``}
        ${n}
        ${c.setByIndices(`vec3<u32>(coords)`,`value`)}
      }
    }
    `},fs=(e,t,n,r,i=!1,a)=>{let o=e[0].dims,s=e[1].dims,c=o.slice(0,-2),l=s.slice(0,-2),u=r?r.slice(0,-2):n.slice(0,-2),d=B.size(u),f=o[o.length-2],p=o[o.length-1],m=s[s.length-1],h=p%4==0&&m%4==0,g=f<=8?[4,1,1]:[4,4,1],_=[8,8,1],v=[Math.ceil(m/_[0]/g[0]),Math.ceil(f/_[1]/g[1]),Math.ceil(d/_[2]/g[2])],y=h?4:1,b=[...c,f,p/y],x=b.length,S=[...l,p,m/y],C=S.length,w=[d,f,m/y],T=[{type:6,data:f},{type:6,data:m},{type:6,data:p}];qo(t,T),T.push(...q(u,b,S));let E=[`rank`,`rank`],D=e.length>2;return D&&(T.push(...q(e[2].dims)),E.push(`rank`)),T.push(...q(w)),{name:`MatMul`,shaderCache:{hint:`${g};${t.activation};${h};${i}`,inputDependencies:E},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:T}),getShaderSource:n=>{let r=u.length,a=Qr(`batchDims`,e[0].dataType,r,1),o=Gr(e[0].dataType),s=X(`a`,e[0].dataType,x,y),c=X(`b`,e[1].dataType,C,y),l=Z(`result`,e[0].dataType,w.length,y),d=[s,c];if(D){let t=i?y:1;d.push(X(`bias`,e[2].dataType,e[2].dims.length,t))}let f=[{name:`dim_a_outer`,type:`i32`},{name:`dim_b_outer`,type:`i32`},{name:`dim_inner`,type:`i32`}];Jo(t,f);let p=Gr(l.type.tensor),m=Ko(t,l.type.value,p),v=ds(y,D,m,[a,s,c,l],i);return`
  ${n.registerUniforms(f).registerInternalVariables(a).declareVariables(...d,l)}
  ${v}
  ${h?ss(g,_,o,a):us(g,_,o,a)}
                   `}}}}),ms,hs,gs=P(()=>{"use strict";R(),lr(),Q(),Xo(),$o(),ts(),ps(),ms=(e,t,n,r,i=!1,a,o=4,s=4,c=4,l=`f32`)=>{let u=e=>{switch(e){case 1:return`resData = x[xIndex];`;case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return`resData = x[xIndex / 4];`;default:throw Error(`innerElementSize ${e} is not supported.`)}},d=e=>{switch(e){case 1:return`return w[row * i32(uniforms.w_shape[3]) + colIn];`;case 4:return`return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];`;default:throw Error(`innerElementSize ${e} is not supported.`)}},f=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,p=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?`i32(uniforms.x_shape[1])`:`i32(uniforms.x_shape[2])`,h=e?`i32(uniforms.x_shape[2])`:`i32(uniforms.x_shape[3])`,g=e?`row`:`col`,_=e?`col`:`row`,v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?`i32(uniforms.result_shape[2])`:`i32(uniforms.result_shape[3])`};
    let outRow = ${g} / outWidth;
    let outCol = ${g} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${Zo(o,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${u(o)}
    }
    return resData;`,y=e?t&&r?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Zo(o,l)}(0.0);`:r&&n?`
    let col = colIn * ${o};
    ${v}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Zo(o,l)}(0.0);`,b=e?r&&n?d(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(s)}
    }
    return ${Zo(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(s)}
    }
    return ${Zo(s,l)}(0.0);`,x=Zo(c,l),S=Zo(e?o:s,l),C=Zo(e?s:o,l),w=Ko(a,x,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?y:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?b:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${x}) {
      let col = colIn * ${c};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?`i32(uniforms.result_shape[2])`:`i32(uniforms.result_shape[3])`};
      ${p}
      ${Qo(i)}
      ${w}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},hs=(e,t,n,r,i,a,o,s,c)=>{let l=t.format===`NHWC`,u=l?e[0].dims[3]:e[0].dims[1],d=n[0],f=l?n[2]:n[3],p=l?n[1]:n[2],m=l?n[3]:n[1],h=l&&(u%4==0||u%3==0)&&m%4==0,g=l?m:f*p,_=l?f*p:m,v=[8,8,1],y=r<=8?[4,1,1]:[4,4,1],b=[Math.ceil(g/v[0]/y[0]),Math.ceil(_/v[1]/y[1]),Math.ceil(d/v[2]/y[2])];z(`verbose`,()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let x=h?l&&u%4!=0?3:4:1,S=v[1]*y[1],C=v[0]*y[0],w=Math.max(v[0]*x,v[1]),T=r%S===0,E=i%C===0,D=a%w===0,O=h?[x,4,4]:[1,1,1],k=[{type:6,data:r},{type:6,data:i},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qo(t,k),k.push(...q(e[0].dims,e[1].dims));let A=[`rank`,`rank`];return o&&(k.push(...q(e[2].dims)),A.push(`rank`)),k.push(...q(n)),{name:`Conv2DMatMul`,shaderCache:{hint:`${t.cacheKey};${x};${h};${T};${E};${D};${S};${C};${w}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:c?c(n):n,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:k}),getShaderSource:r=>{let i=[{name:`dim_a_outer`,type:`i32`},{name:`dim_b_outer`,type:`i32`},{name:`dim_inner`,type:`i32`},{name:`pad`,type:`i32`,length:2},{name:`stride`,type:`i32`,length:2},{name:`dilation`,type:`i32`,length:2}];Jo(t,i);let a=h?4:1,c=Gr(e[0].dataType),u=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${c}>`:c}) {
        result[flatIndex] = ${h?`vec4<${c}>`:c}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${c}>`:c}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?`/ 4`:``}, value);
      }`,d=[X(`x`,e[0].dataType,e[0].dims.length,x===3?1:x),X(`w`,e[1].dataType,e[1].dims.length,a)],f=Z(`result`,e[0].dataType,n.length,a);if(o){let t=X(`bias`,e[2].dataType,e[2].dims.length,a);d.push(t),u+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${c}>`:c} {
          return bias[coords.${l?`w`:`y`}${h?`/ 4`:``}];
        }`}return`
        ${es(`uniforms.result_strides`)}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${r.registerUniforms(i).declareVariables(...d,f)}
        ${u}
        ${ms(l,T,E,D,o,t,O[0],O[1],O[2],c)}
        ${h?ss(y,v,c,void 0,!l,w):us(y,v,c,void 0,!l,w,!1,void 0,s)}`}}}}),_s,vs,ys,bs,xs,Ss,Cs,ws,Ts=P(()=>{"use strict";R(),lr(),V(),Q(),Xo(),$o(),_s=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},vs=e=>typeof e==`number`?[e,e,e]:e,ys=(e,t)=>t<=1?e:e+(e-1)*(t-1),bs=(e,t,n,r=1)=>{let i=ys(t,r);return Math.floor((e[0]*(n-1)-n+i)/2)},xs=(e,t,n,r,i)=>{i??=bs(e,t[0],r[0]);let a=[0,0,0,n];for(let n=0;n<3;n++)e[n]+2*i>=t[n]&&(a[n]=Math.trunc((e[n]-t[n]+2*i)/r[n]+1));return a},Ss=(e,t,n,r,i,a,o,s,c,l)=>{let u,d,f,p;if(e===`VALID`&&(e=0),typeof e==`number`){u={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=xs([t,n,r,1],[s,c,l],1,[i,a,o],e);d=m[0],f=m[1],p=m[2]}else if(Array.isArray(e)){if(!e.every((e,t,n)=>e===n[0]))throw Error(`Unsupported padding parameter: ${e}`);u={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=xs([t,n,r,1],[s,c,l],1,[i,a,o],e[0]);d=m[0],f=m[1],p=m[2]}else if(e===`SAME_UPPER`){d=Math.ceil(t/i),f=Math.ceil(n/a),p=Math.ceil(r/o);let e=(d-1)*i+s-t,m=(f-1)*a+c-n,h=(p-1)*o+l-r,g=Math.floor(e/2),_=e-g,v=Math.floor(m/2),y=m-v,b=Math.floor(h/2);u={top:v,bottom:y,left:b,right:h-b,front:g,back:_}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:u,outDepth:d,outHeight:f,outWidth:p}},Cs=(e,t,n,r,i,a=!1,o=`channelsLast`)=>{let s,c,l,u,d;if(o===`channelsLast`)[s,c,l,u,d]=e;else if(o===`channelsFirst`)[s,d,c,l,u]=e;else throw Error(`Unknown dataFormat ${o}`);let[f,,p,m,h]=t,[g,_,v]=vs(n),[y,b,x]=vs(r),S=ys(p,y),C=ys(m,b),w=ys(h,x),{padInfo:T,outDepth:E,outHeight:D,outWidth:O}=Ss(i,c,l,u,g,_,v,S,C,w),k=a?f*d:f,A=[0,0,0,0,0];return o===`channelsFirst`?A=[s,k,E,D,O]:o===`channelsLast`&&(A=[s,E,D,O,k]),{batchSize:s,dataFormat:o,inDepth:c,inHeight:l,inWidth:u,inChannels:d,outDepth:E,outHeight:D,outWidth:O,outChannels:k,padInfo:T,strideDepth:g,strideHeight:_,strideWidth:v,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:S,effectiveFilterHeight:C,effectiveFilterWidth:w,dilationDepth:y,dilationHeight:b,dilationWidth:x,inShape:e,outShape:A,filterShape:t}},ws=(e,t,n,r,i,a)=>{let o=a===`channelsLast`;o?e[0].dims[3]:e[0].dims[1];let s=[64,1,1],c={x:n.map((e,t)=>t)},l=[Math.ceil(_s(c.x.map(e=>n[e]))/s[0]),1,1];z(`verbose`,()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let u=[{type:12,data:B.size(n)},{type:12,data:r},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];qo(t,u),u.push(...q(e[0].dims,e[1].dims));let d=[`rank`,`rank`],f=e.length===3;return f&&(u.push(...q(e[2].dims)),d.push(`rank`)),u.push(...q(n)),{name:`Conv3DNaive`,shaderCache:{hint:`${t.cacheKey};${o};1;${f}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:u}),getShaderSource:a=>{let s=[{name:`output_size`,type:`u32`},{name:`filter_dims`,type:`u32`,length:r.length},{name:`pads`,type:`u32`,length:i.length},{name:`strides`,type:`u32`,length:t.strides.length},{name:`dilations`,type:`u32`,length:t.dilations.length}];Jo(t,s);let c=Gr(e[0].dataType),l=X(`x`,e[0].dataType,e[0].dims.length,1),u=X(`W`,e[1].dataType,e[1].dims.length,1),d=[l,u],p=Z(`result`,e[0].dataType,n.length,1),m=``;if(f){let t=X(`bias`,e[2].dataType,e[2].dims.length,1);d.push(t),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${c} {
          return bias[${o?Y(`coords`,4,5):Y(`coords`,1,5)}];
        }`}let h=Zo(1,c),g=Ko(t,h,c);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices(`aIndices`)};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${u.getByIndices(`aIndices`)};
            }
          ${a.registerUniforms(s).declareVariables(...d,p)}
          ${a.mainStart()}
          ${a.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
              let coords = ${p.offsetToIndices(`global_idx`)};
              let batch = ${Y(`coords`,0,l.rank)};
              let d2 = ${o?Y(`coords`,l.rank-1,l.rank):Y(`coords`,1,l.rank)};
              let xFRCCorner = vec3<u32>(${o?Y(`coords`,1,l.rank):Y(`coords`,2,l.rank)},
              ${o?Y(`coords`,2,l.rank):Y(`coords`,3,l.rank)},
              ${o?Y(`coords`,3,l.rank):Y(`coords`,4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?Y(`uniforms.x_shape`,1,l.rank):Y(`uniforms.x_shape`,2,l.rank)};
              let xShapeZ = ${o?Y(`uniforms.x_shape`,2,l.rank):Y(`uniforms.x_shape`,3,l.rank)};
              let xShapeW = ${o?Y(`uniforms.x_shape`,3,l.rank):Y(`uniforms.x_shape`,4,l.rank)};
              let xShapeU = ${o?Y(`uniforms.x_shape`,4,l.rank):Y(`uniforms.x_shape`,1,l.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${f?`value = value + getBiasByOutputCoords(coords)`:``};
              ${g}
              result[global_idx] = f32(value);
          }`}}}}),Es,Ds,Os=P(()=>{"use strict";R(),V(),Q(),Xo(),Es=(e,t,n,r)=>{let i=e.length>2,a=i?`value += b[output_channel];`:``,o=e[0].dims,s=e[1].dims,c=t.format===`NHWC`,l=c?n[3]:n[1],u=l/t.group,d=c&&u>=4?J(l):1,f=B.size(n)/d,p=[{type:12,data:f},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:u}];qo(t,p),p.push(...q(o,[s[0],s[1],s[2],s[3]/d]));let m=i?[`rank`,`rank`,`rank`]:[`rank`,`rank`];return p.push(...q([n[0],n[1],n[2],n[3]/d])),{name:`GroupedConv`,shaderCache:{hint:`${t.cacheKey}_${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:p}),getShaderSource:r=>{let l=Z(`output`,e[0].dataType,n.length,d),u=Gr(l.type.tensor),f=Ko(t,l.type.value,u),p=X(`x`,e[0].dataType,o.length),m=X(`w`,e[1].dataType,s.length,d),h=[p,m];i&&h.push(X(`b`,e[2].dataType,e[2].dims,d));let g=[{name:`output_size`,type:`u32`},{name:`dilations`,type:`u32`,length:t.dilations.length},{name:`strides`,type:`u32`,length:2},{name:`pads`,type:`u32`,length:2},{name:`output_channels_per_group`,type:`u32`}];Jo(t,g);let _=c?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${p.get(`batch`,`xHeight`,`xWidth`,`input_channel`)};
            let wVal = ${m.get(`wHeight`,`wWidth`,`wInChannel`,`output_channel`)};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${p.get(`batch`,`input_channel`,`xHeight`,`xWidth`)};
            let wVal = ${m.get(`output_channel`,`wInChannel`,`wHeight`,`wWidth`)};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${r.registerUniforms(g).declareVariables(...h,l)}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let outputIndices = ${l.offsetToIndices(`global_idx`)};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${c?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${c?1:2}], outputIndices[${c?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${d} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${c?2:1}];

    var value: ${l.type.value} = ${l.type.value}(0);
    ${_}
    ${a}
    ${f}
    ${l.setByOffset(`global_idx`,`value`)}
  }`}}},Ds=(e,t,n,r)=>{let i=e.length>2,a=J(n[3]),o=J(n[2]),s=B.size(n)/a/o,c=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],u=[n[0],n[1],n[2],n[3]/a],d=[{type:12,data:s},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qo(t,d),d.push(...q(c,l,u));let f=(o-1)*t.strides[1]+l[1];return{name:`GroupedConv-Vectorize`,shaderCache:{hint:`${t.cacheKey};${a};${o};${f};${l[0]};${l[1]}`,inputDependencies:i?[`rank`,`rank`,`type`]:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:n=>{let r=Z(`output`,e[0].dataType,u.length,a),s=Gr(r.type.tensor),d=Ko(t,r.type.value,s),p=X(`x`,e[0].dataType,c.length,a),m=X(`w`,e[1].dataType,l.length,a),h=[p,m];i&&h.push(X(`b`,e[2].dataType,e[2].dims,a));let g=i?`value += b[output_channel];`:``,_=[{name:`output_size`,type:`u32`},{name:`strides`,type:`i32`,length:2},{name:`pads`,type:`i32`,length:2}];return Jo(t,_),`
  ${n.registerUniforms(_).declareVariables(...h,r)}
  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${p.type.value}, ${f}>;
    var values: array<${r.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${p.get(`batch`,`u32(x_height)`,`u32(x_width)`,`input_channel`)};
          } else {
            x_vals[i] = ${p.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${m.get(`w_height`,`w_width`,`0`,`output_channel`)};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${g}
      ${d}
      ${r.set(`batch`,`row`,`col + i`,`output_channel`,`value`)};
    }
  }`}}}}),ks,As,js,Ms,Ns,Ps,Fs,Is,Ls,Rs=P(()=>{"use strict";V(),gs(),Ts(),ps(),Os(),Xo(),is(),ui(),ks=(e,t,n,r,i,a)=>{let o=e[0],s=e.slice(a?1:2,a?3:4),c=s.length,l=t[0],u=t.slice(2).map((e,t)=>e+(e-1)*(n[t]-1)),d=s.map((e,t)=>e+r[t]+r[t+c]).map((e,t)=>Math.floor((e-u[t]+i[t])/i[t]));return d.splice(0,0,o),d.splice(a?3:1,0,l),d},As=[2,3,1,0],js=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw Error(`Conv requires 2 or 3 inputs`);if(e[0].dims.length>5)throw Error(`greater than 5D is not supported`);if(e[0].dims.length!==e[1].dims.length)throw Error(`filter does not have same dimension as input`);if(e[0].dims[t.format===`NHWC`?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error(`FILTER_IN_CHANNEL should be equal to DATA_CHANNEL`);if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw Error(`invalid bias`);let n=e[0].dims.length-2;if(t.dilations.length!==n)throw Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw Error(`invalid kernel shape`)},Ms=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let e=2;e<t[1].dims.length;++e)n[e-2]===0&&(n[e-2]=t[1].dims[e]);let r=e.pads.slice();fr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format===`NHWC`,e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:n,pads:r}),i},Ns=e=>{let t=Yo(e),n=e.format;return{autoPad:[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][e.auto_pad],format:n,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},Ps=(e,t,n,r)=>{let i=n.format===`NHWC`,a=ks(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,i);if(n.group!==1){let o=[t[0]];if(i){let r=e.kernelCustomData.wT??e.compute(si(t[1],As),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),o.push(r)}else o.push(t[1]);t.length===3&&o.push(t[2]),!e.adapterInfo.isArchitecture(`ampere`)&&i&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Ds(o,n,a,r),{inputs:o}):e.compute(Es(o,n,a,r),{inputs:o});return}let o=t.length===3,s=t[0].dims[i?1:2],c=t[0].dims[i?2:3],l=t[0].dims[i?3:1],u=t[1].dims[2],d=t[1].dims[3],f=a[i?1:2],p=a[i?2:3],m=a[i?3:1],h=i&&u===s&&d===c&&n.pads[0]===0&&n.pads[1]===0;if(h||u===1&&d===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let u=a[0],d,g,_,v=[];if(i){let r=e.kernelCustomData.wT??e.compute(si(t[1],As),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=r),h){let e=s*c*l;d=t[0].reshape([1,u,e]),g=r.reshape([1,e,m]),_=[1,u,m]}else d=t[0].reshape([u,s*c,l]),g=r.reshape([1,l,m]),_=[u,f*p,m];v.push(d),v.push(g)}else d=t[0].reshape([u,l,s*c]),g=t[1].reshape([1,m,l]),_=[u,m,f*p],v.push(g),v.push(d);o&&v.push(t[2]);let y=_[2],b=v[0].dims[v[0].dims.length-1];y<8&&b<8?e.compute(rs(v,n,a,_,i,r),{inputs:v}):e.compute(fs(v,n,a,_,i,r),{inputs:v});return}let g=e.kernelCustomData.wT??e.compute(si(t[1],As),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=g);let _=[t[0],g];o&&_.push(t[2]);let v=i?f*p:m,y=i?m:f*p,b=u*d*l;e.compute(hs(_,n,a,v,y,b,o,!0,r),{inputs:_})},Fs=(e,t)=>{let n=t.format===`NHWC`,r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),o=[1].concat(t.dilations),s=[1].concat(t.kernelShape),c=Ms({...t,pads:i,strides:a,dilations:o,kernelShape:s},r);Ps(e,r,c,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},Is=(e,t,n)=>{let r=n.format===`NHWC`?`channelsLast`:`channelsFirst`,i=Ms(n,t),a=n.autoPad===`NOTSET`?n.pads:n.autoPad,o=Cs(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(ws(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],r))},Ls=(e,t)=>{if(js(e.inputs,t),e.inputs[0].dims.length===3)Fs(e,t);else if(e.inputs[0].dims.length===5)Is(e,e.inputs,t);else{let n=Ms(t,e.inputs);Ps(e,e.inputs,n)}}}),zs,Bs=P(()=>{"use strict";R(),lr(),V(),Q(),zs=(e,t,n)=>{let r=e.length>2,i=t.outputShape,a=t.format===`NHWC`,o=t.group,s=e[1].dims,c=s[2]/o,l=s[3],u=a?J(c):1,d=a&&l===1&&c>=4,f=d?Math.floor(c/4)*4:Math.floor(c/u)*u,p=c-f,m=a?J(l):1,h=a?l===1?u:m:1,g=B.size(i)/m,_=[Math.ceil(g/64),1,1];z(`verbose`,()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let v=[`rank`,`rank`],y=[t.strides[0],t.strides[1]],b=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],x=[t.dilations[0],t.dilations[1]],S=[b[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),b[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],C=[S[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),S[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],w=[{type:12,data:g},{type:12,data:y},{type:12,data:b},{type:12,data:x},{type:12,data:S},{type:6,data:C},{type:12,data:f},{type:12,data:c},{type:12,data:l},...q(e[0].dims,e[1].dims)];return r&&(w.push(...q(e[2].dims)),v.push(`rank`)),w.push(...q(i)),{name:`ConvTranspose2D`,shaderCache:{hint:`${t.cacheKey};${u}${h}${m}${d}${p}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],programUniforms:w}),getShaderSource:t=>{let n=[{name:`output_size`,type:`u32`},{name:`strides`,type:`u32`,length:y.length},{name:`filter_dims`,type:`u32`,length:b.length},{name:`dilations`,type:`u32`,length:b.length},{name:`effective_filter_dims`,type:`u32`,length:S.length},{name:`pads`,type:`i32`,length:C.length},{name:`input_channels_per_group_int`,type:`u32`},{name:`input_channels_per_group`,type:`u32`},{name:`output_channels_per_group`,type:`u32`}],o=Gr(e[0].dataType),s=a?1:2,c=a?2:3,l=a?3:1,f=X(`W`,e[1].dataType,e[1].dims.length,h),g=X(`Dy`,e[0].dataType,e[0].dims.length,u),_=[g,f];r&&_.push(X(`bias`,e[2].dataType,[i[l]].length,m));let v=Z(`result`,e[0].dataType,i.length,m),x=`
            let outputIndices = ${v.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${v.indicesGet(`outputIndices`,0)};
            let d1 = ${v.indicesGet(`outputIndices`,l)};
            let r = ${v.indicesGet(`outputIndices`,s)};
            let c = ${v.indicesGet(`outputIndices`,c)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${v.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${s}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${c}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${d?`
                var x_offset = ${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u};
                var w_offset = ${f.indicesToOffset(`${f.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${h};
                  `:``}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${d?4:u}) {
                  ${(()=>{let e=``;if(d)u===4?e+=`
        let xValue = ${g.getByOffset(`x_offset`)};
        let wValue = ${f.getByOffset(`w_offset`)};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:u===2?e+=`
          dotProd = dotProd + dot(vec4<${o}>(${g.getByOffset(`x_offset`)}, ${g.getByOffset(`x_offset + 1u`)}), vec4<${o}>(${f.getByOffset(`w_offset`)}, ${f.getByOffset(`w_offset + 1u`)}));
          x_offset += 2u;
          w_offset += 2u;`:u===1&&(e+=`
          dotProd = dotProd + dot(vec4<${o}>(${g.getByOffset(`x_offset`)}, ${g.getByOffset(`x_offset + 1u`)}, ${g.getByOffset(`x_offset + 2u`)}, ${g.getByOffset(`x_offset + 3u`)}), vec4<${o}>(${f.getByOffset(`w_offset`)}, ${f.getByOffset(`w_offset + 1u`)}, ${f.getByOffset(`w_offset + 2u`)}, ${f.getByOffset(`w_offset + 3u`)}));
          x_offset += 4u;
          w_offset += 4u;`);else if(e+=`
                  let xValue = ${a?g.getByOffset(`${g.indicesToOffset(`${g.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${u}`):g.get(`batch`,`inputChannel`,`idyR`,`idyC`)};
        `,u===1)e+=`
          let w_offset = ${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${f.getByOffset(`w_offset / ${h}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let t=0;t<u;t++)e+=`
            let wValue${t} = ${f.getByOffset(`${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e})()}
                  inputChannel = inputChannel + ${d?4:u};
                }
                ${(()=>{if(p===0)return``;if(!d)throw Error(`packInputAs4 ${d} is not true.`);let e=``;if(u===1){e+=`dotProd = dotProd`;for(let t=0;t<p;t++)e+=`
            + ${g.getByOffset(`x_offset + ${t}`)} * ${f.getByOffset(`w_offset + ${t}`)}`;e+=`;`}else if(u===2){if(p!==2)throw Error(`Invalid inputChannelsRemainder ${p}.`);e+=`
          let xValue = ${g.getByOffset(`x_offset`)};
          let wValue = ${f.getByOffset(`w_offset`)};
          dotProd = dotProd + dot(xValue, wValue);`}return e})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${m}]`:``};
            ${v.setByOffset(`global_idx`,`value`)};
          `;return`
    ${t.registerUniforms(n).declareVariables(..._,v)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)};
    ${x}}`}}}}),Vs,Hs,Us,Ws,Gs,Ks,qs,Js,Ys,Xs=P(()=>{"use strict";Bs(),Xo(),ui(),Vs=(e,t,n,r,i,a)=>(e-1)*t+n+(r-1)*i+1-a,Hs=(e,t,n,r,i)=>{let a=Math.floor(e/2);t===`SAME_UPPER`?(n[r]=a,n[i]=e-a):t===`SAME_LOWER`&&(n[r]=e-a,n[i]=a)},Us=(e,t,n,r,i,a,o,s,c,l)=>{let u=e.length-2,d=l.length===0;c.length<u&&c.push(...Array(u-c.length).fill(0));let f=e[0],p=t[s?3:1]*i;for(let i=0,f=e.length-u-+!!s;i<u;++i,++f){let s=e[f],p=d?s*o[i]:l[i],m=Vs(s,o[i],a[i],t[f],n[i],p);Hs(m,r,a,i,i+u),d&&l.push(o[i]*(s-1)+c[i]+(t[f]-1)*n[i]+1-a[i]-a[i+u])}l.splice(0,0,f),l.splice(s?3:1,0,p)},Ws=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((e,t)=>e*t,1)===0){n.length=0;for(let e=2;e<t[1].dims.length;++e)n.push(t[1].dims[e])}let r=e.format===`NHWC`;n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let i=e.pads.slice(),a=e.outputShape.slice(),o=e.outputPadding.slice(),s=t[0].dims,c=e.dilations.slice();if(c.reduce((e,t)=>e+t,0)===0){let e=t[0].dims.length-2;c=Array(e).fill(1)}let l=e.strides.slice();if(l.reduce((e,t)=>e+t,0)===0){let e=t[0].dims.length-2;l=Array(e).fill(1)}Us(s,n,c,e.autoPad,e.group,i,l,r,o,a);let u=Object.assign({},e);return Object.assign(u,{kernelShape:n,pads:i,outputPadding:o,outputShape:a,dilations:c,strides:l}),u},Gs=e=>{let t=Yo(e),n=e.format,r=[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][typeof e.autoPad>`u`?0:e.autoPad],i=e.dilations,a=e.group??1,o=e.kernelShape,s=e.pads,c=e.strides,l=e.wIsConst();return{autoPad:r,format:n,dilations:i,group:a,kernelShape:o,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:s,strides:c,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},Ks=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw Error(`Conv requires 2 or 3 inputs`);if(e[0].dims.length!==4&&e[0].dims.length!==3)throw Error(`currently only support 2-dimensional conv`);if(e[0].dims.length!==e[1].dims.length)throw Error(`filter does not have same dimension as input`);if(e[0].dims[t.format===`NHWC`?e[0].dims.length-1:1]!==e[1].dims[0])throw Error(`FILTER_IN_CHANNEL should be equal to DATA_CHANNEL`);let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw Error(`invalid bias`);let r=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==r*2)throw Error(`pads should be ${r*2}D`);if(t.outputPadding.length!==r&&t.outputPadding.length!==0)throw Error(`output_padding should be ${r}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw Error(`invalid kernel shape`);if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw Error(`invalid output shape`)},qs=(e,t,n,r)=>{let i=e.kernelCustomData.wT??e.compute(si(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let a=[t[0],i];t.length===3&&a.push(t[2]),e.compute(zs(a,n,r),{inputs:a})},Js=(e,t)=>{let n=t.format===`NHWC`,r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let s=t.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],o=[1].concat(o),a=[1].concat(a),i=[1].concat(i);let c=t.outputPadding;c=[0].concat(c);let l=Ws({...t,pads:s,strides:o,dilations:a,kernelShape:i,outputPadding:c},r);qs(e,r,l,e=>n?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])},Ys=(e,t)=>{if(Ks(e.inputs,t),e.inputs[0].dims.length===3)Js(e,t);else{let n=Ws(t,e.inputs);qs(e,e.inputs,n)}}}),Zs,Qs,$s,ec=P(()=>{"use strict";R(),V(),K(),Q(),Zs=(e,t,n,r)=>{let i=B.size(t),a=t.length,o=X(`input`,e,a),s=Z(`output`,e,a),c=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=B.normalizeAxis(c,a);return{name:`CumSum`,shaderCache:{hint:r.cacheKey,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:l},...q(t,t)]}),getShaderSource:e=>{let t=` i32(${o.indicesGet(`inputIndices`,`uniforms.axis`)}) `,n=Y(`uniforms.input_shape`,`uniforms.axis`,a),i=r.reverse?t+(r.exclusive?` + 1`:``):`0`,c=r.reverse?n:t+(r.exclusive?``:` + 1`);return`
                ${e.registerUniform(`outputSize`,`u32`).registerUniform(`axis`,`u32`).declareVariables(o,s)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
                  var inputIndices = ${s.offsetToIndices(`global_idx`)};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${c};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet(`inputIndices`,`uniforms.axis`,`u32(i)`)};
                    sum = sum + ${o.getByIndices(`inputIndices`)};
                  }
                  ${s.setByOffset(`global_idx`,`sum`)};
                }`}}},Qs=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,i=e.inputs[1];e.compute(Zs(r,n,i,t),{inputs:[0]})},$s=e=>{let t=e.exclusive===1,n=e.reverse===1;return G({exclusive:t,reverse:n})}}),tc,nc,rc,ic,ac,oc=P(()=>{"use strict";R(),V(),K(),Q(),tc=e=>{if(!e||e.length!==1)throw Error(`DepthToSpace requires 1 input.`);if(e[0].dims.length!==4)throw Error(`DepthToSpace requires 4D input.`)},nc=(e,t,n,r)=>{let i=[];i.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let r=0;r<t;++r)i.push(n.indicesSet(`a`,e[r],`i[${r}]`));return i.push(`return a;}`),i.join(`
`)},rc=(e,t)=>{let n,r,i,a,o,s,c=t.format===`NHWC`,l=t.blocksize,u=t.mode===`DCR`;c?([n,r,i,a]=e.dims,o=u?[n,r,i,l,l,a/l**2]:[n,r,i,a/l**2,l,l],s=u?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,i,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=u?[n,l,l,a/l**2,r,i]:[n,a/l**2,l,l,r,i],s=u?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let d=e.reshape(o),f=d.dims.length,p=e.dataType,m=X(`a`,p,f),h=Z(`output`,p,f);return{name:`DepthToSpace`,shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:[`rank`]},getRunData:e=>{let t=c?[n,r*l,i*l,a/l**2]:[n,a/l**2,r*l,i*l],o=B.size(t),u=d.dims,f=B.sortBasedOnPerm(u,s);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...q(u,f)]}},getShaderSource:e=>`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(m,h)}

  ${nc(s,f,m,h)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

    let indices = ${h.offsetToIndices(`global_idx`)};
    let aIndices = perm(indices);

    ${h.setByOffset(`global_idx`,m.getByIndices(`aIndices`))}
  }`}},ic=(e,t)=>{tc(e.inputs),e.compute(rc(e.inputs[0],t))},ac=e=>G({blocksize:e.blocksize,mode:e.mode,format:e.format})}),sc,cc,lc,uc,dc,fc,pc,mc,hc,gc,_c,vc=P(()=>{"use strict";R(),V(),K(),Q(),sc=`[a-zA-Z]|\\.\\.\\.`,cc=`(`+sc+`)+`,lc=`^`+cc+`$`,uc=`(`+cc+`,)*`+cc,dc=`^`+uc+`$`,fc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let n=this.symbolToIndices.get(e);n===void 0?n=[t]:n.push(t),this.symbolToIndices.set(e,n)}},pc=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[n,r]=t.includes(`->`)?t.split(`->`,2):[t,``];if(!n.match(RegExp(dc)))throw Error(`Invalid LHS term`);if(n.split(`,`).forEach((t,n)=>{let r=e[n].dims.slice();if(!t.match(RegExp(lc)))throw Error(`Invalid LHS term`);let i=this.processTerm(t,!0,r,n);this.lhs.push(i)}),r===``)r+=[...this.symbolToInfo.entries()].filter(([e,t])=>t.count===1||e===`...`).map(([e])=>e).join(``);else if(!r.match(RegExp(cc)))throw Error(`Invalid RHS`);r.match(RegExp(sc,`g`))?.forEach(e=>{if(e===`...`)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(t===void 0)throw Error(`Invalid RHS symbol`);this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,n){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw Error(`Dimension mismatch`);r.count++,r.inputIndices.push(n)}else r={count:1,dimValue:t,inputIndices:[n]};this.symbolToInfo.set(e,r)}processTerm(e,t,n,r=-1){let i=n.length,a=!1,o=[],s=0;if(!e.match(RegExp(lc))&&!t&&e!==``)throw Error(`Invalid LHS term`);let c=e.match(RegExp(sc,`g`)),l=new fc(r);return c?.forEach((e,u)=>{if(e===`...`){if(a)throw Error(`Only one ellipsis is allowed per input term`);a=!0;let e=i-c.length+1;if(e<0)throw Error(`Ellipsis out of bounds`);if(o=n.slice(s,s+e),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error(`Ellipsis dimensions mismatch`)}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error(`Ellipsis must be specified in the LHS`);for(let e=0;e<o.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,u+e),this.addSymbol(t,n[s++],r)}}else l.addSymbol(e,u+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,n[s++],r)}),l}},mc=e=>e+`_max`,hc=(e,t,n,r)=>{let i=e.map(e=>e.length).map((e,n)=>X(`input${n}`,t,e)),a=B.size(r),o=Z(`output`,t,r.length),s=[...n.symbolToInfo.keys()].filter(e=>!n.rhs.symbolToIndices.has(e));return{name:`Einsum`,shaderCache:{hint:n.equation,inputDependencies:e.map(()=>`rank`)},getRunData:()=>{let i=s.filter(e=>n.symbolToInfo.has(e)).map(e=>({type:12,data:n.symbolToInfo.get(e)?.dimValue||0}));i.push({type:12,data:a});let o=e.map((e,t)=>[...q(e)]).reduce((e,t)=>e.concat(t),i);return o.push(...q(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o}},getShaderSource:e=>{let t=[],r=[],a=[],c=[],l=[],u=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((e,s)=>{if(n.rhs.symbolToIndices.has(s)){let r=n.rhs.symbolToIndices.get(s)?.[0];r!==void 0&&n.lhs.forEach((n,a)=>{if(e.inputIndices.includes(a)){let e=n.symbolToIndices.get(s);if(e===void 0)throw Error(`Invalid symbol error`);e.forEach(e=>{t.push(`${i[a].indicesSet(`input${a}Indices`,e,o.indicesGet(`outputIndices`,r))}`)})}})}else n.lhs.forEach((t,n)=>{if(e.inputIndices.includes(n)){let e=t.symbolToIndices.get(s);if(e===void 0)throw Error(`Invalid symbol error`);e.forEach(e=>{r.push(`${i[n].indicesSet(`input${n}Indices`,e,`${s}`)}`)}),l.push(`prod *= ${i[n].getByIndices(`input${n}Indices`)};`)}}),a.push(`for(var ${s}: u32 = 0; ${s} < uniforms.${mc(s)}; ${s}++) {`),c.push(`}`)});let d=u?[...t,`let sum = ${i.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(` * `)};`]:[...t,`var sum = 0.0;`,...a,...r,`var prod = 1.0;`,...l,`sum += prod;`,...c];return`
            ${e.registerUniforms(s.map(e=>({name:`${mc(e)}`,type:`u32`}))).registerUniform(`outputSize`,`u32`).declareVariables(...i,o)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
            var outputIndices = ${o.offsetToIndices(`global_idx`)};
            ${i.map((e,t)=>`var input${t}Indices: ${i[t].type.indices};`).join(`
`)}
            ${d.join(`
`)};
            ${o.setByOffset(`global_idx`,`sum`)};
          }`}}},gc=(e,t)=>{let n=new pc(e.inputs,t.equation),r=n.outputDims,i=e.inputs.map((e,t)=>e.dims);e.compute(hc(i,e.inputs[0].dataType,n,r))},_c=e=>{let t=e.equation.replace(/\s+/g,``);return G({equation:t})}}),yc,bc,xc,Sc,Cc,wc=P(()=>{"use strict";R(),V(),Q(),yc=e=>{if(!e||e.length!==2)throw Error(`Expand requires 2 input.`);let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,i=t.length<n.length?0:t.length-n.length;for(;r<n.length&&i<t.length;++r,++i)if(n[r]!==t[i]&&n[r]!==1&&t[i]!==1)throw Error(`Expand requires shape to be broadcastable to input`)},bc=(e,t)=>{let n=e.length-t.length,r=[];for(let t=0;t<n;++t)r.push(e[t]);for(let i=0;i<t.length;++i)r.push(t[i]===1?e[i+n]:t[i]);return r},xc=(e,t)=>e.length>t.length?bc(e,t):bc(t,e),Sc=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=xc(t,n),i=e[0].dataType,a=i===9||B.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4==0?4:1,s=a||r.length>0&&r[r.length-1]%4==0?4:1,c=Math.ceil(B.size(r)/s),l=e=>{let n=X(`input`,i,t.length,o),a=Z(`output`,i,r.length,s),c;if(i===9){let e=(e,t,r=``)=>`
          let outputIndices${t} = ${a.offsetToIndices(`outputOffset + ${t}u`)};
          let offset${t} = ${n.broadcastedIndicesToOffset(`outputIndices${t}`,a)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;c=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${e(`data`,0,`u32`)}
        ${e(`data`,1,`u32`)}
        ${e(`data`,2,`u32`)}
        ${e(`data`,3,`u32`)}
        ${a.setByOffset(`global_idx`,`data`)}
      }`}else c=`
        let outputIndices = ${a.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${n.broadcastedIndicesToOffset(`outputIndices`,a)};
        let data = ${a.type.value}(${n.getByOffset(`inputOffset / ${o}`)});
        ${a.setByOffset(`global_idx`,`data`)}
      }`;return`
    ${e.registerUniform(`vec_size`,`u32`).declareVariables(n,a)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
    ${c}`},u=[{type:12,data:c},...q(t,r)];return{name:`Expand`,shaderCache:{hint:`${r.length};${o}${s}`,inputDependencies:[`rank`]},getShaderSource:l,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:u})}},Cc=e=>{yc(e.inputs),e.compute(Sc(e.inputs),{inputs:[0]})}}),Tc,Ec,Dc=P(()=>{"use strict";R(),V(),Q(),bo(),Tc=e=>{let t=e[0].dataType,n=B.size(e[0].dims),r=B.size(e[1].dims),i=r%4==0;return{name:`FastGeluWithBias`,shaderCache:{hint:`${i}`,inputDependencies:[`type`,`type`]},getShaderSource:e=>{let n=X(`x`,t,[1],4),r=X(`bias`,t,[1],4),a=Z(`y`,t,[1],4),o=[{name:`output_vec_size`,type:`u32`},{name:`bias_size`,type:`u32`}],s=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${r.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,c=i?`
      let bias = ${r.getByOffset(`global_idx % (uniforms.bias_size / 4)`)};`:`${s(0)}${s(1)}${s(2)}${s(3)}
      let bias = ${n.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms(o).declareVariables(n,r,a)}

    ${fo(Kr(t))}

    ${e.mainStart(Ur)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_vec_size`)}

      let x = ${n.getByOffset(`global_idx`)};
      ${c}
      let x_in = x + bias;
      ${a.setByOffset(`global_idx`,po(`x_in`))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Ur/4)}})}},Ec=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?mo(e):e.compute(Tc(e.inputs))}}),Oc,kc,Ac,jc,Mc=P(()=>{"use strict";R(),V(),K(),Q(),Oc=e=>{if(!e||e.length!==2)throw Error(`Gather requires 2 inputs.`)},kc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=B.normalizeAxis(t.axis,i),o=n.slice(0);o.splice(a,1,...r);let s=n[a],c=e[0].dataType===9?4:1,l=Math.ceil(B.size(o)/c),u=[{type:12,data:l},{type:6,data:s},{type:12,data:a},...q(e[0].dims,e[1].dims,o)];return{name:`Gather`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:t=>{let n=X(`data`,e[0].dataType,e[0].dims.length,c),s=X(`inputIndices`,e[1].dataType,e[1].dims.length),l=Z(`output`,e[0].dataType,o.length,c),u=e=>{let t=r.length,c=`var indicesIndices${e}  = ${s.type.indices}(0);`;for(let n=0;n<t;n++)c+=`${t>1?`indicesIndices${e}[${n}]`:`indicesIndices${e}`} = ${o.length>1?`outputIndices${e}[uniforms.axis + ${n}]`:`outputIndices${e}`};`;c+=`
          var idx${e} = ${s.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${n.type.indices};
        `;for(let n=0,r=0;n<i;n++)n===a?(c+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = u32(idx${e});`,r+=t):(c+=`${i>1?`dataIndices${e}[${n}]`:`dataIndices${e}`} = ${o.length>1?`outputIndices${e}[${r}]`:`outputIndices${e}`};`,r++);return c},d;if(e[0].dataType===9){let e=(e,t,r=``)=>`
          let outputIndices${t} = ${l.offsetToIndices(`outputOffset + ${t}u`)};
          ${u(t)};
          let offset${t} = ${n.indicesToOffset(`dataIndices${t}`)};
          let index${t} = offset${t} / 4u;
          let component${t} = offset${t} % 4u;
          ${e}[${t}] = ${r}(${n.getByOffset(`index${t}`)}[component${t}]);
        `;d=`
        let outputOffset = global_idx * ${c};
        var value = vec4<u32>(0);
        ${e(`value`,0,`u32`)}
        ${e(`value`,1,`u32`)}
        ${e(`value`,2,`u32`)}
        ${e(`value`,3,`u32`)}
        ${l.setByOffset(`global_idx`,`value`)}
      `}else d=`
      let outputIndices = ${l.offsetToIndices(`global_idx`)};
      ${u(``)};
      let value = ${n.getByIndices(`dataIndices`)};
      ${l.setByOffset(`global_idx`,`value`)};
      `;return`
      ${t.registerUniform(`outputSize`,`u32`).registerUniform(`axisDimLimit`,`i32`).registerUniform(`axis`,`u32`).declareVariables(n,s,l)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
        ${d}
      }`}}},Ac=e=>G({axis:e.axis}),jc=(e,t)=>{let n=e.inputs;Oc(n),e.compute(kc(e.inputs,t))}}),Nc,Pc,Fc,Ic=P(()=>{"use strict";R(),V(),Q(),Nc=(e,t,n,r,i,a,o,s,c)=>{let l=[{type:12,data:a},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:c}],u=[a];return l.push(...q(t.dims,u)),e.compute({name:`computeSliceOffsets`,shaderCache:{hint:`${i.length}_${n.length}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:u,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:e=>{let r=[X(`indices_data`,t.dataType,t.dims.length),Z(`input_slice_offsets_data`,12,1,1)],a=[{name:`output_size`,type:`u32`},{name:`batch_dims`,type:`u32`},{name:`input_dims`,type:`u32`,length:i.length},{name:`sizes_from_slice_dims_data`,type:`u32`,length:n.length},{name:`num_slices_per_batch`,type:`u32`},{name:`input_batch_stride`,type:`u32`},{name:`num_slice_dims`,type:`u32`}];return`
  ${e.registerUniforms(a).declareVariables(...r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?`index += i32(uniforms.input_dims);`:`index += i32(uniforms.input_dims[input_dim_idx]);`}
      }
      ${n.length===1?`relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);`:`relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);`}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[t],outputs:[-1]})[0]},Pc=(e,t)=>{let n=e.inputs,r=n[0].dims,i=n[0].dataType,a=n[1].dims,o=a[a.length-1],s=B.sizeToDimension(a,a.length-1),c=B.sizeFromDimension(r,t.batchDims+o),l=B.sizeToDimension(r,t.batchDims),u=B.sizeFromDimension(r,t.batchDims),d=s/l,f=Array(o),p=c;for(let e=0;e<o;++e)f[o-1-e]=p,p*=r[t.batchDims+o-1-e];let m=Nc(e,n[1],f,t.batchDims,r,s,d,u,o),h=t.batchDims+o;if(h>r.length)throw Error(`last dimension of indices must not be larger than rank of input tensor`);let g=a.slice(0,-1).concat(r.slice(h)),_=B.size(g),v=[{type:12,data:_},{type:12,data:c},...q(n[0].dims,m.dims,g)];e.compute({name:`GatherND`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:g,dataType:i}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:v}),getShaderSource:e=>{let t=X(`data`,n[0].dataType,n[0].dims.length),r=X(`slice_offsets`,12,m.dims.length),i=Z(`output`,n[0].dataType,g.length);return`
          ${e.registerUniform(`output_size`,`u32`).registerUniform(`slice_size`,`u32`).declareVariables(t,r,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[n[0],m]})},Fc=e=>({batchDims:e.batch_dims,cacheKey:``})}),Lc,Rc,zc,Bc,Vc=P(()=>{"use strict";R(),V(),K(),Q(),Lc=(e,t)=>{if(e.length<3||e.length>4)throw Error(`GatherBlockQuantized requires 3 or 4 inputs.`);let n=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,i=e[0],a=e[2],o=e.length===4?e[3]:void 0;if(a.dims.length!==i.dims.length||!i.dims.map((e,t)=>t===n?Math.ceil(e/r)===a.dims[t]:e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error(`Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.`);if(o){if(o.dataType!==i.dataType)throw Error(`Zero point must have the same data type as the input tensor.`);if(o.dims.length!==a.dims.length||!o.dims.map((e,t)=>e===a.dims[t]).reduce((e,t)=>e&&t,!0))throw Error(`Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.`)}},Rc=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n.length,a=B.normalizeAxis(t.gatherAxis,i),o=B.normalizeAxis(t.quantizeAxis,i),s=n.slice(0);s.splice(a,1,...r);let c=B.size(s),l=e[2].dataType,u=e[0].dataType===22,d=[{type:12,data:c},{type:12,data:o},{type:12,data:a},{type:12,data:t.blockSize},...q(...e.map((e,t)=>e.dims),s)];return{name:`GatherBlockQuantized`,shaderCache:{hint:`${t.cacheKey};${e.filter((e,t)=>t!==1).map(e=>e.dims.join(`_`)).join(`;`)}`,inputDependencies:Array.from({length:e.length},(e,t)=>`rank`)},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:d}),getShaderSource:t=>{let i=X(`data`,e[0].dataType,e[0].dims.length),o=X(`inputIndices`,e[1].dataType,e[1].dims.length),c=X(`scales`,e[2].dataType,e[2].dims.length),d=e.length>3?X(`zeroPoint`,e[3].dataType,e[3].dims.length):void 0,f=Z(`output`,l,s.length),p=[i,o,c];return d&&p.push(d),`
        ${t.registerUniforms([{name:`output_size`,type:`u32`},{name:`quantize_axis`,type:`u32`},{name:`gather_axis`,type:`u32`},{name:`block_size`,type:`u32`}]).declareVariables(...p,f)}
        ${t.mainStart()}
        let output_indices = ${f.offsetToIndices(`global_idx`)};
        var indices_indices = ${o.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${f.indicesGet(`output_indices`,`uniforms.gather_axis + i`)};
            ${o.indicesSet(`indices_indices`,`i`,`index`)};
          }`:`indices_indices = ${f.indicesGet(`output_indices`,`uniforms.gather_axis`)};`};
        var data_indices = ${i.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${f.indicesGet(`output_indices`,`i`)};
          ${i.indicesSet(`data_indices`,`i`,`index`)};
        }
        var index_from_indices = ${o.getByIndices(`indices_indices`)};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${i.indicesSet(`data_indices`,`uniforms.gather_axis`,`u32(index_from_indices)`)};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${f.indicesGet(`output_indices`,`i + ${r.length} - 1`)};
          ${i.indicesSet(`data_indices`,`i`,`index`)};
        }
        let data_offset = ${i.indicesToOffset(`data_indices`)};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${i.getByOffset(`data_offset / 8`)};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u?`unpack4xI8`:`unpack4xU8`}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${c.indicesGet(`data_indices`,`uniforms.quantize_axis`)} / uniforms.block_size;
        ${c.indicesSet(`scale_indices`,`uniforms.quantize_axis`,`quantize_axis_index`)};
        var scale = ${c.getByIndices(`scale_indices`)};
        ${d?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${d.indicesToOffset(`zero_point_indices`)};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${d.getByOffset(`zero_point_offset / 8`)};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?`unpack4xI8`:`unpack4xU8`}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:`var zero_point = 0`};
        let dequantized_data = ${Kr(l)}(quantized_data - zero_point) * scale;
        ${f.setByOffset(`global_idx`,`dequantized_data`)};
    }`}}},zc=(e,t)=>{let n=e.inputs;Lc(n,t),e.compute(Rc(e.inputs,t))},Bc=e=>G({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Hc,Uc,Wc,Gc,Kc=P(()=>{"use strict";R(),V(),K(),Q(),Hc=e=>{if(!e||e.length!==2)throw Error(`GatherElements requires 2 inputs.`);if(e[0].dims.length<1)throw Error(`GatherElements requires that the data input be rank >= 1.`);if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Uc=(e,t)=>{let n=e[0].dims,r=e[0].dataType,i=n.length,a=e[1].dims,o=e[1].dataType,s=B.normalizeAxis(t.axis,i),c=n[s],l=a.slice(0),u=B.size(l),d=X(`input`,r,i),f=X(`indicesInput`,o,a.length),p=Z(`output`,r,l.length),m=[{type:12,data:u},{type:6,data:c},{type:12,data:s}];return m.push(...q(n,a,l)),{name:`GatherElements`,shaderCache:{inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:e=>`
      ${e.registerUniform(`outputSize`,`u32`).registerUniform(`axisDimLimit`,`i32`).registerUniform(`axis`,`u32`).declareVariables(d,f,p)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

      let outputIndices = ${p.offsetToIndices(`global_idx`)};

      var idx = ${f.getByOffset(`global_idx`)};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${d.type.indices}(outputIndices);
      ${d.indicesSet(`inputIndices`,`uniforms.axis`,`u32(idx)`)};
      let value = ${d.getByIndices(`inputIndices`)};

      ${p.setByOffset(`global_idx`,`value`)};
  }`}},Wc=e=>G({axis:e.axis}),Gc=(e,t)=>{let n=e.inputs;Hc(n),e.compute(Uc(e.inputs,t))}}),qc,Jc,Yc,Xc,Zc=P(()=>{"use strict";R(),V(),Q(),qc=e=>{if(!e)throw Error(`Input is missing`);if(e.length<2||e.length>3)throw Error(`Invaid input number.`);if(e.length===3&&e[2].dims.length>2)throw Error(`Invalid input shape of C`);if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw Error(`Input types are mismatched`)},Jc=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[i,a,o]=pr.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw Error(`Can't use gemm on the given tensors`);let c=Math.ceil(a/16),l=Math.ceil(i/16);B.size(s);let u=[{type:12,data:c},{type:12,data:i},{type:12,data:a},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],d=[`type`,`type`];return e.length===3&&(u.push(...q(e[2].dims)),d.push(`rank`)),u.push(...q(s)),{name:`GemmShared`,shaderCache:{hint:`${t.cacheKey}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:c*l},programUniforms:u}),getShaderSource:n=>{let r=X(`a`,e[0].dataType,e[0].dims),i=X(`b`,e[1].dataType,e[1].dims),a=null,o=[r,i];e.length===3&&(a=X(`c`,e[2].dataType,e[2].dims.length),o.push(a));let c=Z(`output`,e[0].dataType,s.length);o.push(c);let l=[{name:`num_tile_n`,type:`u32`},{name:`M`,type:`u32`},{name:`N`,type:`u32`},{name:`K`,type:`u32`},{name:`alpha`,type:`f32`},{name:`beta`,type:`f32`}],u=``,d=``;t.transA&&t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[k][local_id.y] * tile_b[local_id.x][k];`):t.transA&&!t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[k][local_id.y] * tile_b[k][local_id.x];`):!t.transA&&t.transB?(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[local_id.y][k] * tile_b[local_id.x][k];`):!t.transA&&!t.transB&&(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${r.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${i.type.value}(0);
      }
      `,u=`value += tile_a[local_id.y][k] * tile_b[k][local_id.x];`);let f=t.alpha===1?``:`value *= uniforms.alpha;`;return`
  ${n.registerUniforms(l).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${r.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${i.type.storage}, 16>, 16>;
  ${n.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${c.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${d}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${u}
      }
      workgroupBarrier();
    }

    ${f}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${a==null?``:`let cOffset = ${a.broadcastedIndicesToOffset(`vec2(m, n)`,c)}; value += ${c.type.value}(uniforms.beta) * ${a.getByOffset(`cOffset`)};`}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}},Yc=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}),Xc=(e,t)=>{qc(e.inputs),e.compute(Jc(e.inputs,t))}}),Qc,$c,el,tl,nl,rl,il,al,ol,sl,cl,ll,ul,dl,fl=P(()=>{"use strict";R(),V(),K(),Q(),[Qc,$c,el,tl]=[0,1,2,3],nl=e=>{if(e[0].dims.length!==4)throw Error(`only 4-D tensor is supported.`);if(e[0].dims.length!==e[1].dims.length)throw Error(`input dimensions must be equal to grid dimensions`);if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error(`grid batch size must match input batch size`)},rl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,il=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,al=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,ol=e=>`
  ${e.paddingMode===`reflection`?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:``}
`,sl=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Qc}] = batch;
     indices[${$c}] = channel;`+(()=>{switch(n.paddingMode){case`zeros`:return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${el}] = u32(r);
            indices[${tl}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case`border`:return`
          indices[${el}] = u32(clamp(r, 0, H - 1));
          indices[${tl}] = u32(clamp(c, 0, W - 1));
        `;case`reflection`:return`
          indices[${el}] = gs_reflect(r, border[1], border[3]);
          indices[${tl}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices(`indices`)};
  }
`,cl=(e,t,n)=>(()=>{switch(n.mode){case`nearest`:return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qc}], indices[${$c}], border);
        `;case`bilinear`:return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qc}], indices[${$c}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qc}], indices[${$c}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qc}], indices[${$c}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qc}], indices[${$c}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case`bicubic`:return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qc}], indices[${$c}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset(`global_idx`,`result`)}`,ll=(e,t)=>{let n=X(`x`,e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=X(`grid`,e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format===`NHWC`&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Qc,$c,el,tl]=[0,3,1,2]);let o=Z(`output`,e[0].dataType,a.length),s=n.type.value,c=[{type:12,data:B.size(a)},...q(e[0].dims,r,a)];return{name:`GridSample`,shaderCache:{hint:`${t.cacheKey}`,inputDependencies:[`type`,`type`]},getRunData:e=>{let t=B.size(a);return{outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:c}},getShaderSource:e=>`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(n,i,o)}
  ${rl}
  ${il(s)}
  ${al(t)}
  ${ol(t)}
  ${sl(n,s,t)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let H_in = i32(uniforms.x_shape[${el}]);
      let W_in = i32(uniforms.x_shape[${tl}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices(`global_idx`)};
      var grid_indices = vec3<u32>(indices[${Qc}], indices[${el}], indices[${tl}]);
      let nxy = ${i.getByIndices(`grid_indices`)};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${cl(o,s,t)}
  }`}},ul=(e,t)=>{nl(e.inputs),e.compute(ll(e.inputs,t))},dl=e=>G({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),pl,ml,hl,gl,_l,vl,yl,bl=P(()=>{"use strict";R(),V(),K(),W(),ya(),Q(),ui(),pl=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,ml=(e,t)=>{let n=e[0],r=pl(e,1),i=pl(e,2),a=pl(e,3),o=pl(e,4),s=pl(e,5),c=pl(e,6),l=pl(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input query is expected to have 3 or 5 dimensions`);let u=n.dims[0],d=n.dims[1],f=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],p=d,m=0,h=0,g=Math.floor(f/t.numHeads);if(c&&l&&B.size(c.dims)&&B.size(l.dims)){if(c.dims.length!==4)throw Error(`Input "past_key" is expected to have 4 dimensions`);if(c.dims[0]!==u||c.dims[1]!==t.numHeads||c.dims[3]!==g)throw Error(`Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)`);if(l.dims[0]!==u||l.dims[1]!==t.numHeads||l.dims[3]!==g)throw Error(`Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)`);if(c.dims[2]!==l.dims[2])throw Error(`Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)`);if(l.dims.length!==4)throw Error(`Input "past_value" is expected to have 4 dimensions`);m=c.dims[2],h=c.dims[2]}else if(c&&B.size(c.dims)||l&&B.size(l.dims))throw Error(`Input "past_key" and "past_value" shall be both present or both absent`);let _;if(r&&B.size(r.dims)>0){if(n.dims.length!==3)throw Error(`Input "query" is expected to have 3 dimensions when key is given`);if(r.dims.length<3||r.dims.length>5)throw Error(`Input "key" is expected to have 3, 4, or 5 dimensions`);if(n.dims[0]!==r.dims[0])throw Error(`Input "query" and "key" shall have same dim 0 (batch size)`);if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw Error(`Input "query" and "key" shall have same dim 2 (hidden_size)`);_=2,p=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==g)throw Error(`Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv`);if(i)throw Error(`Expect "value" be none when "key" has packed kv format.`);_=5,p=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==g)throw Error(`Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key`);_=0,p=r.dims[2]}}else{if(n.dims.length!==5)throw Error(`Input "query" is expected to have 5 dimensions when key is empty`);if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw Error(`Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv`);_=3}if(a&&B.size(a.dims)>0){if(a.dims.length!==1)throw Error(`Input "bias" is expected to have 1 dimension`);if(r&&r.dims.length===5&&r.dims[3]===2)throw Error(`bias is not allowed for packed kv.`)}let v=m+p,y=0;if(o&&B.size(o.dims)>0){y=8;let e=o.dims;throw e.length===1?e[0]===u?y=1:e[0]===3*u+2&&(y=3):e.length===2&&e[0]===u&&e[1]===v&&(y=5),Error(y===8?`Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)`:`Mask not supported`)}let b=!1,x=f;if(i&&B.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw Error(`Input "value" is expected to have 3 or 4 dimensions`);if(n.dims[0]!==i.dims[0])throw Error(`Input "query" and "value" shall have same dim 0 (batch_size)`);if(i.dims.length===3){if(p!==i.dims[1])throw Error(`Input "key" and "value" shall have the same dim 1 (kv_sequence_length)`);x=i.dims[2]}else{if(p!==i.dims[2])throw Error(`Input "key" and "value" shall have the same dim 2 (kv_sequence_length)`);x=i.dims[1]*i.dims[3],b=!0}}if(o&&B.size(o.dims)>0)throw Error(`Key padding mask is not supported`);if(s&&B.size(s.dims)>0){if(s.dims.length!==4)throw Error(`Input "attention_bias" is expected to have 4 dimensions`);if(s.dims[0]!==u||s.dims[1]!==t.numHeads||s.dims[2]!==d||s.dims[3]!==v)throw Error(`Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)`)}return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:v,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:f,vHiddenSize:x,headSize:g,vHeadSize:Math.floor(x/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:y,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:_}},hl=e=>G({...e}),gl=G({perm:[0,2,1,3]}),_l=(e,t,n,r,i,a,o)=>{let s=[r,i,a],c=B.size(s),l=[{type:12,data:c},{type:12,data:o},{type:12,data:a}];return e.compute({name:`MultiHeadAttentionAddBias`,shaderCache:{inputDependencies:[`type`,`type`]},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:l}),getShaderSource:e=>{let r=Z(`qkv_with_bias`,t.dataType,s),i=X(`qkv`,t.dataType,s),a=X(`bias`,n.dataType,s);return`
  ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`bias_offset`,type:`u32`},{name:`hidden_size`,type:`u32`}]).declareVariables(i,a,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[t,n],outputs:[-1]})[0]},vl=(e,t,n,r,i,a,o,s)=>{let c=a;if(o&&B.size(o.dims)>0){if(r===1)throw Error(`AddBiasReshape is not implemented. Please export your model with packed QKV or KV`);return c=_l(e,a,o,t,r,n*i,s),c=c.reshape([t,r,n,i]),n===1||r===1?c:e.compute(si(c,gl.perm),{inputs:[c],outputs:[-1]})[0]}return a.dims.length===3&&(c=a.reshape([t,r,n,i])),n===1||r===1?c:e.compute(si(c,gl.perm),{inputs:[c],outputs:[-1]})[0]},yl=(e,t)=>{let n=ml(e.inputs,t),r=e.inputs[0],i=pl(e.inputs,1),a=pl(e.inputs,2),o=pl(e.inputs,3),s=pl(e.inputs,4),c=pl(e.inputs,5),l=pl(e.inputs,6),u=pl(e.inputs,7);if(r.dims.length===5)throw Error(`Packed QKV is not implemented`);if(i?.dims.length===5)throw Error(`Packed KV is not implemented`);let d=i&&a&&i.dims.length===4&&a.dims.length===4,f=vl(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,o,0);if(d)return ga(e,f,i,a,s,void 0,l,u,c,n);if(!i||!a)throw Error(`key and value must be provided`);let p=vl(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,i,o,n.hiddenSize),m=vl(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,o,2*n.hiddenSize);ga(e,f,p,m,s,void 0,l,u,c,n)}}),xl,Sl,Cl,wl,Tl,El,Dl,Ol=P(()=>{"use strict";R(),V(),K(),Q(),xl=e=>{if(!e||e.length<1)throw Error(`too few inputs`)},Sl=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(e=>n.push(Number(e))),r=n.length),G({numOutputs:r,axis:t.axis,splitSizes:n})},Cl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Y(`uniforms.size_in_split_axis`,`i`,e)}) {
        return i;
    }
    }
    return ${e}u;
}`,wl=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let i=e[r].setByIndices(`indices`,`input[global_idx]`);t===1?n.push(i):r===0?n.push(`if (output_number == ${r}u) { ${i} }`):r===t-1?n.push(`else { ${i} }`):n.push(`else if (output_number == ${r}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Tl=(e,t)=>{let n=e[0].dims,r=B.size(n),i=e[0].dataType,a=B.normalizeAxis(t.axis,n.length),o=Array(t.numOutputs),s=X(`input`,i,n.length),c=Array(t.numOutputs),l=[],u=[],d=0,f=[{type:12,data:r}];for(let r=0;r<t.numOutputs;r++){d+=t.splitSizes[r],c[r]=d;let s=n.slice();s[a]=t.splitSizes[r],u.push(s),o[r]=Z(`output${r}`,i,s.length),l.push({dims:u[r],dataType:e[0].dataType})}return f.push({type:12,data:c},...q(n,...u)),{name:`Split`,shaderCache:{hint:t.cacheKey,inputDependencies:[`rank`]},getShaderSource:e=>`
  ${e.registerUniform(`input_size`,`u32`).registerUniform(`size_in_split_axis`,`u32`,c.length).declareVariables(s,...o)}
  ${Cl(c.length)}
  ${wl(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.input_size`)}

    var indices = ${s.offsetToIndices(`global_idx`)};
    var index = ${s.indicesGet(`indices`,a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y(`uniforms.size_in_split_axis`,`output_number - 1u`,c.length)};
      ${s.indicesSet(`indices`,a,`index`)};
    }
    writeBufferData(output_number, indices, global_idx);
  }`,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},El=(e,t)=>{xl(e.inputs);let n=e.inputs.length===1?t:Sl(e.inputs,t);e.compute(Tl(e.inputs,n),{inputs:[0]})},Dl=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw Error(`numOutputs and splitSizes length must be equal`);return G({axis:t,numOutputs:r,splitSizes:n})}}),kl,Al,jl,Ml=P(()=>{"use strict";R(),V(),K(),Q(),kl=(e,t)=>{let[n,r,i,a]=e,{numHeads:o,rotaryEmbeddingDim:s}=t;if(n.dims.length!==3&&n.dims.length!==4)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!B.areEqual(r.dims,[])&&!B.areEqual(r.dims,[1])&&r.dims.length!==2)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(i.dims.length!==2)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!B.areEqual(i.dims,a.dims))throw Error(`Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape`);if(s>0&&o===0)throw Error(`num_heads must be provided if rotary_embedding_dim is specified`);let c=n.dims[0],l=n.dims[n.dims.length-2],u=i.dims[0],d=B.sizeFromDimension(n.dims,1)/l,f=s===0?i.dims[1]*2:d/o;if(s>f)throw Error(`rotary_embedding_dim must be less than or equal to head_size`);if(r.dims.length===2){if(c!==r.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(l!==r.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(l>u)throw Error(`Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported`);if(f/2!==i.dims[1]&&s/2!==i.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`)},Al=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:i,scale:a}=t,o=e[0].dims[0],s=B.sizeFromDimension(e[0].dims,1),c=e[0].dims[e[0].dims.length-2],l=s/c,u=e[2].dims[1],d=i===0?u*2:l/r,f=[o,c,l/d,d-u],p=B.computeStrides(f),m=[{type:1,data:a},{type:12,data:f},{type:12,data:p},...e[0].dims.length===3?Array({type:12,data:[s,l,d,1]}):[],...e[0].dims.length===4?Array({type:12,data:[s,d,c*d,1]}):[],...q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:`RotaryEmbedding`,shaderCache:{hint:G({interleaved:n}).cacheKey,inputDependencies:[`rank`,`rank`,`rank`,`rank`]},getShaderSource:t=>{let r=X(`input`,e[0].dataType,e[0].dims.length),i=X(`position_ids`,e[1].dataType,e[1].dims.length),a=X(`cos_cache`,e[2].dataType,e[2].dims.length),o=X(`sin_cache`,e[3].dataType,e[3].dims.length),s=Z(`output`,e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:`scale`,type:`f32`},{name:`global_shape`,type:`u32`,length:f.length},{name:`global_strides`,type:`u32`,length:p.length},{name:`input_output_strides`,type:`u32`,length:p.length}]),`
        ${t.declareVariables(r,i,a,o,s)}

        ${t.mainStart(Ur)}
          let half_rotary_emb_dim = uniforms.${a.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes(`size`)}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${i.broadcastedIndicesToOffset(`bsnh.xy`,Z(``,i.type.tensor,2))};
            let position_id =
                u32(${i.getByOffset(`position_ids_idx`)}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${r.getByOffset(`i`)} * ${a.get(`position_id`,`bsnh[3]`)} -
                ${r.getByOffset(`j`)} * ${o.get(`position_id`,`bsnh[3]`)};
            ${s.setByOffset(`i`,`re`)}
            let im = ${r.getByOffset(`i`)} * ${o.get(`position_id`,`bsnh[3]`)} +
                ${r.getByOffset(`j`)} * ${a.get(`position_id`,`bsnh[3]`)};
            ${s.setByOffset(`j`,`im`)}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${s.setByOffset(`k`,r.getByOffset(`k`))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(f)/Ur)},programUniforms:m})}},jl=(e,t)=>{kl(e.inputs,t),e.compute(Al(e.inputs,t))}}),Nl,Pl,Fl,Il,Ll,Rl=P(()=>{"use strict";K(),R(),ya(),bl(),Ol(),ui(),Ml(),Q(),Nl=(e,t)=>{if(t.doRotary&&e.length<=7)throw Error(`cos_cache and sin_cache inputs are required if do_rotary is specified`);let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw Error(`cos_cast and sin_cache are expected if do_rotary attribute is non-zero`);if(t.localWindowSize!==-1)throw Error(`Local attention is not supported`);if(t.softcap!==0)throw Error(`Softcap is not supported`);if(t.rotaryInterleaved!==0)throw Error(`Rotary interleaved is not supported`);if(t.smoothSoftmax)throw Error(`Smooth softmax is not supported`);if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input query is expected to have 3 or 5 dimensions`);let s=n.dims[0],c=n.dims[1],l=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],u=c,d=0,f=!r||r.dims.length===0,p=Math.floor(f?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);f&&(l=p*t.numHeads);let m=a&&a.dims.length!==0,h=o&&o.dims.length!==0;if(m&&a.dims.length===4&&a.dims[0]===s&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===p)throw Error(`BSNH pastKey/pastValue is not supported`);if(m&&h){if(a.dims.length!==4)throw Error(`Input "past_key" is expected to have 4 dimensions`);if(o.dims.length!==4)throw Error(`Input "past_value" is expected to have 4 dimensions`);d=a.dims[2]}else if(m||h)throw Error(`Input "past_key" and "past_value" shall be both present or both absent`);let g=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw Error(`Input "query" is expected to have 3 dimensions when key is given`);if(r.dims.length<3||r.dims.length>5)throw Error(`Input "key" is expected to have 3, 4, or 5 dimensions`);if(n.dims[0]!==r.dims[0])throw Error(`Input "query" and "key" shall have same dim 0 (batch size)`);if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw Error(`Dimension 2 of "query" should be a multiple of "key"`);u=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==p)throw Error(`Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv`);if(i)throw Error(`Expect "value" be none when "key" has packed kv format.`);u=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==p)throw Error(`Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key`);u=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw Error(`Input "query" is expected to have 3 or 5 dimensions when key is empty`);if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw Error(`Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv`);g=3}let _=!1,v=t.kvNumHeads?p*t.kvNumHeads:l;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw Error(`Input "value" is expected to have 3 or 4 dimensions`);if(n.dims[0]!==i.dims[0])throw Error(`Input "query" and "value" shall have same dim 0 (batch_size)`);if(i.dims.length===3){if(u!==i.dims[1])throw Error(`Input "key" and "value" shall have the same dim 1 (kv_sequence_length)`);v=i.dims[2]}else{if(u!==i.dims[2])throw Error(`Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)`);v=i.dims[1]*i.dims[3],_=!0}}let y=e.length>4?e[5]:void 0;if(y){if(y.dims.length===0)throw Error(`seqlens_k must be at least 1D, got scalar.`);let e=y.dims.reduce((e,t)=>e*t,1);if(e!==s)throw Error(`seqlens_k must have batch_size (${s}) elements, got ${e}.`);for(let e=0;e<y.dims.length;e++)if(y.dims[e]!==1&&y.dims[e]!==s)throw Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${s}), got dims[${e}] = ${y.dims[e]}.`)}return{batchSize:s,sequenceLength:c,pastSequenceLength:d,kvSequenceLength:u,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:v,headSize:p,vHeadSize:Math.floor(v/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:g}},Pl=G({perm:[0,2,1,3]}),Fl=(e,t,n)=>{let r=t,i=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,i,n.headSize]),r=e.compute(si(r,Pl.perm),{inputs:[r],outputs:[-1]})[0]),r},Il=(e,t,n,r)=>{let i=[`type`,`type`],a=[e*t],o=e*t,s=[{type:12,data:o},{type:12,data:t},{type:12,data:e}];return{name:`GeneratePositionIds`,shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s}),getShaderSource:e=>{let t=X(`seq_lens`,n.dataType,n.dims),i=X(`total_seq_lens`,r.dataType,r.dims),o=Z(`pos_ids`,7,a);return`
  ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`sequence_length`,type:`u32`},{name:`batch_size`,type:`u32`}]).declareVariables(t,i,o)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
    let total_sequence_length = u32(${i.getByOffset(`0`)});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${t.getByOffset(`batch_idx`)};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${o.setByOffset(`global_idx`,`pos_id`)}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${o.setByOffset(`global_idx`,`pos_id`)}
    } else if (global_idx < uniforms.batch_size) {
      ${o.setByOffset(`global_idx`,`seqlen`)}
    };
  }
  `}}},Ll=(e,t)=>{let n=Nl(e.inputs,t);if(e.inputs[0].dims.length===5)throw Error(`Packed QKV is not implemented`);if(e.inputs[1]?.dims.length===5)throw Error(`Packed KV is not implemented`);let r=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,s=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,c=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,u=n.kvNumHeads?n.kvNumHeads:n.numHeads,d=G({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,u*n.headSize,u*n.headSize]}),[f,p,m]=!i&&!a?e.compute(Tl([r],d),{inputs:[r],outputs:[-1,-1,-1]}):[r,i,a],h,g;if(t.doRotary){let r=e.compute(Il(n.batchSize,n.sequenceLength,c,l),{inputs:[c,l],outputs:[-1]})[0],i=e.inputs[7],a=e.inputs[8],o=G({interleaved:t.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),s=[f,r,i,a],u=[-1];h=e.compute(Al(s,o),{inputs:s,outputs:u})[0],s.splice(0,1,p);let d=G({interleaved:t.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});g=e.compute(Al(s,d),{inputs:s,outputs:u})[0]}let _=vl(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t.doRotary?h:f,void 0,0),v=Fl(e,t.doRotary?g:p,n),y=Fl(e,m,n);ga(e,_,v,y,void 0,void 0,o,s,void 0,n,c,l)}}),zl,Bl,Vl,Hl,Ul=P(()=>{"use strict";R(),V(),ui(),Q(),zl=(e,t,n,r,i,a,o,s)=>{let c=J(a),l=c===1?`f32`:`vec${c}f`,u=c===1?`vec2f`:`mat2x${c}f`,d=i*o,f=64;d===1&&(f=256);let p=[i,o,a/c],m=[i,o,2],h=[`rank`,`type`,`type`],g=[];return g.push(...q(p,m)),e.compute({name:`InstanceNormComputeChannelScaleShift`,shaderCache:{hint:`${c};${s};${f}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:d},programUniforms:g}),getShaderSource:e=>{let i=X(`x`,t.dataType,3,c),a=[i,X(`scale`,n.dataType,n.dims),X(`bias`,r.dataType,r.dims),Z(`output`,1,3,2)];return`
  var<workgroup> workgroup_shared : array<${u}, ${f}>;
  const workgroup_size = ${f}u;
  ${e.declareVariables(...a)}
  ${e.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${i.get(`batch`,`channel`,`h`)});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${u}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Yr(`workgroup_shared[0][0]`,c)} / f32(hight * ${c});
      let squared_sum_final = ${Yr(`workgroup_shared[0][1]`,c)} / f32(hight * ${c});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,n,r],outputs:[-1]})[0]},Bl=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[1],s=B.sizeFromDimension(r,2),c=J(s),l=B.size(i)/c,u=zl(e,t[0],t[1],t[2],a,s,o,n.epsilon),d=[a,o,s/c],f=[a,o];e.compute({name:`InstanceNormalization`,shaderCache:{hint:`${c}`,inputDependencies:[`type`,`none`]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...q(d,f,d)]}),getShaderSource:e=>{let n=X(`x`,t[0].dataType,d.length,c),r=X(`scale_shift`,1,f.length,2),i=Z(`output`,t[0].dataType,d.length,c),a=[n,r,i];return`
  ${e.registerUniform(`output_size`,`u32`).declareVariables(...a)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let outputIndices = ${i.offsetToIndices(`global_idx`)};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices(`vec2<u32>(batch, channel)`)};
      let value = ${n.getByOffset(`global_idx`)} * ${i.type.value}(scale_shift.x) + ${i.type.value}(scale_shift.y);
      ${i.setByOffset(`global_idx`,`value`)};
  }`}},{inputs:[t[0],u]})},Vl=(e,t,n)=>{let r=t[0].dims,i=r,a=r[0],o=r[r.length-1],s=B.sizeFromDimension(r,1)/o,c=J(o),l=B.size(i)/c,u=[{type:12,data:s},{type:12,data:Math.floor(o/c)}],d=[`type`,`type`],f=!1,p=[0,r.length-1];for(let e=0;e<r.length-2;e++)f||=r[e+1]!==1,p.push(e+1);f&&=r[r.length-1]!==1;let m=f?e.compute(si(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(e,t)=>r[p[t]])),h=zl(e,m,t[1],t[2],a,s,o,n.epsilon);e.compute({name:`InstanceNormalizationNHWC`,shaderCache:{hint:`${c}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:e=>{let n=Gr(t[0].dataType),r=c===1?`vec2f`:`mat${c}x2f`,a=e=>{let t=e===0?`x`:`y`,r=c===1?`f32`:`vec${c}f`;switch(c){case 1:return`${n}(${r}(scale.${t}))`;case 2:return`vec2<${n}>(${r}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${n}>(${r}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${c}`)}},o=X(`input`,t[0].dataType,t[0].dims,c),s=Z(`output`,t[0].dataType,i,c);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${r}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${s.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${a(0)}, ${a(1)});
  }`}},{inputs:[t[0],h]})},Hl=(e,t)=>{t.format===`NHWC`?Vl(e,e.inputs,t):Bl(e,e.inputs,t)}}),Wl,Gl,Kl,ql=P(()=>{"use strict";R(),V(),Q(),Wl=e=>{if(!e||e.length<2)throw Error(`layerNorm requires at least 2 inputs.`)},Gl=(e,t,n)=>{let r=t.simplified,i=e[0].dims,a=e[1],o=!r&&e[2],s=i,c=B.normalizeAxis(t.axis,i.length),l=B.sizeToDimension(i,c),u=B.sizeFromDimension(i,c),d=B.size(a.dims),f=o?B.size(o.dims):0;if(d!==u||o&&f!==u)throw Error(`Size of X.shape()[axis:] == ${u}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${f}`);let p=[];for(let e=0;e<i.length;++e)e<c?p.push(i[e]):p.push(1);let m=J(u),h=[`type`,`type`],g=[{type:12,data:l},{type:1,data:u},{type:12,data:Math.floor(u/m)},{type:1,data:t.epsilon}];o&&h.push(`type`);let _=n>1,v=n>2,y=t=>{let n=Gr(e[0].dataType),i=[X(`x`,e[0].dataType,e[0].dims,m),X(`scale`,a.dataType,a.dims,m)];return o&&i.push(X(`bias`,o.dataType,o.dims,m)),i.push(Z(`output`,e[0].dataType,s,m)),_&&i.push(Z(`mean_data_output`,1,p)),v&&i.push(Z(`inv_std_output`,1,p)),`
  ${t.registerUniforms([{name:`norm_count`,type:`u32`},{name:`norm_size`,type:`f32`},{name:`norm_size_vectorized`,type:`u32`},{name:`epsilon`,type:`f32`}]).declareVariables(...i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.norm_count`)}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${qr(`f32`,m)};
    var mean_square_vector = ${qr(`f32`,m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Jr(n,m,`x[h + offset]`)};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Yr(`mean_vector`,m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Yr(`mean_square_vector`,m)} / uniforms.norm_size ${r?``:`- mean * mean`} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Jr(n,m,`x[j + offset]`)};
      let f32scale = ${Jr(n,m,`scale[j]`)};
      output[j + offset] = ${i[0].type.value}((f32input ${r?``:`- mean`}) * inv_std_dev * f32scale
        ${o?`+ ${Jr(n,m,`bias[j]`)}`:``}
      );
    }

    ${_?`mean_data_output[global_idx] = mean`:``};
    ${v?`inv_std_output[global_idx] = inv_std_dev`:``};
  }`},b=[{dims:s,dataType:e[0].dataType}];return _&&b.push({dims:p,dataType:1}),v&&b.push({dims:p,dataType:1}),{name:`LayerNormalization`,shaderCache:{hint:`${m};${n};${r}`,inputDependencies:h},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:y}},Kl=(e,t)=>{Wl(e.inputs),e.compute(Gl(e.inputs,t,e.outputCount))}}),Jl,Yl,Xl=P(()=>{"use strict";V(),is(),ps(),Jl=e=>{if(!e||e.length!==2)throw Error(`MatMul requires 2 inputs.`);if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw Error(`shared dimension does not match.`)},Yl=e=>{Jl(e.inputs);let t=dr.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw Error(`Can't use matmul on the given tensors`);let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(rs(e.inputs,{activation:``},t));else{let i=t[t.length-2],a=B.size(e.inputs[0].dims.slice(0,-2)),o=B.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&i===1&&o===1){let i=e.inputs[0].reshape([1,a,r]),o=e.inputs[1].reshape([1,r,n]),s=[1,a,n],c=[i,o];e.compute(fs(c,{activation:``},t,s),{inputs:c})}else e.compute(fs(e.inputs,{activation:``},t))}}}),Zl,Ql,$l,eu,tu,nu=P(()=>{"use strict";R(),V(),K(),Q(),Zl=(e,t)=>{if(e.length<3||e.length>4)throw Error(`MatMulNBits requires 3 or 4 inputs`);let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw Error(`The last dim of input shape does not match the k value`);let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,o=e[1];if(!B.areEqual(o.dims,[t.n,i,a]))throw Error(`The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize`);let s=e[2].dims;if(B.size(s)!==t.n*i)throw Error(`scales input size error.`);if(e.length===4){let n=e[3].dims,r=t.n*(t.bits===8?i:Math.floor((i*t.bits+7)/8));if(B.size(n)!==r)throw Error(`zeroPoints input size error.`)}},Ql=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),c=B.size(s),l=e[1].dims[2]/4,u=e[0].dataType,d=J(t.k),f=J(l),p=J(o),m=s.concat([i,o]),h=i>1&&o/p%2==0?2:1,g=B.size(m)/p/h,_=[],v=[c,i,a/d],y=B.convertShape(e[1].dims).slice();y.splice(-1,1,l/f),_.push(...q(v)),_.push(...q(y)),_.push(...q(e[2].dims)),e.length===4&&_.push(...q(B.convertShape(e[3].dims)));let b=[c,i,o/p];return _.push(...q(b)),{name:`MatMulNBits`,shaderCache:{hint:`${t.blockSize};${t.bits};${d};${f};${p};${h};64`,inputDependencies:Array(e.length).fill(`rank`)},getRunData:()=>({outputs:[{dims:m,dataType:u}],dispatchGroup:{x:g},programUniforms:_}),getShaderSource:n=>{let r=v.length,i=X(`a`,e[0].dataType,r,d),a=X(`b`,12,y.length,f),o=X(`scales`,e[2].dataType,e[2].dims.length),s=[i,a,o],c=e.length===4?X(`zero_points`,12,e[3].dims.length):void 0;c&&s.push(c);let u=b.length,m=Z(`output`,e[0].dataType,u,p),g=Gr(e[0].dataType),_=(()=>{switch(d){case 1:return`array<${g}, 8>`;case 2:return`mat4x2<${g}>`;case 4:return`mat2x4<${g}>`;default:throw Error(`${d}-component is not supported.`)}})(),x=Math.floor(32/t.bits),S=Math.floor(x/8),C=()=>{let e=``;for(let n=0;n<S;n++){let r=n*t.bits*4,a=r+t.bits;e+=`
          // reuse a data (pass ${n})
            var input_offset${n>0?n:``} = ${n===0?i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`):`input_offset`};
            var a_data${n>0?n:``}: ${_};
            for (var j${n>0?n:``}: u32 = 0; j${n>0?n:``} < ${8/d}; j${n>0?n:``}++) {
              a_data${n>0?n:``}[j${n>0?n:``}] = ${i.getByOffset(`input_offset${n>0?n:``}`)};
              input_offset${n>0?n:``}++;
            }
          `;for(let i=0;i<p*h;i++)e+=`
            b_value = ${f===1?`b${i}_data`:`b${i}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${n*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${r}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${a}u) & b_mask);`}
            b_quantized_values = ${_}(${Array.from({length:4},(e,t)=>`${g}(b_value_lower[${t}]), ${g}(b_value_upper[${t}])`).join(`, `)});
            b_dequantized_values = ${d===1?`${_}(${Array.from({length:8},(e,t)=>`(b_quantized_values[${t}] - ${c?`zero_point${i}`:`zero_point`}) * scale${i}`).join(`, `)});`:`(b_quantized_values - ${_}(${Array(8).fill(`${c?`zero_point${i}`:`zero_point`}`).join(`,`)})) * scale${i};`};
            workgroup_shared[local_id.x * ${h} + ${Math.floor(i/p)}]${p>1?`[${i%p}]`:``} += ${Array.from({length:8/d},(e,t)=>`${d===1?`a_data${n>0?n:``}[${t}] * b_dequantized_values[${t}]`:`dot(a_data${n>0?n:``}[${t}], b_dequantized_values[${t}])`}`).join(` + `)};
          `}return e},w=()=>{let e=`
            var col_index = col * ${p};
            ${c?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${2**(t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${g}(${(2**(t.bits-1)).toFixed(1)});`}
            `;for(let n=0;n<p*h;n++)e+=`
            let scale${n} = ${o.getByOffset(`col_index * nBlocksPerCol + block`)};
            ${c?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${c.getByOffset(`zero_point_word_index`)} >> zero_point_bits_offset;
            let zero_point${n} = ${g}((zero_point_word) & ${t.bits===2?`0x3u`:`0xFu`});`:``}
            col_index += 1;`;return e},T=()=>{let e=`col_index = col * ${p};`;for(let t=0;t<p*h;t++)e+=`
            let b${t}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?`0x03030303u`:`0x0F0F0F0Fu`};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${_};
            var b_dequantized_values: ${_};`,e};return`
        var<workgroup> workgroup_shared: array<${m.type.value}, ${h*64}>;
        ${n.declareVariables(...s,m)}
        ${n.mainStart([64,1,1])}
          let output_indices = ${m.offsetToIndices(`(global_idx / 64) * ${h}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/d};
            ${w()}
            for (var word: u32 = 0; word < ${l}; word += ${f}) {
              ${T()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${C()}
                word_offset += ${x/d};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${h}) {
            var output_value: ${m.type.value} = ${m.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${h};
            }
            ${m.setByIndices(`${m.type.indices}(batch, row, col + local_id.x)`,`output_value`)};
          }
        }`}}},$l=(e,t)=>{let n=e[0].dims,r=n.length,i=n[r-2],a=t.k,o=t.n,s=n.slice(0,r-2),c=B.size(s),l=e[1].dims[2]/4,u=e[0].dataType,d=J(t.k),f=J(l),p=s.concat([i,o]),m=o%8==0?8:o%4==0?4:1,h=128/m,g=Math.floor(32/t.bits),_=h*f*g,v=_/d,y=_/t.blockSize,b=B.size(p)/m,x=[],S=[c,i,a/d],C=B.convertShape(e[1].dims).slice();C.splice(-1,1,l/f),x.push(...q(S)),x.push(...q(C)),x.push(...q(e[2].dims)),e.length===4&&x.push(...q(B.convertShape(e[3].dims)));let w=[c,i,o];return x.push(...q(w)),{name:`BlockwiseMatMulNBits32`,shaderCache:{hint:`${t.blockSize};${d};${f};${h};${m}`,inputDependencies:Array(e.length).fill(`rank`)},getRunData:()=>({outputs:[{dims:p,dataType:u}],dispatchGroup:{x:b},programUniforms:x}),getShaderSource:n=>{let r=S.length,i=X(`a`,e[0].dataType,r,d),a=X(`b`,12,C.length,f),o=X(`scales`,e[2].dataType,e[2].dims.length),s=[i,a,o],c=e.length===4?X(`zero_points`,12,e[3].dims.length):void 0;c&&s.push(c);let l=w.length,u=Z(`output`,e[0].dataType,l),p=Gr(e[0].dataType),_=()=>{switch(d){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${d}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${i.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${u.type.value}, ${h}>, ${m}>;
        ${n.declareVariables(...s,u)}
        ${n.mainStart([h,m,1])}
          let output_indices = ${u.offsetToIndices(`workgroup_index * ${m}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${y} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${i.getByIndices(`${i.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${i.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${y} + local_id.x;
            ${c?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${c.getByOffset(`zero_point_word_index`)} >> zero_point_bits_offset;
            let zero_point = ${p}((zero_point_word) & ${t.bits===2?`0x3u`:`0xFu`});`:`
            // The default zero point is ${2**(t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${p}(${(2**(t.bits-1)).toFixed(1)});`}
            let scale = ${o.getByOffset(`b_row * n_blocks_per_col + block`)};
            let b_data = ${a.getByIndices(`${a.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/d};
            for (var i: u32 = 0; i < ${f}; i++) {
              let b_value = ${f===1?`b_data`:`b_data[i]`};
              ${(()=>{let e=Math.floor(g/8),n=``;for(let r=0;r<e;r++){let e=r*t.bits*4,i=e+t.bits;n+=`
              ${_()}
              {${t.bits===2?`
                let half_word = b_value >> ${r*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${i}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(`, `)});
                let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill(`zero_point`).join(`,`)})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`${`dot(a_data${t}, b_dequantized_values[${t}])`}`).join(` + `)};
              }
              word_offset += ${8/d};`}return n})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${m}) {
            var output_value: ${u.type.value} = ${u.type.value}(0);
            for (var b = 0u; b < ${h}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${u.setByIndices(`${u.type.indices}(batch, row, col + local_idx)`,`output_value`)}
            }
          }
        }`}}},eu=(e,t)=>{Zl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor(`intel`)&&e.adapterInfo.isArchitecture(`gen-12lp`)?e.compute($l(e.inputs,t)):e.compute(Ql(e.inputs,t))},tu=e=>G(e)}),ru,iu,au,ou,su,cu,lu,uu,du,fu=P(()=>{"use strict";R(),V(),Q(),ru=e=>{if(!e||e.length<1)throw Error(`Too few inputs`);if(e[0].dataType!==1&&e[0].dataType!==10)throw Error(`Input type must be float or float16.`);if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw Error(`The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].`)}},iu=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
            k = i32(${e.indicesGet(`indices`,i)}) - ${Y(`uniforms.pads`,i,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y(`uniforms.x_shape`,i,t)})) {
              break;
            }
            offset += k * i32(${Y(`uniforms.x_strides`,i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},au=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${Y(`uniforms.pads`,i,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y(`uniforms.x_shape`,i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y(`uniforms.x_shape`,i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},ou=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${Y(`uniforms.pads`,i,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y(`uniforms.x_shape`,i,t)})) {
                  k = i32(${Y(`uniforms.x_shape`,i,t)}) - 1;
                }
                offset += k * i32(${Y(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},su=(e,t,n)=>{let r=``;for(let i=t-1;i>=0;--i)r+=`
                k = i32(${e.indicesGet(`indices`,i)}) - ${Y(`uniforms.pads`,i,n)};
                if (k < 0)  {
                  k += i32(${Y(`uniforms.x_shape`,i,t)}]);
                }
                if (k >= i32(${Y(`uniforms.x_shape`,i,t)})) {
                  k -= i32(${Y(`uniforms.x_shape`,i,t)});
                }
                offset += k * i32(${Y(`uniforms.x_strides`,i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},cu=(e,t,n)=>{switch(n.mode){case 0:return iu(e,t,n.pads.length);case 1:return au(e,t,n.pads.length);case 2:return ou(e,t,n.pads.length);case 3:return su(e,t,n.pads.length);default:throw Error(`Invalid mode`)}},lu=(e,t)=>{let n=B.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,i=[{type:12,data:B.size(n)},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;return t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...q(e[0].dims,n)),{name:`Pad`,shaderCache:{hint:`${t.mode}${a}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(n)/64)},programUniforms:i}),getShaderSource:i=>{let o=Z(`output`,e[0].dataType,n.length),s=X(`x`,e[0].dataType,r.length),c=s.type.value,l=cu(o,r.length,t),u=[{name:`output_size`,type:`u32`},{name:`pads`,type:`i32`,length:t.pads.length}];return t.mode===0&&u.push({name:`constant_value`,type:a?c:`f32`}),`
            ${i.registerUniforms(u).declareVariables(s,o)}
            ${i.mainStart()}
            ${i.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}

            let indices = ${o.offsetToIndices(`global_idx`)};

            var value = ${c}(0);
            ${l}
            output[global_idx] = value;
        }`}}},uu=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,a=new Int32Array(2*i).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)a[Number(t[e])]=Number(n[e]),a[Number(t[e])+i]=Number(n[e+t.length])}else n.forEach((e,t)=>a[Number(t)]=Number(e));let o=[];return a.forEach(e=>o.push(e)),{mode:t.mode,value:r,pads:o}}return t},du=(e,t)=>{ru(e.inputs);let n=uu(e.inputs,t);e.compute(lu(e.inputs,n),{inputs:[0]})}}),pu,mu,hu,gu,_u,vu,yu,bu,xu,Su,Cu,wu,Tu,Eu,Du,Ou,ku,Au,ju,Mu=P(()=>{"use strict";Qt(),R(),V(),Q(),pu=e=>{if(F.webgpu.validateInputContent&&(!e||e.length!==1))throw Error(`Pool ops requires 1 input.`)},mu=(e,t,n)=>{let r=t.format===`NHWC`,i=e.dims.slice();r&&i.splice(1,0,i.pop());let a=Object.hasOwnProperty.call(t,`dilations`),o=t.kernelShape.slice(),s=t.strides.slice(),c=a?t.dilations.slice():[],l=t.pads.slice();fr.adjustPoolAttributes(n,i,o,s,c,l);let u=fr.computePoolOutputShape(n,i,s,c,o,l,t.autoPad),d=Object.assign({},t);a?Object.assign(d,{kernelShape:o,strides:s,pads:l,dilations:c,cacheKey:t.cacheKey}):Object.assign(d,{kernelShape:o,strides:s,pads:l,cacheKey:t.cacheKey});let f=u.slice();return f.push(f.splice(1,1)[0]),[d,r?f:u]},hu=(e,t)=>{let n=t.format===`NHWC`,r=B.size(e),i=B.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:i}],o=[{name:`outputSize`,type:`u32`},{name:`kernelSize`,type:`u32`}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],n=t.strides[t.strides.length-1],r=t.pads[t.pads.length/2-1],i=t.pads[t.pads.length-1],s=!!(r+i);a.push({type:12,data:e},{type:12,data:n},{type:12,data:r},{type:12,data:i}),o.push({name:`kw`,type:`u32`},{name:`sw`,type:`u32`},{name:`pwStart`,type:`u32`},{name:`pwEnd`,type:`u32`});let c=!1;if(t.kernelShape.length===2){let e=t.kernelShape[t.kernelShape.length-2],n=t.strides[t.strides.length-2],r=t.pads[t.pads.length/2-2],i=t.pads[t.pads.length-2];c=!!(r+i),a.push({type:12,data:e},{type:12,data:n},{type:12,data:r},{type:12,data:i}),o.push({name:`kh`,type:`u32`},{name:`sh`,type:`u32`},{name:`phStart`,type:`u32`},{name:`phEnd`,type:`u32`})}return[a,o,!0,s,c]}{if(n)throw Error(`Pooling with kernelShape.length > 2 is not supported for NHWC format.`);let e=B.computeStrides(t.kernelShape);return a.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:`kernelStrides`,type:`u32`,length:e.length},{name:`pads`,type:`u32`,length:t.pads.length},{name:`strides`,type:`u32`,length:t.strides.length}),[a,o,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},gu=(e,t,n,r,i,a,o,s,c,l,u,d)=>{let f=i.format===`NHWC`,p=t.type.value,m=Z(`output`,t.type.tensor,r);if(i.kernelShape.length<=2){let r=``,l=``,h=``,g=n-(f?2:1);if(r=u?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset(`xIndices`)}];
                  ${a}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset(`xIndices`)}];
                  ${a}
                }`,i.kernelShape.length===2){let e=n-(f?3:2);l=d?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,h=`
              }
            `}return`
            ${e.registerUniforms(c).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}

              let indices = ${m.offsetToIndices(`global_idx`)};
              var xIndices = ${m.offsetToIndices(`global_idx`)};

              var value = ${p}(${s});
              var pad = 0;
              ${l}
              ${r}
              ${h}
              ${o}

              output[global_idx] = value;
            }`}{if(f)throw Error(`Pooling with kernelShape.length > 2 is not supported for NHWC format.`);let r=i.kernelShape.length,u=i.pads.length,d=``;return d=l?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset(`xIndices`)}];
                ${a}
              }`:`
              }
              let x_val = x[${t.indicesToOffset(`xIndices`)}];
              ${a}
            `,`
            ${e.registerUniforms(c).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
              let indices = ${m.offsetToIndices(`global_idx`)};
              var xIndices = ${m.offsetToIndices(`global_idx`)};

              var offsets: array<u32, ${r}>;

              var value = ${p}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${r-1}u; j++) {
                  offsets[j] = offset / ${Y(`uniforms.kernelStrides`,`j`,r)};
                  offset -= offsets[j] * ${Y(`uniforms.kernelStrides`,`j`,r)};
                }
                offsets[${r-1}] = offset;

                isPad = false;
                for (var j = ${n-r}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${Y(`uniforms.strides`,`j - ${n-r}u`,r)}
                    + offsets[j - ${n-r}u] - ${Y(`uniforms.pads`,`j - 2u`,u)};
                  ${d}
              }
              ${o}

              output[global_idx] = value;
            }`}},_u=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,vu=e=>`${_u(e)};${e.countIncludePad}`,yu=e=>`${_u(e)};${e.storageOrder};${e.dilations}`,bu=e=>({format:e.format,autoPad:[`NOTSET`,`VALID`,`SAME_UPPER`,`SAME_LOWER`][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),xu=(e,t,n,r)=>{let[i,a]=mu(t,r,n),o=X(`x`,t.dataType,t.dims.length),s=o.type.value,c=``;i.countIncludePad?c+=`value /= ${s}(uniforms.kernelSize);`:c+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[l,u,d,f,p]=hu(a,i);return l.push(...q(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${d};${f};${p}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:l}),getShaderSource:e=>gu(e,o,t.dims.length,a.length,i,`value += x_val;`,c,0,u,d,f,p)}},Su=e=>{let t=e.count_include_pad!==0,n=bu(e);if(n.ceilMode!==0)throw Error(`using ceil() in shape computation is not yet supported for AveragePool`);let r={countIncludePad:t,...n,cacheKey:``};return{...r,cacheKey:vu(r)}},Cu=(e,t)=>{pu(e.inputs),e.compute(xu(`AveragePool`,e.inputs[0],!1,t))},wu={autoPad:``,ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Tu=e=>{let t=e.format;return{format:t,...wu,cacheKey:t}},Eu=(e,t)=>{pu(e.inputs),e.compute(xu(`GlobalAveragePool`,e.inputs[0],!0,t))},Du=(e,t,n,r)=>{let[i,a]=mu(t,r,n),o=X(`x`,t.dataType,t.dims.length),s=[`rank`],[c,l,u,d,f]=hu(a,i);return c.push(...q(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${u};${d};${f}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:c}),getShaderSource:e=>gu(e,o,t.dims.length,a.length,i,`
      value = max(x_val, value);
    `,``,t.dataType===10?-65504:-1e5,l,u,d,f)}},Ou=(e,t)=>{pu(e.inputs),e.compute(Du(`MaxPool`,e.inputs[0],!1,t))},ku=e=>{let t=e.storage_order,n=e.dilations,r=bu(e);if(t!==0)throw Error(`column major storage order is not yet supported for MaxPool`);if(r.ceilMode!==0)throw Error(`using ceil() in shape computation is not yet supported for MaxPool`);let i={storageOrder:t,dilations:n,...r,cacheKey:``};return{...i,cacheKey:yu(i)}},Au=e=>{let t=e.format;return{format:t,...wu,cacheKey:t}},ju=(e,t)=>{pu(e.inputs),e.compute(Du(`GlobalMaxPool`,e.inputs[0],!0,t))}}),Nu,Pu,Fu,Iu,Lu=P(()=>{"use strict";R(),V(),K(),Q(),Nu=(e,t)=>{if(e.length<2||e.length>3)throw Error(`DequantizeLinear requires 2 or 3 inputs.`);if(e.length===3&&e[1].dims===e[2].dims)throw Error(`x-scale and x-zero-point must have the same shape.`);if(e.length===3&&e[0].dataType!==e[2].dataType)throw Error(`x and x-zero-point must have the same data type.`);if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw Error(`scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.`);if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error(`x and x-zero-point must have the same data type.`);if(e[1].dims.length!==e[2].dims.length)throw Error(`scale and zero-point inputs must have the same rank.`);if(!e[1].dims.map((t,n)=>t===e[2].dims[n]).reduce((e,t)=>e&&t,!0))throw Error(`scale and zero-point inputs must have the same shape.`)}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw Error(`blockSize must be set only for block quantization.`);if(!e[1].dims.map((n,r)=>r===t.axis||n===e[0].dims[r]).reduce((e,t)=>e&&t,!0))throw Error(`For block qunatization, scale input shape to match the input shape except for the axis`);if(e[1].dims.length!==e[0].dims.length)throw Error(`For block qunatization the scale input rank must be the same as the x rank.`);let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw Error(`blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].`)}},Pu=(e,t)=>{let n=B.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,i=r===3,a=e[0].dims,o=e[1].dataType,s=B.size(a),c=r===3||r===2,l=c?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,u=e[1].dims,d=e.length>2?e[2]:void 0,f=d?c?[Math.ceil(B.size(d.dims)/4)]:d.dims:void 0,p=u.length===0||u.length===1&&u[0]===1,m=p===!1&&u.length===1,h=J(s),g=p&&(!c||h===4),_=g?h:1,v=g&&!c?h:1,y=X(`input`,c?12:r,l.length,v),b=X(`scale`,o,u.length),x=d?X(`zero_point`,c?12:r,f.length):void 0,S=Z(`output`,o,a.length,_),C=[y,b];x&&C.push(x);let w=[l,u];d&&w.push(f);let T=[{type:12,data:s/_},{type:12,data:n},{type:12,data:t.blockSize},...q(...w,a)];return{name:`DequantizeLinear`,shaderCache:{hint:t.cacheKey,inputDependencies:x?[`rank`,`rank`,`rank`]:[`rank`,`rank`]},getShaderSource:e=>`
      ${e.registerUniforms([{name:`output_size`,type:`u32`},{name:`axis`,type:`u32`},{name:`block_size`,type:`u32`}]).declareVariables(...C,S)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
          let output_indices = ${S.offsetToIndices(`global_idx`)};

          // Set input x
          ${c?`
            let input = ${y.getByOffset(`global_idx / 4`)};
            let x_vec = ${i?`unpack4xI8(input)`:`unpack4xU8(input)`};
            let x_value = ${_===1?`x_vec[global_idx % 4]`:`x_vec`};`:`let x_value = ${y.getByOffset(`global_idx`)};`};

          // Set scale input
          ${p?`let scale_value= ${b.getByOffset(`0`)}`:m?`
            let scale_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
            let scale_value= ${b.getByOffset(`scale_index`)};`:`
            var scale_indices: ${b.type.indices} = output_indices;
            let index = ${b.indicesGet(`scale_indices`,`uniforms.axis`)} / uniforms.block_size;
            ${b.indicesSet(`scale_indices`,`uniforms.axis`,`index`)};
            let scale_value= ${b.getByIndices(`scale_indices`)};`};

          // Set zero-point input
          ${x?p?c?`
                let zero_point_input = ${x.getByOffset(`0`)};
                let zero_point_vec =  ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset(`0`)}`:m?c?`
                let zero_point_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
                let zero_point_input = ${x.getByOffset(`zero_point_index / 4`)};
                let zero_point_vec =  ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet(`output_indices`,`uniforms.axis`)};
                let zero_point_value = ${x.getByOffset(`zero_point_index`)};`:c?`
                let zero_point_offset = ${b.indicesToOffset(`scale_indices`)};
                let zero_point_input = ${x.getByOffset(`zero_point_offset / 4`)};
                let zero_point_vec = ${i?`unpack4xI8(zero_point_input)`:`unpack4xU8(zero_point_input)`};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices(`scale_indices`)};`:`let zero_point_value = ${c?i?`i32`:`u32`:y.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset(`global_idx`,`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/_/64),y:1,z:1},programUniforms:T})}},Fu=(e,t)=>{Nu(e.inputs,t),e.compute(Pu(e.inputs,t))},Iu=e=>G({axis:e.axis,blockSize:e.blockSize})}),Ru,zu,Bu,Vu=P(()=>{"use strict";Qt(),R(),Q(),Ru=(e,t,n)=>{if(e===t||e<t&&n<0||e>t&&n>0)throw Error(`Range these inputs' contents are invalid.`)},zu=(e,t,n,r)=>{let i=Math.abs(Math.ceil((t-e)/n)),a=[i],o=i,s=[{type:12,data:o},{type:r,data:e},{type:r,data:n},...q(a)];return{name:`Range`,shaderCache:{hint:`${r}`},getShaderSource:e=>{let t=Z(`output`,r,a.length),n=t.type.value,i=[{name:`outputSize`,type:`u32`},{name:`start`,type:n},{name:`delta`,type:n}];return`
        ${e.registerUniforms(i).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
        output[global_idx] = uniforms.start + ${n}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:s})}},Bu=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),F.webgpu.validateInputContent&&Ru(t,n,r),e.compute(zu(t,n,r,e.inputs[0].dataType),{inputs:[]})}}),Hu,Uu,Wu,Gu,Ku=P(()=>{"use strict";R(),V(),K(),Q(),Hu=(e,t,n,r)=>{if(e!==`none`&&r!==`i32`&&r!==`u32`&&r!==`f32`)throw Error(`Input ${r} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case`none`:return`${t}=${n};`;case`add`:return r===`i32`||r===`u32`?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${i}bitcast<${r}>(oldValue) + (${n})${a}`;case`max`:return r===`i32`||r===`u32`?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${i}max(bitcast<f32>(oldValue), (${n}))${a}`;case`min`:return r===`i32`||r===`u32`?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${i}min(bitcast<${r}>(oldValue), (${n}))${a}`;case`mul`:return`${i}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw Error(`Reduction ${e} is not supported.`)}},Uu=(e,t)=>{let n=e[0].dims,r=e[1].dims,i=n,a=Math.ceil(B.sizeToDimension(r,r.length-1)/1),o=r[r.length-1],s=B.sizeFromDimension(n,o),c=[{type:12,data:a},{type:12,data:o},{type:12,data:s},...q(e[1].dims,e[2].dims,i)];return{name:`ScatterND`,shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:[`rank`,`rank`]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:n=>{let r=X(`indices`,e[1].dataType,e[1].dims.length),a=X(`updates`,e[2].dataType,e[2].dims.length,1),o=t.reduction!==`none`&&t.reduction!==``?Zr(`output`,e[0].dataType,i.length):Z(`output`,e[0].dataType,i.length,1);return`
      ${n.registerUniform(`output_size`,`u32`).registerUniform(`last_index_dimension`,`u32`).registerUniform(`num_updates_elements`,`u32`).declareVariables(r,a,o)}
      ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Hu(t.reduction,`output[data_offset + i]`,`value`,o.type.value)}
  }

      }`}}},Wu=e=>G({reduction:e.reduction}),Gu=(e,t)=>{e.compute(Uu(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),qu,Ju,Yu,Xu,Zu,Qu,$u,ed,td,nd,rd,id,ad,od,sd,cd,ld,ud,dd,fd,pd=P(()=>{"use strict";R(),V(),K(),Q(),qu=(e,t)=>{if(e.every(e=>e>0||(()=>{throw Error(`Resize requires scales input values to be positive`)})),e.length>0){if(t.mode===`linear`){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode===`cubic`&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw Error(`Resize requires scales input size to be 2 or 4 for cubic mode`)}},Ju=(e,t,n)=>{t.every(e=>e>=0&&e<n||(()=>{throw Error(`Resize requires axes input values to be positive and less than rank`)}));let r=Array(n).fill(1);return t.forEach((t,n)=>r[t]=e[n]),r},Yu=(e,t,n,r,i,a)=>{let[o,s,c]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(e=>a.push(e));else if(t.coordinateTransformMode===`tf_crop_and_resize`)throw Error(`Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize`);if(s>0&&e.length>s&&e[s].dims.length===1&&e[s].dims[0]>0){if(e[s].getFloat32Array().forEach(e=>r.push(e)),r.length!==0&&r.length!==l&&n>=18&&r.length!==t.axes.length)throw Error(`Resize requires scales input size to be same as input rank or axes size for opset 18 and up`);qu(r,t),t.axes.length>0&&Ju(r,t.axes,l).forEach((e,t)=>r[t]=e)}if(c>0&&e.length>c&&e[c].dims.length===1&&e[c].dims[0]>0&&(e[c].getBigInt64Array().forEach(e=>i.push(Number(e))),i.length!==0&&i.length!==l&&n>=18&&i.length!==t.axes.length))throw Error(`Resize requires sizes input size to be same as input rank or axes size for opset 18 and up`);if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw Error(`Resize requires "scales" input size to be of axes rank when axes attributes is specified`);if(i.length!==0&&i.length!==t.axes.length)throw Error(`Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified`)}if(typeof r<`u`&&typeof i<`u`&&r.length>0&&i.length>l)throw Error(`Resize requires only of scales or sizes to be specified`)},Xu=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,Zu=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case`asymmetric`:return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Xu(`xResized`,`lengthOriginal`,`lengthResized`,t)}
          }
        `;case`pytorch_half_pixel`:return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case`tf_half_pixel_for_nn`:return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case`align_corners`:return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Xu(`xResized`,`lengthOriginal - 1`,`lengthResized - 1`,t)}
                  }`;case`tf_crop_and_resize`:return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case`half_pixel_symmetric`:return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case`half_pixel`:return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${e} is not supported`)}})()+`}`,Qu=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case`round_prefer_ceil`:return`if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }`;case`floor`:return`return floor(xOriginal);`;case`ceil`:return`return ceil(xOriginal);`;case`round_prefer_floor`:return`if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }`;default:if(t<11)return`if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }`;throw Error(`Nearest mode ${e} is not supported`)}})()+`}`,$u=(e,t,n)=>{let r=Array(n).fill(0).concat(Array(n).fill(1)),i=e.length===0?r:e.slice();return t.length>0?(t.forEach((e,a)=>{r[e]=i[a],r[a+n]=i[t.length+a]}),r):i},ed=(e,t,n,r)=>{let i=[];if(n.length>0)if(r.length>0){if(e.forEach(e=>i.push(e)),Math.max(...r)>e.length)throw Error(`axes is out of bound`);r.forEach((e,t)=>i[e]=n[t])}else n.forEach(e=>i.push(e));else{if(t.length===0)throw Error(`Resize requires either scales or sizes.`);i=e.map((e,n)=>Math.round(e*t[n]))}return i},td=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case`not_larger`:return n.axes.length>0?Math.min(...n.axes.map(e=>t[e]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case`not_smaller`:return n.axes.length>0?Math.max(...n.axes.map(e=>t[e]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return n.axes.length>0?(n.axes.forEach(e=>t[e]=r),n.axes.forEach(n=>i[n]=Math.round(e[n]*t[n]))):(t.fill(r,0,t.length),i.forEach((e,n)=>i[n]=Math.round(e*t[n]))),i},nd=(e,t,n,r,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet(`output_indices`,`i`)};
        var scale = ${Y(`uniforms.scales`,`i`,r)};
        var roi_low = ${Y(`uniforms.roi`,`i`,i)};
        var roi_hi = ${Y(`uniforms.roi`,`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Y(`uniforms.input_shape`,`i`,t.length)};
          var output_shape_i = ${Y(`uniforms.output_shape`,`i`,n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,rd=(e,t,n,r,i,a,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet(`output_indices`,`i`)};
        var input_index: u32;
        var scale = ${Y(`uniforms.scales`,`i`,i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y(`uniforms.roi`,`i`,a)};
          var roi_hi = ${Y(`uniforms.roi`,`i + ${n.length}`,a)};
          var input_shape_i = ${Y(`uniforms.input_shape`,`i`,n.length)};
          var output_shape_i = ${Y(`uniforms.output_shape`,`i`,r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet(`input_indices`,`i`,`input_index`)}
      }
      return input_indices;
    }`,id=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet(`input_indices`,`i`)};
        if (input_index < 0 || input_index >= ${Y(`uniforms.input_shape`,`i`,t.length)}) {
          return false;
        }
      }
      return true;
    }`,ad=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet(`input_indices`,t,`channel`)};
    ${e.indicesSet(`input_indices`,n,`batch`)};
`:``,od=(e,t,n,r,i)=>{let[a,o,s,c]=n.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet(`input_indices`,o,`max(0, min(row, ${n[o]} - 1))`)};
      ${e.indicesSet(`input_indices`,s,`max(0, min(col, ${n[s]} - 1))`)};
      ${ad(e,c,a,2)}
      return ${e.getByIndices(`input_indices`)};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${o}];
      var col:${l} = originalIndices[${s}];
      ${r?`if (row < 0 || row > (${n[o]} - 1) || col < 0 || col > (${n[s]} - 1)) {
        return ${i};
      }`:``};
      row = max(0, min(row, ${n[o]} - 1));
      col = max(0, min(col, ${n[s]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${c}])`:`0`};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:`0`};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},sd=(e,t,n,r,i,a,o,s,c,l)=>{let[u,d]=n.length===2?[0,1]:[2,3],f=e.type.value,p=o=>{let d=o===u?`row`:`col`;return`
      fn ${d}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet(`output_indices`,o)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[o]},
        ${r[o]}, ${n[o]}, ${a[o]}, ${a[o]} + ${n.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[o]} - 1))) {
          return ${c};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${d}: ${f} = originalIdx + ${f}(i);
          if (${d} < 0 || ${d} >= ${n[o]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${c};`:`${d} = max(0, min(${d}, ${n[o]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet(`input_indices_copy`,o,`u32(${d})`)};
          data[i + 1] = ${o===u?e.getByIndices(`input_indices_copy`):`rowCubicInterpolation(input_indices_copy, output_indices)`};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${p(u)};
    ${p(d)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},cd=(e,t,n,r,i)=>{let[a,o,s,c,l]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet(`input_indices`,o,`max(0, min(depth, ${n[o]} - 1))`)};
      ${e.indicesSet(`input_indices`,s,`max(0, min(height, ${n[s]} - 1))`)};
      ${e.indicesSet(`input_indices`,c,`max(0, min(width, ${n[c]} - 1))`)};
      ${ad(e,l,a,3)}
      return ${e.getByIndices(`input_indices`)};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${o}];
      var height:${u} = originalIndices[${s}];
      var width:${u} = originalIndices[${c}];
      ${r?`if (depth < 0 || depth > (${n[o]} - 1) || height < 0 || height > (${n[s]} - 1) || width < 0 || (width > ${n[c]} - 1)) {
      return ${i};
        }`:``};

    depth = max(0, min(depth, ${n[o]} - 1));
      height = max(0, min(height, ${n[s]} - 1));
      width = max(0, min(width, ${n[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${l}])`:`0`};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:`0`};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},ld=(e,t,n,r,i,a)=>{let o=e.dims,s=$u(a,t.axes,o.length),c=ed(o,r,i,t.axes),l=r.slice();r.length===0&&(l=o.map((e,t)=>e===0?1:c[t]/e),t.keepAspectRatioPolicy!==`stretch`&&(c=td(o,l,t)));let u=Z(`output`,e.dataType,c.length),d=X(`input`,e.dataType,o.length),f=B.size(c),p=o.length===c.length&&o.every((e,t)=>e===c[t]),m=t.coordinateTransformMode===`tf_crop_and_resize`,h=t.extrapolationValue,g=d.type.value;return{name:`Resize`,shaderCache:{hint:`${t.cacheKey}|${n}|${l.length>0?t.mode===`cubic`?l:l.length:``}|${i.length>0?i:``}|${s.length>0?s:``}|${p}|${t.mode===`nearest`?o.length:o}`,inputDependencies:[`rank`]},getShaderSource:e=>`
      ${p?``:`
      ${Zu(t.coordinateTransformMode,g)};
      ${(()=>{switch(t.mode){case`nearest`:return`
              ${id(d,o)};
              ${Qu(t.nearestMode,n,g)};
              ${rd(d,u,o,c,l.length,s.length,m)};
              `;case`linear`:return`
              ${nd(u,o,c,l.length,s.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${od(d,u,o,m,h)}`;if(o.length===3||o.length===5)return`${cd(d,u,o,m,h)}`;throw Error(`Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.`)})()};
            `;case`cubic`:return`
            ${(()=>{if(o.length===2||o.length===4)return`${sd(d,u,o,c,l,s,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error(`Cubic mode only supports input dims 2 and 4 are supported in linear mode.`)})()};
            `;default:throw Error(`Invalid resize mode`)}})()};
      `}
      ${e.registerUniform(`output_size`,`u32`).registerUniform(`scales`,`f32`,l.length).registerUniform(`roi`,`f32`,s.length).declareVariables(d,u)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
        ${p?`output[global_idx] = input[global_idx];`:`
        let output_indices = ${u.offsetToIndices(`global_idx`)};
        var input_indices: ${d.type.indices};
        ${(()=>{switch(t.mode){case`nearest`:return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${d.getByIndices(`input_indices`)};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case`linear`:return`output[global_idx] = ${o.length===2||o.length===4?`bilinearInterpolation`:`trilinearInterpolation`}(output_indices);`;case`cubic`:return`output[global_idx] = bicubicInterpolation(output_indices);`;default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`,getRunData:()=>({outputs:[{dims:c,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:s},...q(o,c)]})}},ud=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},dd=(e,t)=>{let n=[],r=[],i=[],a=ud(e);if(t.antialias!==0)throw Error(`Only default value (0) for Antialias attribute is supported`);Yu(e.inputs,t,a,n,r,i),e.compute(ld(e.inputs[0],t,a,n,r,i),{inputs:[0]})},fd=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,i=e.cubicCoeffA,a=e.excludeOutside!==0,o=e.extrapolationValue,s=e.keepAspectRatioPolicy,c=e.mode,l=e.nearestMode===``?`simple`:e.nearestMode;return G({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:i,excludeOutside:a,extrapolationValue:o,keepAspectRatioPolicy:s,mode:c,nearestMode:l})}}),md,hd,gd,_d=P(()=>{"use strict";R(),V(),Q(),md=e=>{if(!e||e.length<3)throw Error(`layerNorm requires at least 3 inputs.`);let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw Error(`All inputs must have the same data type`);if(t.dims.length!==3&&t.dims.length!==2)throw Error(`Input must be 2D or 3D`);if(n.dims.length!==3&&n.dims.length!==2)throw Error(`Skip must be 2D or 3D`);let i=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==i)throw Error(`Skip must have the same hidden size as input`);if(n.dims[n.dims.length-2]!==a)throw Error(`Skip must have the same sequence length as input`);if(r.dims.length!==1)throw Error(`Gamma must be 1D`);if(r.dims[r.dims.length-1]!==i)throw Error(`Gamma must have the same hidden size as input`);if(e.length>3){let t=e[3];if(t.dims.length!==1)throw Error(`Beta must be 1D`);if(t.dims[t.dims.length-1]!==i)throw Error(`Beta must have the same hidden size as input`)}if(e.length>4){let t=e[4];if(t.dims.length!==1)throw Error(`Bias must be 1D`);if(t.dims[t.dims.length-1]!==i)throw Error(`Bias must have the same hidden size as input`)}},hd=(e,t,n,r)=>{let i=t.simplified,a=e[0].dims,o=B.size(a),s=a,c=o,l=a.slice(-1)[0],u=r?a.slice(0,-1).concat(1):[],d=!i&&e.length>3,f=e.length>4,p=r&&n>1,m=r&&n>2,h=n>3,g=J(l),_=[{type:12,data:c},{type:12,data:g},{type:12,data:l},{type:1,data:t.epsilon}],v=t=>{let n=[{name:`output_size`,type:`u32`},{name:`components`,type:`u32`},{name:`hidden_size`,type:`u32`},{name:`epsilon`,type:`f32`}],r=[X(`x`,e[0].dataType,e[0].dims,g),X(`skip`,e[1].dataType,e[1].dims,g),X(`gamma`,e[2].dataType,e[2].dims,g)];d&&r.push(X(`beta`,e[3].dataType,e[3].dims,g)),f&&r.push(X(`bias`,e[4].dataType,e[4].dims,g)),r.push(Z(`output`,e[0].dataType,s,g)),p&&r.push(Z(`mean_output`,1,u)),m&&r.push(Z(`inv_std_output`,1,u)),h&&r.push(Z(`input_skip_bias_sum`,e[0].dataType,s,g));let a=Gr(e[0].dataType),o=Gr(1,g);return`

      ${t.registerUniforms(n).declareVariables(...r)}
      var<workgroup> sum_shared : array<${o}, 64>;
      var<workgroup> sum_squared_shared : array<${o}, 64>;

      ${t.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?`bias[offset1d + i]`:a+`(0.0)`};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?`input_skip_bias_sum[offset + i] = value;`:``}
          output[offset + i] = value;
          let f32_value = ${Jr(a,g,`value`)};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Yr(`sum`,g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Yr(`square_sum`,g)} / f32(uniforms.hidden_size) ${i?``:`- mean * mean`} + uniforms.epsilon);
        ${p?`mean_output[global_idx] = mean;`:``}
        ${m?`inv_std_output[global_idx] = inv_std_dev;`:``}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?``:`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${d?`+ beta[offset1d + i]`:``};
        }
      }`},y=[{dims:s,dataType:e[0].dataType}];return n>1&&y.push({dims:u,dataType:1}),n>2&&y.push({dims:u,dataType:1}),n>3&&y.push({dims:a,dataType:e[0].dataType}),{name:`SkipLayerNormalization`,shaderCache:{hint:`${g};${p};${m};${h}`,inputDependencies:e.map((e,t)=>`type`)},getShaderSource:v,getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(c/l)},programUniforms:_})}},gd=(e,t)=>{md(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(hd(e.inputs,t,e.outputCount,!1),{outputs:n})}}),vd,yd,bd,xd,Sd,Cd,wd,Td,Ed=P(()=>{"use strict";R(),V(),K(),Q(),vd=(e,t)=>{if(!e||e.length<1)throw Error(`too few inputs`);if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw Error(`axes, starts and ends must have the same length`)}else if(t.starts.length!==t.ends.length)throw Error(`starts and ends must have the same length`);e.slice(1).forEach((t,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw Error(`Input ${n} must be an array of int32 or int64`)})},yd=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(e=>n.push(Number(e)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(e=>n.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return n},bd=(e,t)=>{if(e.length>1){let t=yd(e,1),n=yd(e,2),r=yd(e,3);return r.length===0&&(r=[...Array(e[0].dims.length).keys()]),G({starts:t,ends:n,axes:r})}return t},xd=(e,t,n,r,i)=>{let a=e;return e<0&&(a+=n[r[t]]),i[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Sd=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${Y(`uniforms.input_shape`,`i`,n.length)};
            let steps_i = ${Y(`uniforms.steps`,`i`,n.length)};
            let signs_i = ${Y(`uniforms.signs`,`i`,n.length)};
            let starts_i = ${Y(`uniforms.starts`,`i`,n.length)};
            var output_index = ${t.indicesGet(`output_indices`,`i`)};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet(`input_indices`,`i`,`input_index`)};
          }
          return input_indices;
      }`,Cd=(e,t)=>{let n=e[0].dims,r=B.size(n),i=t.axes.length>0?B.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=yd(e,4);a.forEach(e=>e!==0||(()=>{throw Error(`step cannot be 0`)})),a.length===0&&(a=Array(i.length).fill(1));let o=t.starts.map((e,t)=>xd(e,t,n,i,a)),s=t.ends.map((e,t)=>xd(e,t,n,i,a));if(i.length!==o.length||i.length!==s.length)throw Error(`start, ends and axes should have the same number of elements`);if(i.length!==n.length)for(let e=0;e<n.length;++e)i.includes(e)||(o.splice(e,0,0),s.splice(e,0,n[e]),a.splice(e,0,1));let c=a.map(e=>Math.sign(e));a.forEach((e,t,n)=>{if(e<0){let r=(s[t]-o[t])/e,i=o[t],c=i+r*a[t];o[t]=c,s[t]=i,n[t]=-e}});let l=n.slice(0);i.forEach((e,t)=>{l[e]=Math.ceil((s[e]-o[e])/a[e])});let u={dims:l,dataType:e[0].dataType},d=Z(`output`,e[0].dataType,l.length),f=X(`input`,e[0].dataType,e[0].dims.length),p=B.size(l),m=[{name:`outputSize`,type:`u32`},{name:`starts`,type:`u32`,length:o.length},{name:`signs`,type:`i32`,length:c.length},{name:`steps`,type:`u32`,length:a.length}],h=[{type:12,data:p},{type:12,data:o},{type:6,data:c},{type:12,data:a},...q(e[0].dims,l)];return{name:`Slice`,shaderCache:{hint:`${c.length}_${o.length}_${a.length}`,inputDependencies:[`rank`]},getShaderSource:e=>`
      ${e.registerUniforms(m).declareVariables(f,d)}
        ${Sd(f,d,n)}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.outputSize`)}
          let output_indices = ${d.offsetToIndices(`global_idx`)};
          let input_indices = calculateInputIndices(output_indices);
          ${d.setByOffset(`global_idx`,f.getByIndices(`input_indices`))}
      }`,getRunData:()=>({outputs:[u],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:h})}},wd=(e,t)=>{vd(e.inputs,t);let n=bd(e.inputs,t);e.compute(Cd(e.inputs,n),{inputs:[0]})},Td=e=>{let t=e.starts,n=e.ends,r=e.axes;return G({starts:t,ends:n,axes:r})}}),Dd,Od,kd,Ad,jd=P(()=>{"use strict";R(),V(),K(),ui(),Q(),Dd=e=>{if(!e||e.length!==1)throw Error(`Softmax op requires 1 input.`)},Od=(e,t)=>{let n=e.inputs[0],r=n.dims,i=B.size(r),a=r.length,o=B.normalizeAxis(t.axis,a),s=o<r.length-1,c,l=[];s?(l=Array.from({length:a},(e,t)=>t),l[o]=a-1,l[a-1]=o,c=e.compute(si(n,l),{inputs:[n],outputs:[-1]})[0]):c=n;let u=c.dims,d=u[a-1],f=i/d,p=J(d),m=d/p,h=64;f===1&&(h=256);let g=(e,t)=>t===4?`max(max(${e}.x, ${e}.y), max(${e}.z, ${e}.w))`:t===2?`max(${e}.x, ${e}.y)`:t===3?`max(max(${e}.x, ${e}.y), ${e}.z)`:e,_=X(`x`,c.dataType,c.dims,p),v=Z(`result`,c.dataType,c.dims,p),y=_.type.value,b=Gr(c.dataType)===`f32`?`var threadMax = ${y}(-3.4028234663852886e+38f);`:`var threadMax = ${y}(-65504.0h);`,x=e.compute({name:`Softmax`,shaderCache:{hint:`${p};${h}`,inputDependencies:[`type`]},getRunData:()=>({outputs:[{dims:u,dataType:c.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:m}]}),getShaderSource:e=>`
      var<workgroup> rowMaxShared : ${y};
      var<workgroup> rowSumShared : ${y};
      var<workgroup> threadShared : array<${y}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${y} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${y}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform(`packedCols`,`i32`).declareVariables(_,v)}
      ${e.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${b}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${y}(${g(`threadShared[0]`,p)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${y}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${y}(${Yr(`threadShared[0]`,p)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${y}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`},{inputs:[c],outputs:[s?-1:0]})[0];s&&e.compute(si(x,l),{inputs:[x]})},kd=(e,t)=>{Dd(e.inputs),Od(e,t)},Ad=e=>G({axis:e.axis})}),Md,Nd,Pd,Fd,Id,Ld=P(()=>{"use strict";R(),V(),Q(),Md=e=>Array.from(e.getBigInt64Array(),Number),Nd=e=>{if(!e||e.length!==2)throw Error(`Tile requires 2 inputs.`);if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw Error(`Tile only support float, float16, int32, and uint32 data types`);if(e[1].dataType!==7)throw Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw Error("Tile `repeats` input should be 1-D");if(Md(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Pd=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Fd=(e,t)=>{let n=e[0].dims,r=t??Md(e[1]),i=Pd(n,r),a=B.size(i),o=e[0].dataType,s=X(`input`,o,n.length),c=Z(`output`,o,i.length);return{name:`Tile`,shaderCache:{hint:`${r}`,inputDependencies:[`rank`]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...q(e[0].dims,i)]}),getShaderSource:e=>`
      const inputShape = ${s.indices(...n)};
      ${e.registerUniform(`output_size`,`u32`).declareVariables(s,c)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.output_size`)}
      let output_indices = ${c.offsetToIndices(`global_idx`)};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet(`uniforms.input_shape`,`i`)};
        let input_dim_value = ${c.indicesGet(`output_indices`,`i`)}  % input_dim_i;

        ${s.indicesSet(`input_indices`,`i`,`input_dim_value`)}
      }
      ${c.setByOffset(`global_idx`,s.getByIndices(`input_indices`))}
    }`}},Id=e=>{Nd(e.inputs),e.compute(Fd(e.inputs),{inputs:[0]})}}),Rd,zd,Bd,Vd=P(()=>{"use strict";R(),V(),Q(),Rd=(e,t,n,r,i)=>{let a=Z(`output_data`,i,n.length,4),o=X(`a_data`,t[1].dataType,t[1].dims.length,4),s=X(`b_data`,t[2].dataType,t[2].dims.length,4),c=X(`c_data`,t[0].dataType,t[0].dims.length,4),l,u=(e,t,n)=>`select(${t}, ${e}, ${n})`;if(!r)l=a.setByOffset(`global_idx`,u(o.getByOffset(`global_idx`),s.getByOffset(`global_idx`),c.getByOffset(`global_idx`)));else{let e=(e,t,n=``)=>{let r=`a_data[index_a${t}][component_a${t}]`,i=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${a.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${o.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_b${t} = ${s.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let offset_c${t} = ${c.broadcastedIndicesToOffset(`output_indices${t}`,a)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${n}(${u(r,i,l)});
          `};l=i===9?`
            var data = vec4<u32>(0);
            ${e(`data`,0,`u32`)}
            ${e(`data`,1,`u32`)}
            ${e(`data`,2,`u32`)}
            ${e(`data`,3,`u32`)}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e(`output_data[global_idx]`,0)}
            ${e(`output_data[global_idx]`,1)}
            ${e(`output_data[global_idx]`,2)}
            ${e(`output_data[global_idx]`,3)}
          `}return`
        ${e.registerUniform(`vec_size`,`u32`).declareVariables(c,o,s,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes(`uniforms.vec_size`)}
        ${l}
      }`},zd=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,i=e[1].dataType,a=!(B.areEqual(t,n)&&B.areEqual(n,r)),o=t,s=B.size(t);if(a){let e=dr.calcShape(dr.calcShape(t,n,!1),r,!1);if(!e)throw Error(`Can't perform where op on the given tensors`);o=e,s=B.size(o)}let c=Math.ceil(s/4);return{name:`Where`,shaderCache:{inputDependencies:[`rank`,`rank`,`rank`]},getShaderSource:t=>Rd(t,e,o,a,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:c},...q(r,t,n,o)]})}},Bd=e=>{e.compute(zd(e.inputs))}}),Hd,Ud=P(()=>{"use strict";ua(),ya(),wa(),Oa(),wo(),Ro(),Go(),Rs(),Xs(),ec(),oc(),vc(),wc(),Dc(),Mc(),Ic(),Vc(),Kc(),Zc(),fl(),Rl(),Ul(),ql(),Xl(),nu(),bl(),fu(),Mu(),Lu(),Vu(),Ku(),aa(),pd(),Ml(),_d(),Ed(),jd(),Ol(),Ld(),ui(),bo(),Vd(),Hd=new Map([[`Abs`,[Aa]],[`Acos`,[ja]],[`Acosh`,[Ma]],[`Add`,[Oo]],[`ArgMax`,[ca,la]],[`ArgMin`,[sa,la]],[`Asin`,[Na]],[`Asinh`,[Pa]],[`Atan`,[Fa]],[`Atanh`,[Ia]],[`Attention`,[va]],[`AveragePool`,[Cu,Su]],[`BatchNormalization`,[Ca]],[`BiasAdd`,[Da]],[`BiasSplitGelu`,[Co]],[`Cast`,[Ra,La]],[`Ceil`,[Va]],[`Clip`,[Ba]],[`Concat`,[Uo,Wo]],[`Conv`,[Ls,Ns]],[`ConvTranspose`,[Ys,Gs]],[`Cos`,[Ha]],[`Cosh`,[Ua]],[`CumSum`,[Qs,$s]],[`DepthToSpace`,[ic,ac]],[`DequantizeLinear`,[Fu,Iu]],[`Div`,[ko]],[`Einsum`,[gc,_c]],[`Elu`,[Ga,Wa]],[`Equal`,[Ao]],[`Erf`,[qa]],[`Exp`,[Ja]],[`Expand`,[Cc]],[`FastGelu`,[Ec]],[`Floor`,[Ya]],[`FusedConv`,[Ls,Ns]],[`Gather`,[jc,Ac]],[`GatherElements`,[Gc,Wc]],[`GatherBlockQuantized`,[zc,Bc]],[`GatherND`,[Pc,Fc]],[`Gelu`,[Xa]],[`Gemm`,[Xc,Yc]],[`GlobalAveragePool`,[Eu,Tu]],[`GlobalMaxPool`,[ju,Au]],[`Greater`,[Po]],[`GreaterOrEqual`,[Io]],[`GridSample`,[ul,dl]],[`GroupQueryAttention`,[Ll]],[`HardSigmoid`,[io,ro]],[`InstanceNormalization`,[Hl]],[`LayerNormalization`,[Kl]],[`LeakyRelu`,[Za,Wa]],[`Less`,[Fo]],[`LessOrEqual`,[Lo]],[`Log`,[go]],[`MatMul`,[Yl]],[`MatMulNBits`,[eu,tu]],[`MaxPool`,[Ou,ku]],[`Mul`,[jo]],[`MultiHeadAttention`,[yl,hl]],[`Neg`,[$a]],[`Not`,[Qa]],[`Pad`,[du]],[`Pow`,[Mo]],[`QuickGelu`,[yo,Wa]],[`Range`,[Bu]],[`Reciprocal`,[eo]],[`ReduceMin`,[ea]],[`ReduceMean`,[Yi]],[`ReduceMax`,[$i]],[`ReduceSum`,[na]],[`ReduceProd`,[ta]],[`ReduceL1`,[Xi]],[`ReduceL2`,[Zi]],[`ReduceLogSum`,[ia]],[`ReduceLogSumExp`,[Qi]],[`ReduceSumSquare`,[ra]],[`Relu`,[to]],[`Resize`,[dd,fd]],[`RotaryEmbedding`,[jl]],[`ScatterND`,[Gu,Wu]],[`Sigmoid`,[no]],[`Sin`,[ao]],[`Sinh`,[oo]],[`Slice`,[wd,Td]],[`SkipLayerNormalization`,[gd]],[`Split`,[El,Dl]],[`Sqrt`,[so]],[`Softmax`,[kd,Ad]],[`Sub`,[No]],[`Tan`,[co]],[`Tanh`,[uo]],[`ThresholdedRelu`,[ho,Wa]],[`Tile`,[Id]],[`Transpose`,[ci,li]],[`Where`,[Bd]]])}),Wd,Gd=P(()=>{"use strict";Qt(),lr(),Q(),Wd=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,n,r,i){zt(e.programInfo.name);let a=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let s=[];for(let e of t)s.push({binding:s.length,resource:{buffer:e.buffer}});for(let e of n)s.push({binding:s.length,resource:{buffer:e.buffer}});i&&s.push({binding:s.length,resource:i});let c=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:s,label:e.programInfo.name});if(this.backend.sessionStatus===`capturing`){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}o.setPipeline(e.computePipeline),o.setBindGroup(0,c),o.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType===`at-passes`)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Bt(e.programInfo.name)}dispose(){}build(e,t){zt(e.name);let n=this.backend.device,r=[];[{feature:`shader-f16`,extension:`f16`},{feature:`subgroups`,extension:`subgroups`}].forEach(e=>{n.features.has(e.feature)&&r.push(`enable ${e.extension};`)});let i=ei(t,this.backend.device.limits),a=e.getShaderSource(i),o=`${r.join(`
`)}
${i.additionalImplementations}
${a}`,s=n.createShaderModule({code:o,label:e.name});z(`verbose`,()=>`[WebGPU] ${e.name} shader code: ${o}`);let c=n.createComputePipeline({compute:{module:s,entryPoint:`main`},layout:`auto`,label:e.name});return Bt(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e==`number`?e:e.x,n=typeof e==`number`?1:e.y||1,r=typeof e==`number`?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&n<=i&&r<=i)return[t,n,r];let a=t*n*r,o=Math.ceil(Math.sqrt(a));if(o>i){if(o=Math.ceil(Math.cbrt(a)),o>i)throw Error(`Total dispatch size exceeds WebGPU maximum.`);return[o,o,o]}return[o,o,1]}}}),Kd={};$e(Kd,{WebGpuBackend:()=>Xd});var qd,Jd,Yd,Xd,Zd=P(()=>{"use strict";Qt(),R(),lr(),_r(),Vr(),Ud(),Gd(),qd=(e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let i=e[r].dataType;switch(t[r]){case`none`:n.push(``);break;case`type`:n.push(`${i}`);break;case`rank`:{let t=e[r].dims.length;n.push(`${i};${t}`);break}case`dims`:{let t=e[r].dims.join(`,`);n.push(`${i};${t}`);break}default:throw Error(`unsupported input dependency: ${t[r]}`)}}return n.join(`|`)},Jd=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+=`[`+e.shaderCache.hint+`]`),r+=`:`+n+`:${qd(t,e.shaderCache?.inputDependencies??Array(t.length).fill(`dims`))}`,r},Yd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Xd=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus=`default`,this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw Error(`currentKernelCustomData(): currentKernelId is null. (should not happen)`);let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let n=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=e=>t.features.has(e)&&n.push(e)&&!0;i(`chromium-experimental-timestamp-query-inside-passes`)||i(`timestamp-query`),i(`shader-f16`),i(`subgroups`),this.device=await t.requestDevice(r);let a=t,o=t.info??(typeof a.requestAdapterInfo==`function`?await a.requestAdapterInfo():void 0);this.adapterInfo=new Yd(o),this.gpuDataManager=Br(this),this.programManager=new Wd(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,sr(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<`u`&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||=this.device.createCommandEncoder(),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType===`at-passes`&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&=(this.computePassEncoder.end(),null)}flush(){if(!this.commandEncoder)return;zt(),this.endComputePass();let e;this.queryType!==`none`&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!==`none`&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),n=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let r=n[e],i=r.kernelId,a=this.kernels.get(i),o=a.kernelType,s=a.kernelName,c=r.programName,l=r.inputTensorViews,u=r.outputTensorViews,d=t[e*2],f=t[e*2+1];typeof this.queryTimeBase>`u`&&(this.queryTimeBase=d);let p=Number(d-this.queryTimeBase),m=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(p)||!Number.isSafeInteger(m))throw RangeError(`incorrect timestamp range`);if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:Jn(e.dataType)})),outputsMetadata:u.map(e=>({dims:e.dims,dataType:Jn(e.dataType)})),kernelId:i,kernelType:o,kernelName:s,programName:c,startTime:p,endTime:m});else{let e=``;l.forEach((t,n)=>{e+=`input[${n}]: [${t.dims}] | ${Jn(t.dataType)}, `});let t=``;u.forEach((e,n)=>{t+=`output[${n}]: [${e.dims}] | ${Jn(e.dataType)}, `}),console.log(`[profiling] kernel "${i}|${o}|${s}|${c}" ${e}${t}start time: ${p} ns, execution time: ${m-p} ns`)}Lt(`GPU`,`${c}::${d}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),Bt()}run(e,t,n,r,i,a){zt(e.name);let o=[];for(let e=0;e<t.length;++e){let n=t[e].data;if(n===0)continue;let r=this.gpuDataManager.get(n);if(!r)throw Error(`no GPU data for input: ${n}`);o.push(r)}let{outputs:s,dispatchGroup:c,programUniforms:l}=e.getRunData(t),u=n.length===0?s.map((e,t)=>t):n;if(u.length!==s.length)throw Error(`Output size ${u.length} must be equal to ${s.length}.`);let d=[],f=[];for(let e=0;e<s.length;++e){if(!Number.isInteger(u[e])||u[e]<-3||u[e]>=a)throw Error(`Invalid output index: ${u[e]}`);if(u[e]===-3)continue;let t=u[e]===-1,n=u[e]===-2,o=t||n?i(s[e].dataType,s[e].dims):r(u[e],s[e].dataType,s[e].dims);if(d.push(o),o.data===0)continue;let c=this.gpuDataManager.get(o.data);if(!c)throw Error(`no GPU data for output: ${o.data}`);if(t&&this.temporaryData.push(c),n){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(c)}f.push(c)}if(o.length!==t.length||f.length!==d.length){if(f.length===0)return Bt(e.name),d;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let p;if(l){let e=0,t=[];l.forEach(n=>{let r=typeof n.data==`number`?[n.data]:n.data;if(r.length===0)return;let i=n.type===10?2:4,a,o;n.type===10?(o=r.length>4?16:r.length>2?8:r.length*i,a=r.length>4?16:i*r.length):(o=r.length<=2?r.length*i:16,a=16),e=Math.ceil(e/o)*o,t.push(e);let s=n.type===10?8:4;e+=r.length>4?Math.ceil(r.length/s)*a:r.length*i}),e=Math.ceil(e/16)*16;let n=new ArrayBuffer(e);l.forEach((e,r)=>{let i=t[r],a=typeof e.data==`number`?[e.data]:e.data;if(e.type===6)new Int32Array(n,i,a.length).set(a);else if(e.type===12)new Uint32Array(n,i,a.length).set(a);else if(e.type===10)new Uint16Array(n,i,a.length).set(a);else if(e.type===1)new Float32Array(n,i,a.length).set(a);else throw Error(`Unsupported uniform type: ${Jn(e.type)}`)});let r=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(r.buffer,0,n,0,e),this.gpuDataManager.release(r.id),p={offset:0,size:e,buffer:r.buffer}}let m=this.programManager.normalizeDispatchGroupSize(c),h=m[1]===1&&m[2]===1,g=Jd(e,t,h),_=this.programManager.getArtifact(g);if(_||(_=this.programManager.build(e,m),this.programManager.setArtifact(g,_),z(`info`,()=>`[artifact] key: ${g}, programName: ${e.name}`)),l&&_.uniformVariablesInfo){if(l.length!==_.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${l.length} in program "${_.programInfo.name}".`);for(let e=0;e<l.length;e++){let t=l[e],n=t.type,r=typeof t.data==`number`?1:t.data.length,[i,a]=_.uniformVariablesInfo[e];if(n!==i||r!==a)throw Error(`Uniform variable ${e} mismatch: expect type ${i} with size ${a}, got type ${n} with size ${r} in program "${_.programInfo.name}".`)}}if(z(`info`,()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!==`none`||this.sessionStatus===`capturing`){let e={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:t,outputTensorViews:d};this.pendingKernels.push(e),this.sessionStatus===`capturing`&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(_,o,f,m,p),Bt(e.name),d}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,n,r){let i=Hd.get(e);if(!i)throw Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:r,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,n){let r=this.kernels.get(e);if(!r)throw Error(`kernel not created: ${e}`);let i=r.kernelType,a=r.kernelName,o=r.kernelEntry,s=r.attributes;if(this.currentKernelId!==null)throw Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,s[0]&&=(s[1]=s[0](s[1]),void 0),z(`info`,()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope(`validation`),o(t,s[1]),0}catch(e){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${e}`)),1}finally{c&&n.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${i}] ${a}": ${e.message}`:null));for(let e of this.temporaryData)this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,n,r){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(t),o=this.gpuDataManager.registerExternalBuffer(n,r,a);return i.set(t,[o,n]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,n){return async()=>{let r=await Rr(this,e,t);return gr(r.buffer,n)}}writeTimestamp(e){this.queryType===`inside-passes`&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType=`none`,(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>`u`?this.env.wasm.trace:this.env.trace))&&(this.device.features.has(`chromium-experimental-timestamp-query-inside-passes`)?this.queryType=`inside-passes`:this.device.features.has(`timestamp-query`)&&(this.queryType=`at-passes`),this.queryType!==`none`&&typeof this.querySet>`u`&&(this.querySet=this.device.createQuerySet({type:`timestamp`,count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){z(`info`,`captureBegin`),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus=`capturing`}captureEnd(){z(`info`,`captureEnd`),this.flush(),this.sessionStatus=`default`}replay(){z(`info`,`replay`),this.sessionStatus=`replaying`;let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),n=e.length;this.pendingKernels=[];for(let r=0;r<n;r++){let n=this.getComputePassEncoder(),i=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(i.computePipeline),n.setBindGroup(0,i.bindGroup),n.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!==`none`&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType===`at-passes`)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus=`default`}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Qd={};$e(Qd,{init:()=>tf});var $d,ef,tf,nf=P(()=>{"use strict";R(),lr(),V(),jr(),$d=class e{constructor(e,t,n,r){this.module=e,this.dataType=t,this.data=n,this.dims=r}getFloat32Array(){if(this.dataType!==1)throw Error(`Invalid data type`);let e=B.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw Error(`Invalid data type`);let e=B.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw Error(`Invalid data type`);let e=B.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw Error(`Invalid data type`);let e=B.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(B.size(t)!==B.size(this.dims))throw Error(`Invalid new shape`);return new e(this.module,this.dataType,this.data,t)}},ef=class{constructor(e,t,n){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,i=n/e.PTR_SIZE,a=r===4?`i32`:`i64`;this.opKernelContext=Number(e.getValue(r*i++,a));let o=Number(e.getValue(r*i++,a));this.outputCount=Number(e.getValue(r*i++,a)),this.customDataOffset=Number(e.getValue(r*i++,`*`)),this.customDataSize=Number(e.getValue(r*i++,a));let s=[];for(let t=0;t<o;t++){let t=Number(e.getValue(r*i++,a)),n=Number(e.getValue(r*i++,`*`)),o=Number(e.getValue(r*i++,a)),c=[];for(let t=0;t<o;t++)c.push(Number(e.getValue(r*i++,a)));s.push(new $d(e,t,n,c))}this.inputs=s}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let n=t?.inputs?.map(e=>typeof e==`number`?this.inputs[e]:e)??this.inputs,r=t?.outputs??[];return this.backend.run(e,n,r,(e,t,n)=>new $d(this.module,t,this.output(e,n),n),(e,t)=>{let n=Yn(e,t);if(!n)throw Error(`Unsupported data type: ${e}`);let r=n>0?this.backend.gpuDataManager.create(n).id:0;return new $d(this.module,e,r,t)},this.outputCount)}output(e,t){let n=this.module.stackSave();try{let n=this.module.PTR_SIZE,r=n===4?`i32`:`i64`,i=this.module.stackAlloc((1+t.length)*n);this.module.setValue(i,t.length,r);for(let e=0;e<t.length;e++)this.module.setValue(i+n*(e+1),t[e],r);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(n){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(n)}}},tf=async(e,t,n,r)=>{let i=t.jsepInit;if(!i)throw Error(`Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.`);if(e===`webgpu`){let e=(Zd(),tt(Kd)).WebGpuBackend,a=new e;await a.initialize(n,r),i(`webgpu`,[a,e=>a.alloc(Number(e)),e=>a.free(e),(e,n,r,i=!1)=>{if(i)z(`verbose`,()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(e)}, dst=${Number(n)}, size=${Number(r)}`),a.memcpy(Number(e),Number(n));else{z(`verbose`,()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(e)}, gpuDataId=${Number(n)}, size=${Number(r)}`);let i=t.HEAPU8.subarray(Number(e>>>0),Number(e>>>0)+Number(r));a.upload(Number(n),i)}},async(e,n,r)=>{z(`verbose`,()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${e}, dataOffset=${n}, size=${r}`),await a.download(Number(e),()=>t.HEAPU8.subarray(Number(n)>>>0,Number(n+r)>>>0))},(e,n,r)=>a.createKernel(e,Number(n),r,t.UTF8ToString(t._JsepGetNodeName(Number(n)))),e=>a.releaseKernel(e),(e,n,r,i)=>{z(`verbose`,()=>`[WebGPU] jsepRun: sessionHandle=${r}, kernel=${e}, contextDataOffset=${n}`);let o=new ef(t,a,Number(n));return a.computeKernel(Number(e),o,i)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let e=new U(n);i(`webnn`,[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,n,r,i,a)=>e.ensureTensor(t,n,r,i,a),(t,n)=>{e.uploadTensor(t,n)},async(t,n)=>e.downloadTensor(t,n),(t,n)=>e.registerMLContext(t,n),!!n.trace])}}}),rf,af,of,sf,cf,lf,uf,df,ff,pf,mf,hf,gf,_f=P(()=>{"use strict";Qt(),zn(),Kn(),R(),Pn(),Ln(),nr(),rf=(e,t)=>{I()._OrtInit(e,t)!==0&&L(`Can't initialize onnxruntime.`)},af=async e=>{rf(e.wasm.numThreads,Zn(e.logLevel))},of=async(e,t)=>{I().asyncInit?.();let n=e.webgpu.adapter;if(t===`webgpu`){if(typeof navigator>`u`||!navigator.gpu)throw Error(`WebGPU is not supported in current environment`);if(n){if(typeof n.limits!=`object`||typeof n.features!=`object`||typeof n.requestDevice!=`function`)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=e.webgpu.powerPreference;if(t!==void 0&&t!==`low-power`&&t!==`high-performance`)throw Error(`Invalid powerPreference setting: "${t}"`);let r=e.webgpu.forceFallbackAdapter;if(r!==void 0&&typeof r!=`boolean`)throw Error(`Invalid forceFallbackAdapter setting: "${r}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:r}),!n)throw Error(`Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.`)}}if(t===`webnn`&&(typeof navigator>`u`||!navigator.ml))throw Error(`WebNN is not supported in current environment`);{let r=(nf(),tt(Qd)).init;t===`webgpu`&&await r(`webgpu`,I(),e,n),t===`webnn`&&await r(`webnn`,I(),e)}},sf=new Map,cf=e=>{let t=I(),n=t.stackSave();try{let n=t.PTR_SIZE,r=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,r,r+n)!==0&&L(`Can't get session input/output count.`);let i=n===4?`i32`:`i64`;return[Number(t.getValue(r,i)),Number(t.getValue(r+n,i))]}finally{t.stackRestore(n)}},lf=(e,t)=>{let n=I(),r=n.stackSave(),i=0;try{let r=n.PTR_SIZE,a=n.stackAlloc(2*r);n._OrtGetInputOutputMetadata(e,t,a,a+r)!==0&&L(`Can't get session input/output metadata.`);let o=Number(n.getValue(a,`*`));i=Number(n.getValue(a+r,`*`));let s=n.HEAP32[i/4];if(s===0)return[o,0];let c=n.HEAPU32[i/4+1],l=[];for(let e=0;e<c;e++){let t=Number(n.getValue(i+8+e*r,`*`));l.push(t===0?Number(n.getValue(i+8+(e+c)*r,`*`)):n.UTF8ToString(t))}return[o,s,l]}finally{n.stackRestore(r),i!==0&&n._OrtFree(i)}},uf=e=>{let t=I(),n=t._malloc(e.byteLength);if(n===0)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},df=async(e,t)=>{let n,r,i=I();Array.isArray(e)?[n,r]=e:e.buffer===i.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=uf(e);let a=0,o=0,s=0,c=[],l=[],u=[];try{if([o,c]=await Gn(t),t?.externalData&&i.mountExternalData){let e=[];for(let n of t.externalData){let t=typeof n==`string`?n:n.path;e.push(tr(typeof n==`string`?n:n.data).then(e=>{i.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if((typeof e==`string`?e:e.name)===`webnn`){if(i.shouldTransferToMLTensor=!1,typeof e!=`string`){let t=e,n=t?.context,r=t?.gpuDevice,a=t?.deviceType,o=t?.powerPreference;i.currentContext=n||(r?await i.webnnCreateMLContext(r):await i.webnnCreateMLContext({deviceType:a,powerPreference:o}))}else i.currentContext=await i.webnnCreateMLContext();break}a=await i._OrtCreateSession(n,r,o),i.webgpuOnCreateSession?.(a),a===0&&L(`Can't create a session.`),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(a,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[e,d]=cf(a),f=!!t?.enableGraphCapture,p=[],m=[],h=[],g=[],_=[];for(let t=0;t<e;t++){let[e,n,r]=lf(a,t);e===0&&L(`Can't get an input name.`),l.push(e);let o=i.UTF8ToString(e);p.push(o),h.push(n===0?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:Jn(n),shape:r})}for(let n=0;n<d;n++){let[r,o,s]=lf(a,n+e);r===0&&L(`Can't get an output name.`),u.push(r);let c=i.UTF8ToString(r);m.push(c),g.push(o===0?{name:c,isTensor:!1}:{name:c,isTensor:!0,type:Jn(o),shape:s});{if(f&&t?.preferredOutputLocation===void 0){_.push(`gpu-buffer`);continue}let e=typeof t?.preferredOutputLocation==`string`?t.preferredOutputLocation:t?.preferredOutputLocation?.[c]??`cpu`,n=i.webnnIsGraphOutput;if(e===`cpu`&&n&&n(a,c)){_.push(`ml-tensor-cpu-output`);continue}if(e!==`cpu`&&e!==`cpu-pinned`&&e!==`gpu-buffer`&&e!==`ml-tensor`)throw Error(`Not supported preferred output location: ${e}.`);if(f&&e!==`gpu-buffer`)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(e)}}let v=null;return _.some(e=>e===`gpu-buffer`||e===`ml-tensor`||e===`ml-tensor-cpu-output`)&&(s=i._OrtCreateBinding(a),s===0&&L(`Can't create IO binding.`),v={handle:s,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(e=>e===`ml-tensor-cpu-output`?`ml-tensor`:e).map(e=>er(e))}),sf.set(a,[a,l,u,v,f,!1]),[a,p,m,h,g]}catch(e){throw l.forEach(e=>i._OrtFree(e)),u.forEach(e=>i._OrtFree(e)),s!==0&&i._OrtReleaseBinding(s)!==0&&L(`Can't release IO binding.`),a!==0&&i._OrtReleaseSession(a)!==0&&L(`Can't release session.`),e}finally{i._free(n),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&L(`Can't release session options.`),c.forEach(e=>i._free(e)),i.unmountExternalData?.()}},ff=e=>{let t=I(),n=sf.get(e);if(!n)throw Error(`cannot release session. invalid session id: ${e}`);let[r,i,a,o,s]=n;o&&(s&&t._OrtClearBoundOutputs(o.handle)!==0&&L(`Can't clear bound outputs.`),t._OrtReleaseBinding(o.handle)!==0&&L(`Can't release IO binding.`)),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(e=>t._OrtFree(e)),a.forEach(e=>t._OrtFree(e)),t._OrtReleaseSession(r)!==0&&L(`Can't release session.`),sf.delete(e)},pf=async(e,t,n,r,i,a,o=!1)=>{if(!e){t.push(0);return}let s=I(),c=s.PTR_SIZE,l=e[0],u=e[1],d=e[3],f=d,p,m;if(l===`string`&&(d===`gpu-buffer`||d===`ml-tensor`))throw Error(`String tensor is not supported on GPU.`);if(o&&d!==`gpu-buffer`)throw Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(d===`gpu-buffer`){let t=e[2].gpuBuffer;m=Yn(qn(l),u);{let e=s.jsepRegisterBuffer;if(!e)throw Error(`Tensor location "gpu-buffer" is not supported without using WebGPU.`);p=e(r,a,t,m)}}else if(d===`ml-tensor`){let t=e[2].mlTensor;m=Yn(qn(l),u);let n=s.webnnRegisterMLTensor;if(!n)throw Error(`Tensor location "ml-tensor" is not supported without using WebNN.`);p=n(r,t,qn(l),u)}else{let t=e[2];if(Array.isArray(t)){m=c*t.length,p=s._malloc(m),n.push(p);for(let e=0;e<t.length;e++){if(typeof t[e]!=`string`)throw TypeError(`tensor data at index ${e} is not a string`);s.setValue(p+e*c,Fn(t[e],n),`*`)}}else{let e=s.webnnIsGraphInput,a=s.webnnIsGraphOutput;if(l!==`string`&&e&&a){let o=s.UTF8ToString(i);if(e(r,o)||a(r,o)){let e=qn(l);m=Yn(e,u),f=`ml-tensor`;let n=s.webnnCreateTemporaryTensor,i=s.webnnUploadTensor;if(!n||!i)throw Error(`Tensor location "ml-tensor" is not supported without using WebNN.`);let a=await n(r,e,u);i(a,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),p=a}else m=t.byteLength,p=s._malloc(m),n.push(p),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),p)}else m=t.byteLength,p=s._malloc(m),n.push(p),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,m),p)}}let h=s.stackSave(),g=s.stackAlloc(4*u.length);try{u.forEach((e,t)=>s.setValue(g+t*c,e,c===4?`i32`:`i64`));let e=s._OrtCreateTensor(qn(l),p,m,g,u.length,er(f));e===0&&L(`Can't create tensor for input/output. session=${r}, index=${a}.`),t.push(e)}finally{s.stackRestore(h)}},mf=async(e,t,n,r,i,a)=>{let o=I(),s=o.PTR_SIZE,c=sf.get(e);if(!c)throw Error(`cannot run inference. invalid session id: ${e}`);let l=c[0],u=c[1],d=c[2],f=c[3],p=c[4],m=c[5],h=t.length,g=r.length,_=0,v=[],y=[],b=[],x=[],S=[],C=o.stackSave(),w=o.stackAlloc(h*s),T=o.stackAlloc(h*s),E=o.stackAlloc(g*s),D=o.stackAlloc(g*s);try{[_,v]=Rn(a),Vt(`wasm prepareInputOutputTensor`);for(let r=0;r<h;r++)await pf(n[r],y,x,e,u[t[r]],t[r],p);for(let t=0;t<g;t++)await pf(i[t],b,x,e,d[r[t]],h+r[t],p);Ht(`wasm prepareInputOutputTensor`);for(let e=0;e<h;e++)o.setValue(w+e*s,y[e],`*`),o.setValue(T+e*s,u[t[e]],`*`);for(let e=0;e<g;e++)o.setValue(E+e*s,b[e],`*`),o.setValue(D+e*s,d[r[e]],`*`);if(f&&!m){let{handle:n,outputPreferredLocations:a,outputPreferredLocationsEncoded:s}=f;if(u.length!==h)throw Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${u.length}).`);Vt(`wasm bindInputsOutputs`);for(let r=0;r<h;r++){let i=t[r];await o._OrtBindInput(n,u[i],y[r])!==0&&L(`Can't bind input[${r}] for session=${e}.`)}for(let t=0;t<g;t++){let c=r[t];i[t]?.[3]?(S.push(b[t]),o._OrtBindOutput(n,d[c],b[t],0)!==0&&L(`Can't bind pre-allocated output[${t}] for session=${e}.`)):o._OrtBindOutput(n,d[c],0,s[c])!==0&&L(`Can't bind output[${t}] to ${a[t]} for session=${e}.`)}Ht(`wasm bindInputsOutputs`),sf.set(e,[l,u,d,f,p,!0])}o.jsepOnRunStart?.(l),o.webnnOnRunStart?.(l);let c;c=f?await o._OrtRunWithBinding(l,f.handle,g,E,_):await o._OrtRun(l,T,w,h,D,g,E,_),c!==0&&L(`failed to call OrtRun().`);let C=[],O=[];Vt(`wasm ProcessOutputTensor`);for(let t=0;t<g;t++){let n=Number(o.getValue(E+t*s,`*`));if(n===b[t]||S.includes(b[t])){C.push(i[t]),n!==b[t]&&o._OrtReleaseTensor(n)!==0&&L(`Can't release tensor.`);continue}let a=o.stackSave(),c=o.stackAlloc(4*s),l=!1,u,d=0;try{o._OrtGetTensorData(n,c,c+s,c+2*s,c+3*s)!==0&&L(`Can't access output tensor data on index ${t}.`);let i=s===4?`i32`:`i64`,a=Number(o.getValue(c,i));d=o.getValue(c+s,`*`);let p=o.getValue(c+s*2,`*`),m=Number(o.getValue(c+s*3,i)),h=[];for(let e=0;e<m;e++)h.push(Number(o.getValue(p+e*s,i)));o._OrtFree(p)!==0&&L(`Can't free memory for tensor dims.`);let g=h.reduce((e,t)=>e*t,1);u=Jn(a);let _=f?.outputPreferredLocations[r[t]];if(u===`string`){if(_===`gpu-buffer`||_===`ml-tensor`)throw Error(`String tensor is not supported on GPU.`);let e=[];for(let t=0;t<g;t++){let n=o.getValue(d+t*s,`*`),r=o.getValue(d+(t+1)*s,`*`),i=t===g-1?void 0:r-n;e.push(o.UTF8ToString(n,i))}C.push([u,h,e,`cpu`])}else if(_===`gpu-buffer`&&g>0){let e=o.jsepGetBuffer;if(!e)throw Error(`preferredLocation "gpu-buffer" is not supported without using WebGPU.`);let t=e(d),r=Yn(a,g);if(r===void 0||!Qn(u))throw Error(`Unsupported data type: ${u}`);l=!0,C.push([u,h,{gpuBuffer:t,download:o.jsepCreateDownloader(t,r,u),dispose:()=>{o._OrtReleaseTensor(n)!==0&&L(`Can't release tensor.`)}},`gpu-buffer`])}else if(_===`ml-tensor`&&g>0){let t=o.webnnEnsureTensor,r=o.webnnIsGraphInputOutputTypeSupported;if(!t||!r)throw Error(`preferredLocation "ml-tensor" is not supported without using WebNN.`);if(Yn(a,g)===void 0||!$n(u))throw Error(`Unsupported data type: ${u}`);if(!r(e,u,!1))throw Error(`preferredLocation "ml-tensor" for ${u} output is not supported by current WebNN Context.`);let i=await t(e,d,a,h,!1);l=!0,C.push([u,h,{mlTensor:i,download:o.webnnCreateMLTensorDownloader(d,u),dispose:()=>{o.webnnReleaseTensorId(d),o._OrtReleaseTensor(n)}},`ml-tensor`])}else if(_===`ml-tensor-cpu-output`&&g>0){let e=o.webnnCreateMLTensorDownloader(d,u)(),t=C.length;l=!0,O.push((async()=>{let r=[t,await e];return o.webnnReleaseTensorId(d),o._OrtReleaseTensor(n),r})()),C.push([u,h,[],`cpu`])}else{let e=new(Xn(u))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(o.HEAPU8.subarray(d,d+e.byteLength)),C.push([u,h,e,`cpu`])}}finally{o.stackRestore(a),u===`string`&&d&&o._free(d),l||o._OrtReleaseTensor(n)}}f&&!p&&(o._OrtClearBoundOutputs(f.handle)!==0&&L(`Can't clear bound outputs.`),sf.set(e,[l,u,d,f,p,!1]));for(let[e,t]of await Promise.all(O))C[e][2]=t;return Ht(`wasm ProcessOutputTensor`),C}finally{o.webnnOnRunEnd?.(l),o.stackRestore(C),y.forEach(e=>o._OrtReleaseTensor(e)),b.forEach(e=>o._OrtReleaseTensor(e)),x.forEach(e=>o._free(e)),_!==0&&o._OrtReleaseRunOptions(_),v.forEach(e=>o._free(e))}},hf=e=>{let t=I(),n=sf.get(e);if(!n)throw Error(`invalid session id`);let r=n[0],i=t._OrtEndProfiling(r);i===0&&L(`Can't get an profile file name.`),t._OrtFree(i)},gf=e=>{let t=[];for(let n of e){let e=n[2];!Array.isArray(e)&&`buffer`in e&&t.push(e.buffer)}return t}}),vf,yf,bf,xf,Sf,Cf,wf,Tf,Ef,Df,Of,kf,Af,jf,Mf,Nf,Pf,Ff,If=P(()=>{"use strict";Qt(),_f(),Pn(),Tn(),vf=()=>!!F.wasm.proxy&&typeof document<`u`,bf=!1,xf=!1,Sf=!1,Tf=new Map,Ef=(e,t)=>{let n=Tf.get(e);n?n.push(t):Tf.set(e,[t])},Df=()=>{if(bf||!xf||Sf||!yf)throw Error(`worker not ready`)},Of=e=>{switch(e.data.type){case`init-wasm`:bf=!1,e.data.err?(Sf=!0,wf[1](e.data.err)):(xf=!0,wf[0]()),Cf&&=(URL.revokeObjectURL(Cf),void 0);break;case`init-ep`:case`copy-from`:case`create`:case`release`:case`run`:case`end-profiling`:{let t=Tf.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},kf=async()=>{if(!xf){if(bf)throw Error(`multiple calls to 'initWasm()' detected.`);if(Sf)throw Error(`previous call to 'initWasm()' failed.`);if(bf=!0,vf())return new Promise((e,t)=>{yf?.terminate(),Sn().then(([n,r])=>{try{yf=r,yf.onerror=e=>t(e),yf.onmessage=Of,wf=[e,t];let i={type:`init-wasm`,in:F};!i.in.wasm.wasmPaths&&(n||fn)&&(i.in.wasm.wasmPaths={wasm:new URL(`/assets/ort-wasm-simd-threaded.jsep-DC5y_g6C.wasm`,``+{}.url).href}),yf.postMessage(i),Cf=n}catch(e){t(e)}},t)});try{await Nn(F.wasm),await af(F),xf=!0}catch(e){throw Sf=!0,e}finally{bf=!1}}},Af=async e=>{if(vf())return Df(),new Promise((t,n)=>{Ef(`init-ep`,[t,n]);let r={type:`init-ep`,in:{epName:e,env:F}};yf.postMessage(r)});await of(F,e)},jf=async e=>vf()?(Df(),new Promise((t,n)=>{Ef(`copy-from`,[t,n]);let r={type:`copy-from`,in:{buffer:e}};yf.postMessage(r,[e.buffer])})):uf(e),Mf=async(e,t)=>{if(vf()){if(t?.preferredOutputLocation)throw Error(`session option "preferredOutputLocation" is not supported for proxy.`);return Df(),new Promise((n,r)=>{Ef(`create`,[n,r]);let i={type:`create`,in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),yf.postMessage(i,a)})}return df(e,t)},Nf=async e=>{if(vf())return Df(),new Promise((t,n)=>{Ef(`release`,[t,n]);let r={type:`release`,in:e};yf.postMessage(r)});ff(e)},Pf=async(e,t,n,r,i,a)=>{if(vf()){if(n.some(e=>e[3]!==`cpu`))throw Error(`input tensor on GPU is not supported for proxy.`);if(i.some(e=>e))throw Error(`pre-allocated output tensor is not supported for proxy.`);return Df(),new Promise((i,o)=>{Ef(`run`,[i,o]);let s=n,c={type:`run`,in:{sessionId:e,inputIndices:t,inputs:s,outputIndices:r,options:a}};yf.postMessage(c,gf(s))})}return mf(e,t,n,r,i,a)},Ff=async e=>{if(vf())return Df(),new Promise((t,n)=>{Ef(`end-profiling`,[t,n]);let r={type:`end-profiling`,in:e};yf.postMessage(r)});hf(e)}}),Lf,Rf,zf,Bf=P(()=>{"use strict";Qt(),If(),R(),$t(),nr(),Lf=(e,t)=>{switch(e.location){case`cpu`:return[e.type,e.dims,e.data,`cpu`];case`gpu-buffer`:return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},`gpu-buffer`];case`ml-tensor`:return[e.type,e.dims,{mlTensor:e.mlTensor},`ml-tensor`];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},Rf=e=>{switch(e[3]){case`cpu`:return new Ft(e[0],e[2],e[1]);case`gpu-buffer`:{let t=e[0];if(!Qn(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:i}=e[2];return Ft.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:i})}case`ml-tensor`:{let t=e[0];if(!$n(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:i}=e[2];return Ft.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:i})}default:throw Error(`invalid data location: ${e[3]}`)}},zf=class{async fetchModelAndCopyToWasmMemory(e){return jf(await tr(e))}async loadModel(e,t){zt();let n;n=typeof e==`string`?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Mf(n,t),Bt()}async dispose(){return Nf(this.sessionId)}async run(e,t,n){zt();let r=[],i=[];Object.entries(e).forEach(e=>{let t=e[0],n=e[1],a=this.inputNames.indexOf(t);if(a===-1)throw Error(`invalid input '${t}'`);r.push(n),i.push(a)});let a=[],o=[];Object.entries(t).forEach(e=>{let t=e[0],n=e[1],r=this.outputNames.indexOf(t);if(r===-1)throw Error(`invalid output '${t}'`);a.push(n),o.push(r)});let s=r.map((e,t)=>Lf(e,()=>`input "${this.inputNames[i[t]]}"`)),c=a.map((e,t)=>e?Lf(e,()=>`output "${this.outputNames[o[t]]}"`):null),l=await Pf(this.sessionId,i,s,o,c,n),u={};for(let e=0;e<l.length;e++)u[this.outputNames[o[e]]]=a[e]??Rf(l[e]);return Bt(),u}startProfiling(){}endProfiling(){Ff(this.sessionId)}}}),Vf={};$e(Vf,{OnnxruntimeWebAssemblyBackend:()=>Uf,initializeFlags:()=>Hf,wasmBackend:()=>Wf});var Hf,Uf,Wf,Gf=P(()=>{"use strict";Qt(),If(),Bf(),Hf=()=>{(typeof F.wasm.initTimeout!=`number`||F.wasm.initTimeout<0)&&(F.wasm.initTimeout=0);let e=F.wasm.simd;if(typeof e!=`boolean`&&e!==void 0&&e!==`fixed`&&e!==`relaxed`&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),F.wasm.simd=!1),typeof F.wasm.proxy!=`boolean`&&(F.wasm.proxy=!1),typeof F.wasm.trace!=`boolean`&&(F.wasm.trace=!1),typeof F.wasm.numThreads!=`number`||!Number.isInteger(F.wasm.numThreads)||F.wasm.numThreads<=0)if(typeof self<`u`&&!self.crossOriginIsolated)F.wasm.numThreads=1;else{let e=typeof navigator>`u`?Qe(`node:os`).cpus().length:navigator.hardwareConcurrency;F.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},Uf=class{async init(e){Hf(),await kf(),await Af(e)}async createInferenceSessionHandler(e,t){let n=new zf;return await n.loadModel(e,t),n}},Wf=new Uf});Qt(),Qt(),Qt();var Kf=`1.27.0`;{let e=(Gf(),tt(Vf)).wasmBackend;it(`webgpu`,e,5),it(`webnn`,e,5),it(`cpu`,e,10),it(`wasm`,e,10)}Object.defineProperty(F.versions,"web",{value:Kf,enumerable:!0});var qf=new qe({features:[`js`,`wasm`]}),Jf={size:224,mean:[.5,.5,.5],std:[.5,.5,.5]},Yf=null,Xf=[],Zf=!1;async function Qf(e){return new Promise((t,n)=>{let r=new Image;r.crossOrigin=`Anonymous`,r.onload=()=>t(r),r.onerror=()=>n(Error(`로드 실패: ${e}`)),r.src=e})}async function $f(e){let t=document.createElement(`canvas`);t.width=Jf.size,t.height=Jf.size,await qf.resize(e,t,{alpha:!1});let n=t.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,Jf.size,Jf.size).data,r=Jf.size*Jf.size,i=new Float32Array(3*r);for(let e=0;e<r;e++){let t=e*4;i[e]=(n[t]/255-Jf.mean[0])/Jf.std[0],i[e+r]=(n[t+1]/255-Jf.mean[1])/Jf.std[1],i[e+2*r]=(n[t+2]/255-Jf.mean[2])/Jf.std[2]}return new Ft(`float32`,i,[1,3,Jf.size,Jf.size])}function ep(){let e=document.querySelectorAll(`a#thumbnail img`);return Array.from(e).map(e=>({element:e,url:e.src})).filter(e=>e.url&&e.url.includes(`i.ytimg.com`))}function tp(){let e=ep().filter(e=>e.element.dataset.analyzed!==`true`);if(e.length!==0){console.log(`\n🔍 발견된 썸네일 ${e.length}개 선 차단 완료`);for(let t of e)t.element.dataset.analyzed=`true`,t.element.style.filter=`blur(15px)`,t.element.style.transition=`filter 0.3s ease`,Xf.push(t);np()}}async function np(){if(!Zf){for(Zf=!0;Xf.length>0;){let{element:e,url:t}=Xf.shift();try{let n=await $f(await Qf(t));(await Yf.run({input_image:n})).logits.data[0]>0||(e.style.filter=`none`)}catch(e){console.error(`❌ 이미지 분석 실패: ${t}`,e)}}Zf=!1}}var rp=!1;function ip(){rp||(rp=!0,requestAnimationFrame(()=>{rp=!1,tp()}))}async function ap(){try{console.log(`=========================================`),console.log(`🚀 [단계 1] ONNX 초기화 파이프라인 시작`),console.time(`⏳ 모델 다운로드 및 Wasm 컴파일 시간`),F.wasm.proxy=!1,F.logLevel=`error`,F.wasm.numThreads=1,F.wasm.wasmPaths=chrome.runtime.getURL(`image/assets/`);let e=chrome.runtime.getURL(`image/assets/siglip_end2end.onnx`),t=chrome.runtime.getURL(`image/assets/siglip_end2end.onnx.data`);Yf=await Kt.create(e,{executionProviders:[`wasm`],externalData:[{path:`siglip_end2end.onnx.data`,data:t}]}),console.timeEnd(`⏳ 모델 다운로드 및 Wasm 컴파일 시간`),console.log(`✅ [단계 1 완료] 모델이 메모리에 성공적으로 로드되었습니다.`),console.log(`=========================================
`),tp(),console.log(`👀 [단계 2] YouTube DOM 변화 감지(Observer) 시작...`),new MutationObserver(()=>ip()).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`src`]}),window.addEventListener(`scroll`,ip,{passive:!0})}catch(e){console.error(`❌ 초기화 치명적 실패:`,e)}}ap()})();