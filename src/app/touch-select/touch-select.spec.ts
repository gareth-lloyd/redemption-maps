import { TestBed, inject } from '@angular/core/testing';

import { TouchSelectComponent, SelectOption } from './hk-select.component';

describe('TouchSelect Component', () => {
  let touchSelect: TouchSelectComponent;
  let optionA: SelectOption = { value: 'a', label: 'A' };
  let optionB: SelectOption = { value: 'b', label: 'B' };
  let optionC: SelectOption = { value: 'c', label: 'C' };

  beforeEach(() => {
    touchSelect = new TouchSelectComponent();
    touchSelect.options = [optionA, optionB, optionC];
  });

  it('should use callback when changed (not multiple)', () => {
    const changedSpy = jasmine.createSpy('changed')
    const touchedSpy = jasmine.createSpy('touched')
    touchSelect.registerOnChange(changedSpy)
    touchSelect.registerOnTouched(touchedSpy)

    touchSelect.value = 'a';

    expect(touchedSpy).toHaveBeenCalled();
    expect(changedSpy).toHaveBeenCalledWith('a');
  });

  it('should use callback when changed (multiple)', () => {
    touchSelect.multiple = true;
    const changedSpy = jasmine.createSpy('changed')
    const touchedSpy = jasmine.createSpy('touched')
    touchSelect.registerOnChange(changedSpy)
    touchSelect.registerOnTouched(touchedSpy)

    touchSelect.value = 'a';

    expect(touchedSpy).toHaveBeenCalled();
    expect(changedSpy).toHaveBeenCalledWith(['a']);
  });

  it('should always store an array but return single value', () => {
    touchSelect.value = 'a';
    expect(touchSelect.value).toEqual('a');

    touchSelect.value = null;
    expect(touchSelect.value).toEqual(undefined);
  });

  it('should always store an array (multiple)', () => {
    touchSelect.multiple = true;
    touchSelect.value = 'a';
    expect(touchSelect.value).toEqual(['a']);

    touchSelect.value = null;
    expect(touchSelect.value).toEqual([]);
  });

  it('should get/set an array of options', () => {
    expect(touchSelect.options).toEqual([optionA, optionB, optionC]);
  });

  it('should deselect an unavailable option (single value)', () => {
    touchSelect.value = 'a';
    touchSelect.options = [optionB];
    expect(touchSelect.value).toBeUndefined();
  });

  it('should deselect any unavailable options (multiple value)', () => {
    touchSelect.multiple = true;
    touchSelect.value = ['a', 'c'];
    touchSelect.options = [optionB, optionC];
    expect(touchSelect.value).toEqual(['c']);
  });

  it('should state whether an option is selected (true)', () => {
    touchSelect.value = 'a'
    expect(touchSelect.isSelected(optionA)).toBeTruthy();
  });

  it('should state whether an option is selected (false)', () => {
    expect(touchSelect.isSelected(optionA)).toBeFalsy();
  });

  it('should state whether an option is selected (true, multiple)', () => {
    touchSelect.multiple = true;

    touchSelect.value = ['a']
    expect(touchSelect.isSelected(optionA)).toBeTruthy();

    touchSelect.value = ['a', 'b']
    expect(touchSelect.isSelected(optionA)).toBeTruthy();
    expect(touchSelect.isSelected(optionB)).toBeTruthy();
  });

  it('should state whether an option is selected (false, multiple)', () => {
    touchSelect.multiple = true;
    expect(touchSelect.isSelected(optionA)).toBeFalsy();
  });
});
