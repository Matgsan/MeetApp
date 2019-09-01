import React, { useRef, useEffect, useState, useMemo } from 'react';
import { endOfDay, startOfDay, isToday, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { registerLocale } from 'react-datepicker';
import { useField } from '@rocketseat/unform';
import { DatePicker } from './styles';

registerLocale('pt', pt);

export default function DatePickerInput() {
  const ref = useRef();
  const { registerField, defaultValue } = useField('date');
  const [selected, setSelected] = useState(
    defaultValue ? parseISO(defaultValue) : undefined
  );
  const handleDateChangeRaw = e => {
    e.preventDefault();
  };
  useEffect(() => {
    registerField({
      name: 'date',
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current]); // eslint-disable-line

  const minTime = useMemo(() => {
    if (selected) {
      if (isToday(selected)) {
        return new Date();
      }
      return startOfDay(selected);
    }
    return new Date();
  }, [selected]);

  const maxTime = useMemo(() => {
    return endOfDay(selected);
  }, [selected]);
  return (
    <DatePicker
      showTimeSelect
      dateFormat="Pp"
      locale="pt"
      onChangeRaw={handleDateChangeRaw}
      minDate={new Date()}
      minTime={minTime}
      maxTime={maxTime}
      placeholderText="Data"
      selected={selected}
      onChange={date => setSelected(date)}
      ref={ref}
    />
  );
}
