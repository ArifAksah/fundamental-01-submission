class AddNote extends HTMLElement {
    _shadowRoot = null;
    _style = null;
  
    _submitEvent = 'submit';
  
    constructor() {
      super();
  
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
  
      this.render();
    }
  
    _emptyContent() {
      this._shadowRoot.innerHTML = '';
    }
  
    connectedCallback() {
      this._shadowRoot
        .querySelector('form')
        .addEventListener('submit', (event) => this._onFormSubmit(event, this));
    }
  
    disconnectedCallback() {
      this._shadowRoot
        .querySelector('form')
        .removeEventListener('submit', (event) => this._onFormSubmit(event, this));
    }
  
    _onFormSubmit(event, addNoteInstance) {
      event.preventDefault();
  
      const title = this._shadowRoot.querySelector('input#title').value;
      const body = this._shadowRoot.querySelector('textarea#body').value;
  
      if (!title || !body) return;
  
      const newNote = {
        id: Utils.generateUniqueId(),
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };
  
      this.dispatchEvent(
        new CustomEvent(this._submitEvent, {
          detail: { newNote },
          bubbles: true,
        })
      );
  
      // Clear input fields after submission
      this._shadowRoot.querySelector('input#title').value = '';
      this._shadowRoot.querySelector('textarea#body').value = '';
    }
  
    _updateStyle() {
      this._style.textContent = `
        :host {
          display: inline;
        }
      
        .floating-form {
          background-color: white;
          padding: 16px;
          border-radius: 5px;
  
          position: sticky;
          top: 10px;
  
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        }
  
        .add-note-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
  
        .add-note-form .form-group {
          position: relative;
        }
  
        .add-note-form .form-group input,
        .add-note-form .form-group textarea {
          display: block;
          width: 100%;
          padding: 10px;
          font-size: 1rem;
        }
  
        .add-note-form .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }
  
        .add-note-form .form-group label {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 0.8em;
          color: cornflowerblue;
          pointer-events: none;
          transition: 150ms all ease-in-out;
        }
  
        .add-note-form .form-group input:focus-visible ~ label,
        .add-note-form .form-group textarea:focus-visible ~ label,
        .add-note-form .form-group input:not(:placeholder-shown) ~ label,
        .add-note-form .form-group textarea:not(:placeholder-shown) ~ label {
          top: -10px;
          font-size: 0.7em;
        }
  
        .add-note-form button {
          border: 0;
          padding: 10px;
          background-color: cornflowerblue;
          color: white;
          cursor: pointer;
          transition: 100ms linear;
        }
  
        .add-note-form button:hover {
          background-color: #4485ff;
        }
  
        .add-note-form button:active {
          background-color: #6c9aee;
        }
      `;
    }
  
    render() {
      this._emptyContent();
      this._updateStyle();
  
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
        <div class="floating-form">
          <form class="add-note-form">
            <div class="form-group">
              <input id="title" name="title" type="text" required />
              <label for="title">Title</label>
            </div>
            <div class="form-group">
              <textarea id="body" name="body" required></textarea>
              <label for="body">Body</label>
            </div>
            <button>Add Note</button>
          </form>
        </div>
      `;
    }
  }
  
  customElements.define('add-note', AddNote);
  