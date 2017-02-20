 import React, { Component } from 'react';
 import YTSearch from 'youtube-api-search';
 import {  TextInput } from 'react-native';

export default class SearchVideo extends Component {

setVideoList(text){
    console.log("Text = "+text)
     YTSearch({
            key: API_KEY,
            term: text},
            function(videos){
                console.log(videos);
                this.props.setList(videos);
        })
}
  render() {
    return (
     <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={this.setVideoList.bind(this,text)}
        />
    );
  }
}

 
