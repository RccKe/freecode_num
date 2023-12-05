import { useState } from "react"
import './App.scss'

const App = () => {

  const [result, setResult] = useState('0');
  const [onInput, setOnInput] = useState('');

  const num = [
    { id: 'one', text: 1 },
    { id: 'two', text: 2 },
    { id: 'three', text: 3 },
    { id: 'four', text: 4 },
    { id: 'five', text: 5 },
    { id: 'six', text: 6 },
    { id: 'seven', text: 7 },
    { id: 'eight', text: 8 },
    { id: 'nine', text: 9 },
    { id: 'zero', text: 0 }
  ]

  const goCount = [
    { id: 'add', text: '+' },
    { id: 'subtract', text: '-' },
    { id: 'multiply', text: '*' },
    { id: 'divide', text: '/' },
  ]

  const newResult = (text) => {
    if (text === '=') {
      calculateResult();
    } else if (text === "AC") {
      setResult('0');
      setOnInput('');
    } else if (text === '.') {
      const lastNum = result.split(/[\+\-\*\/]/).pop();
      if (!lastNum.includes('.')) {
        setResult((prev) => prev === '0' ? '0.' : `${prev}${text}`);
      }
    } else {
      // 检查上一个操作是否是等于号
      const lastActionWasEquals = onInput === '=';

      // 如果上一个操作是等于号，启动新的计算
      if (lastActionWasEquals) {
        setResult((prev) => prev === '0' ? String(text) : `${text}`);
        setOnInput(String(text));
      } else {
        const lastInputIsOperator = /[\+\-\*\/]$/.test(onInput);

        if (lastInputIsOperator && /[\+\*\/]/.test(text) && text !== '-') {
          setOnInput((prev) => prev.slice(0, -1) + text);
        } else {
          setResult((prev) => prev === '0' ? String(text) : `${prev}${text}`);
          setOnInput((prev) => prev === '0' ? String(text) : `${prev}${text}`);
        }
      }
    }
  };


  const calculateResult = () => {
    try {
      const isValidExpression = /^[0-9+\-*/. ]+$/.test(result);
      if (isValidExpression) {
        const expression = new Function('return ' + result);
        const newNum = expression();
        setResult(String(newNum));
        setOnInput(String(newNum));
      } else {
        setResult('Error')
      }
    } catch {
      setResult('Error')
    }
  }

  return (
    <div id="box">
      <div id="display">{result}</div>
      <button id="clear" onClick={() => setResult('0')}>AC</button>
      <div id="allNum">
        {num.map((item) => (
          <button key={item.id} id={item.id} onClick={() => newResult(item.text)}>{item.text}</button>
        ))}
      </div>
        {goCount.map((gc) => (
          <button key={gc.id} id={gc.id} onClick={() => newResult(gc.text)}>{gc.text}</button>
        ))}
      <button id="decimal" onClick={() => newResult('.')}>.</button>
      <button id="equals" onClick={() => newResult("=")}>=</button>


    </div>
  )
}

export default App;


// 目标：构建一个与https://javascript-calculator.freecodecamp.rocks/
// 类似的功能性应用程序。满足以下用户故事并确保通过所有测试。使用您需要的任何库或API。赋予其您自己的个人风格。
// 您可以使用HTML、JavaScript、CSS、Bootstrap、SASS、React、Redux和jQuery的任意组合来完成此项目。应使用前端框架（例如React）因为本部分涉及学习前端框架。不建议使用未列出的其他技术，使用它们将自担风险。我们考虑支持其他前端框架，如Angular和Vue，但它们目前不受支持。我们将接受并尝试修复所有使用此项目建议技术堆栈的问题报告。祝您编码愉快！

// 用户故事 #1：我的计算器应包含一个可点击的元素，其中包含一个=（等于号），对应的id="equals"。
// 用户故事 #2：我的计算器应包含10个可点击的元素，每个元素包含一个0-9的数字，对应的id分别为"id="zero"、"id="one"、"id="two"、"id="three"、"id="four"、"id="five"、"id="six"、"id="seven"、"id="eight"和"id="nine"。
// 用户故事 #3：我的计算器应包含4个可点击的元素，每个元素包含4个主要的数学运算符之一，对应的id为"id="add"、"id="subtract"、"id="multiply"、"id="divide"。
// 用户故事 #4：我的计算器应包含一个可点击的元素，其中包含一个.（小数点）符号，对应的id="decimal"。
// 用户故事 #5：我的计算器应包含一个可点击的元素，其中包含一个清空按钮，对应的id="clear"。
// 用户故事 #6：我的计算器应包含一个用于显示值的元素，对应的id="display"。
// 用户故事 #7：在任何时候，按下清除按钮应清除输入和输出值，并将计算器返回到初始化状态；在id为display的元素中应显示0。
// 用户故事 #8：当我输入数字时，我应该能够在id为display的元素中看到我的输入。
// 用户故事 #9：我应该能够以任何顺序添加、减少、乘以和除以任意长度的数字链，当我按=时，应在id为display的元素中显示正确的结果。
// 用户故事 #10：在输入数字时，我的计算器不应允许以多个零开始的数字。
// 用户故事 #11：当点击小数点元素时，应将.附加到当前显示的值；一个数字中不应接受两个.。
// 用户故事 #12：我应该能够在包含小数点的数字上执行任何操作（+、-、*、/）。
// 用户故事 #13：如果连续输入2个或更多运算符，执行的操作应为最后输入的运算符（排除负号（-））。例如，如果输入5 + * 7 =，结果应为35（即5 * 7）；如果输入5 * - 5 =，结果应为-25（即5 * (-5)）。
// 用户故事 #14：按=后立即按运算符应启动一个新的计算，该计算对上一个评估结果进行操作。

// 用户故事 #15：我的计算器在四舍五入时应具有几位小数的精度（请注意，没有确切的标准，但您应该能够处理至少4位小数的计算，例如2 / 7）。

// 关于计算器逻辑的说明：值得注意的是，关于计算器输入逻辑有两种主要观点：即时执行逻辑和公式逻辑。我们的示例使用了公式逻辑并遵循运算次序的优先级，而即时执行逻辑则不遵循。两者都是可以接受的，但请注意，根据您的选择，您的计算器可能与我们的计算器在某些方程中产生不同的结果（请参见下面的示例）。只要您的数学可以由另一个生产计算器验证，请不要认为这是一个错误。

// 示例：3 + 5 x 6 - 2 / 4 =

// 即时执行逻辑：11.5
// 公式／表达式逻辑：32.5