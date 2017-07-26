import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Tag from '../';

describe('Tag test', () => {
  it('type', () => {
    const w = mount(
      <Tag type="primary">TEST</Tag>
    );
    expect(w.childAt(0).hasClass('el-tag--primary')).toBeTruthy();
    expect(w.childAt(0).text()).toBe('TEST');
  });

  it('closable', () => {
    const w = shallow(
      <Tag type="primary" closable={true}>TEST</Tag>
    );
    expect(w.childAt(0).find('i.el-tag__close').exists()).toBe(true);
  });

  // it('closeTransition', () => {
  //   const w = mount(
  //     <Tag closable={true} closeTransition={false}>TEST</Tag>
  //   );
  //   expect(w.find('[name="el-zoom-in-center"]').exists()).toBe(true);
  // });

  it('hit', () => {
    const w = mount(
      <Tag hit={true}>TEST</Tag>
    );
    expect(w.childAt(0).hasClass('is-hit')).toBeTruthy();
  });

  // it('onClose', () => {
  //   const fn = sinon.spy();
  //   const w = mount(
  //     <Tag type="primary" closable={true} onClose={fn}>TEST</Tag>
  //   );
  //   const closeIcon = w.childAt(0).find('i.el-tag__close');
  //   closeIcon.simulate('click');
  //   expect(fn.calledOnce).toBeTruthy();
  // });
});
