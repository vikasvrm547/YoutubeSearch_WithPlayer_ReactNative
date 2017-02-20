import React, { Component } from 'react';
import YouTube from 'react-native-youtube';

export default class YoutubePlayer extends Component {
  render() {
    return (
      <YouTube
        ref="youtubePlayer"
        videoId="KVZ-P-ZI6W4" // The YouTube video ID
        play={true}           // control playback of video with true/false
        hidden={false}        // control visiblity of the entire view
        playsInline={true}    // control whether the video should play inline
        loop={false}          // control whether the video should loop when ended

        onReady={(e)=>{this.setState({isReady: true})}}
        onChangeState={(e)=>{this.setState({status: e.state})}}
        onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
        onError={(e)=>{this.setState({error: e.error})}}
        onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

        style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
        apiKey={this.props.API_KEY}
        />
    );
  }
}
