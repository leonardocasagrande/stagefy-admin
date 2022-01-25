import React from 'react';
import { IMaskInput } from 'react-imask';

interface IPhoneMaskedInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PhoneMaskedInput = React.forwardRef<HTMLElement, IPhoneMaskedInputProps>(
  function PhoneMaskedInput(props, ref) {
    const IMask = IMaskInput as any;
    const { onChange, ...other } = props;
    return (
      <IMask
        {...other}
        mask="(00) 0 00000000"
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default PhoneMaskedInput;
