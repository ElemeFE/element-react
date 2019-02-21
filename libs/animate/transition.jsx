import React, { Component } from 'react';
import { Transition as ReactTransition } from 'react-transition-group';
import { View } from '../';

const noneFun = () => undefined;

class Transition extends Component {

  render() {
    const {
      in: inProp,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      addEndListener,
      unmountOnExit,
      appear,
      duration,
      mountOnEnter,
      transitionClass
    } = this.props;
    return (
      <ReactTransition
        onEnter={() => onEnter()}
        onEntering={() => onEntering()}
        onEntered={() => onEntered()}
        onExit={() => onExit()}
        onExiting={() => onExiting()}
        onExited={() => onExited()}
        addEndListener={() => addEndListener()}
        in={inProp}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={appear}
        timeout={duration}
      >
        {
          state => (
            <View
              className={transitionClass[state]}
            >
              {this.props.children}
            </View>
          )
        }
      </ReactTransition>
    );
  }
}

Transition.defaultProps = {
  onEnter: noneFun,
  onEntering: noneFun,
  onEntered: noneFun,
  onExit: noneFun,
  onExiting: noneFun,
  onExited: noneFun,
  addEndListener: noneFun,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: true,
  duration: 0
}

export default Transition;
