import {Combobox} from '@salesforce/design-system-react'
import { useState, SyntheticEvent } from "react";
import { Icon } from "@salesforce/design-system-react/";
import { comboboxFilterAndLimit } from "@salesforce/design-system-react";
import {IconSettings} from '@salesforce/design-system-react';

const accounts = [
  {
    id: "1",
    label: "Acme",
    subTitle: "Account • San Francisco",
    type: "account"
  },
  {
    id: "2",
    label: "Salesforce.com, Inc.",
    subTitle: "Account • San Francisco",
    type: "account"
  },
  {
    id: "3",
    label: "Paddy's Pub",
    subTitle: "Account • Boston, MA",
    type: "account"
  },
  {
    id: "4",
    label: "Tyrell Corp",
    subTitle: "Account • San Francisco, CA",
    type: "account"
  },
  {
    id: "5",
    label: "Paper St. Soap Company",
    subTitle: "Account • Beloit, WI",
    type: "account"
  },
  {
    id: "6",
    label: "Nakatomi Investments",
    subTitle: "Account • Chicago, IL",
    type: "account"
  },
  { id: "7", label: "Acme Landscaping", type: "account" },
  {
    id: "8",
    label: "Acme Construction",
    subTitle: "Account • Grand Marais, MN",
    type: "account"
  }
];

const accountsWithIcon = accounts.map((elem) => ({
  ...elem,
  ...{
    icon: (
      <Icon
        assistiveText={{ label: "Account" }}
        category="standard"
        name={elem.type}
      />
    )
  }
}));

type AppProps = {
  onChange: (event: SyntheticEvent, value: any) => void,
  onRequestRemoveSelectedOption: ( data: string) => void,
}
// {onChange}:AppProps, {onRequestRemoveSelectedOption}:AppProps
export const App = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selection, setSelection] = useState<any>([]);
  const selectedOption: boolean = false;

  return (
    <IconSettings iconPath="/assets/icons">
    <Combobox
      id="combobox-inline-single"
      events={{
        onChange: (event: AppProps, {value}: any) => {
          // if (onChange) {
          //   onChange(event, value);
          // } else if (console) {
          //   console.log("onChange", event, value);
          // }
          setInputValue(value);
        },
        onRequestRemoveSelectedOption: (event: AppProps, data: any) => {
          setSelection(data.selection);
          setInputValue("");
        },
        onSubmit: (event: SyntheticEvent, { value }: any) => {
          setInputValue("");
          setSelection([
            ...selection,
            {
              label: value,
              icon: (
                <Icon
                  assistiveText={{ label: "Account" }}
                  category="standard"
                  name="account"
                />
              )
            }
          ]);
        },
        onSelect: (event: SyntheticEvent, data: any) => {
          setInputValue("");
          setSelection(data.selection);
        }
      }}
      labels={{
        label: "Search",
        placeholder: "Search Salesforce"
      }}
      options={comboboxFilterAndLimit({
        inputValue: inputValue,
        options: accountsWithIcon,
        selection: selection
      })}
      selection={selection}
      value={selectedOption ? selection.label : inputValue}
      variant="inline-listbox"
    />
     </IconSettings>
  );
};

export default App;
