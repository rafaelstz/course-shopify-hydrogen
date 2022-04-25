import {useProduct} from '@shopify/hydrogen/client';

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */
export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions} = useProduct();

  return (
    <>
      {options.map(({name, values}) => {
        return (
          <fieldset key={name} className="mt-8">
            <legend className="mb-4 text-xl font-bold text-gray-900">
              {name}
            </legend>
            <div className="flex items-center flex-wrap gap-4">
              {values.map((value) => {
                const checked = selectedOptions[name] === value;
                const id = `option-${name}-${value}`;

                return (
                  <label key={id} htmlFor={id}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name={`option[${name}]`}
                      value={value}
                      checked={checked}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    {name === 'Color' ? (
                      <div
                        style={{backgroundColor: value}}
                        className={`w-12 h-12 border-2 cursor-pointer rounded-full
                        ${checked && 'border-tertiary'}`}
                      />
                    ) : (
                      <div
                        className={`py-2 px-4 text-lg border cursor-pointer rounded-full md:text-md
                        ${
                          checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                        }`}
                      >
                        {value}
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </>
  );
}
