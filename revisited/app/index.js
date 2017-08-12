import Filterizr from './filterizr';
import DefaultOptions from './options';

(function($) {
  //Make sure jQuery exists
  if (!$) throw new Error('Filterizr requires jQuery to work.');

  // Extract .filterizr method on jQuery prototype
  $.fn.filterizr = function() {
    const selector  = `.${this.get(0).className}`;
    const args = arguments;

    console.log(this)


    // user is instantiating Filterizr
    if (!this._fltr && args.length === 0 || (args.length === 1 && typeof args[0] === 'object')) {
      const options = args.length > 0 ? args[0] : DefaultOptions;
      this._fltr = new Filterizr(selector, options);
    }
    // otherwise call the method called
    else if (args.length >= 1 && typeof args[0] === 'string') {
      const method = args[0];
      const methodArgs = Array.prototype.slice.call(args, 1);
      const filterizr = this._fltr;
      switch(method) {
        case 'filter':
          filterizr.filter(...methodArgs);
          return this;
        case 'toggleFilter':
          filterizr.toggleFilter(...methodArgs);
          return this;
        case 'sort':
          filterizr.sort(...methodArgs);
          return this;
        case 'shuffle':
          filterizr.shuffle(...methodArgs);
          return this;
        case 'search':
          filterizr.search(...methodArgs);
          return this;
        case 'setOptions':
          filterizr.setOptions(...methodArgs);
          return this;
        default:
          return;
      }
    }

    return this;
  }
})(jQuery);
