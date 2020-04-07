class VKeyboard {
    constructor() {
      this.elements = {
        container: null,
        textarea: null,
        keys: [],
      };
  
      this.configs = {
        KeysLowEng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', 'space', 'Alt', '←', '↓', '→', 'Ctrl'],

        KeysUpEng: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'Q', 'P', '{', '}', '|',
        'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', 'SPACE', 'Alt', '←', '↓', '→', 'Ctrl'],

        KeysLowRus: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', 'пробел', 'Alt', '←', '↓', '→', 'Ctrl'],

        KeysUpRus: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+',
        'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
        'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
        'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', 'ПРОБЕЛ', 'Alt', '←', '↓', '→', 'Ctrl'],

        KeysCode: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
      };
  
      this.language = 'eng';
      this.capsLock = false;
      this.pressed = new Set();
    }
  
    init() {
      const textarea = document.createElement('textarea');
      document.body.append(textarea);
  
      const vkeyboard = document.createElement('div');
      vkeyboard.classList.add('vkeyboard');
      document.body.append(vkeyboard);
  
      vkeyboard.append(this.createKeys());
  
      this.elements.container = document.querySelector('.vkeyboard__container');
      this.elements.keys = document.querySelectorAll('.vkeyboard__key');
      this.elements.textarea = document.querySelector('textarea');
  
      window.addEventListener('keydown', (event) => {
        this.eventKeyDown(event);
      });
      window.addEventListener('keyup', (event) => {
        this.eventKeyUp(event);
      });
      window.addEventListener('mousedown', (event) => {
        this.eventKeyDown(event);
      });
      window.addEventListener('mouseup', (event) => {
        this.eventKeyUp(event);
      });
      window.addEventListener('mouseout', (event) => {
        event.target.classList.remove('vkeyboard__key_active');
      });
      this.elements.textarea.addEventListener('keydown', (event) => {
        event.preventDefault();
      });
    }
  
    createKeys() {
      const container = document.createElement('div');
      container.classList.add('vkeyboard__container');
  
      this.configs.KeysCode.forEach((eachClass) => {
        const key = document.createElement('button');
        key.classList.add(eachClass, 'vkeyboard__key');
        container.append(key);
        this.elements.keys.push(key);
      });
  
      if (localStorage.language === 'eng' || localStorage.language === undefined) {
        for (let i = 0; i < this.configs.KeysLowEng.length; i += 1) {
          this.elements.keys[i].innerHTML = this.configs.KeysLowEng[i];
        }
      } else {
        for (let i = 0; i < this.configs.KeysLowRus.length; i += 1) {
          this.elements.keys[i].innerHTML = this.configs.KeysLowRus[i];
        }
      }
  
      return container;
    }
  
    changeKeys(configKeys) {
      for (let i = 0; i < configKeys.length; i += 1) {
        this.elements.keys[i].innerHTML = configKeys[i];
      }
    }
  
    capsLockToggle() {
      const languages = {
        ENG: 'eng',
        RUS: 'rus',
      };
      if (this.capsLock === false) {
        if (this.language === languages.ENG) {
          this.changeKeys(this.configs.KeysUpEng);
        } else {
          this.changeKeys(this.configs.KeysUpRus);
        }
      } else if (this.language === languages.ENG) {
        this.changeKeys(this.configs.KeysLowEng);
      } else {
        this.changeKeys(this.configs.KeysLowRus);
      }
      this.capsLock = this.capsLock === false;
    }
  
    languageToggle() {
      const languages = {
        ENG: 'eng',
        RUS: 'rus',
      };
      if (this.language === languages.ENG) {
        this.changeKeys(this.configs.KeysLowRus);
      } else {
        this.changeKeys(this.configs.KeysLowEng);
      }
      this.language = this.language === languages.ENG ? languages.RUS : languages.ENG;
      localStorage.setItem('language', this.language);
    }
  
  
    eventKeyDown(event) {
      if (event.type === 'keydown' || event.target.classList.contains('vkeyboard__key')) {
        let key = document.querySelector(`.${event.code}`);
  
        if (event.type === 'mousedown') {
          key = document.querySelector(`.${event.target.classList[0]}`);
        }
  
        key.classList.add('vkeyboard__key_active');
  
        switch (key.classList[0]) {
          case 'CapsLock': {
            this.capsLockToggle();
            break;
          }
          case 'Space': {
            this.elements.textarea.value += ' ';
            break;
          }
          case 'Tab': {
            this.elements.textarea.value += '       ';
            break;
          }
          case 'Backspace': {
            this.elements.textarea.value = this.elements.textarea.value.slice(0, -1);
            break;
          }
          case 'Enter': {
            this.elements.textarea.value += '\n';
            break;
          } case 'ShiftLeft': {
            if (!this.pressed.has('ShiftLeft')) {
              this.capsLockToggle();
            }
            break;
          }
          default: {
            if (key.innerHTML.length === 1) { this.elements.textarea.value += key.innerHTML; }
            break;
          }
        }
  
        this.pressed.add(event.code);
  
        if (this.pressed.has('ShiftLeft') && this.pressed.has('AltLeft')) {
          this.languageToggle();
        }
      }
    }
  
    eventKeyUp(event) {
      if (event.type === 'keyup' || event.target.classList.contains('vkeyboard__key')) {
        let key = document.querySelector(`.${event.code}`);
        if (event.type === 'mouseup') {
          key = document.querySelector(`.${event.target.classList[0]}`);
        }
  
        key.classList.remove('vkeyboard__key_active');
  
        if (key.classList[0] === 'CapsLock' && this.capsLock) {
          key.classList.add('vkeyboard__key_active');
        }
        if (key.classList[0] === 'ShiftLeft') {
          this.capsLockToggle();
        }
      }
  
      this.pressed.delete(event.code);
    }
  }
  
  const vkeyboard = new VKeyboard();
  vkeyboard.init();