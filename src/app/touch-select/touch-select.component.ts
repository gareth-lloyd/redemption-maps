import { Component, Input, forwardRef, OnChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


interface SelectOption {
  value: any;
  label: string;
}

type OptionEqualityFn = (a: any, b: any) => boolean;
type OnChangeFn = (_: any) => void;
type OnTouchedFn = () => void;


let componentCounter = 0;

/**
 * Display a selection of options, hiding the least popular initially.
 *
 * Allows for both single and multiple selections.
 */
@Component({
  selector: 'touch-select',
  templateUrl: './touch-select.component.html',
  styleUrls: ['./touch-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TouchSelectComponent),
      multi: true
    },
  ]
})
class TouchSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string;
  @Input() help: string;
  @Input() multiple = false;
  @Input('required') _required: any;
  @Input() equalityFn: OptionEqualityFn;
  @Input() showLimit = 4;

  private _options: SelectOption[];

  @Input()
  set options(options: SelectOption[]) {
    this._options = options;

    // Limit the currently selected values to those that appear in the new
    // options list
    this._value = this._value.filter((selectedValue) => {
      return options.find((option) => option.value === selectedValue);
    });
  }

  get options() {
    return this._options;
  }

  public name = `hk-select-${++componentCounter}`;
  public isDisabled = false;
  public required = false;

  private _value: any[] = [];
  private _propagateChange: OnChangeFn = () => { };
  private _propagateTouched: OnTouchedFn = () => { };

  public focussedOption: SelectOption;
  public alwaysOptions: SelectOption[] = [];
  public moreOptions: SelectOption[] = [];
  public visibleOptions: SelectOption[] = [];
  public showingAllOptions = false;

  constructor() {}

  public get value() {
    if (this.multiple) {
      return this._value;
    }
    // return single value or undefined
    return this._value[0];
  }

  public set value(val) {
    // Always store an array
    if (val === null || val === undefined) {
      this._value = [];
    }
    else {
      if (Array.isArray(val)) {
        this._value = val;
      }
      else {
        this._value = [val];
      }
    }
    this._propagateTouched();
    this._propagateChange(this.value);
    this._showAllOptionsIfNecessary();
  }

  /**
   * Capture the value when set by the parent component.
   *
   * We always create a shallow copy of the existing value rather than pushing
   * to the original, as reactive forms should always treat their given values
   * as immutable. Really, Angular expects a FormArray to be used to get around
   * the mutability issues, but this is an easier route to have a single
   * component which handles single *and* multiple selections.
   */
  public writeValue(val: any) {
    this.value = val;
  }

  public registerOnChange(fn: VoidFunction) {
    this._propagateChange = fn;
  }

  public registerOnTouched(fn: VoidFunction) {
    this._propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  public ngOnChanges() {
    this.required = this._required !== undefined;
    this._parseOptions();
  }

  public onFocus(option: SelectOption) {
    this.focussedOption = option;
  }

  public onBlur() {
    this.focussedOption = null;
    this._propagateTouched();
  }

  /**
   * Return whether the given option should be considered as currently selected.
   */
  public isSelected(option: SelectOption): boolean {
    return this._value.some(val => this._isEqual(val, option.value));
  }

  public isFocussed(option: SelectOption): boolean {
    return option === this.focussedOption;
  }

  /**
   * Make all options visible within the form field.
   */
  public showAllOptions() {
    if (this.isDisabled) {
      return;
    }

    this.visibleOptions = [...this.alwaysOptions, ...this.moreOptions];
    this.showingAllOptions = true;
  }

  /**
   * When one option is (de)selected in a multiple options case, update our value.
   *
   * We always create a shallow copy of the existing value rather than pushing
   * to the original, as reactive forms should always treat their given values
   * as immutable.
   */
  public onChangeMultiple(value: any, isChecked: boolean) {
    const valueCopy = this._value.slice();

    if (isChecked) {
      valueCopy.push(value);
    } else {
      const index = valueCopy.findIndex(x => this._isEqual(x, value));
      valueCopy.splice(index, 1);
    }

    this.value = valueCopy;
  }

  /**
   * Return whether a and b should be considered equal.
   *
   * This abstraction allows the parent to specify an [equalityFn] to perform
   * custom equality checking (e.g. against different instances of equal moments).
   */
  private _isEqual(a: any, b: any): boolean {
    if (this.equalityFn) {
      return this.equalityFn(a, b);
    } else {
      return a === b;
    }
  }

  /**
   * Parse the given options, pushing only a select few into the "visible" options.
   */
  private _parseOptions() {
    this.alwaysOptions = [];
    this.moreOptions = [];

    this._options.forEach((option, i) => {
      if (i < this.showLimit) {
        this.alwaysOptions.push(option);
      } else {
        this.moreOptions.push(option);
      }
    });

    if (this.showingAllOptions) {
      this.showAllOptions();
    }
    else {
      this.visibleOptions = this.alwaysOptions;
    }
  }

  /**
   * If an external update selects an option which isn't currently visible, show all options.
   */
  private _showAllOptionsIfNecessary() {
    if (this._value.length === 0) {
      return;
    }
    if (this.multiple) {
      if (!this._value.every(val => this._valueIsVisible(val))) {
        this.showAllOptions();
      }
    } else if (!this._valueIsVisible(this.value)) {
      this.showAllOptions();
    }
  }

  /**
   * Return whether the given value is within the visible options.
   */
  private _valueIsVisible(value: any): boolean {
    return this.visibleOptions.some(option => this._isEqual(value, option.value));
  }
}


export { TouchSelectComponent, SelectOption };
