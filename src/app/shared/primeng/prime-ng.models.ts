/**
 * Various PrimeNg components where a selection from restricted choices is possible like `SelectButton or DropDown are instantiated with
 * an array of `options` which can be anything. The keys for the display string and value can be configured, but by default it uses
 * `label` and `value`, respectively. This is a helper model for simple use cases
 */
export interface SelectionModel {
  label: string
  value: string | number
}
