import { SfButton, SfIconRemove, SfIconAdd } from "@storefront-ui/react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

const QuantitySelector = (props: {
    max: number;
    value: number;
    min: number;
    setValue: Dispatch<SetStateAction<number>>;
}) => {
    return (
        <div className="inline-flex flex-col items-center">
          <div className="flex border border-neutral-300">
            <SfButton
              variant="tertiary"
              square
              className="rounded-r-none"
              disabled={props.value <= props.min}
              aria-label="Decrease value"
              onClick={() => props.setValue(props.value - 1) }
            >
              <SfIconRemove />
            </SfButton>
            <input
              type="number"
              role="spinbutton"
              className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
              min={props.min}
              max={props.max}
              value={props.value}
              onChange={(e) => props.setValue(e.target.value)}
            />
            <SfButton
              variant="tertiary"
              square
              className="rounded-l-none"
              disabled={props.value >= props.max}
              aria-label="Increase value"
              onClick={() => props.setValue(props.value + 1) }
            >
              <SfIconAdd />
            </SfButton>
        </div>
      </div>
    ) 
}
export default QuantitySelector;