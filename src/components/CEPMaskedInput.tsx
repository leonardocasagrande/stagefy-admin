import React from 'react';
import { IMaskInput } from 'react-imask';

interface ICEPMaskedInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CEPMaskedInput = React.forwardRef<HTMLElement, ICEPMaskedInputProps>(
  function CEPMaskedInput(props, ref) {
    const IMask = IMaskInput as any;
    const { onChange, ...other } = props;
    return (
      <IMask
        {...other}
        mask="00000-000"
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default CEPMaskedInput;
