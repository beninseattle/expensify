import uuid from 'uuid';

/**
 * @typedef {string} Uuid
 */

/**
 * @property {Uuid} id
 * @property {string} description
 * @property {string} note
 * @property {number] amount - integer representation of amount (in pennies)
 * @property {number} createdAt - integer timestamp
 */
export default class Expense {
  id;
  description;
  note;
  amount;
  createdAt;

  /**
   * Constructor
   * Accepts either a plain object with appropriate fields or an existing object to be cloned
   *
   * @param {Object|Expense} [expense]
   * @property {string} expense.description
   * @property {string} expense.note
   * @property {number} expense.amount
   * @property {number} [expense.createdAt]
   * @property {Uuid} [expense.id]
   */
  constructor( expense ){
    this.id = expense && expense.id ? expense.id : uuid();
    this.description = expense && expense.description && expense.description.length > 0 ? expense.description : '';
    this.note = expense && expense.note && expense.note.length > 0 ? expense.note : '';
    this.amount = expense && expense.amount ? parseInt(expense.amount) : 0;
    this.createdAt = expense && expense.createdAt ? parseInt(expense.createdAt) : Date.now();
  }

  /**
   * Tests whether this expense has the given ID
   * @param {Uuid} id
   * @returns {boolean}
   */
  equals( id ){
    return id === this.id;
  }

  /**
   * @returns {boolean}
   */
  isValid(){
    return this.description.length > 0 || this.amount.length > 0;
  }

  /**
   * @returns {string}
   */
  amountCurrencyString(){
    return (this.amount / 100).toLocaleString(undefined, {style: 'currency', currency: 'USD'});
  }

  /**
   * @returns {number}
   */
  amountAsFloat(){
    return this.amount / 100;
  }

  /**
   * @returns {string}
   */
  createdAtDateString(){
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(this.createdAt).toLocaleString('en-US', options);
  }

  /**
   * @returns {string}
   */
  createdAtDateTimeString(){
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(this.createdAt).toLocaleString('en-US', options);
  }

  /**
   * Return data for saving to store
   *
   * @returns {{description: *, note: *, amount: *, createdAt: *}}
   */
  dataForSave(){
    return {
      description: this.description,
      note: this.note,
      amount: this.amount,
      createdAt: this.createdAt
    };
  }

  /**
   * Called when saved to store with a proper id/key
   *
   * @param {string} newId
   */
  saveToStore( newId ){
    this.id = newId;
  }
}
