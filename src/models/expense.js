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
    this.description = expense && expense.description.length > 0 ? expense.description : '';
    this.note = expense && expense.note.length > 0 ? expense.note : '';
    this.amount = expense && expense.amount ? expense.amount : 0;
    this.createdAt = expense && expense.createdAt ? expense.createdAt : Date.now();
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
    return new Date(this.createdAt).toLocaleString();
  }
}
