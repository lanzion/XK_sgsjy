/*
 * 判断两个对象是否相同
 */
function isObj(object) {
    return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof(object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    var count = 0;
    for (var i in object) count++;
    return count;
}

function Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false;
    if (getLength(objA) != getLength(objB)) return false;
    return CompareObj(objA, objB, true);
}

function CompareObj(objA, objB, flag) {
    for (let key in objA) {
        if (!flag) break;

        if (!objB.hasOwnProperty(key)) {
            console.log(1)
            flag = false;
            break;
        }
        if (!Array.isArray(objA[key])) {
            if (objB[key] != objA[key]) {
                console.log(2)
                flag = false;
                break;
            }
        } else {
            if (!Array.isArray(objB[key])) {
                console.log(3)
                flag = false;
                break;
            }

            let oA = objA[key].sort(),
                oB = objB[key].sort();

            if (oA.length != oB.length) {
                console.log(4)
                flag = false;
                break;
            }

            for (let k in oA) {
                if (!flag) break;
                if (isObj(oA[k]) || Array.isArray(oA[k])) {
                    flag = CompareObj(oA[k], oB[k], flag);
                } else {
                    console.log(5)
                    flag = oA[k] == oB[k];
                }
            }
        }
    }
    console.log(flag)
    return flag;
}

// 新增
function isObjectValueEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
     if (aProps.length != bProps.length) {
          return false;
     }
     for (var i = 0; i < aProps.length; i++) {
       var propName = aProps[i]

       var propA = a[propName]
       var propB = b[propName]
       if ((typeof (propA) === 'object')) {
         if (this.isObjectValueEqual(propA, propB)) {
             return true
           } else {
             return false
           }
       } else if (propA !== propB) {
         return false
       } else { }
     }
   return true
}

export {
    Compare,
    isObjectValueEqual

}
