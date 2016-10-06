#Combo.js - HTML Combo Box
<br/>
Turn a div into a combo box (select + input)

**Usage:**

```
<script src="https://rawgit.com/kofifus/New.js/master/new.js"></script>
<script src="https://rawgit.com/kofifus/Combo.js/master/combo.js"></script>

<div id="myCombo" style="width:200px;height:20px;"></div>

let div=document.getElementById('myCombo');
let combo=Combo.New(div);
```
<br/>
**Public interface:**

methods:

- Combo(div) - constructor
- focus() - move focus to the input area
- select(true/false/undefined) - select/deselect the text in the input field, default to true
- options(array/undefined) - sets/returns the array of options , default to undefined

- getInputElement() - return the input element
- getSelectElement() - return the select element
- getWrapper() - return the wrapper div

getters:

- value - return value of input area

setters: 

- value=val&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- set value of input area
- onchange=f&nbsp;&nbsp;&nbsp; - f(e, self) will be called with this==self when Enter is pressed in the input field or selection changes
- oninput=f&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - f(e, self) will be called with this==self on input event in input field
- onkeydown=f - f(e, self) will be called with this==self on keydown event in input field
- onblur=f&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- f(e, self) will be called with this==self on blur of the combo
<br/><br/>

**Example:**

http://stackoverflow.com/a/39036840/460084

