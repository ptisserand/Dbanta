import { Textarea } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';

const TextArea = props => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = event => {
    setTextAreaHeight('100px');
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div
      style={{
        minHeight: parentHeight,
      }}
    >
      <Textarea
        {...props}
        ref={textAreaRef}
        rows={1}
        style={{
          height: textAreaHeight,
        }}
        id="txtarea"
        onChange={onChangeHandler}
        value={text}
        borderX={'none'}
        borderY={'none'}
        borderTop="none"
        type="text"
        _placeholder={{
          color: 'gray.500',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      />
    </div>
  );
};

export default TextArea;
