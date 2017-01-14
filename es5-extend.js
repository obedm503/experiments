/*
recreate 'extend' in es5
*/

// es6 class extends syntax
class Class extends Array {
  method(){
    return this
  }
  add(ind1, ind2){
    return new Class(this[ind1], this[ind2])
  }
}

// using setPrototypeOf gets retult closest to es6
function SetProto(){
  var methods = Object.create(Array.prototype)

  methods.method = function method(){
    return this
  }

  methods.add = function add(ind1, ind2){
    return new SetProto(this[ind1], this[ind2])
  }

  var arr = Array.prototype.slice.call( arguments )

  Object.setPrototypeOf(arr, methods)

  return arr
}

function NoSetProto(){
  var arr = Array.prototype.slice.call( arguments )

  arr.method = function method(){
    return this
  }

  arr.add = function add(ind1, ind2){
    return new SetProto(this[ind1], this[ind2])
  }

  return arr
}

function DefineProperties(){
  var arr = Array.prototype.slice.call( arguments )

  Object.defineProperties(arr, {
    method: {
      value: function method(){
        return this
      },
      name:'method'
    },
    add: {
      value: function add(ind1, ind2){
        return new SetProto(this[ind1], this[ind2])
      }
    }
  })

  return arr
}


// inst is now public
var inst;
function test(obj, num){
  let init = Date.now()
  for(let i = 0; i<num;i++){
    inst = new obj(1,2,3,4, i)
  }
  let lapse = Date.now() - init
  console.log('lapse (ms): ', lapse, 'instance: ', inst)
}

function testReverse(obj, num, newA){
  inst = obj(1,2,3,4)
  let init = Date.now()
  for(let i = 0; i<num;i++){
    if(typeof inst.invert !== 'undefined'){
      inst.invert(newA)
    } else {
      inst.reverse()
    }
  }
  let lapse = Date.now() - init
  console.log('lapse (ms): ', lapse, 'instance: ', inst)
}

function testRandom(obj, num){
  inst = obj(1,2,3,4)
  let init = Date.now()
  for(let i = 0; i<num;i++){
    inst.randomize()
  }
  let lapse = Date.now() - init
  console.log('lapse (ms): ', lapse, 'instance: ', inst)
}

function push(a, item){
  a[a.length] = item;
}
function testPush(num, p){
  let a = $a()
  let init = Date.now()
  for(let i = 0; i<num;i++){
    if(p){
      a.push(i+2)
    } else {
      push(a, i+2)
    }
  }
  let lapse = Date.now() - init
  console.log('lapse (ms): ', lapse, 'len: ', a.length )
}

function testGroup(a, num, use){
  let AJ;
  let init = Date.now()
  for(let i = 0; i<num;i++){
    AJ = a.group({J:x=>x.name[0] == 'J', A:x=>x.lastname[0] == 'A'}, null, use)
  }
  let lapse = Date.now() - init
  console.log('lapse (ms): ', lapse, AJ )
}
function testFilter(a, num){
  let A;
  let J;
  let U;
  let init = Date.now()
  for(let i = 0; i<num;i++){
    A = a.filter(x=>x.lastname[0] == 'A')
    J = a.filter(x=>x.name[0] == 'J')
    U = a.filter(x=>(x.lastname[0] != 'A' && x.name[0] == 'J'))
  }
  let lapse = Date.now() - init
  console.log('lapse (ms): ', lapse, A, J, U)
}

function testR(a, fun, num){
  //let gConds = {J:x=>x.name[0] == 'J', A:x=>x.lastname[0] == 'A'}
  let gConds = [x=>x.lastname[0] == 'A', x=>x.name[0] == 'J']
  let key = 'user_id'
  let total = 0;
  let out;
  for(let I = 0; I<10;I++){
    let init = Date.now()
    for(let i = 0; i<num;i++){
      if(fun == 'group' || fun == 'group2'){
        out = a[fun](gConds)
      } else {
        out = a[fun](key)
      }
    }
    total += Date.now() - init
  }

  console.log('lapse (ms): ', (total/num)/10, out)
}
