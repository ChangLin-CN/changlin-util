
import {isWindow,isPlainObject,isObject,isFunction,isArray,isBoolean} from './is.js';

function _extend(...a) {
    const [deep,target, source]=a;
    
    if(!isObject(source))return target;

    for (let key in source)
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                target[key] = {}
            if (isArray(source[key]) && !isArray(target[key]))
                target[key] = []
            _extend(deep,target[key], source[key])
        }
        else if (source[key] !== undefined) target[key] = source[key];
    return target
}



function extend(...a) {
    const len=a.length,
          first=a[0],
    deep=isBoolean(first);
    
    if(!len)return {};

    if(len==1){
        return _extend(false,{},first)
    }

    if(len==2){
        if(deep){
            return a[1]
        }else{
            return _extend(false,...a)
        }
    }
    if(deep){
        if(len==3){
            return _extend(...a)
        }else{
            const temp=a.splice(len-2);
            a=a.concat([_extend(first,...temp)])
            return extend(...a)
        }
    }else{
        const temp=a.splice(len-2);
        a.push(_extend(false,...temp));
        return extend(...a)
    }
}




export default extend
