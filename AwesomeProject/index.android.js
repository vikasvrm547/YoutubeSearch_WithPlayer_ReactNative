import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import YouTube from 'react-native-youtube';
import YTSearch from 'youtube-api-search';


const API_KEY = "AIzaSyCVCvKCQV7m2npVlazOdyWF8DgSVGaRtV8";


export default class AwesomeProject extends Component {
   
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          videoData: {},
          dataSource: ds.cloneWithRows([])
        };
    }

    setVideos(videos){
      console.log("Called setVideos..")
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      if(videos != undefined){
        this.setState({
        dataSource:  ds.cloneWithRows(videos)
      })
      }
    }
    playVideo(videoData){
      console.log("playVideo")
      this.setState({videoData});
    }
  render() {
    
    return (
      <View >
      <YoutubePlayer API_KEY={API_KEY} videoData={this.state.videoData}/>
      <SearchVideo setVideos={this.setVideos.bind(this)} />
     <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
           return <TouchableOpacity onPress={this.playVideo.bind(this, rowData)}>
              <Image source={{uri: rowData.snippet.thumbnails.high.url}}
                              style={{width: 400, height: 200}} />
            </TouchableOpacity>
                     
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);




class SearchVideo extends Component {

  setVideoList(text){
      let self = this;
      console.log("Text = "+text)
      if(text){
        YTSearch({
              key: API_KEY,
              term: text},
              function(videos){
                  console.log(videos);
                  if(videos != undefined)
                    self.props.setVideos(videos);
                  else
                    self.props.setVideos([]);
          })
      }
  }
  render() {
    return (
     <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={this.setVideoList.bind(this)}
        />
    );
  }
}


class YoutubePlayer extends Component {
 
  render() {
    
    let videoId = ''
    if(this.props.videoData.id){
      videoId = this.props.videoData.id.videoId;
    }
    if(this.props.videoData.id){
    return (
      
      <YouTube
        ref="youtubePlayer"
        videoId={videoId} // The YouTube video ID
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
    }else{
      return <Text> Search video </Text>
    }

  }
}
