

import {isArray,isFunction,isNumber,isUndefined,whatIs,isLikeArray,isGeneralizedObject} from './is'
import {randomInteger} from './math.js'
import {warning} from 'changlin-warning'


/**
 * 类数组对象转化为数组
 *
 * @param {Object}  s
 * @example
 * ```javascript
 *toArray({'0':123,'2':456,length:3})
 * //=>[123,456,undefined]
 * ```
 *
 * @returns {Array}
 */
export function toArray(s){
    return Array.prototype.slice.call(s)
}


/**
 * 从数组中移除某些项
 *
 * @param {Array}  arr
 * @param {Number | function}  condition  if(number&&arr[number] remove arr[number] ; if(fn(item))remove item
 *@param {Number}  number
 * @example
 * ```javascript
 * let a=[1,2,3];
 * removeFromArray(a,1)//=>[2]
 * a//=>[1,3]
 *
 * let b=[{id:1},{id:2},{id:3}];
 * removeFromArray(b,(n)=>n.id===3)//=>[{id:3}]
 * b//=>[{id:1},{id:2}]
 * ```
 *
 * @returns {Array}
 */
export function removeFromArray(arr,condition,number=1){
    if(!isArray(arr))throw new Error(`arr should be arr but got ${typeof arr}`);
    let items=[];
    if(isNumber(condition)){
        return condition<arr.length ? arr.splice(condition,number) : items
    }
    if(isFunction(condition)){
        for (let i=0;i<arr.length;i++){
            let res=false;
            try{
                res=condition(arr[i]);
            }catch (e){
                res=false;
            }
            if(res){
                items.push(arr.splice(i,1)[0]);
                i--
            }
        }
        return items
    }
    return items
}


/**
 * 排序
 *
 * @param {Array}  arr
 * @param {function}  compare  比较函数
 * @example
 * ```javascript
 * let a=[1,3,,,2];
 * sort(a,()=>true)//=>[2,3,1,undefined,undefined]
 * a//=>[2,3,1,undefined,undefined]
 *
 * let arrb=[1,3,5,4,2,7,6]
 * sort(arrb,(a,b)=>a>b)//[1,2,3,4,5,6,7]
 *
 * ```
 *
 * @returns {Array}
 */
export function sort(arr,compare){
    if(!isFunction(compare)||!isArray(arr)){
        throw new Error('arguments is not expected')
    }
    let i,j;
    for(i=1;i<arr.length;i++){
            for(j=i-1;j>-1;j--){
                let res;
                if(isUndefined(arr[j+1])){
                    break
                }else if(isUndefined(arr[j])){
                    res=true
                }else {
                    try{
                        res=compare(arr[j],arr[j+1])
                    }catch (e){
                        res=false;
                        break;
                    }
                }
                if(res){
                    arr.splice(j,0,arr.splice(j+1,1)[0])
                }else {
                    break
                }
            }
    }
    return arr;
}
/**
 * 找出数组某一个元素
 *
 * @param {Array}  array
 * @param {function}  fn  过滤函数
 * @example
 * ```javascript
 * find([1,2,'2',3,4,5],function(a){return a==='2'})//=>'2'
 * find([1,2,'2',3,4,5],function(a){return a===8})//=>undefined
 * ```
 *
 * @returns {any}
 */
export function find(array,fn){
    if(!isArray(array)){
        throw new Error(`array should be Array type but got ${whatIs(array)}`)
    }
  if( warning(!isFunction(fn),`fn is not function ,'find' will return undefined`)){return undefined}
  
  if(array.find){return array.find(fn)}
  
  let result;
  
  try{
      for(let i=0;i<array.length;i++){
          if(fn(array[i])){
              result=array[i];
              break;
          }
      }
  }catch (e){
      warning(true,e)
  }
  
    return result;
}

/**
 * 乱序。返回原（类）数组
 *
 * @param {Array}  arr
 * @example
 * ```javascript
 * let arr1=[1,2,3];
 * let res=shuffle(arr1);
 * res===arr1//=>true
 * res.length===3//true
 * ```
 *
 * @returns {Array}
 */
export function shuffle(arr){
    let source ;
    if(!isArray(arr)){
        if(isLikeArray(arr)){
            source=toArray(arr);
        }else{
            throw new Error(`arr should be array but got ${whatIs(arr)}`)
        }
        
    }else{
        source=arr
    }
   let temp=source.slice(0);
    for(let i=0,l=arr.length;i<l;i++){
        let n=randomInteger(l-i-1);
        arr[i]=temp.splice(n,1)[0]
    }
    
    return arr;
}


/**
 * 获取数组最后一个元素
 *
 * @param {Array}  arr
 * @example
 * ```javascript
 *
 * lastOneOf([1,2,3])//=>3
 *
 *
 * ```
 *
 */
export function lastOneOf(arr){
    return arr[arr.length-1]
}


/**
 * 数组去重，不对传入对象进行操作，返回一个新的数组
 *
 *```javascript
 *
 * excludeTheSame([1, 2, , 2, , , 5])//=> [1,2,undefined,5]
 *excludeTheSame([1, 2, , 2, , , 5],(a,b)=>a===b)//=> [1,2,undefined,5]
 *
 *```
 * @param {Array | likeArray } array
 * @param {Function | undefined} isSame
 * @returns {Array}
 */
export function excludeTheSame(array,isSame){
    if(array === null || array === undefined){
        throw new Error('array should not be null or undefined')
    }
    const result=[];
    if(!isFunction(isSame)){
        isSame=_isSame
    }
    if(array.length){
        result.push(array[0])
    }else{
        return result
    }
    for(let i=0;i<array.length;i++){
        for(let j=0;j<result.length;j++){
            if(isSame(result[j],array[i])){
                break
            }
            if(j===result.length-1){
                result.push(array[i]);
                break
            }
        }
    }
    return result
}

function _isSame(a,b){
    return a===b
}





