
// 基础类型
// 在js基础类型上，增加了元组、枚举类型。

// 1、boolean 布尔值
let isDone: boolean = false
console.log('1. boolean: ', isDone)

// 2、number 数字
/*
 * 和js一样，ts中的所有数字都是浮点数,用类型number来表示。支持：二、八、十、十六进制。
 */
const binaryLiteral: number = 0b001
const octalLiteral: number = 0o11
const decimalLiteral: number = 6
const hexLiteral: number = 0xf001
console.log('2. number', binaryLiteral, octalLiteral, decimalLiteral, hexLiteral)

// 3、string
/**
 * 字符串可以使用双引号、单引号或者字符串模板。
 * 字符串模板：以反引号包围，并${}这种形式嵌入的表达式。
 */
const str1: string = 'string1'
const str2: string  = `abc ${str1} hello`
console.log('3. string: ', str1, str2)

// 4、数组
/**
 * 数组是有序的元素序列，是用于存储多个数据的集合。
 * 定义数组的形式有两种：
 * 1、在元素类型后面直接加 []
 * 2、数组泛型：Array<元素类型>
 */
const arr1: number[] = [1, 2, 3]
const arr2: Array<string> = ['1', '2', '3']
console.log('4. array', arr1, arr2)

// 5、元组Tupe
/**
 * 元组用来表示一个已知元素数量和类型的数组。
 */

let t: [number, string]
t = [1, '2']
console.log('5. tupe', t)

// 5、枚举enum

// 6、任意类型 any

// 7、void

// 8、null & undefined

// 9、Never

// 10、object

// 11、类型断言
/*
  类型转换
*/
