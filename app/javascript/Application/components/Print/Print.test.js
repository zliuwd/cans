import React from 'react';
import { mount } from 'enzyme';
import Print from './Print';

describe('<Print />', () => {
  const createContainerElement = () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    document.body.appendChild(div);
    return document.getElementById('container');
  };

  const mountPrintComponent = onCloseCallback =>
    mount(<Print onClose={onCloseCallback} node={<div id="internal" />} />, {
      attachTo: createContainerElement(),
    });

  it('should render print iframe', () => {
    const printComponent = mountPrintComponent(jest.fn());
    expect(printComponent.find('iframe').length).toBe(1);
  });

  it('should copy input node component into the print iframe', () => {
    mountPrintComponent(jest.fn());
    const internalDiv = document.getElementById('print-frame').contentWindow.document.getElementById('internal');
    expect(internalDiv).not.toBeNull();
  });

  it('should invoke onClose callback', () => {
    const onCloseMock = jest.fn();
    mountPrintComponent(onCloseMock);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
