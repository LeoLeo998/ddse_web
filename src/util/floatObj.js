class floatObj {
    /**
     *判断obj 是否为一个整数
     *
     * @param {*} obj
     * @returns
     * @memberof floatObj
     */
    static isInteger (obj) {
      return Math.floor(obj) === obj
    }
    /**
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     *
     * @param {*} floatNum 小数
     * @returns
     * @memberof floatObj
     *  {
     *  {times: 100, num: 314}
     * }
     */
    static toInteger (floatNum) {
      let ret = {
        times: 1,
        num: 0
      }
  
      if (this.isInteger(floatNum)) {
        ret.num = floatNum
        return ret
      }
  
      let strfi = scientificToDecimal(floatNum) + ''
      let dotPos = strfi.indexOf('.')
      let len = strfi.substr(dotPos+1).length
      let times = Math.pow(10, len)
      let intNum = parseInt(floatNum * times + 0.5, 10)
      ret.times = times
      ret.num = intNum
  
      return ret
    }
  
    static operation(a, b, digits, op) {
      let o1 = this.toInteger(a),
          o2 = this.toInteger(b),
          n1 = o1.num,
          n2 = o2.num,
          t1 = o1.times,
          t2 = o2.times;
      let max = t1 > t2 ? t1: t2
      let result = null
      switch (op) {
        case 'add':
            if (t1 === t2) {
              result = n1 + n2
            }else if (t1 > t2) {
              result = n1 + n2 * (t1 / t2)
            }else {
              result = n1 * (t2 / t1) + n2
            }
            return result / max
          break;
        case 'subtract':
            if (t1 === t2) {
              result = n1 - n2
            }else if (t1 > t2) {
              result = n1 - n2 * (t1 / t2)
            }else {
              result = n1 * (t2 / t1) - n2
            }
            return result / max
        break;
        case 'multiply':
            result = (n1 * n2) / (t1 * t2)
            return result
        break;
        case 'divide':
            result = (n1 / n2) * (t2 / t1)
            return result
        break;
        default:
          break;
      }
    }
  
    static toFixed (num, s) {
      let times = Math.pow(10, s),
          des = num * times + 0.5
          des = parseInt(des, 10) / times
  
      return des + ''
    }
      // 减法
    static add (a, b, digits) {
      return this.operation(parseFloat(a), parseFloat(b), digits, 'add')
    }
  
    static multiply (a, b, digits) {
      return this.operation(parseFloat(a), parseFloat(b), digits, 'multiply')
    }
  
      // 乘法
    static mul (a, b, digits) {
      return this.operation(parseFloat(a), parseFloat(b), digits, 'multiply')
    }
  
    static divide (a, b, digits) {
      return this.operation(parseFloat(a), parseFloat(b), digits, 'divide')
    }
  
      // 除法
    static div (a, b, digits) {
      return this.operation(parseFloat(a), parseFloat(b), digits, 'divide')
    }
  
    static subtract (a, b, digits) {
      return this.operation(parseFloat(a), parseFloat(b), digits, 'subtract')
    }
  
      // 减法
    static sub(a, b, digits) {
        return this.subtract(a, b, digits)
    }
    static mul(a, b, digits) {
        return this.multiply(a, b, digits)
    }
    static div(val, valTwo, digits) {
        const strVal = scientificToDecimal(val).toString()
        const strValTwo = scientificToDecimal(valTwo).toString()
        const index = strVal.indexOf('.')
        const indexTwo = strValTwo.indexOf('.')
        const num = [0, 0]
        if (index > -1) {
          num[0] = strVal.length - 1 - index
        }
        if (indexTwo > -1) {
          num[1] = strValTwo.length - 1 - index
        }
        return Math.round(val * Math.pow(10, num[0])) / (Math.round((valTwo * Math.pow(10, num[1]))) * Math.pow(10, num[0] - num[1]))
      //   return this.divide(a, b, digits)
    }
  }
  export function formatNum (num) {
    let real = realNum(num)
    if (isNaN(real)) {
        return num
    }
    if (parseInt(real) < 1000 && parseInt(real) > -1000) {
        return real
    }
    if (real < 0) {
        return `-${String(Math.abs(real)).replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1')}`
    }
    return String(real).replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1')
  }
  export function realNum (numStr) {
    if (numStr && typeof numStr == 'string') {
        let num = String(numStr).replace(/,/g, '')
        if (isNaN(Number(num))) {
            return numStr
        }
        return num
    }
    return numStr
  }
  //转换科学计数法
  export  function scientificToDecimal (num) {
      //if the number is in scientific notation remove it
      if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
          let u = ''
          if (parseFloat(num) < 0) {
              u = '-'
          }
          var zero = '0',
              parts = String(Math.abs(num)).toLowerCase().split('e'); //split into coeff and exponent
              if (parts.length === 1) {
                return u + parts[0]
              }
              if (parts.length < 2) {
                return num
              }
          var  e = parts.pop(), //store the exponential part
              l = Math.abs(e), //get the number of zeros
              sign = e / l,
              coeff_array = parts[0].split('.');
          if (sign === -1) {
              num = u + zero + '.' + new Array(l).join(zero) + coeff_array.join('');
          } else {
              var dec = coeff_array[1];
              if (dec) l = l - dec.length;
              num = u + coeff_array.join('') + new Array(l + 1).join(zero);
          }
      }
      return num;
  }
  export default floatObj