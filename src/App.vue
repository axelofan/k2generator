<template>
	<p><span class='number'>К2</span> Известно, что уравнение <span v-html='equation.text'></span> на отрезке {{segment}} имеет единственный корень. Найдите его приблизительное значение с точностью не менее 0.00001 и запишите в ответе найденное значение.</p>
	<span class='hintButton'  @click='answer = !answer'>Примерное решение</span>
	<div v-if='answer'>
		Ответ: {{equation.answer}} (округлённо {{round(equation.answer)}} или {{round(equation.answer+0.00001)}})<br>
		Алгоритм нахождения на языке Python.<br><br>
		<p class='code'>
			from math import sin,cos<br><br>
			def f(x):<br>
			&nbsp;&nbsp;&nbsp;return {{equation.py}}<br><br>
			a, b = {{equation.segment[0]}}, {{equation.segment[1]}}<br>
			while (b-a) > 1e-10:<br>
			&nbsp;&nbsp;&nbsp;c = (a+b)/2<br>
			&nbsp;&nbsp;&nbsp;if f(a)*f(c) &lt;= 0:<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b = c<br>
			&nbsp;&nbsp;&nbsp;else:<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a = c<br>
			print( (a+b)/2 )
		</p>
	</div>
</template>

<script>
import task from './task.js'

export default {
	name: 'App',
	data() {
		return {
			answer: false,
			equation: task
		}
	},
	methods: {
		round(n) {return Math.trunc(n*100000)/100000}
	},
	computed: {
		segment() {return `[${this.equation.segment[0]}; ${this.equation.segment[1]}]`}
	}
}
</script>

<style>
body {
  font-size: 1.5em;
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.4;
  font-family: sans-serif;
  padding: 20px;
}
p {
  text-align: justify;
}
.number {
  border: 2px solid;
  padding: 4px;
  font-weight: bolder;
}
.code {
  font-family: monospace;
}
.hintButton {
  color: #0066B3;
  cursor: pointer;
  font-weight: bolder;
  border-bottom: 2px dashed;
}
</style>
