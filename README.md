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
- toggle(bool) - show/hide or toggle if s undefined 
- focus() - move focus to the input area
- select() - select/deselect the text in the input field

getters:

- value - return value of input area
- options - return array of select options
- inputElement - return the input element
- selectElement - return the select element

setters: 

- value=val -set value of input area
- options=array_of_options - set select with the options in array_of_options
- onchange=f - call f with (value) when selection changes
- onescape=f - call f when escape is pressed
- onkeydown=f - call f when a key is pressed in the input field with (e.key, value())
onblur=f call f with (event) object on blur
<br/><br/>

**Example:**

http://stackoverflow.com/a/39036840/460084

