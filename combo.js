function Combo() {
	'use strict';
	let self, elem, lru;
	let changeFunc, keydownFunc, inputFunc, blurFunc;
	let sel, inp;

	function getInputElement() { return inp; }
	function getSelectElement() { return sel; 	}
	function getWrapper() { return elem; }

	function addOpt(optText) {
		for (let i=0; i<sel.options.length; i++) if (sel.options[i].text===optText) return; // already there

		let option = document.createElement('option');
		option.text=optText;
		sel.add(option, 0);

		if (sel.children.length>lru) sel.removeChild(sel.children[sel.children.length-1]);
	}

	function options(opts=undefined) {
		if (opts===undefined) return sel.options;
		if (opts.constructor !== Array) opts=[opts];
		for(let i = sel.options.length - 1 ; i >= 0 ; i--) sel.remove(i); // clear
		for(let i = opts.length - 1 ; i >= 0 ; i--) addOpt(opts[i]); 
		sel.selectedIndex = -1; 
	}

	function focus() { 
		inp.focus(); 
	}

	function select(b=true) {
		if (b) inp.select(); else b.setSelectionRange(0,0);
	}

	function hookEvents() {
		sel.onchange = e => {
			e.stopPropagation();
			if (inp.value!==sel.value) {
				inp.value=sel.value;
				if (changeFunc)  setTimeout(() => changeFunc.call(self, e, self), 20);
			}
		};

		inp.onkeydown = e => { 
			e.stopPropagation();
			let key=e.key;

			let res;
			if (keydownFunc) res=keydownFunc.call(self, e, self);
			if (res===false || e.defaultPrevented) return;

			if (key==='Enter') {
				if (inp.value) addOpt(inp.value);
				if (changeFunc) setTimeout(() => changeFunc.call(self, e, self), 20);
				e.preventDefault();
			} else if (key==='ArrowUp') {
				if (sel.selectedIndex>0) {
					sel.selectedIndex--;
					inp.value=sel.value;
				}
			} else if (key==='ArrowDown') {
				if (sel.selectedIndex<sel.options.length-1) {
					sel.selectedIndex++;
					inp.value=sel.value;
				}
			} 

			return true;
		};

		inp.oninput = e => {
			if (inputFunc) inputFunc.call(self, e, self);
		};
		
		inp.onclick = e => {
			e.stopPropagation();
		};

		sel.onclick = e => {
			e.stopPropagation();
			if (sel.dataset.open==='true') setTimeout(null, () => { inp.focus(); }, 0); else sel.selectedIndex = -1; 
			sel.dataset.open=(sel.dataset.open==='false' ? 'true' : 'false');
		};

		inp.onblur = sel.onblur = e => { 
			if (blurFunc) blurFunc.call(self, e, self); 
		};
	}

	// constructor
	function ctor(elem_, lru_=5) {
		self=this; elem=elem_; lru=lru_;

		let innerHTML=`
			<select style="border: none; outline: none;padding: 0; margin: 0; "></select>
			<input style="border: none; outline: none; padding: 0; margin: 0; position:relative; margin-left: 1px;"/>`; 
		
		// set inner html and reassign element 
		let parent=elem.parentElement, indexInParent=[].slice.call(parent.children).indexOf(elem);
		elem.innerHTML=innerHTML;
		elem=parent.children[indexInParent];

		sel=elem.children[0], inp=elem.children[1];

		if (!elem.border) elem.style.border='1px solid';

		let elemStyle = window.getComputedStyle(elem);
		let elemWidth=Number(elemStyle.width.replace(/[^\d\.\-]/g, ''));
		let elemHeight=Number(elemStyle.height.replace(/[^\d\.\-]/g, ''));

		sel.style.width=(elemWidth-2)+'px'; // +2 for the div border
		sel.style.height=elemHeight+'px';
		sel.style.fontSize=elemStyle.fontSize;
		sel.selectedIndex = -1; 
		sel.dataset.open='false';

		inp.style.top='-'+elemHeight+'px';
		inp.style.width=(elemWidth-16)+'px';
		inp.style.height=elemHeight+'px';
		inp.style.fontSize=elemStyle.fontSize;
		inp.focus();

		hookEvents();
	}

	// public interface
	return {
		ctor, 
		focus,  // move focus to the input area
		select, // (true/false/undefined) select/deselect the text in the input field, default trure
		options, // (array/undefined) sets/returns the array of options , default undefined

		getInputElement, // () return the input element
		getSelectElement, // () return the select element
		getWrapper, // () return wrapper div

		get value() { return inp.value; }, // () return value of input area
		set value(val) { inp.value=val; }, // (string) set value of input area

		set onchange(f) { changeFunc=f;  },  // f(e, self) will be called with this==self when Enter is pressed in the input field or selection changes
		set oninput(f) { inputFunc=f;  }, // f(e, self) will be called with this==self on input event in input field
		set onkeydown(f) { keydownFunc=f;  }, // f(e, self) will be called with this==self on keydown event in input field
		set onblur(f) { blurFunc=f;  }, // f(e, self) will be called with this==self on blur of the combo
	};
}
