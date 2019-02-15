// @flow
import * as React from 'react';
import type { Price } from 'page/settings';
import { FormField } from './form-field';

type Props = {
  price: Price,
  onChange: Price => void,
  placeholder: number,
  min: number,
  disabled: boolean,
  name: string,
  step: ?number,
};

export class FormFieldPrice extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    (this: any).handleAmountChange = this.handleAmountChange.bind(this);
    (this: any).handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleAmountChange(event: SyntheticInputEvent<*>) {
    const { price, onChange } = this.props;
    const amount = event.target.value ? parseFloat(event.target.value) : '';
    onChange({
      currency: price.currency,
      amount,
    });
  }

  handleCurrencyChange(event: SyntheticInputEvent<*>) {
    const { price, onChange } = this.props;
    onChange({
      currency: event.target.value,
      amount: price.amount,
    });
  }

  render() {
    const { price, placeholder, min, disabled, name, step } = this.props;

    return (
      <fieldset-group class="fieldset-group--smushed">
        <fieldset-section>
          <FormField
            name={`${name}_amount`}
            label={__('Price')}
            type="number"
            className="form-field--price-amount"
            min={min}
            value={price.amount}
            onChange={this.handleAmountChange}
            placeholder={placeholder || 5}
            disabled={disabled}
            step={step || 'any'}
          />
        </fieldset-section>
        <fieldset-section>
          <FormField
            label={__('Currency')}
            name={`${name}_currency`}
            type="select"
            id={`${name}_currency`}
            className="input--currency-select"
            disabled={disabled}
            onChange={this.handleCurrencyChange}
            value={price.currency}
          >
            <option value="LBC">{__('LBRY Credits (LBC)')}</option>
            <option value="USD">{__('US Dollars')}</option>
          </FormField>
        </fieldset-section>
      </fieldset-group>
    );
  }
}

export default FormFieldPrice;
