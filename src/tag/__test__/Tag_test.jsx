import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Tag from '../';

describe('Tag test', () => {
  it('type', () => {
    const w = mount(
      <Tag type="primary">TEST</Tag>
    );
    expect(w.find('.el-tag--primary')).toHaveLength(1);
    expect(w.find('.el-tag--primary').text()).toBe('TEST');
  });

  it('closable', () => {
    const w = shallow(
      <Tag type="primary" closable={true}>TEST</Tag>
    );
    expect(w.find('i.el-tag__close').exists()).toBe(true);
  });

  // it('closeTransition', () => {
  //   const w = shallow(
  //     <Tag closable={true} closeTransition={false}>TEST</Tag>
  //   );
  //   expect(w.find('[name="el-zoom-in-center"]').exists()).toBe(true);
  // });

  it('hit', () => {
    const w = mount(
      <Tag hit={true}>TEST</Tag>
    );
    expect(w.find('.el-tag').first().hasClass('is-hit')).toBeTruthy();
  });

  it('onClose', () => {
    const onClose = sinon.spy();
    const w = shallow(
      <Tag type="primary" closable={true} onClose={onClose}>TEST</Tag>
    );

    w.find('i.el-tag__close').simulate('click');

    expect(onClose.calledOnce).toBe(true);
  });
});
