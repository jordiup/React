import React, { Component } from 'react'

class Test extends Component {

    state = {
        test: 'test'
    };

    componentDidMount(){
        console.log('componentDidMount....');
    }
  
    componentWillMount(){
        console.log('componentWillMount....');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate....');
    }

    componentWillUpdate(){
        console.log('componentWillUpdate....');
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){
        console.log('componentWillReceiveProps...');
    }

    static getDerivedStateFromProps(nextProps,prevState){
        return null;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        return null;
    }
  
  
  
  
  
      render() {
    return (
      <div>
        <h1>Test component</h1>
      </div>
    )
  }
}


export default Test;