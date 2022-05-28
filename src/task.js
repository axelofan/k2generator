function rnd() {return Math.floor((5*Math.random()+0.1)*10)/10}
function randint(min, max) { return Math.floor(min + Math.random() * (max + 1 - min)) }
Array.prototype.random = function() {return this[randint(0,this.length-1)]}

function randomType() {
	let k = rnd(), n = rnd(), m = rnd(), s = rnd()
   return[
   //функции вида f(x) = k⋅sin(m⋅x) или f(x) = k⋅cos(m⋅x)
   {f:x=>k*Math.sin(m*x),text:`${k}⋅sin(${m}x)`,py:`${k}*sin(${m}*x)`},
   {f:x=>k*Math.cos(m*x),text:`${k}⋅cos(${m}x)`,py:`${k}*cos(${m}*x)`},
   //функции вида f(x) = k⋅n^(m⋅x)
   {f:x=>k*Math.pow(n,m*x),text:`${k}⋅${n}<sup>${m}x</sup>`,py:`${k}*${n}**(${m}*x)`},
   //функции вида f(x) = k⋅sin(m⋅x)⋅n^(s⋅x)
   {f:x=>k*Math.sin(m*x)*Math.pow(n,s*x),text:`${k}⋅sin(${m}x)⋅${n}<sup>${s}x</sup>`,py:`${k}*sin(${m}*x)*${n}**(${s}*x)`},
   {f:x=>k*Math.cos(m*x)*Math.pow(n,s*x),text:`${k}⋅cos(${m}x)⋅${n}<sup>${s}x</sup>`,py:`${k}*cos(${m}*x)*${n}**(${s}*x)`}
   ].random()
}

function Equation() {
	//левая половина уравнения
	this.f0 = randomType()
   //правая половина уравнения
   this.f1 = randomType()
   //вычислительная функция
   this.f = x => this.f0.f(x)-this.f1.f(x)
   //текст уравнения
   this.text = `${this.f0.text} = ${this.f1.text}`
   //код функции на Python
   this.py = `${this.f0.py} - ${this.f1.py}`
}

function Segments(f) {
	this.f=f
   //алгоритм подсчёта числа корней на отрезке (точность 0.01)
   //Убрано,т.к вероятность получить больше одного корня меньше 0.00001 (на длине 0.5)
   /*this.bruteForce = function(a,b) {
		a = a*1e2; b = b*1e2;
   	let k=0
   	for(let i=a;i<b;i++){
   		let x0 = i/1e2, x1 = (i+1)/1e2
      	if(this.f(x0)*this.f(x1)<=0) k = k+1
   	}
   	return k
   }*/
   //алгоритм определения отрезков с единственным корнем
   this.getSegments = function() {
      let s=[]
      for(let i=0;i<100;i++){
         let x0=i/2, x1=(i+1)/2
			//неравенство нулю сделано СПЕЦИАЛЬНО
         if(this.f(x0)*this.f(x1)<0) {
            s.push([x0,x1])
            //let count = this.bruteForce(x0,x1)
            //if(count==1) s.push([x0,x1])
         }
      }
      return s
   }
}

function Answer(f,segment) {
	this.f = f
   this.segment = segment
   this.getAnswer = function() {
      let a = this.segment[0], b = this.segment[1]
      while((b-a)>1e-10) {
         let c=(a+b)/2
         if(f(a)*f(c)<=0) b=c
         else a=c
   }
   return (a+b)/2
   }
}

function init() {
	//создаём уравнение
	let equation = new Equation()
   //определяем доступные отрезки
	let segments = new Segments(equation.f).getSegments()
   
   if (segments.length==0) return init()
   else {
      let segment = segments.random()
      let answer = new Answer(equation.f,segment).getAnswer()
      return({text:equation.text,py:equation.py,segment,answer})
   }
}

export default init()